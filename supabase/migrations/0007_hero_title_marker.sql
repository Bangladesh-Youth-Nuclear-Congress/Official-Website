-- The hero headline carries a highlighted run. Rather than hard-code markup,
-- the editable value uses [[double brackets]] which the site renders with the
-- highlight style (see web/src/components/Marked.tsx).
update public.site_content
   set value = 'Powering Bangladesh''s [[Nuclear Future]]'
 where key = 'home.hero.title'
   and value not like '%[[%';

update public.site_content
   set label = 'Hero headline — wrap text in [[ ]] to highlight it'
 where key = 'home.hero.title';
