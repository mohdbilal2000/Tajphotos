"use client";
import { useActionState, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { CheckCircle2, MessageCircle } from "lucide-react";
import { submitEnquiry, type EnquiryState } from "@/app/plan-my-trip/actions";
import { destinations } from "@/content";
import { trackEvent } from "@/lib/analytics";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { defaultWhatsappMessage } from "@/config/site";

const initialState: EnquiryState = { status: "idle" };

const budgets = ["Budget-friendly", "Mid-range comfort", "Luxury", "Not sure yet"];
const hotels = ["3★", "4★", "5★ / boutique heritage", "Mix, tell us your style"];

// Only destinations/name/contact-method/contact are actually required (per the Zod schema in
// actions.ts), but every field rendered at equal visual weight — Baymard's enquiry-form research
// found users skip required fields more often when optional ones aren't marked as such, since
// nothing distinguishes "must answer" from "nice to have." Marking both, not just one, is the fix.
const RequiredMark = () => (
  <span className="font-normal text-error">
    <span aria-hidden>*</span>
    <span className="sr-only">(required)</span>
  </span>
);
const OptionalMark = () => <span className="font-normal text-muted">(optional)</span>;

export function EnquiryForm({ defaultDestination, sourcePage }: { defaultDestination?: string; sourcePage?: string }) {
  const [state, formAction, pending] = useActionState(submitEnquiry, initialState);
  const [contactMethod, setContactMethod] = useState<"whatsapp" | "email">("whatsapp");
  const pathname = usePathname();

  useEffect(() => {
    if (state.status === "success") trackEvent("enquiry_submitted", { page: sourcePage ?? pathname });
    if (state.status === "error") trackEvent("enquiry_failed", { page: sourcePage ?? pathname });
  }, [state.status, pathname, sourcePage]);

  if (state.status === "success") {
    return (
      <div className="rounded-3xl border border-success/30 bg-success/5 p-8 text-center">
        <CheckCircle2 className="mx-auto size-10 text-success" aria-hidden />
        <p className="mt-4 text-lg font-semibold text-ink">{state.message}</p>
        <WhatsAppLink message={defaultWhatsappMessage} event="whatsapp_click_form_success" className="btn-whatsapp mt-6 inline-flex">
          <MessageCircle className="size-4" aria-hidden /> Continue on WhatsApp now
        </WhatsAppLink>
      </div>
    );
  }

  const err = (field: string) => state.fieldErrors?.[field]?.[0];

  return (
    <form action={formAction} className="space-y-6 rounded-3xl border border-border bg-white p-6 sm:p-8" noValidate>
      <input type="hidden" name="page" value={sourcePage ?? pathname} />
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <fieldset>
        <legend className="text-sm font-semibold text-ink">Where would you like to go? <RequiredMark /></legend>
        <div className="mt-3 flex flex-wrap gap-2" aria-describedby={err("destinations") ? "destinations-error" : undefined} aria-invalid={err("destinations") ? true : undefined}>
          {destinations.map((d) => (
            <label key={d.slug} className="inline-flex cursor-pointer items-center gap-2 border border-border px-3.5 py-2 text-sm has-checked:border-primary has-checked:bg-primary/5 has-checked:text-primary">
              <input type="checkbox" name="destinations" value={d.name} defaultChecked={d.slug === defaultDestination} className="accent-primary" />
              {d.name}
            </label>
          ))}
        </div>
        {err("destinations") && <p id="destinations-error" role="alert" className="mt-1.5 text-sm text-error">{err("destinations")}</p>}
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="travelDates" className="text-sm font-semibold text-ink">Travel dates <OptionalMark /></label>
          <input id="travelDates" name="travelDates" type="text" placeholder="e.g. Late November 2026, 10 days (flexible is fine)" className="mt-1.5 w-full rounded-xl border border-border px-3.5 py-2.5 text-sm" />
        </div>
        <div>
          <label htmlFor="travellers" className="text-sm font-semibold text-ink">Travellers <OptionalMark /></label>
          <input id="travellers" name="travellers" type="text" placeholder="e.g. 2 adults" className="mt-1.5 w-full rounded-xl border border-border px-3.5 py-2.5 text-sm" />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="budget" className="text-sm font-semibold text-ink">Budget style <OptionalMark /></label>
          <select id="budget" name="budget" className="mt-1.5 w-full rounded-xl border border-border bg-white px-3.5 py-2.5 text-sm">
            {budgets.map((b) => <option key={b}>{b}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="hotelTier" className="text-sm font-semibold text-ink">Hotel style <OptionalMark /></label>
          <select id="hotelTier" name="hotelTier" className="mt-1.5 w-full rounded-xl border border-border bg-white px-3.5 py-2.5 text-sm">
            {hotels.map((h) => <option key={h}>{h}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="interests" className="text-sm font-semibold text-ink">Interests <OptionalMark /></label>
        <input id="interests" name="interests" type="text" placeholder="Photography, food, history, wildlife…" className="mt-1.5 w-full rounded-xl border border-border px-3.5 py-2.5 text-sm" />
      </div>

      <div>
        <label htmlFor="message" className="text-sm font-semibold text-ink">Anything else we should know? <OptionalMark /></label>
        <textarea id="message" name="message" rows={3} className="mt-1.5 w-full rounded-xl border border-border px-3.5 py-2.5 text-sm" />
      </div>

      <div className="grid gap-5 border-t border-border pt-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-sm font-semibold text-ink">Your name <RequiredMark /></label>
          <input
            id="name"
            name="name"
            type="text"
            required
            aria-invalid={err("name") ? true : undefined}
            aria-describedby={err("name") ? "name-error" : undefined}
            className="mt-1.5 w-full rounded-xl border border-border px-3.5 py-2.5 text-sm"
          />
          {err("name") && <p id="name-error" role="alert" className="mt-1.5 text-sm text-error">{err("name")}</p>}
        </div>
        <div>
          <span className="text-sm font-semibold text-ink">Best way to reach you <RequiredMark /></span>
          <div className="mt-1.5 flex gap-2">
            {(["whatsapp", "email"] as const).map((m) => (
              <label key={m} className="inline-flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-xl border border-border px-3 py-2.5 text-sm has-checked:border-primary has-checked:bg-primary/5 has-checked:text-primary">
                <input type="radio" name="contactMethod" value={m} checked={contactMethod === m} onChange={() => setContactMethod(m)} className="accent-primary" />
                {m === "whatsapp" ? "WhatsApp" : "Email"}
              </label>
            ))}
          </div>
        </div>
      </div>
      <div>
        <label htmlFor="contact" className="text-sm font-semibold text-ink">{contactMethod === "whatsapp" ? "WhatsApp number (with country code)" : "Email address"} <RequiredMark /></label>
        <input
          id="contact"
          name="contact"
          type={contactMethod === "email" ? "email" : "tel"}
          required
          aria-invalid={err("contact") ? true : undefined}
          aria-describedby={err("contact") ? "contact-error" : undefined}
          placeholder={contactMethod === "whatsapp" ? "+1 555 123 4567" : "you@example.com"}
          className="mt-1.5 w-full rounded-xl border border-border px-3.5 py-2.5 text-sm"
        />
        {err("contact") && <p id="contact-error" role="alert" className="mt-1.5 text-sm text-error">{err("contact")}</p>}
      </div>

      <label className="flex items-start gap-2.5 text-sm text-muted">
        <input type="checkbox" name="marketingOptIn" className="mt-0.5 accent-primary" />
        <span>
          Also send me occasional trip-planning tips by email (not required — this is separate from your itinerary reply). See our{" "}
          <a href="/privacy" className="link">privacy policy</a>.
        </span>
      </label>

      {state.status === "error" && state.message && (
        <p role="alert" className="rounded-xl bg-error/10 px-4 py-3 text-sm text-error">{state.message}</p>
      )}

      <button type="submit" disabled={pending} className="btn-primary btn-lg w-full">
        {pending ? "Sending…" : "Get my itinerary & price"}
      </button>
      <p className="text-center text-xs text-muted">No spam, no obligation. We reply with a real itinerary, not a template.</p>
    </form>
  );
}
