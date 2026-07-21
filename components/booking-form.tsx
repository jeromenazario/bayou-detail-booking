"use client";

import { useEffect, useMemo, useState } from "react";
import { createBooking, joinWaitlist } from "@/app/actions";
import {
  EMAIL_PATTERN,
  SERVICES,
  TIME_SLOTS,
  ZIP_PATTERN,
  isInServiceArea,
  type BookableDate,
} from "@/lib/booking";

type ZipStatus = "idle" | "malformed" | "in" | "out";

type Confirmed = {
  serviceName: string;
  price: number;
  dateLabel: string;
  timeLabel: string;
};

const EASE = "transition-all duration-500 ease-premium";

function SectionLabel({ step, children }: { step: string; children: React.ReactNode }) {
  return (
    <div className="flex items-baseline gap-2.5">
      <span className="font-display text-xs font-bold text-navy/30">{step}</span>
      <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-faint">
        {children}
      </h2>
    </div>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
      <path
        d="M4.5 10.5l3.5 3.5 7.5-8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Spinner() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5 animate-spin" aria-hidden>
      <circle cx="10" cy="10" r="8" stroke="currentColor" strokeOpacity="0.25" strokeWidth="2" />
      <path d="M18 10a8 8 0 00-8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

const inputClass =
  "w-full rounded-2xl bg-mist px-4 py-3.5 text-base text-navy placeholder:text-ink-faint/50 outline-none ring-navy/0 focus:ring-2 focus:ring-navy transition-shadow duration-300";

export function BookingForm({ dates }: { dates: BookableDate[] }) {
  const [name, setName] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [zip, setZip] = useState("");
  const [zipStatus, setZipStatus] = useState<ZipStatus>("idle");
  const [serviceId, setServiceId] = useState<string | null>(null);
  const [dateValue, setDateValue] = useState(dates[0]?.value ?? "");
  const [timeValue, setTimeValue] = useState<string | null>(null);

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState<Confirmed | null>(null);

  const [waitlistEmail, setWaitlistEmail] = useState("");
  const [waitlistState, setWaitlistState] = useState<
    "idle" | "submitting" | "done" | "error"
  >("idle");
  const [waitlistError, setWaitlistError] = useState<string | null>(null);

  const selectedService = useMemo(
    () => SERVICES.find((s) => s.id === serviceId) ?? null,
    [serviceId]
  );

  function validateZip(value: string) {
    const clean = value.trim();
    if (clean === "") return setZipStatus("idle");
    if (!ZIP_PATTERN.test(clean)) return setZipStatus("malformed");
    setZipStatus(isInServiceArea(clean) ? "in" : "out");
  }

  // The ZIP checker higher on the page hands its ZIP down via this event.
  useEffect(() => {
    function onZip(e: Event) {
      const value = (e as CustomEvent<string>).detail;
      if (typeof value !== "string") return;
      setZip(value);
      validateZip(value);
    }
    window.addEventListener("bayou:zip", onZip);
    return () => window.removeEventListener("bayou:zip", onZip);
  }, []);

  const outOfArea = zipStatus === "out";
  const canSubmit =
    !submitting &&
    name.trim().length >= 2 &&
    vehicle.trim().length >= 2 &&
    zipStatus === "in" &&
    !!selectedService &&
    !!dateValue &&
    !!timeValue;

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!canSubmit || !selectedService || !timeValue) return;
    setSubmitting(true);
    setSubmitError(null);
    const result = await createBooking({
      name,
      vehicle,
      zip: zip.trim(),
      service: selectedService.id,
      slotDate: dateValue,
      slotTime: timeValue,
    });
    setSubmitting(false);
    if (result.ok) {
      setConfirmed({
        serviceName: selectedService.name,
        price: selectedService.price,
        dateLabel: dates.find((d) => d.value === dateValue)?.label ?? dateValue,
        timeLabel: TIME_SLOTS.find((t) => t.value === timeValue)?.label ?? timeValue,
      });
    } else if (result.code === "out_of_area") {
      setZipStatus("out");
    } else {
      setSubmitError(result.error);
    }
  }

  async function handleWaitlist() {
    const email = waitlistEmail.trim();
    if (!EMAIL_PATTERN.test(email)) {
      setWaitlistState("error");
      setWaitlistError("Please enter a valid email address.");
      return;
    }
    setWaitlistState("submitting");
    setWaitlistError(null);
    const result = await joinWaitlist(email, zip.trim());
    if (result.ok) {
      setWaitlistState("done");
    } else {
      setWaitlistState("error");
      setWaitlistError(result.error);
    }
  }

  function reset() {
    setName("");
    setVehicle("");
    setZip("");
    setZipStatus("idle");
    setServiceId(null);
    setDateValue(dates[0]?.value ?? "");
    setTimeValue(null);
    setSubmitError(null);
    setConfirmed(null);
    setWaitlistEmail("");
    setWaitlistState("idle");
    setWaitlistError(null);
  }

  if (confirmed) {
    return (
      <div className="pop rounded-[2rem] bg-navy/5 p-1.5 ring-1 ring-navy/10">
        <div className="rounded-[calc(2rem-0.375rem)] bg-navy px-6 py-14 text-center text-cream shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)]">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-moss text-white">
            <CheckIcon className="h-8 w-8" />
          </span>
          <h2 className="mt-7 font-display text-4xl font-bold tracking-tight">
            You&apos;re booked.
          </h2>
          <p className="mx-auto mt-4 max-w-xs text-sm leading-relaxed text-cream/70">
            We&apos;ll text you to confirm your slot.
          </p>

          <dl className="mx-auto mt-9 max-w-xs space-y-3 rounded-3xl bg-white/5 p-5 text-left ring-1 ring-white/10">
            <div className="flex items-baseline justify-between gap-4">
              <dt className="text-xs text-cream/50">Service</dt>
              <dd className="text-sm font-semibold">
                {confirmed.serviceName} · ${confirmed.price}
              </dd>
            </div>
            <div className="flex items-baseline justify-between gap-4">
              <dt className="text-xs text-cream/50">When</dt>
              <dd className="text-sm font-semibold">
                {confirmed.dateLabel} · {confirmed.timeLabel}
              </dd>
            </div>
          </dl>

          <button
            type="button"
            onClick={reset}
            className={`mt-9 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-cream ${EASE} active:scale-[0.98]`}
          >
            Book another detail
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-[2rem] bg-navy/5 p-1.5 ring-1 ring-navy/10"
    >
      <div className="space-y-9 rounded-[calc(2rem-0.375rem)] bg-white px-5 py-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)] sm:px-8 sm:py-10">
        {/* 01 — About you */}
        <fieldset className="min-w-0 space-y-4">
          <SectionLabel step="01">About you</SectionLabel>
          <div>
            <label htmlFor="name" className="sr-only">
              Your name
            </label>
            <input
              id="name"
              name="name"
              autoComplete="name"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="vehicle" className="sr-only">
              Your vehicle
            </label>
            <input
              id="vehicle"
              name="vehicle"
              placeholder="Vehicle — e.g. 2021 Honda Civic"
              value={vehicle}
              onChange={(e) => setVehicle(e.target.value)}
              className={inputClass}
            />
          </div>
        </fieldset>

        {/* 02 — Where */}
        <fieldset className="min-w-0 space-y-4">
          <SectionLabel step="02">Where we&apos;re headed</SectionLabel>
          <div>
            <label htmlFor="zip" className="sr-only">
              ZIP code
            </label>
            <input
              id="zip"
              name="zip"
              inputMode="numeric"
              autoComplete="postal-code"
              maxLength={5}
              placeholder="ZIP code"
              value={zip}
              onChange={(e) => {
                setZip(e.target.value.replace(/\D/g, ""));
                setZipStatus("idle");
              }}
              onBlur={(e) => validateZip(e.target.value)}
              className={inputClass}
            />
          </div>

          {zipStatus === "malformed" && (
            <p className="pop text-sm text-clay-amber">
              That doesn&apos;t look like a 5-digit ZIP — mind checking it?
            </p>
          )}

          {zipStatus === "in" && (
            <div className="pop flex items-center gap-2.5 rounded-2xl bg-moss-tint px-4 py-3.5 text-sm font-semibold text-moss">
              <CheckIcon className="h-4.5 w-4.5 shrink-0" />
              You&apos;re in our service area
            </div>
          )}

          {outOfArea && (
            <div className="pop space-y-4 rounded-2xl bg-clay-amber-tint p-5">
              {waitlistState === "done" ? (
                <div className="flex items-center gap-2.5 text-sm font-semibold text-moss">
                  <CheckIcon className="h-4.5 w-4.5 shrink-0" />
                  You&apos;re on the list — we&apos;ll email you when we reach{" "}
                  {zip}.
                </div>
              ) : (
                <>
                  <p className="text-sm leading-relaxed text-clay-amber">
                    <span className="font-bold">
                      We&apos;re not in your area yet
                    </span>{" "}
                    — leave your email and we&apos;ll let you know when we are.
                  </p>
                  <div>
                    <label htmlFor="waitlist-email" className="sr-only">
                      Email address
                    </label>
                    <input
                      id="waitlist-email"
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      placeholder="you@email.com"
                      value={waitlistEmail}
                      onChange={(e) => setWaitlistEmail(e.target.value)}
                      className="w-full rounded-2xl bg-white px-4 py-3.5 text-base text-navy placeholder:text-ink-faint/50 outline-none focus:ring-2 focus:ring-navy transition-shadow duration-300"
                    />
                  </div>
                  {waitlistState === "error" && waitlistError && (
                    <p className="text-sm text-red-700">{waitlistError}</p>
                  )}
                  <button
                    type="button"
                    onClick={handleWaitlist}
                    disabled={waitlistState === "submitting"}
                    className={`flex w-full items-center justify-center gap-2 rounded-full bg-navy py-3.5 text-sm font-semibold text-cream ${EASE} active:scale-[0.98] disabled:opacity-60`}
                  >
                    {waitlistState === "submitting" ? <Spinner /> : "Keep me posted"}
                  </button>
                </>
              )}
            </div>
          )}
        </fieldset>

        {/* 03 — Service */}
        <fieldset className="min-w-0 space-y-4">
          <SectionLabel step="03">Pick your service</SectionLabel>
          <div
            role="radiogroup"
            aria-label="Service"
            className="space-y-2.5"
          >
            {SERVICES.map((service) => {
              const selected = serviceId === service.id;
              return (
                <button
                  key={service.id}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => setServiceId(service.id)}
                  className={`group relative w-full rounded-2xl p-4 text-left ring-1 ${EASE} active:scale-[0.99] ${
                    selected
                      ? "bg-navy text-cream ring-navy"
                      : "bg-white text-navy ring-navy/10 hover:ring-navy/30"
                  }`}
                >
                  {service.popular && (
                    <span
                      className={`absolute -top-2.5 right-4 rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.14em] ${
                        selected
                          ? "bg-cream text-navy"
                          : "bg-navy text-cream"
                      } ${EASE}`}
                    >
                      Most popular
                    </span>
                  )}
                  <span className="flex items-center justify-between gap-3">
                    <span>
                      <span className="block text-[15px] font-bold">
                        {service.name}
                      </span>
                      <span
                        className={`mt-1 block text-xs leading-relaxed ${
                          selected ? "text-cream/60" : "text-ink-faint"
                        }`}
                      >
                        {service.blurb}
                      </span>
                    </span>
                    <span className="flex shrink-0 items-center gap-3">
                      <span className="font-display text-xl font-bold">
                        ${service.price}
                      </span>
                      <span
                        className={`flex h-6 w-6 items-center justify-center rounded-full ring-1 ${EASE} ${
                          selected
                            ? "bg-moss text-white ring-moss"
                            : "bg-transparent text-transparent ring-navy/20"
                        }`}
                      >
                        <CheckIcon className="h-3.5 w-3.5" />
                      </span>
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </fieldset>

        {/* 04 — When */}
        <fieldset className="min-w-0 space-y-5">
          <SectionLabel step="04">Pick a day &amp; time</SectionLabel>

          <div
            role="radiogroup"
            aria-label="Day"
            className="no-scrollbar -mx-5 flex snap-x gap-2 overflow-x-auto px-5 sm:-mx-8 sm:px-8"
          >
            {dates.map((date) => {
              const selected = dateValue === date.value;
              return (
                <button
                  key={date.value}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => setDateValue(date.value)}
                  className={`flex w-[4.25rem] shrink-0 snap-start flex-col items-center gap-0.5 rounded-2xl py-3.5 ring-1 ${EASE} active:scale-[0.97] ${
                    selected
                      ? "bg-navy text-cream ring-navy"
                      : "bg-white text-navy ring-navy/10 hover:ring-navy/30"
                  }`}
                >
                  <span
                    className={`text-[10px] font-semibold uppercase tracking-[0.14em] ${
                      selected ? "text-cream/60" : "text-ink-faint"
                    }`}
                  >
                    {date.weekday}
                  </span>
                  <span className="font-display text-xl font-bold">
                    {date.day}
                  </span>
                  <span
                    className={`text-[10px] ${
                      selected ? "text-cream/60" : "text-ink-faint"
                    }`}
                  >
                    {date.month}
                  </span>
                </button>
              );
            })}
          </div>

          <div role="radiogroup" aria-label="Time slot" className="grid grid-cols-4 gap-2">
            {TIME_SLOTS.map((slot) => {
              const selected = timeValue === slot.value;
              return (
                <button
                  key={slot.value}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => setTimeValue(slot.value)}
                  className={`rounded-full py-2.5 text-[11px] font-semibold ring-1 ${EASE} active:scale-[0.97] ${
                    selected
                      ? "bg-navy text-cream ring-navy"
                      : "bg-white text-navy ring-navy/10 hover:ring-navy/30"
                  }`}
                >
                  {slot.label}
                </button>
              );
            })}
          </div>
        </fieldset>

        {/* Submit */}
        <div className="space-y-4">
          {submitError && (
            <p className="pop rounded-2xl bg-red-50 px-4 py-3.5 text-sm font-medium text-red-700">
              {submitError}
            </p>
          )}

          <button
            type="submit"
            disabled={!canSubmit}
            className={`group flex w-full items-center justify-between rounded-full bg-navy py-2.5 pl-7 pr-2.5 text-cream ${EASE} active:scale-[0.98] disabled:opacity-35`}
          >
            <span className="text-[15px] font-semibold">
              {submitting
                ? "Booking your slot…"
                : selectedService
                  ? `Book my detail — $${selectedService.price}`
                  : "Book my detail"}
            </span>
            <span
              className={`flex h-11 w-11 items-center justify-center rounded-full bg-white/10 ${EASE} group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-105`}
            >
              {submitting ? (
                <Spinner />
              ) : (
                <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5" aria-hidden>
                  <path
                    d="M4 10h11m0 0l-4.5-4.5M15 10l-4.5 4.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </span>
          </button>

          {outOfArea && (
            <p className="text-center text-xs text-ink-faint">
              Booking is paused for ZIPs outside our service area.
            </p>
          )}
        </div>
      </div>
    </form>
  );
}
