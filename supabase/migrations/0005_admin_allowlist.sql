-- Bootstrapping admins.
--
-- Sign-in is magic-link, so an auth user only exists after someone has clicked
-- through their email. Rather than hand-promoting each person afterwards, an
-- allowlist of addresses is checked by a trigger on auth.users: an allowlisted
-- address becomes an admin automatically on first sign-in.
--
-- Anyone NOT on the allowlist can still complete a magic-link sign-in, but they
-- land in auth.users with no row in `admins` — every RLS policy then denies
-- them, so they see nothing.

create table if not exists public.admin_allowlist (
  email      text primary key,
  note       text,
  created_at timestamptz not null default now()
);

alter table public.admin_allowlist enable row level security;

drop policy if exists admin_allowlist_admin_all on public.admin_allowlist;
create policy admin_allowlist_admin_all on public.admin_allowlist
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

grant select, insert, update, delete on public.admin_allowlist to authenticated;

insert into public.admin_allowlist (email, note)
values ('tamimrayeed4@gmail.com', 'Webmaster')
on conflict (email) do nothing;

create or replace function public.promote_allowlisted_admin()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if exists (
    select 1 from public.admin_allowlist a
     where lower(a.email) = lower(new.email)
  ) then
    insert into public.admins (user_id, email)
    values (new.id, new.email)
    on conflict (user_id) do nothing;
  end if;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.promote_allowlisted_admin();

-- Covers anyone who already signed in before this migration ran.
insert into public.admins (user_id, email)
select u.id, u.email
  from auth.users u
  join public.admin_allowlist a on lower(a.email) = lower(u.email)
on conflict (user_id) do nothing;
