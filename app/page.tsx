import Image from "next/image";
import { BookingForm } from "@/components/booking-form";
import { Reveal } from "@/components/reveal";
import { SiteHeader } from "@/components/site-header";
import { ZipChecker } from "@/components/zip-checker";
import { SERVICES, getBookableDates } from "@/lib/booking";

// Dates roll forward daily — never freeze them into a static build.
export const dynamic = "force-dynamic";

const TRUST_POINTS = [
  "We come to your driveway — water & power included",
  "Every day of the week, 8:00 AM – 3:00 PM",
  "No payment today — we text to confirm your slot",
];

const NEIGHBORHOODS = [
  "West University",
  "Bellaire",
  "The Heights",
  "Montrose",
  "River Oaks",
  "Memorial",
  "Rice Village",
  "Med Center",
  "Katy",
  "Cinco Ranch",
  "Kingwood",
  "Pearland",
  "Friendswood",
  "League City",
];

const STEPS = [
  {
    n: "01",
    title: "Pick your package",
    copy: "Four flat prices, no upsells at the curb. Wash & Wax to Full Detail.",
  },
  {
    n: "02",
    title: "Drop your ZIP & slot",
    copy: "Hourly slots, 8 AM to 3 PM, any day this week. Takes about a minute.",
  },
  {
    n: "03",
    title: "We roll up — you relax",
    copy: "We bring water, power, and everything else. You just hand over the keys.",
  },
];

const SERVICE_AREA_LIST = [
  "77005", "77006", "77007", "77008", "77019", "77024", "77025", "77027", "77030",
  "77056", "77098", "77339", "77401", "77450", "77494", "77546", "77573", "77584",
];

function CheckDot() {
  return (
    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/10">
      <svg viewBox="0 0 20 20" fill="none" className="h-3.5 w-3.5" aria-hidden>
        <path
          d="M4.5 10.5l3.5 3.5 7.5-8"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
      <path
        d="M4 10h11m0 0l-4.5-4.5M15 10l-4.5 4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Clay-style pill badge with fading echo rings trailing off to the right. */
function EchoPill({
  children,
  tone,
}: {
  children: React.ReactNode;
  tone: "forest" | "rust" | "navy";
}) {
  const fill = {
    forest: "bg-forest text-cream",
    rust: "bg-rust text-cream",
    navy: "bg-navy text-cream",
  }[tone];
  const ring = {
    forest: "border-forest",
    rust: "border-rust",
    navy: "border-navy",
  }[tone];
  return (
    <span className="inline-flex items-center">
      <span
        className={`relative z-10 inline-block rounded-full px-4 py-2 text-[10px] font-bold uppercase tracking-[0.22em] ${fill}`}
      >
        {children}
      </span>
      <span
        className={`-ml-5 h-8 w-10 rounded-full border-2 opacity-40 ${ring}`}
        aria-hidden
      />
      <span
        className={`-ml-6 h-8 w-10 rounded-full border-2 opacity-15 ${ring}`}
        aria-hidden
      />
    </span>
  );
}

export default function Home() {
  const dates = getBookableDates();

  return (
    <main id="top" className="w-full flex-1 pb-20">
      {/* Nav — floating glass pills over an iOS-style top frost */}
      <SiteHeader />

      {/* Hero — the poster, with a glass booking bar floating over it */}
      <section className="mt-2 px-2 sm:px-3">
        <div className="grain relative overflow-hidden rounded-[2rem] bg-navy lg:h-[88vh] lg:max-h-[960px] lg:min-h-[680px]">
          <div className="relative aspect-[3/2] w-full lg:absolute lg:inset-0 lg:aspect-auto lg:h-full">
            <Image
              src="/hero-bayou.jpg"
              alt="A freshly detailed black sedan beside the Bayou Detail Co. van at the bayou, Houston skyline behind"
              fill
              priority
              sizes="100vw"
              className="hero-drift object-cover object-center"
            />
          </div>
          <div className="p-3 sm:p-5 lg:absolute lg:inset-x-0 lg:bottom-0">
            <div className="glass-panel rounded-[2rem] px-6 py-6 lg:grid lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-10 lg:px-9 lg:py-8">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-lime">
                  Mobile detailing · Houston, TX
                </p>
                <h1 className="mt-3 font-display text-3xl font-bold leading-[1.06] tracking-tight text-white [text-wrap:balance] sm:text-4xl lg:text-[2.9rem]">
                  Houston&apos;s mobile detailing — we come to&nbsp;you.
                </h1>
              </div>
              <div className="mt-5 lg:mt-0">
                <p className="max-w-md text-sm leading-relaxed text-white/75">
                  Your driveway, our crew. Pick a service, drop your ZIP, and
                  we&apos;ll handle the rest. From&nbsp;$99.
                </p>
                <div className="mt-5 flex flex-wrap items-center gap-3">
                <a
                  href="#services"
                  className="glass-chip rounded-full px-6 py-3.5 text-sm font-bold text-white transition-all duration-500 ease-premium hover:scale-[1.03] active:scale-[0.97]"
                >
                  See services
                </a>
                <a
                  href="#book"
                  className="group flex items-center gap-3 rounded-full bg-lime py-2 pl-6 pr-2 text-sm font-bold text-navy transition-all duration-500 ease-premium hover:bg-lime-deep active:scale-[0.97]"
                >
                  Book my detail
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-navy/10 transition-transform duration-500 ease-premium group-hover:translate-x-0.5">
                    <ArrowIcon className="h-4 w-4" />
                  </span>
                </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust band */}
        <div className="relative z-10 mx-auto -mt-10 w-[calc(100%-2rem)] max-w-3xl">
          <div className="rounded-[2rem] bg-white px-6 pb-6 pt-8 shadow-[0_24px_60px_-32px_rgba(10,27,51,0.45)] sm:px-10">
            <p className="mx-auto max-w-md text-center text-sm leading-relaxed text-navy sm:text-base">
              Trusted by Houston drivers from <strong>River Oaks</strong> to{" "}
              <strong>Katy</strong>. One crew, <strong>18 ZIP codes</strong>,
              spotless every time.
            </p>
            <div className="mt-6 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
              <div className="marquee flex w-max gap-2.5">
                {[...NEIGHBORHOODS, ...NEIGHBORHOODS].map((hood, i) => (
                  <span
                    key={`${hood}-${i}`}
                    className="whitespace-nowrap rounded-full bg-mist px-4 py-2 text-xs font-semibold text-navy/70"
                  >
                    {hood}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contained sections */}
      <div className="mx-auto w-full max-w-lg px-4 lg:max-w-6xl lg:px-8">
        {/* Services — Clay split widget: text left, visual right */}
        <Reveal className="mt-20 scroll-mt-28 lg:mt-28">
          <section id="services">
            <div className="grain relative overflow-hidden rounded-[2.25rem] bg-sage-tint p-6 ring-1 ring-forest/10 sm:p-10 lg:p-14">
              <div className="grid items-stretch gap-8 lg:grid-cols-[1fr_1.05fr] lg:gap-12">
                <div className="flex flex-col">
                  <div>
                    <EchoPill tone="forest">Services</EchoPill>
                  </div>
                  <h2 className="mt-6 font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-[2.75rem]">
                    Four packages,{" "}
                    <span className="text-forest">one spotless finish.</span>
                  </h2>
                  <p className="mt-4 max-w-md text-sm leading-relaxed text-navy/60 lg:text-base">
                    Flat prices, no surprises at the curb. Every package
                    includes our crew, water, and power — you provide the
                    driveway.
                  </p>
                  <div data-stagger className="mt-7 grid grid-cols-2 gap-2">
                    {SERVICES.map((service) => (
                      <div
                        key={service.id}
                        className="rounded-2xl bg-white px-4 py-3.5 ring-1 ring-forest/10"
                      >
                        <p className="font-display text-xl font-bold text-forest">
                          ${service.price}
                        </p>
                        <p className="mt-0.5 text-xs font-bold text-navy">
                          {service.name}
                        </p>
                      </div>
                    ))}
                  </div>
                  <p className="mt-6 text-sm leading-relaxed text-navy/70">
                    <strong>Full Detail</strong> is our best seller — bumper to
                    bumper, inside and out, in your driveway.
                  </p>
                  <div className="mt-7 flex flex-wrap items-center gap-3">
                    <a
                      href="#book"
                      className="group flex items-center gap-3 rounded-full bg-forest py-2 pl-6 pr-2 text-sm font-bold text-cream transition-all duration-500 ease-premium hover:-translate-y-px active:scale-[0.97]"
                    >
                      Book a service
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 transition-transform duration-500 ease-premium group-hover:translate-x-0.5">
                        <ArrowIcon className="h-4 w-4" />
                      </span>
                    </a>
                    <a
                      href="#coverage"
                      className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-navy transition-all duration-500 ease-premium hover:-translate-y-px active:scale-[0.97]"
                    >
                      Check coverage
                    </a>
                  </div>
                </div>
                <div className="grain relative min-h-[300px] overflow-hidden rounded-[1.6rem] ring-1 ring-forest/15 lg:min-h-[460px]">
                  <Image
                    src="/services-wash.jpg"
                    alt="A Bayou Detail Co. detailer hand-washing a black coupe at golden hour, branded bottles lined up beside the wheel"
                    fill
                    sizes="(min-width: 1024px) 560px, 100vw"
                    className="drift-view object-cover object-[45%_center]"
                  />
                </div>
              </div>
            </div>
          </section>
        </Reveal>

        {/* How it works — mirrored split */}
        <Reveal className="mt-20 scroll-mt-28 lg:mt-28">
          <section id="how">
            <div className="grain relative overflow-hidden rounded-[2.25rem] bg-peach-tint p-6 ring-1 ring-rust/10 sm:p-10 lg:p-14">
              <div className="grid items-stretch gap-8 lg:grid-cols-[1.05fr_1fr] lg:gap-12">
                <div className="grain relative order-last min-h-[300px] overflow-hidden rounded-[1.6rem] ring-1 ring-rust/15 lg:order-first lg:min-h-[460px]">
                  <Image
                    src="/hero-bayou.jpg"
                    alt="Bayou Detail Co. bucket, bottles, and microfiber towel beside a freshly washed car"
                    fill
                    sizes="(min-width: 1024px) 560px, 100vw"
                    className="scale-[2] object-cover object-[100%_100%] [transform-origin:100%_100%]"
                  />
                </div>
                <div className="flex flex-col">
                  <div>
                    <EchoPill tone="rust">How it works</EchoPill>
                  </div>
                  <h2 className="mt-6 font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-[2.75rem]">
                    Booked in a minute.{" "}
                    <span className="text-rust">Spotless by three.</span>
                  </h2>
                  <div data-stagger className="mt-7 space-y-3">
                    {STEPS.map((step) => (
                      <div
                        key={step.n}
                        className="flex gap-4 rounded-2xl bg-white p-5 ring-1 ring-rust/10"
                      >
                        <span className="font-display text-xs font-bold text-rust">
                          {step.n}
                        </span>
                        <div>
                          <p className="text-[15px] font-bold text-navy">
                            {step.title}
                          </p>
                          <p className="mt-1 text-xs leading-relaxed text-ink-faint">
                            {step.copy}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="mt-6 text-sm leading-relaxed text-navy/70">
                    <strong>No payment today</strong> — we text to confirm your
                    slot, and you pay when it shines.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </Reveal>

        {/* ZIP checker */}
        <Reveal className="mt-20 scroll-mt-28 lg:mt-28">
          <section id="coverage" className="text-center">
            <div className="flex justify-center">
              <EchoPill tone="navy">Coverage</EchoPill>
            </div>
            <h2 className="mx-auto mt-5 max-w-md font-display text-3xl font-bold leading-tight tracking-tight [text-wrap:balance] sm:text-4xl lg:max-w-xl lg:text-5xl">
              Are we in your neighborhood?
            </h2>
            <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-ink-faint lg:text-base">
              Drop your ZIP below — if we cover it, you can lock in a slot
              right away.
            </p>
            <div className="mt-8">
              <ZipChecker />
            </div>
          </section>
        </Reveal>

        {/* Booking */}
        <Reveal className="mt-20 scroll-mt-28 lg:mt-28">
          <section id="book">
            <div className="text-center">
              <div className="flex justify-center">
                <EchoPill tone="navy">Book now</EchoPill>
              </div>
              <h2 className="mx-auto mt-5 max-w-md font-display text-3xl font-bold leading-tight tracking-tight [text-wrap:balance] sm:text-4xl lg:text-5xl">
                Lock in your slot.
              </h2>
            </div>
            <div className="mt-10 lg:grid lg:grid-cols-[1.08fr_0.92fr] lg:items-start lg:gap-6 xl:gap-8">
              <div className="hidden lg:sticky lg:top-28 lg:block">
                <div className="rounded-[2.25rem] bg-navy/10 p-1.5 ring-1 ring-navy/10">
                  <div className="grain relative overflow-hidden rounded-[calc(2.25rem-0.375rem)] bg-navy px-12 py-20 text-cream shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)]">
                    <div
                      aria-hidden
                      className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full border border-white/10"
                    />
                    <div
                      aria-hidden
                      className="pointer-events-none absolute -bottom-10 -right-10 h-56 w-56 rounded-full border border-white/10"
                    />
                    <div
                      aria-hidden
                      className="pointer-events-none absolute bottom-4 right-4 h-24 w-24 rounded-full border border-white/10"
                    />
                    <p className="inline-block rounded-full border border-white/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-cream/70">
                      Mobile detailing
                    </p>
                    <h3 className="mt-7 font-display text-[2.6rem] font-bold leading-[1.08] tracking-tight [text-wrap:balance]">
                      Your driveway. Our crew. Zero hassle.
                    </h3>
                    <ul data-stagger className="mt-10 max-w-md space-y-4">
                      {TRUST_POINTS.map((point) => (
                        <li
                          key={point}
                          className="flex items-center gap-3.5 text-sm text-cream/80"
                        >
                          <CheckDot />
                          {point}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-10 flex items-center gap-3">
                      <span className="rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-cream">
                        18 ZIPs served
                      </span>
                      <span className="rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-cream">
                        7 days a week
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <BookingForm dates={dates} />
            </div>
          </section>
        </Reveal>

        {/* Footer */}
        <Reveal className="mt-20 lg:mt-28">
          <footer className="grain relative overflow-hidden rounded-[2.25rem] bg-navy px-6 py-12 text-cream sm:px-10 sm:py-16 lg:px-16">
            <Image
              src="/logo.png"
              alt="Bayou Detail Co. — mobile detailing"
              width={768}
              height={512}
              className="-mb-8 -ml-10 h-48 w-auto sm:h-56"
            />
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-cream/60">
              Houston&apos;s mobile detailing — we come to you. Serving 18 ZIP
              codes across greater Houston.
            </p>
            <div data-stagger className="mt-8 flex max-w-2xl flex-wrap gap-1.5">
              {SERVICE_AREA_LIST.map((z) => (
                <span
                  key={z}
                  className="rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-semibold text-cream/70"
                >
                  {z}
                </span>
              ))}
            </div>
            <div className="mt-10 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-cream/50 sm:flex-row sm:items-center sm:justify-between">
              <span>© 2026 Bayou Detail Co. · Houston, TX</span>
              <span>No account, no payment today — we text to confirm.</span>
            </div>
          </footer>
        </Reveal>
      </div>
    </main>
  );
}
