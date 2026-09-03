"use server";
import { z } from "zod";
import { sendEnquiry } from "@/lib/mail";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name"),
  contactMethod: z.enum(["whatsapp", "email"]),
  contact: z.string().trim().min(5, "Please enter a valid contact"),
  country: z.string().trim().optional(),
  destinations: z.array(z.string()).min(1, "Pick at least one destination"),
  travelDates: z.string().trim().optional(),
  travellers: z.string().trim().optional(),
  budget: z.string().trim().optional(),
  hotelTier: z.string().trim().optional(),
  interests: z.string().trim().optional(),
  message: z.string().trim().optional(),
  page: z.string().trim().optional(),
  // honeypot: real visitors never fill this hidden field
  company: z.string().max(0).optional(),
});

export interface EnquiryState {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Record<string, string[]>;
}

export async function submitEnquiry(_prev: EnquiryState, formData: FormData): Promise<EnquiryState> {
  const raw = {
    name: formData.get("name"),
    contactMethod: formData.get("contactMethod") ?? "whatsapp",
    contact: formData.get("contact"),
    country: formData.get("country") ?? undefined,
    destinations: formData.getAll("destinations"),
    travelDates: formData.get("travelDates") ?? undefined,
    travellers: formData.get("travellers") ?? undefined,
    budget: formData.get("budget") ?? undefined,
    hotelTier: formData.get("hotelTier") ?? undefined,
    interests: formData.get("interests") ?? undefined,
    message: formData.get("message") ?? undefined,
    page: formData.get("page") ?? undefined,
    company: formData.get("company") ?? "",
  };

  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    return { status: "error", message: "Please check the highlighted fields.", fieldErrors: parsed.error.flatten().fieldErrors };
  }
  if (parsed.data.company) {
    // Honeypot tripped — pretend success, do nothing.
    return { status: "success", message: "Thanks! We'll be in touch shortly." };
  }

  try {
    await sendEnquiry(parsed.data);
    return { status: "success", message: "Thanks! We usually reply within a few hours — check WhatsApp or your email." };
  } catch (err) {
    console.error("[plan-my-trip] failed to send enquiry", err);
    return { status: "error", message: "Something went wrong sending your enquiry. Please message us directly on WhatsApp instead." };
  }
}
