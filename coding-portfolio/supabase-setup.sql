-- PRIVATE PORTFOLIO FEEDBACK (Supabase SQL Editor)
-- First: create your admin account in Authentication > Users.
-- Second: replace YOUR_ADMIN_USER_UUID_HERE below in BOTH policy statements
-- with the admin user's UUID from Authentication > Users.
-- Do not put passwords, service_role or secret keys in frontend code.

create table if not exists public.feedback (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null check (char_length(name) between 1 and 100),
  email text check (email is null or char_length(email) <= 254),
  kind text not null check (kind in ('Project feedback', 'Bug report', 'Collaboration', 'General message')),
  rating integer not null check (rating between 1 and 5),
  message text not null check (char_length(message) between 10 and 2000)
);

-- RLS protects records even if someone visits /admin directly.
alter table public.feedback enable row level security;

-- Visitors may submit feedback, but cannot read or edit other submissions.
revoke all on table public.feedback from anon, authenticated;
grant insert on table public.feedback to anon, authenticated;
grant select, delete on table public.feedback to authenticated;

-- Safe to rerun if you need to change your administrator UUID.
drop policy if exists "Visitors may submit feedback" on public.feedback;
drop policy if exists "Admin may read feedback" on public.feedback;
drop policy if exists "Admin may delete feedback" on public.feedback;

create policy "Visitors may submit feedback"
  on public.feedback for insert to anon, authenticated
  with check (true);

-- This user ID is not a password or a secret key. Still, protect your login.
create policy "Admin may read feedback"
  on public.feedback for select to authenticated
  using ((select auth.uid()) = 'c89e33e9-3f27-4471-9523-fa97f752983e'::uuid);

create policy "Admin may delete feedback"
  on public.feedback for delete to authenticated
  using ((select auth.uid()) = 'c89e33e9-3f27-4471-9523-fa97f752983e'::uuid);

-- No UPDATE policy is granted. Every visitor's submissions remain private.
-- Before public launch, add spam protection/rate limiting (e.g., CAPTCHA
-- with server-side verification and an Edge Function) to prevent abuse.
