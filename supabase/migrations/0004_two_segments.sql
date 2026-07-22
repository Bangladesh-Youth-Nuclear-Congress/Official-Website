-- The I4N segment was withdrawn; Innoventure 2026 now runs two segments
-- (Project Showcasing ৳24,000 and Poster Presentation ৳16,000).

update public.news_posts
   set body = 'Over 500 students engaged and submissions rolling in across both segments. Event day is confirmed: 8 August 2026 at Russian House, Dhaka.'
 where title = 'Innoventure 2026 is locked in';

update public.events
   set description = 'BYNC''s regional competition on nuclear, power and energy — two segments, 500+ participants and a ৳40,000 prize pool.'
 where title = 'Innoventure 2026';
