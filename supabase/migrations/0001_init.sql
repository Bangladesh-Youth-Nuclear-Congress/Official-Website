-- BYNC — initial schema
--
-- Design notes
--   * The public site is a static export on GitHub Pages, so every query runs
--     from the browser with the *publishable* key. RLS is therefore the only
--     access control that exists — treat every policy here as load-bearing.
--   * Content tables are world-readable but only when published.
--   * Submission tables (contact, registrations, members) are insert-only for
--     the public. Nobody but an admin can read them back: they hold personal
--     data and an anon SELECT would let anyone scrape the whole list.

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------- admins ---
-- Membership in this table is what makes a logged-in user an admin. Rows are
-- created out-of-band (service role / SQL), never through the API.
create table if not exists public.admins (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  email      text not null,
  name       text,
  created_at timestamptz not null default now()
);

-- SECURITY DEFINER so policies on `admins` itself don't recurse when they
-- call this to decide whether the caller may read `admins`.
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.admins a where a.user_id = (select auth.uid()));
$$;

-- ------------------------------------------------------------- updated_at ---
create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- =========================================================================
-- Content tables — edited in /admin, rendered on the public site
-- =========================================================================

create table if not exists public.news_posts (
  id         uuid primary key default gen_random_uuid(),
  date_label text not null,               -- free text: "June 2026"
  tag        text not null default 'Update',
  title      text not null,
  body       text not null,
  published  boolean not null default true,
  sort_order integer not null default 0,  -- lower first; ties broken by created_at desc
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.events (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  date_label  text not null,              -- "8 August 2026 · Dhaka"
  starts_on   date,
  ends_on     date,
  location    text,
  description text,
  cta_label   text,
  cta_href    text,
  featured    boolean not null default false,
  published   boolean not null default true,
  sort_order  integer not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create table if not exists public.speakers (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  role       text,
  org        text,
  bio        text,
  photo_url  text,
  published  boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.team_members (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  role       text,
  org        text,
  photo_url  text,
  published  boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Arbitrary editable copy blocks, keyed by a dotted path the page reads,
-- e.g. 'home.hero.title'. Kept as text; the page decides how to render it.
create table if not exists public.site_content (
  key        text primary key,
  value      text not null default '',
  label      text,                        -- human name shown in /admin
  "group"    text not null default 'general',
  updated_at timestamptz not null default now()
);

-- Index of files uploaded to Storage, so /admin can list them with metadata
-- without paging the Storage API.
create table if not exists public.media (
  id          uuid primary key default gen_random_uuid(),
  bucket      text not null default 'media',
  path        text not null,
  filename    text not null,
  mime_type   text,
  size_bytes  bigint,
  alt_text    text,
  uploaded_by uuid references auth.users (id) on delete set null,
  created_at  timestamptz not null default now(),
  unique (bucket, path)
);

-- =========================================================================
-- Submission tables — written by the public, read only by admins
-- =========================================================================

create table if not exists public.contact_submissions (
  id         uuid primary key default gen_random_uuid(),
  name       text not null check (char_length(name) between 1 and 200),
  email      text not null check (char_length(email) between 3 and 320),
  subject    text check (char_length(subject) <= 300),
  message    text not null check (char_length(message) between 1 and 8000),
  status     text not null default 'new' check (status in ('new', 'read', 'archived')),
  admin_note text,
  created_at timestamptz not null default now()
);

-- I4N (and future event) entries.
create table if not exists public.registrations (
  id           uuid primary key default gen_random_uuid(),
  event_slug   text not null default 'i4n-2026',
  full_name    text not null check (char_length(full_name) between 1 and 200),
  email        text not null check (char_length(email) between 3 and 320),
  phone        text check (char_length(phone) <= 40),
  institution  text check (char_length(institution) <= 300),
  department   text check (char_length(department) <= 300),
  study_level  text check (char_length(study_level) <= 100),
  segment      text check (char_length(segment) <= 100),
  team_name    text check (char_length(team_name) <= 200),
  motivation   text check (char_length(motivation) <= 5000),
  status       text not null default 'pending'
                 check (status in ('pending', 'confirmed', 'waitlisted', 'rejected')),
  admin_note   text,
  created_at   timestamptz not null default now()
);

-- BYNC membership sign-ups (the /get-involved form).
create table if not exists public.members (
  id          uuid primary key default gen_random_uuid(),
  full_name   text not null check (char_length(full_name) between 1 and 200),
  email       text not null check (char_length(email) between 3 and 320),
  phone       text check (char_length(phone) <= 40),
  institution text check (char_length(institution) <= 300),
  interest    text check (char_length(interest) <= 200),
  message     text check (char_length(message) <= 5000),
  status      text not null default 'pending'
                check (status in ('pending', 'approved', 'rejected')),
  admin_note  text,
  created_at  timestamptz not null default now()
);

-- --------------------------------------------------------------- indexes ---
create index if not exists news_posts_order_idx   on public.news_posts (sort_order, created_at desc);
create index if not exists events_order_idx       on public.events (sort_order, created_at desc);
create index if not exists speakers_order_idx     on public.speakers (sort_order, created_at desc);
create index if not exists team_members_order_idx on public.team_members (sort_order, created_at desc);
create index if not exists contact_created_idx    on public.contact_submissions (created_at desc);
create index if not exists registrations_created_idx on public.registrations (created_at desc);
create index if not exists registrations_event_idx   on public.registrations (event_slug, created_at desc);
create index if not exists members_created_idx    on public.members (created_at desc);
create index if not exists media_created_idx      on public.media (created_at desc);

-- -------------------------------------------------------------- triggers ---
do $$
declare t text;
begin
  foreach t in array array['news_posts','events','speakers','team_members','site_content'] loop
    execute format('drop trigger if exists touch_%1$s on public.%1$I', t);
    execute format(
      'create trigger touch_%1$s before update on public.%1$I
         for each row execute function public.touch_updated_at()', t);
  end loop;
end;
$$;

-- =========================================================================
-- Row Level Security
-- =========================================================================

alter table public.admins              enable row level security;
alter table public.news_posts          enable row level security;
alter table public.events              enable row level security;
alter table public.speakers            enable row level security;
alter table public.team_members        enable row level security;
alter table public.site_content        enable row level security;
alter table public.media               enable row level security;
alter table public.contact_submissions enable row level security;
alter table public.registrations       enable row level security;
alter table public.members             enable row level security;

-- admins: readable by admins only, never writable through the API.
drop policy if exists admins_select on public.admins;
create policy admins_select on public.admins
  for select to authenticated using (public.is_admin());

-- Content: anyone may read published rows; admins may do anything.
do $$
declare t text;
begin
  foreach t in array array['news_posts','events','speakers','team_members'] loop
    execute format('drop policy if exists %1$s_public_read on public.%1$I', t);
    execute format(
      'create policy %1$s_public_read on public.%1$I
         for select to anon, authenticated using (published)', t);
    execute format('drop policy if exists %1$s_admin_all on public.%1$I', t);
    execute format(
      'create policy %1$s_admin_all on public.%1$I
         for all to authenticated using (public.is_admin()) with check (public.is_admin())', t);
  end loop;
end;
$$;

-- site_content and media are fully public to read (no published flag).
drop policy if exists site_content_public_read on public.site_content;
create policy site_content_public_read on public.site_content
  for select to anon, authenticated using (true);
drop policy if exists site_content_admin_all on public.site_content;
create policy site_content_admin_all on public.site_content
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists media_public_read on public.media;
create policy media_public_read on public.media
  for select to anon, authenticated using (true);
drop policy if exists media_admin_all on public.media;
create policy media_admin_all on public.media
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- Submissions: the public may INSERT and nothing else. No SELECT policy for
-- anon means an anonymous read returns zero rows, always.
do $$
declare t text;
begin
  foreach t in array array['contact_submissions','registrations','members'] loop
    execute format('drop policy if exists %1$s_public_insert on public.%1$I', t);
    execute format(
      'create policy %1$s_public_insert on public.%1$I
         for insert to anon, authenticated with check (true)', t);
    execute format('drop policy if exists %1$s_admin_read on public.%1$I', t);
    execute format(
      'create policy %1$s_admin_read on public.%1$I
         for select to authenticated using (public.is_admin())', t);
    execute format('drop policy if exists %1$s_admin_write on public.%1$I', t);
    execute format(
      'create policy %1$s_admin_write on public.%1$I
         for update to authenticated using (public.is_admin()) with check (public.is_admin())', t);
    execute format('drop policy if exists %1$s_admin_delete on public.%1$I', t);
    execute format(
      'create policy %1$s_admin_delete on public.%1$I
         for delete to authenticated using (public.is_admin())', t);
  end loop;
end;
$$;

-- ---------------------------------------------------------------- grants ---
-- RLS decides the rows; these decide the verbs. Kept explicit rather than
-- relying on Supabase default privileges.
grant usage on schema public to anon, authenticated;

grant select on public.news_posts, public.events, public.speakers,
                public.team_members, public.site_content, public.media
  to anon, authenticated;

grant insert on public.contact_submissions, public.registrations, public.members
  to anon, authenticated;

grant select, insert, update, delete on
  public.news_posts, public.events, public.speakers, public.team_members,
  public.site_content, public.media, public.contact_submissions,
  public.registrations, public.members
  to authenticated;

grant select on public.admins to authenticated;
