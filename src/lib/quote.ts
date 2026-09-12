import { brand } from "@/config/brand";

/**
 * One quote request, in the shape both the team email and the WhatsApp handoff render from.
 *
 * `answers` is deliberately an ordered list of resolved question/answer pairs rather than a
 * keyed object: the questions differ per brand (see `brand.quote.questions`), and a shared
 * formatter that had to look up each brand's schema to know what "occasion" meant would break
 * silently the first time a question was renamed. Resolving to labels at submit time means the
 * email always reads as the visitor saw it.
 */
export interface QuoteAnswer {
  question: string;
  answer: string;
}

export interface QuotePayload {
  name: string;
  contactMethod: "whatsapp" | "email";
  contact: string;
  country?: string;
  answers: QuoteAnswer[];
  notes?: string;
  /** Page the request came from, for attribution. */
  page?: string;
  marketingOptIn: boolean;
  /** Stamped server-side at the moment consent was given, never trusted from the client. */
  marketingOptInAt?: string;
}

/**
 * Human-readable summary, used verbatim for the team email body and the prefilled WhatsApp
 * message. Kept as one function so the two channels can never drift — a WhatsApp handoff that
 * omitted a field the email had would quietly lose information at the exact moment the lead is
 * hottest.
 */
export function formatQuote(payload: QuotePayload, opts: { includeHeading?: boolean } = {}): string {
  const lines: string[] = [];
  if (opts.includeHeading) lines.push(`Hi ${brand.name}! Here's my request:`, "");
  for (const a of payload.answers) {
    if (a.answer.trim()) lines.push(`${a.question}: ${a.answer}`);
  }
  if (payload.notes?.trim()) lines.push(`Notes: ${payload.notes.trim()}`);
  lines.push("", `Name: ${payload.name}`);
  if (payload.country?.trim()) lines.push(`Country: ${payload.country.trim()}`);
  lines.push(`Reply on ${payload.contactMethod === "whatsapp" ? "WhatsApp" : "email"}: ${payload.contact}`);
  return lines.join("\n");
}

/** The internal-only extras the team inbox wants but the traveller's WhatsApp message should not carry. */
export function formatQuoteForTeam(payload: QuotePayload): string {
  return [
    formatQuote(payload),
    "",
    "---",
    `Brand: ${brand.name} (${brand.domain})`,
    payload.page ? `Submitted from: ${payload.page}` : null,
    `Marketing opt-in: ${payload.marketingOptIn ? `yes (${payload.marketingOptInAt})` : "no"}`,
  ]
    .filter((l) => l !== null)
    .join("\n");
}
