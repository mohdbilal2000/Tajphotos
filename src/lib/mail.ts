import { Resend } from "resend";
import { site } from "@/config/site";
import { formatQuote, formatQuoteForTeam, type QuotePayload } from "@/lib/quote";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

/* --------------------------------- Quote requests -------------------------------- */

/**
 * Delivers a quote request to the team and returns the formatted summary so the confirmation
 * screen can offer a one-tap WhatsApp handoff carrying the same content.
 *
 * Recipients are the brand inbox plus anything in `QUOTE_NOTIFY_EMAILS` (comma-separated), so a
 * shared inbox, an owner's personal address and a CRM drop-box can be added per deployment
 * without a code change.
 */
export async function sendQuote(payload: QuotePayload): Promise<{ ok: true; delivered: boolean; summary: string }> {
  const summary = formatQuote(payload, { includeHeading: true });
  const teamBody = formatQuoteForTeam(payload);

  const recipients = [
    site.contact.email,
    ...(process.env.QUOTE_NOTIFY_EMAILS ?? "").split(",").map((e) => e.trim()).filter(Boolean),
  ].filter((e, i, all) => e && all.indexOf(e) === i);

  if (!resend) {
    // In development an unconfigured mailer should not block testing the form. In production it
    // means a real lead would vanish silently, so throw instead: the caller's error path tells
    // the visitor to use WhatsApp, which actually reaches someone.
    if (process.env.NODE_ENV === "production") {
      throw new Error("RESEND_API_KEY is not configured — refusing to silently drop a quote request.");
    }
    console.warn("[mail] RESEND_API_KEY not set — quote not emailed. Payload:\n" + teamBody);
    return { ok: true, delivered: false, summary };
  }

  const from = process.env.RESEND_FROM_EMAIL ?? `${site.name} <quotes@${new URL(site.url).hostname}>`;
  const firstAnswer = payload.answers[0]?.answer;

  await resend.emails.send({
    from,
    to: recipients,
    replyTo: payload.contactMethod === "email" ? payload.contact : undefined,
    subject: `Quote request — ${payload.name}${firstAnswer ? ` (${firstAnswer})` : ""} · ${site.name}`,
    text: teamBody,
  });

  // The visitor-facing acknowledgement is a courtesy on top of an already-captured lead, so a
  // failure here (bad address, transient Resend error) must not tell someone whose request WAS
  // received that it wasn't — that only prompts a confused duplicate submission.
  if (payload.contactMethod === "email") {
    try {
      await resend.emails.send({
        from,
        to: payload.contact,
        subject: `We've got your request — ${site.name}`,
        text:
          `Hi ${payload.name},\n\nThanks for getting in touch with ${site.name}. A real person is putting your quote together now and will reply within a few hours (${site.contact.hoursNote}).\n\n` +
          `Here's what you sent us, so you have a copy:\n\n${formatQuote(payload)}\n\n` +
          `${site.legalName}\n${site.url}`,
      });
    } catch (err) {
      console.error("[mail] visitor acknowledgement failed (the request itself was delivered)", err);
    }
  }

  return { ok: true, delivered: true, summary };
}
