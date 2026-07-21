"use client";

import { useState } from "react";
import { joinWaitlist } from "@/app/actions";
import { EMAIL_PATTERN, ZIP_PATTERN, isInServiceArea } from "@/lib/booking";

const SAMPLE_ZIPS = [
  { zip: "77005", area: "West U" },
  { zip: "77008", area: "The Heights" },
  { zip: "77401", area: "Bellaire" },
  { zip: "77494", area: "Katy" },
];

const EASE = "transition-all duration-500 ease-premium";

type Status = "idle" | "malformed" | "in" | "out";

export function ZipChecker() {
  const [zip, setZip] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [email, setEmail] = useState("");
  const [waitlistState, setWaitlistState] = useState<
    "idle" | "submitting" | "done" | "error"
  >("idle");
  const [waitlistError, setWaitlistError] = useState<string | null>(null);

  function check(value: string) {
    const clean = value.trim();
    if (!ZIP_PATTERN.test(clean)) return setStatus("malformed");
    setStatus(isInServiceArea(clean) ? "in" : "out");
    setWaitlistState("idle");
    setWaitlistError(null);
  }

  function goBook() {
    window.dispatchEvent(new CustomEvent("bayou:zip", { detail: zip.trim() }));
    document
      .getElementById("book")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  async function handleWaitlist() {
    const clean = email.trim();
    if (!EMAIL_PATTERN.test(clean)) {
      setWaitlistState("error");
      setWaitlistError("Please enter a valid email address.");
      return;
    }
    setWaitlistState("submitting");
    setWaitlistError(null);
    const result = await joinWaitlist(clean, zip.trim());
    if (result.ok) {
      setWaitlistState("done");
    } else {
      setWaitlistState("error");
      setWaitlistError(result.error);
    }
  }

  return (
    <div className="mx-auto max-w-xl">
      <div className="rounded-[2rem] bg-navy/5 p-1.5 ring-1 ring-navy/10">
        <div className="rounded-[calc(2rem-0.375rem)] bg-white p-5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)] sm:p-6">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              check(zip);
            }}
            className="flex items-center gap-3"
          >
            <label htmlFor="zip-check" className="sr-only">
              Enter your ZIP code
            </label>
            <input
              id="zip-check"
              inputMode="numeric"
              maxLength={5}
              placeholder="Enter your ZIP — e.g. 77005"
              value={zip}
              onChange={(e) => {
                setZip(e.target.value.replace(/\D/g, ""));
                setStatus("idle");
              }}
              className="w-full bg-transparent py-3 pl-2 text-lg font-medium text-navy placeholder:text-ink-faint/50 outline-none"
            />
            <button
              type="submit"
              aria-label="Check ZIP"
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-navy text-cream ${EASE} hover:-translate-y-px hover:scale-105 active:scale-95`}
            >
              <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5" aria-hidden>
                <path
                  d="M4 10h11m0 0l-4.5-4.5M15 10l-4.5 4.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </form>

          {status === "malformed" && (
            <p className="pop mt-3 border-t border-navy/10 pt-3 text-sm text-clay-amber">
              That doesn&apos;t look like a 5-digit ZIP — mind checking it?
            </p>
          )}

          {status === "in" && (
            <div className="pop mt-3 flex flex-col gap-3 border-t border-navy/10 pt-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="flex items-center gap-2 text-sm font-semibold text-moss">
                <svg viewBox="0 0 20 20" fill="none" className="h-4.5 w-4.5" aria-hidden>
                  <path
                    d="M4.5 10.5l3.5 3.5 7.5-8"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {zip} is in our service area
              </p>
              <button
                type="button"
                onClick={goBook}
                className={`rounded-full bg-lime px-5 py-2.5 text-sm font-bold text-navy ${EASE} hover:bg-lime-deep active:scale-[0.97]`}
              >
                Book your slot ↓
              </button>
            </div>
          )}

          {status === "out" && (
            <div className="pop mt-3 space-y-3 border-t border-navy/10 pt-4">
              {waitlistState === "done" ? (
                <p className="text-sm font-semibold text-moss">
                  You&apos;re on the list — we&apos;ll email you when we reach {zip}.
                </p>
              ) : (
                <>
                  <p className="text-sm leading-relaxed text-clay-amber">
                    <span className="font-bold">We&apos;re not in your area yet</span>{" "}
                    — leave your email and we&apos;ll let you know when we are.
                  </p>
                  <div className="flex flex-col gap-2 sm:flex-row">
                    <label htmlFor="zip-check-email" className="sr-only">
                      Email address
                    </label>
                    <input
                      id="zip-check-email"
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      placeholder="you@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-full bg-mist px-5 py-3 text-base text-navy placeholder:text-ink-faint/50 outline-none focus:ring-2 focus:ring-navy transition-shadow duration-300"
                    />
                    <button
                      type="button"
                      onClick={handleWaitlist}
                      disabled={waitlistState === "submitting"}
                      className={`shrink-0 rounded-full bg-navy px-5 py-3 text-sm font-semibold text-cream ${EASE} active:scale-[0.97] disabled:opacity-60`}
                    >
                      {waitlistState === "submitting" ? "Saving…" : "Keep me posted"}
                    </button>
                  </div>
                  {waitlistState === "error" && waitlistError && (
                    <p className="text-sm text-red-700">{waitlistError}</p>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
        {SAMPLE_ZIPS.map((s) => (
          <button
            key={s.zip}
            type="button"
            onClick={() => {
              setZip(s.zip);
              check(s.zip);
            }}
            className={`rounded-full bg-white px-4 py-2 text-xs font-semibold text-navy ring-1 ring-navy/10 ${EASE} hover:ring-navy/30 active:scale-[0.97]`}
          >
            {s.zip} · {s.area}
          </button>
        ))}
      </div>
    </div>
  );
}
