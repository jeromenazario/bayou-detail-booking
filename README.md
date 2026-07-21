# Bayou Detail Co. — Booking Page

Single-page, mobile-first booking site for a Houston mobile car detailing
business. Next.js App Router + TypeScript + Tailwind CSS v4 + Supabase.

## Setup

1. **Create a Supabase project** at [supabase.com](https://supabase.com).

2. **Create the tables** — open the SQL editor in the Supabase dashboard and
   run everything in [`supabase/schema.sql`](supabase/schema.sql). This creates
   `bookings` and `waitlist_emails` with RLS enabled: the anon role can
   INSERT only — no SELECT, UPDATE, or DELETE.

3. **Configure env vars** — copy `.env.local.example` to `.env.local` and fill
   in your project URL and anon key (Project Settings → API):

   ```
   NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

4. **Run it**:

   ```bash
   npm install
   npm run dev
   ```

## How it works

- **Service-area gate** — only 18 Houston-area ZIP codes can book. The client
  validates on blur (green in-area banner / friendly out-of-area waitlist
  capture), and the server action in `app/actions.ts` re-validates the ZIP,
  service, date, and time slot on every submit. The client check is UX; the
  server check is the enforcement.
- **Slots** — the next 7 days (starting tomorrow, Houston time), hourly from
  8:00 AM to 3:00 PM. Dates are computed server-side per request
  (`export const dynamic = "force-dynamic"`).
- **Out-of-area waitlist** — captures email + ZIP into `waitlist_emails`.
- **Deliberately out of scope** — no admin, auth, payments, SMS/email sending,
  or double-booking prevention.

## Key files

| File | Purpose |
| --- | --- |
| `app/page.tsx` | The one page: header, hero, form |
| `components/booking-form.tsx` | Client form — ZIP gate, service cards, slot picker, confirmation |
| `app/actions.ts` | Server actions — server-side validation + Supabase inserts |
| `lib/booking.ts` | Service area ZIPs, services, slots, date logic (shared client/server) |
| `supabase/schema.sql` | Tables + insert-only RLS policies |
