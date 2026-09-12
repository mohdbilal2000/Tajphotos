import type { Metadata } from "next";
import { MessageCircle, Mail, Phone, Clock, ShieldCheck, PenLine } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { QuoteForm } from "@/components/QuoteForm";
import { TrustWall } from "@/components/sections/TrustWall";
import { FaqList } from "@/components/content/RichText";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { TrackedContactLink } from "@/components/TrackedContactLink";
import { JsonLd } from "@/components/JsonLd";
import { site, defaultWhatsappMessage } from "@/config/site";
import { brand, hasPhone, hasWhatsApp } from "@/config/brand";
import { buildMetadata, breadcrumbJsonLd, faqJsonLd, graph } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: `${brand.quote.cta} — free, no obligation`,
  description: brand.quote.promise,
  path: "/quote",
});

/**
 * Answers the questions a visitor actually hesitates on before sending personal details to a
 * business in another country. The first one is the objection this whole model creates — no
 * published rates — so it is answered head-on rather than buried.
 */
const faqs = [
  {
    q: "Why aren't your prices listed on the site?",
    a: `Because a published number would be wrong in both directions. What ${brand.name} charges depends on your dates, group size, how long we're with you and what you actually want — a fixed list price either overcharges the simple jobs or quietly excludes what you asked for. We scope each request and quote it properly, and the quote we send is the price you pay.`,
  },
  { q: "Does asking for a quote cost anything, or commit me?", a: "No. A quote is free and carries no obligation. Most people ask two or three questions after reading it, and plenty don't book at all — that's completely fine." },
  { q: "How quickly will I hear back?", a: `Usually within a few hours, and almost always the same day. ${site.contact.hoursNote}.` },
  { q: "Who actually replies?", a: `A real person on the ${brand.name} team who knows Agra — not an automated quote generator. That's also why the reply can tell you when something you've asked for isn't a good idea.` },
  { q: "Is my information safe?", a: "Your details are used to answer this request and nothing else. We don't sell or share them, and marketing email is strictly opt-in — see our privacy policy." },
];

const steps = [
  { icon: PenLine, title: "You tell us the shape of it", body: "A few taps. Rough dates are fine — approximate is genuinely enough to price." },
  { icon: Clock, title: "We come back with a real plan", body: "Not a brochure: what we'd actually do, and an exact price for it." },
  { icon: ShieldCheck, title: "You decide, with no pressure", body: "Ask as many questions as you want. Nothing is held or charged until you say yes." },
];

export default function QuotePage() {
  return (
    <>
      <JsonLd data={graph(breadcrumbJsonLd([{ name: brand.quote.cta, path: "/quote" }]), faqJsonLd(faqs))} />

      <div className="border-b border-border bg-surface py-10">
        <div className="container-site">
          <Breadcrumbs items={[{ name: brand.quote.cta, path: "/quote" }]} />
          <h1 className="mt-3 max-w-3xl text-3xl font-semibold sm:text-4xl">{brand.quote.heading}</h1>
          <p className="mt-4 max-w-2xl text-lg text-muted">{brand.quote.promise}</p>
          {hasWhatsApp && (
            <p className="mt-5 text-sm text-muted">
              Would rather just message?{" "}
              <WhatsAppLink message={defaultWhatsappMessage} event="whatsapp_click_quote_header" className="font-semibold text-whatsapp-ink underline underline-offset-4">
                Talk to us on WhatsApp instead
              </WhatsAppLink>
              .
            </p>
          )}
        </div>
      </div>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_20rem]">
          <QuoteForm sourcePage="/quote" />

          <aside className="space-y-8">
            <div>
              <p className="font-semibold text-ink">What happens next</p>
              <ol className="mt-4 space-y-4">
                {steps.map((s, i) => (
                  <li key={s.title} className="flex gap-3">
                    <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary" aria-hidden>
                      <s.icon className="size-4" />
                    </span>
                    <span>
                      <span className="block text-sm font-semibold text-ink">
                        <span className="sr-only">Step {i + 1}: </span>
                        {s.title}
                      </span>
                      <span className="mt-0.5 block text-sm text-muted">{s.body}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            {(hasWhatsApp || hasPhone || site.contact.email) && (
              <div className="rounded-2xl border border-border bg-surface p-6">
                <p className="font-semibold text-ink">Prefer to talk?</p>
                <div className="mt-4 space-y-3 text-sm">
                  <WhatsAppLink message={defaultWhatsappMessage} event="whatsapp_click_quote_sidebar" className="flex items-center gap-2 font-medium text-whatsapp-ink">
                    <MessageCircle className="size-4" aria-hidden /> WhatsApp us
                  </WhatsAppLink>
                  {hasPhone && (
                    <TrackedContactLink event="tel_click" href={`tel:${site.contact.phoneE164}`} className="flex items-center gap-2 text-ink/85 hover:text-ink">
                      <Phone className="size-4 text-primary" aria-hidden /> {site.contact.phoneDisplay}
                    </TrackedContactLink>
                  )}
                  {site.contact.email && (
                    <TrackedContactLink event="email_click" href={`mailto:${site.contact.email}`} className="flex items-center gap-2 text-ink/85 hover:text-ink">
                      <Mail className="size-4 text-primary" aria-hidden /> {site.contact.email}
                    </TrackedContactLink>
                  )}
                </div>
              </div>
            )}

            <TrustWall className="grid-cols-1" />
          </aside>
        </div>
      </Section>

      <Section tone="surface">
        <FaqList items={faqs} className="mx-auto max-w-2xl" />
      </Section>
    </>
  );
}
