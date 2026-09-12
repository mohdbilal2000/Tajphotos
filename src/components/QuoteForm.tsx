"use client";
import { useActionState, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { CheckCircle2, MessageCircle, ArrowRight } from "lucide-react";
import { submitQuote, type QuoteState } from "@/app/quote/actions";
import { brand, hasWhatsApp } from "@/config/brand";
import type { QuoteQuestion } from "@/config/brand";
import { trackEvent } from "@/lib/analytics";
import { WhatsAppLink } from "@/components/WhatsAppLink";

const initialState: QuoteState = { status: "idle" };

const RequiredMark = () => (
  <span className="font-normal text-error">
    <span aria-hidden>*</span>
    <span className="sr-only">(required)</span>
  </span>
);
const OptionalMark = () => <span className="font-normal text-muted">(optional)</span>;

/**
 * The single conversion surface for every brand.
 *
 * Deliberately NOT a multi-step wizard. A wizard hides its own length, and the resulting
 * "how much more of this is there?" uncertainty is what actually drives abandonment — a form the
 * visitor can see the end of reads as shorter than the same questions revealed three at a time.
 * Everything is on one screen, and every question that can be answered by tapping is a row of
 * chips rather than a `<select>`: one tap instead of open-scroll-pick, and the full option set is
 * visible, which is what lets someone answer without knowing the vocabulary first.
 *
 * Questions come from `brand.quote.questions`, so each brand asks only what it needs to price
 * its own work, and the required set stays to the bare minimum needed to write a quote at all.
 */
export function QuoteForm({ sourcePage, className }: { sourcePage?: string; className?: string }) {
  const [state, formAction, pending] = useActionState(submitQuote, initialState);
  const [contactMethod, setContactMethod] = useState<"whatsapp" | "email">("whatsapp");
  const pathname = usePathname();

  useEffect(() => {
    if (state.status === "success") trackEvent("quote_submitted", { brand: brand.key, page: sourcePage ?? pathname });
    if (state.status === "error") trackEvent("quote_failed", { brand: brand.key, page: sourcePage ?? pathname });
  }, [state.status, pathname, sourcePage]);

  if (state.status === "success") {
    return (
      <div className={className}>
        <div className="rounded-3xl border border-success/30 bg-success/5 p-8 text-center">
          <CheckCircle2 className="mx-auto size-10 text-success" aria-hidden />
          <p className="mt-4 text-lg font-semibold text-ink">{state.message}</p>
          {/* The handoff carries everything they just typed, so moving to WhatsApp costs them no
              retyping — without the prefill this button asks them to do the form again. */}
          {state.summary && hasWhatsApp && (
            <>
              <p className="mt-3 text-sm text-muted">Want it faster? Send the same details straight to our WhatsApp.</p>
              <WhatsAppLink
                message={state.summary}
                event="whatsapp_click_quote_success"
                className="btn-whatsapp btn-lg mt-5 inline-flex"
              >
                <MessageCircle className="size-4" aria-hidden /> Continue on WhatsApp
              </WhatsAppLink>
            </>
          )}
        </div>
      </div>
    );
  }

  const err = (field: string) => state.fieldErrors?.[field]?.[0];

  return (
    <form action={formAction} className={className} noValidate>
      <input type="hidden" name="page" value={sourcePage ?? pathname} />
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <div className="space-y-8 rounded-3xl border border-border bg-surface p-6 sm:p-8">
        {brand.quote.questions.map((q) => (
          <Question key={q.id} q={q} error={err(q.id)} />
        ))}

        <div>
          <label htmlFor="notes" className="text-sm font-semibold text-ink">
            Anything else we should know? <OptionalMark />
          </label>
          <textarea
            id="notes"
            name="notes"
            rows={3}
            placeholder="Mobility needs, dietary needs, a specific photo you've seen, who's celebrating what…"
            className="mt-2 w-full rounded-xl border border-border bg-surface px-3.5 py-2.5 text-base sm:text-sm"
          />
        </div>

        {/* Contact last: asking for identity before the visitor has invested any effort is the
            single biggest drop-off point on a form like this. */}
        <div className="border-t border-border pt-7">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="text-sm font-semibold text-ink">
                Your name <RequiredMark />
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                autoComplete="name"
                aria-invalid={err("name") ? true : undefined}
                aria-describedby={err("name") ? "name-error" : undefined}
                className="mt-2 w-full rounded-xl border border-border bg-surface px-3.5 py-2.5 text-base sm:text-sm"
              />
              {err("name") && <p id="name-error" role="alert" className="mt-1.5 text-sm text-error">{err("name")}</p>}
            </div>
            <div>
              <span className="text-sm font-semibold text-ink">Where should we reply? <RequiredMark /></span>
              <div className="mt-2 flex gap-2">
                {(["whatsapp", "email"] as const).map((m) => (
                  <label
                    key={m}
                    className="inline-flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-xl border border-border px-3 py-2.5 text-sm has-checked:border-primary has-checked:bg-primary/5 has-checked:font-medium has-checked:text-primary"
                  >
                    <input
                      type="radio"
                      name="contactMethod"
                      value={m}
                      checked={contactMethod === m}
                      onChange={() => setContactMethod(m)}
                      className="accent-primary"
                    />
                    {m === "whatsapp" ? "WhatsApp" : "Email"}
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="contact" className="text-sm font-semibold text-ink">
                {contactMethod === "whatsapp" ? "WhatsApp number (with country code)" : "Email address"} <RequiredMark />
              </label>
              <input
                id="contact"
                name="contact"
                // type/inputMode/autoComplete all follow the chosen channel so the right keyboard
                // and the right autofill entry appear — on mobile this is most of the typing saved.
                type={contactMethod === "email" ? "email" : "tel"}
                inputMode={contactMethod === "email" ? "email" : "tel"}
                autoComplete={contactMethod === "email" ? "email" : "tel"}
                required
                aria-invalid={err("contact") ? true : undefined}
                aria-describedby={err("contact") ? "contact-error" : undefined}
                placeholder={contactMethod === "whatsapp" ? "+1 555 123 4567" : "you@example.com"}
                className="mt-2 w-full rounded-xl border border-border bg-surface px-3.5 py-2.5 text-base sm:text-sm"
              />
              {err("contact") && <p id="contact-error" role="alert" className="mt-1.5 text-sm text-error">{err("contact")}</p>}
            </div>
            <div>
              <label htmlFor="country" className="text-sm font-semibold text-ink">
                Which country are you travelling from? <OptionalMark />
              </label>
              <input
                id="country"
                name="country"
                type="text"
                autoComplete="country-name"
                placeholder="e.g. Germany"
                className="mt-2 w-full rounded-xl border border-border bg-surface px-3.5 py-2.5 text-base sm:text-sm"
              />
              <p className="mt-1.5 text-xs text-muted">Helps us get time zones and monument ticket categories right.</p>
            </div>
          </div>

          <label className="mt-5 flex items-start gap-2.5 text-sm text-muted">
            <input type="checkbox" name="marketingOptIn" className="mt-0.5 accent-primary" />
            <span>
              Also send me occasional tips by email — separate from the reply to this request. See our{" "}
              <a href="/privacy" className="link">privacy policy</a>.
            </span>
          </label>
        </div>

        {state.status === "error" && state.message && (
          <p role="alert" className="rounded-xl bg-error/10 px-4 py-3 text-sm text-error">{state.message}</p>
        )}

        <div>
          <button type="submit" disabled={pending} className="btn-primary btn-lg w-full">
            {pending ? "Sending…" : brand.quote.cta}
            {!pending && <ArrowRight className="size-4" aria-hidden />}
          </button>
          <p className="mt-3 text-center text-xs text-muted">
            No payment, no obligation. {brand.quote.promise}
          </p>
        </div>
      </div>
    </form>
  );
}

function Question({ q, error }: { q: QuoteQuestion; error?: string }) {
  const errorId = `${q.id}-error`;
  const helpId = `${q.id}-help`;
  const describedBy = [q.help ? helpId : null, error ? errorId : null].filter(Boolean).join(" ") || undefined;

  if (q.type === "text") {
    return (
      <div>
        <label htmlFor={q.id} className="text-sm font-semibold text-ink">
          {q.question} {q.required ? <RequiredMark /> : <OptionalMark />}
        </label>
        {q.help && <p id={helpId} className="mt-1 text-xs text-muted">{q.help}</p>}
        <input
          id={q.id}
          name={q.id}
          type="text"
          placeholder={q.placeholder}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          // 16px on mobile: anything smaller makes iOS Safari zoom the viewport on focus, which
          // reads as the page jumping away mid-answer.
          className="mt-2 w-full rounded-xl border border-border bg-surface px-3.5 py-2.5 text-base sm:text-sm"
        />
        {error && <p id={errorId} role="alert" className="mt-1.5 text-sm text-error">{error}</p>}
      </div>
    );
  }

  const inputType = q.type === "single" ? "radio" : "checkbox";
  return (
    <fieldset aria-describedby={describedBy}>
      <legend className="text-sm font-semibold text-ink">
        {q.question} {q.required ? <RequiredMark /> : <OptionalMark />}
      </legend>
      {q.help && <p id={helpId} className="mt-1 text-xs text-muted">{q.help}</p>}
      <div className="mt-3 flex flex-wrap gap-2" aria-invalid={error ? true : undefined}>
        {q.options?.map((o) => (
          <label
            key={o.value}
            className="inline-flex min-h-11 cursor-pointer items-center gap-2.5 rounded-xl border border-border bg-surface px-3.5 py-2.5 text-sm transition-colors has-checked:border-primary has-checked:bg-primary/5 has-checked:text-primary hover:border-ink/30"
          >
            <input type={inputType} name={q.id} value={o.value} className="accent-primary" />
            <span>
              <span className="font-medium">{o.label}</span>
              {o.hint && <span className="block text-xs font-normal text-muted">{o.hint}</span>}
            </span>
          </label>
        ))}
      </div>
      {error && <p id={errorId} role="alert" className="mt-2 text-sm text-error">{error}</p>}
    </fieldset>
  );
}
