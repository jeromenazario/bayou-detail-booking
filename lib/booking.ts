export const HOUSTON_TZ = "America/Chicago";

/** The only ZIP codes Bayou Detail Co. currently serves. */
export const SERVICE_AREA_ZIPS = new Set([
  "77005",
  "77006",
  "77007",
  "77008",
  "77019",
  "77024",
  "77025",
  "77027",
  "77030",
  "77056",
  "77098",
  "77339",
  "77401",
  "77450",
  "77494",
  "77546",
  "77573",
  "77584",
]);

export function isInServiceArea(zip: string): boolean {
  return SERVICE_AREA_ZIPS.has(zip.trim());
}

export const ZIP_PATTERN = /^\d{5}$/;

export type Service = {
  id: string;
  name: string;
  price: number;
  blurb: string;
  popular?: boolean;
};

export const SERVICES: Service[] = [
  {
    id: "wash-wax",
    name: "Wash & Wax",
    price: 129,
    blurb: "Hand wash, wheel clean, carnauba wax finish.",
  },
  {
    id: "interior-deep-clean",
    name: "Interior Deep Clean",
    price: 189,
    blurb: "Steam, shampoo, vents, glass and trim detail.",
  },
  {
    id: "full-detail",
    name: "Full Detail",
    price: 249,
    blurb: "Inside and out, bumper to bumper. Our best.",
    popular: true,
  },
  {
    id: "maintenance-visit",
    name: "Maintenance Plan Visit",
    price: 99,
    blurb: "Keep-it-fresh visit for returning customers.",
  },
];

export function getServiceById(id: string): Service | undefined {
  return SERVICES.find((s) => s.id === id);
}

export type TimeSlot = { value: string; label: string };

/** Hourly slots, 8:00 AM through 3:00 PM. */
export const TIME_SLOTS: TimeSlot[] = Array.from({ length: 8 }, (_, i) => {
  const hour = 8 + i;
  const meridiem = hour < 12 ? "AM" : "PM";
  const display = hour <= 12 ? hour : hour - 12;
  return {
    value: `${String(hour).padStart(2, "0")}:00`,
    label: `${display}:00 ${meridiem}`,
  };
});

export function isValidTimeSlot(value: string): boolean {
  return TIME_SLOTS.some((slot) => slot.value === value);
}

export type BookableDate = {
  value: string; // YYYY-MM-DD in Houston time
  weekday: string; // "Tue"
  month: string; // "Jul"
  day: string; // "22"
  label: string; // "Tue, Jul 22"
};

function houstonDateParts(date: Date): BookableDate {
  const value = date.toLocaleDateString("en-CA", { timeZone: HOUSTON_TZ });
  const weekday = date.toLocaleDateString("en-US", {
    timeZone: HOUSTON_TZ,
    weekday: "short",
  });
  const month = date.toLocaleDateString("en-US", {
    timeZone: HOUSTON_TZ,
    month: "short",
  });
  const day = date.toLocaleDateString("en-US", {
    timeZone: HOUSTON_TZ,
    day: "numeric",
  });
  return { value, weekday, month, day, label: `${weekday}, ${month} ${day}` };
}

const DAY_MS = 24 * 60 * 60 * 1000;

/** The next 7 bookable days, starting tomorrow (Houston time). */
export function getBookableDates(): BookableDate[] {
  const now = Date.now();
  return Array.from({ length: 7 }, (_, i) =>
    houstonDateParts(new Date(now + (i + 1) * DAY_MS))
  );
}

/**
 * Dates the server accepts on submit. Includes today as a grace window so a
 * form loaded just before midnight doesn't reject at 12:01 AM.
 */
export function getAcceptableDateValues(): Set<string> {
  const now = Date.now();
  return new Set(
    Array.from({ length: 8 }, (_, i) =>
      houstonDateParts(new Date(now + i * DAY_MS)).value
    )
  );
}

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
