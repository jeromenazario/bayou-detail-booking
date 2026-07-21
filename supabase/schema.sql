-- Bayou Detail Co. — full schema. Run in the Supabase SQL editor,
-- or apply via the migrations in supabase/migrations/.

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

-- The anon key is public by design, so the database enforces the business
-- rules itself — service area, valid slots, sane lengths, pending-only.
-- Anon can create bookings; it can never read, change, or delete them.
drop policy if exists "anon_insert_bookings" on public.bookings;
create policy "anon_insert_bookings"
  on public.bookings
  for insert
  to anon
  with check (
    status = 'pending'
    and zip in (
      '77005','77006','77007','77008','77019','77024','77025','77027','77030',
      '77056','77098','77339','77401','77450','77494','77546','77573','77584'
    )
    and char_length(name) between 2 and 120
    and char_length(vehicle) between 2 and 120
    and service in ('Wash & Wax','Interior Deep Clean','Full Detail','Maintenance Plan Visit')
    and slot_time ~ '^(0[89]|1[0-5]):00$'
    and slot_date between current_date and (current_date + 8)
  );

create table if not exists public.waitlist_emails (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  email text not null,
  zip text not null
);

alter table public.waitlist_emails enable row level security;

drop policy if exists "anon_insert_waitlist" on public.waitlist_emails;
create policy "anon_insert_waitlist"
  on public.waitlist_emails
  for insert
  to anon
  with check (
    zip ~ '^\d{5}$'
    and email ~* '^[^\s@]+@[^\s@]+\.[^\s@]+$'
    and char_length(email) <= 254
  );
