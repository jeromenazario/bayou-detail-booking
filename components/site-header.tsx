"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const NAV = [
  {
    href: "#services",
    id: "services",
    label: "Services",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" aria-hidden>
        <path
          d="M10 2.5l1.7 4.3 4.6.4-3.5 3 1.1 4.5L10 12.3l-3.9 2.4 1.1-4.5-3.5-3 4.6-.4L10 2.5z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    href: "#how",
    id: "how",
    label: "How it works",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" aria-hidden>
        <circle cx="10" cy="10" r="7.25" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M8.5 7.5l4 2.5-4 2.5v-5z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    href: "#coverage",
    id: "coverage",
    label: "Coverage",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" aria-hidden>
        <path
          d="M10 17.5s5.5-4.4 5.5-8.75a5.5 5.5 0 10-11 0C4.5 13.1 10 17.5 10 17.5z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <circle cx="10" cy="8.75" r="1.75" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
      // Back near the top nothing is "current" — let all pills frost out.
      if (window.scrollY < 300) setActive(null);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const els = NAV.map((n) => document.getElementById(n.id)).filter(
      (el): el is HTMLElement => el !== null
    );
    if (!els.length || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      // Only the band around the viewport's middle counts as "reading it".
      { rootMargin: "-35% 0px -55% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <div aria-hidden className={`top-frost ${scrolled ? "is-on" : ""}`}>
        <i />
        <i />
        <i />
        <i />
      </div>

      <header className="sticky top-0 z-40 px-3 pb-1 pt-3 sm:px-4">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2">
          <a
            href="#top"
            aria-label="Bayou Detail Co. — back to top"
            className="glass-pill-dark flex items-center rounded-full px-4 py-1.5 transition-transform duration-500 ease-premium hover:scale-[1.03] active:scale-[0.97]"
          >
            <Image
              src="/logo-mark.png"
              alt="Bayou Detail Co. — mobile detailing"
              width={1097}
              height={552}
              priority
              className="h-9 w-auto lg:h-10"
            />
          </a>

          <div className="flex items-center gap-2 md:order-3">
            <span className="glass-pill hidden rounded-full px-4 py-3 text-xs font-semibold text-navy/80 lg:inline-block">
              Houston, TX
            </span>
            <a
              href="#book"
              className="rounded-full bg-lime px-5 py-3 text-sm font-bold text-navy shadow-[0_12px_32px_-18px_rgba(10,27,51,0.55)] transition-all duration-500 ease-premium hover:scale-[1.03] hover:bg-lime-deep active:scale-[0.97]"
            >
              Book now
            </a>
          </div>

          <nav
            aria-label="Sections"
            className="no-scrollbar -mx-3 flex w-[calc(100%+1.5rem)] items-center gap-2 overflow-x-auto px-3 pb-1 pt-0.5 md:order-2 md:m-0 md:w-auto md:overflow-visible md:p-0"
          >
            {NAV.map((item) => {
              const isActive = active === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-all duration-500 ease-premium hover:scale-[1.03] active:scale-[0.97] ${
                    isActive
                      ? "glass-pill-dark text-cream"
                      : "glass-pill text-navy/80 hover:text-navy"
                  }`}
                >
                  {item.icon}
                  {item.label}
                </a>
              );
            })}
          </nav>
        </div>
      </header>
    </>
  );
}
