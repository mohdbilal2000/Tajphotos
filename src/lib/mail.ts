import { Resend } from "resend";
import { site } from "@/config/site";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export interface EnquiryPayload {
  name: string;
  contactMethod: "whatsapp" | "email";
  contact: string; // phone or email, per contactMethod
  country?: string;
  destinations: string[];
  travelDates?: string;
  travellers?: string;
  budget?: string;
  hotelTier?: string;
  interests?: string;
  message?: string;
  page?: string; // which tour/page they enquired from
}

/**
 * Sends the enquiry to the team inbox via Resend, and an auto-reply to the traveller.
 * If RESEND_API_KEY is not configured (e.g. local dev), logs instead of throwing so the
 * form still "succeeds" — configure the env var before launch.
 */
export async function sendEnquiry(payload: EnquiryPayload) {
  const summary = [
    `Name: ${payload.name}`,
    `Contact (${payload.contactMethod}): ${payload.contact}`,
    payload.country && `Country: ${payload.country}`,
    payload.destinations.length && `Destinations: ${payload.destinations.join(", ")}`,
    payload.travelDates && `Dates: ${payload.travelDates}`,
    payload.travellers && `Travellers: ${payload.travellers}`,
    payload.budget && `Budget: ${payload.budget}`,
    payload.hotelTier && `Hotel tier: ${payload.hotelTier}`,
    payload.interests && `Interests: ${payload.interests}`,
    payload.page && `Enquired from: ${payload.page}`,
    payload.message && `Message: ${payload.message}`,
  ]
    .filter(Boolean)
    .join("\n");

  if (!resend) {
    console.warn("[mail] RESEND_API_KEY not set — enquiry not emailed. Payload:\n" + summary);
    return { ok: true, delivered: false };
  }

  const from = process.env.RESEND_FROM_EMAIL ?? `${site.name} <enquiries@${new URL(site.url).hostname}>`;
  await resend.emails.send({
    from,
    to: site.contact.email,
    replyTo: payload.contactMethod === "email" ? payload.contact : undefined,
    subject: `New trip enquiry — ${payload.name}${payload.destinations[0] ? ` (${payload.destinations[0]})` : ""}`,
    text: summary,
  });

  if (payload.contactMethod === "email") {
    await resend.emails.send({
      from,
      to: payload.contact,
      subject: `We received your trip enquiry — ${site.name}`,
      text: `Hi ${payload.name},\n\nThanks for reaching out to ${site.name}! We've received your enquiry and will reply within a few hours with a tailored itinerary and price (${site.contact.hoursNote}).\n\nIn the meantime, you can reach us on WhatsApp at ${site.contact.phoneDisplay} for a faster response.\n\n${site.legalName}\n${site.contact.email}`,
    });
  }

  return { ok: true, delivered: true };
}
