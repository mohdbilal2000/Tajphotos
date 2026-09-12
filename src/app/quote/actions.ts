"use server";
import { z } from "zod";
import { brand } from "@/config/brand";
import { sendQuote } from "@/lib/mail";
import type { QuoteAnswer, QuotePayload } from "@/lib/quote";

/**
 * Validation is built from the active brand's own question list rather than hard-coded, so a
 * brand can change its quote flow in `src/config/brands/` alone and the server stays in step.
 * Required questions are enforced here as well as in the browser — the client form is a
 * convenience, not a control.
 */
const baseSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name"),
  contactMethod: z.enum(["whatsapp", "email"]),
  contact: z.string().trim().min(5, "Please enter a way to reach you"),
  country: z.string().trim().max(80).optional(),
  notes: z.string().trim().max(4000).optional(),
  page: z.string().trim().max(200).optional(),
  marketingOptIn: z.literal("on").optional().transform((v) => v === "on"),
  // Honeypot: real visitors never fill this hidden field.
  company: z.string().max(0).optional(),
});

export interface QuoteState {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Record<string, string[]>;
  /**
   * The formatted summary, returned on success so the confirmation screen can offer a one-tap
   * WhatsApp handoff carrying everything the visitor just typed.
   */
  summary?: string;
}

export async function submitQuote(_prev: QuoteState, formData: FormData): Promise<QuoteState> {
  const parsed = baseSchema.safeParse({
    name: formData.get("name"),
    contactMethod: formData.get("contactMethod") ?? "whatsapp",
    contact: formData.get("contact"),
    country: formData.get("country") ?? undefined,
    notes: formData.get("notes") ?? undefined,
    page: formData.get("page") ?? undefined,
    marketingOptIn: formData.get("marketingOptIn") ?? undefined,
    company: formData.get("company") ?? "",
  });

  const fieldErrors: Record<string, string[]> = parsed.success
    ? {}
    : (parsed.error.flatten().fieldErrors as Record<string, string[]>);

  // Brand questions carry their own requiredness. Answers and errors are collected in one pass
  // so the visitor sees every problem at once rather than one more on each submit.
  const answers: QuoteAnswer[] = [];
  for (const q of brand.quote.questions) {
    const values = formData.getAll(q.id).map(String).map((v) => v.trim()).filter(Boolean);
    if (q.required && values.length === 0) {
      fieldErrors[q.id] = ["Please answer this so we can quote accurately"];
      continue;
    }
    if (values.length) answers.push({ question: q.question, answer: values.join(", ") });
  }

  if (!parsed.success || Object.keys(fieldErrors).length > 0) {
    return { status: "error", message: "Please check the highlighted questions.", fieldErrors };
  }

  if (parsed.data.company) {
    // Honeypot tripped — report success and do nothing, so a bot learns nothing from the response.
    return { status: "success", message: "Thanks! We'll be in touch shortly." };
  }

  const payload: QuotePayload = {
    name: parsed.data.name,
    contactMethod: parsed.data.contactMethod,
    contact: parsed.data.contact,
    country: parsed.data.country,
    answers,
    notes: parsed.data.notes,
    page: parsed.data.page,
    marketingOptIn: parsed.data.marketingOptIn,
    marketingOptInAt: parsed.data.marketingOptIn ? new Date().toISOString() : undefined,
  };

  try {
    const { summary } = await sendQuote(payload);
    return {
      status: "success",
      message: "Got it. A real person is writing your quote now — usually back within a few hours.",
      summary,
    };
  } catch (err) {
    console.error("[quote] failed to send", err);
    return {
      status: "error",
      message: "Something went wrong sending that. Please message us on WhatsApp instead — it reaches us directly.",
    };
  }
}
