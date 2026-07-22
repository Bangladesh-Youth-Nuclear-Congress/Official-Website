-- The Bangladesh event was renamed "I4N Bangladesh 2026" -> "Innoventure 2026".
-- I4N survives as the name of one segment (the IYNC qualifier), so this only
-- touches copy that referred to the event as a whole.

update public.news_posts
   set title = 'Innoventure 2026 is locked in'
 where title = 'I4N Bangladesh 2026 is locked in';

update public.events
   set title = 'Innoventure 2026'
 where title = 'I4N Bangladesh 2026';

update public.events
   set cta_label = 'Explore Innoventure',
       cta_href  = '/innoventure'
 where cta_href = '/i4n';

update public.site_content
   set value = 'Innoventure 2026 — 8 August 2026'
 where key = 'home.hero.badge';

update public.site_content
   set value = 'Innoventure participants'
 where key = 'home.stats.2.label';

-- The registrations table keys entries by event; keep the slug aligned.
alter table public.registrations alter column event_slug set default 'innoventure-2026';
update public.registrations set event_slug = 'innoventure-2026' where event_slug = 'i4n-2026';
