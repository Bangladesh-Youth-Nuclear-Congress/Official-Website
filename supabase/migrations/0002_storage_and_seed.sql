-- BYNC — storage policies + seed of the content currently hardcoded in the app.
--
-- The `media` bucket is public, so reads need no policy beyond the bucket flag.
-- Writes are admin-only.

drop policy if exists media_admin_insert on storage.objects;
create policy media_admin_insert on storage.objects
  for insert to authenticated
  with check (bucket_id = 'media' and public.is_admin());

drop policy if exists media_admin_update on storage.objects;
create policy media_admin_update on storage.objects
  for update to authenticated
  using (bucket_id = 'media' and public.is_admin())
  with check (bucket_id = 'media' and public.is_admin());

drop policy if exists media_admin_delete on storage.objects;
create policy media_admin_delete on storage.objects
  for delete to authenticated
  using (bucket_id = 'media' and public.is_admin());

-- =========================================================================
-- Seed — mirrors what the pages render today, so switching them to the DB
-- is a no-op visually. Idempotent: seeds only when the table is empty.
-- =========================================================================

insert into public.news_posts (date_label, tag, title, body, sort_order)
select * from (values
  ('June 2026', 'Milestone', 'I4N Bangladesh 2026 is locked in',
   $txt$Over 500 students engaged and submissions rolling in across all three segments. Event day is confirmed: 8 August 2026 at Russian House, Dhaka.$txt$, 10),
  ('January 2026', 'Keynote', 'Two more international keynotes for Bangladeshi students',
   $txt$Dr. Dinara Ermakova (IYNC Innovation Chair) and George Caliment (I4N Europe Lead, Assystem) addressed Bangladeshi students directly — on innovation and what it takes on the global stage.$txt$, 20),
  ('December 2025', 'Programme', $txt$“Road to I4N” launches across campuses$txt$,
   $txt$Campus sessions kicked off at Dhaka University and MIST. BYNC was listed on IYNC's global Young Generation Network map, with a keynote from Alice Cunha da Silva (IYNC Vice President, Westinghouse).$txt$, 30),
  ('August 2025', 'Membership', 'Bangladesh joins IYNC as the 49th member nation',
   $txt$The MOU with IYNC made it official — Bangladesh entered the global young generation nuclear network, and BYNC was featured on IYNC's official platform.$txt$, 40)
) as v(date_label, tag, title, body, sort_order)
where not exists (select 1 from public.news_posts);

insert into public.events (title, date_label, starts_on, ends_on, location, description, cta_label, cta_href, featured, sort_order)
select * from (values
  ('I4N Bangladesh 2026', '8 August 2026 · Dhaka', date '2026-08-08', date '2026-08-08',
   'Russian House, Dhaka',
   $txt$The national qualifying round of IYNC's flagship competition — three segments, 500+ participants, and a direct path to the global finale.$txt$,
   'Explore I4N', '/i4n', true, 10),
  ('IYNC 2026, France', '4–9 October 2026 · Avignon', date '2026-10-04', date '2026-10-09',
   'Palais des Papes, Avignon',
   $txt$The biennial International Youth Nuclear Congress — where Bangladesh raises its first national flag, hosted in a UNESCO World Heritage palace.$txt$,
   null, null, true, 20)
) as v(title, date_label, starts_on, ends_on, location, description, cta_label, cta_href, featured, sort_order)
where not exists (select 1 from public.events);

insert into public.speakers (name, role, org, bio, photo_url, sort_order)
select * from (values
  ('Alice Cunha da Silva', 'IYNC Vice President', 'Westinghouse',
   $txt$Opened BYNC's Road to I4N with a candid talk on building a global nuclear career — from anywhere in the world, Bangladesh included.$txt$,
   '/assets/speakers/alice.jpg', 10),
  ('Dr. Dinara Ermakova', 'IYNC Innovation Chair', 'International Youth Nuclear Congress',
   $txt$Spoke to Bangladeshi students on turning early nuclear ideas into real, fundable innovation — and what judges actually look for.$txt$,
   '/assets/speakers/dinara.jpg', 20),
  ('George Caliment', 'I4N Europe Lead', 'Assystem',
   $txt$Walked students through how I4N works on the world stage, and what a Bangladeshi team should aim for to stand out at the global finale.$txt$,
   '/assets/speakers/george.jpg', 30)
) as v(name, role, org, bio, photo_url, sort_order)
where not exists (select 1 from public.speakers);

insert into public.team_members (name, role, org, photo_url, sort_order)
select * from (values
  ('Mhamudul Hasan Sami', 'Founder & President', null, '/assets/team/sami.jpg', 10),
  ('Nazifa Tasnim', 'Co-founder & General Secretary', null, '/assets/team/nazifa.jpg', 20),
  ('Sadia Noushin Promi', 'Co-founder & Vice President', null, '/assets/team/sadia.jpg', 30),
  ('Prof. Dr. MD Shafiqul Islam', 'Chief Advisor',
   'Ex-Director, BAEC · Nuclear Engineering, Dhaka University', '/assets/team/shafiq.jpg', 40),
  ('Zareen Tahsin Anjum', 'Treasurer', null, '/assets/team/zareen.jpg', 50),
  ('Fahim Sabab Siddique', 'Advisor', null, '/assets/team/fahim.jpg', 60),
  ('Tamim Muhammad Rayeed', 'Webmaster & Developer', null, '/assets/team/tamim.jpg', 70)
) as v(name, role, org, photo_url, sort_order)
where not exists (select 1 from public.team_members);

insert into public.site_content (key, value, label, "group")
select * from (values
  ('home.hero.badge', 'I4N Bangladesh 2026 — 8 August 2026', 'Hero badge', 'Home'),
  ('home.hero.title', $txt$Powering Bangladesh's Nuclear Future$txt$, 'Hero headline', 'Home'),
  ('home.hero.subtitle',
   $txt$Bangladesh's first youth-led nuclear organisation — connecting the nation's brightest STEM minds to the global nuclear community as we enter the post-Rooppur era.$txt$,
   'Hero subtitle', 'Home'),
  ('home.stats.1.value', '49th', 'Stat 1 — value', 'Home'),
  ('home.stats.1.label', 'IYNC member nation', 'Stat 1 — label', 'Home'),
  ('home.stats.2.value', '500+', 'Stat 2 — value', 'Home'),
  ('home.stats.2.label', 'I4N participants', 'Stat 2 — label', 'Home'),
  ('home.stats.3.value', '1000+', 'Stat 3 — value', 'Home'),
  ('home.stats.3.label', 'student engagement', 'Stat 3 — label', 'Home'),
  ('contact.email', 'bync.bd@gmail.com', 'Public contact email', 'Contact'),
  ('social.linkedin', 'https://www.linkedin.com/company/bangladesh-youth-nuclear-congress-bync/', 'LinkedIn URL', 'Social'),
  ('social.facebook', 'https://www.facebook.com/profile.php?id=61577912678276', 'Facebook URL', 'Social'),
  ('social.instagram', 'https://www.instagram.com/bync.bd/', 'Instagram URL', 'Social')
) as v(key, value, label, "group")
where not exists (select 1 from public.site_content);
