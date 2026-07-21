"use server";

import {
  EMAIL_PATTERN,
  ZIP_PATTERN,
  getAcceptableDateValues,
  getServiceById,
  isInServiceArea,
  isValidTimeSlot,
} from "@/lib/booking";
import { getSupabase } from "@/lib/supabase";

export type BookingInput = {
  name: string;
  vehicle: string;
  zip: string;
  service: string;
  slotDate: string;
  slotTime: string;
};

export type BookingResult =
  | { ok: true }
  | { ok: false; code: "out_of_area" | "invalid" | "server"; error: string };

export async function createBooking(input: BookingInput): Promise<BookingResult> {
  const name = input.name?.trim() ?? "";
  const vehicle = input.vehicle?.trim() ?? "";
  const zip = input.zip?.trim() ?? "";
  const service = getServiceById(input.service);

  if (name.length < 2 || name.length > 120) {
    return { ok: false, code: "invalid", error: "Please tell us your name." };
  }
  if (vehicle.length < 2 || vehicle.length > 120) {
    return { ok: false, code: "invalid", error: "Please tell us what you drive." };
  }
  if (!ZIP_PATTERN.test(zip)) {
    return { ok: false, code: "invalid", error: "Please enter a valid 5-digit ZIP." };
  }
  // The real enforcement — never trust the client's service-area check.
  if (!isInServiceArea(zip)) {
    return {
      ok: false,
      code: "out_of_area",
      error: "We're not in your area yet.",
    };
  }
  if (!service) {
    return { ok: false, code: "invalid", error: "Please pick a service." };
  }
  if (!getAcceptableDateValues().has(input.slotDate)) {
    return {
      ok: false,
      code: "invalid",
      error: "That date is no longer available — please pick another.",
    };
  }
  if (!isValidTimeSlot(input.slotTime)) {
    return { ok: false, code: "invalid", error: "Please pick a time slot." };
  }

  try {
    const { error } = await getSupabase().from("bookings").insert({
      name,
      vehicle,
      zip,
      service: service.name,
      slot_date: input.slotDate,
      slot_time: input.slotTime,
    });
    if (error) throw new Error(error.message);
    return { ok: true };
  } catch (err) {
    console.error("createBooking failed:", err);
    return {
      ok: false,
      code: "server",
      error: "Something went wrong on our end — please try again.",
    };
  }
}

export type WaitlistResult =
  | { ok: true }
  | { ok: false; error: string };

export async function joinWaitlist(
  email: string,
  zip: string
): Promise<WaitlistResult> {
  const cleanEmail = email?.trim().toLowerCase() ?? "";
  const cleanZip = zip?.trim() ?? "";

  if (!EMAIL_PATTERN.test(cleanEmail) || cleanEmail.length > 254) {
    return { ok: false, error: "Please enter a valid email address." };
  }
  if (!ZIP_PATTERN.test(cleanZip)) {
    return { ok: false, error: "Please enter a valid 5-digit ZIP." };
  }

  try {
    const { error } = await getSupabase()
      .from("waitlist_emails")
      .insert({ email: cleanEmail, zip: cleanZip });
    if (error) throw new Error(error.message);
    return { ok: true };
  } catch (err) {
    console.error("joinWaitlist failed:", err);
    return {
      ok: false,
      error: "Something went wrong on our end — please try again.",
    };
  }
}
