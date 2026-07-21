-- Bayou Detail Co. — run this in the Supabase SQL editor.

create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  vehicle text not null,
  zip text not null,
  service text not null,
  slot_date date not null,
  slot_time text not null,
  status text not null default 'pending'
);

alter table public.bookings enable row level security;

-- Anon can create bookings; it cannot read, change, or delete them.
create policy "anon_insert_bookings"
  on public.bookings
  for insert
  to anon
  with check (true);

create table if not exists public.waitlist_emails (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  email text not null,
  zip text not null
);

alter table public.waitlist_emails enable row level security;

create policy "anon_insert_waitlist"
  on public.waitlist_emails
  for insert
  to anon
  with check (true);
