-- The site's contact form has always collected an optional organisation;
-- keep it as a real column rather than folding it into the message body.
alter table public.contact_submissions
  add column if not exists organisation text;

alter table public.contact_submissions
  drop constraint if exists contact_submissions_organisation_check;

alter table public.contact_submissions
  add constraint contact_submissions_organisation_check
  check (organisation is null or char_length(organisation) <= 300);
