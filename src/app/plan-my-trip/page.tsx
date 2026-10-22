import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { PageHeader } from "@/components/layout/PageHeader";
import { EnquiryForm } from "@/components/EnquiryForm";
import { TrustWall } from "@/components/sections/TrustWall";
import { FaqList } from "@/components/content/RichText";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { TrackedContactLink } from "@/components/TrackedContactLink";
import { site, defaultWhatsappMessage } from "@/config/site";
import { buildMetadata } from "@/lib/seo";
import { MessageCircle, Mail, Phone } from "lucide-react";

export const metadata: Metadata = buildMetadata({
  title: "Plan My Trip — Get a Free Custom Itinerary",
  description: "Tell us your dates, interests and budget. We'll reply within a few hours with a tailored Golden Triangle or Rajasthan itinerary and an honest price.",
  path: "/plan-my-trip",
});

const faqs = [
  { q: "Is there a fee to get a quote?", a: "No. Planning your itinerary and quote is completely free, with no obligation to book." },
  { q: "How do I pay?", a: "A small deposit confirms your booking (bank transfer, UPI, PayPal or a Razorpay payment link); the balance is due on arrival in cash or card." },
  { q: "What if my plans change?", a: "Free cancellation up to 48 hours before your tour starts. We'll always try to reschedule first." },
  { q: "Which currency will I be quoted in?", a: "We quote in USD by default; use the currency switcher on any tour page to see prices in INR, EUR or GBP." },
];

export default function PlanMyTripPage() {
  return (
    <>
      <PageHeader
        image="india-private-car-1"
        crumbs={[{ name: "Plan my trip", path: "/plan-my-trip" }]}
        eyebrow="Enquire"
        title="Tell us about your trip"
        text={`${site.contact.hoursNote}. A real day-by-day itinerary and an honest price, from a person. No account, no card, no obligation.`}
      />
      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_20rem]">
          <EnquiryForm sourcePage="/plan-my-trip" />
          <aside className="space-y-6">
            <div className="rounded-2xl border border-border bg-surface p-6">
              <p className="font-semibold text-ink">Prefer to talk?</p>
              <div className="mt-4 space-y-3 text-sm">
                <WhatsAppLink message={defaultWhatsappMessage} event="whatsapp_click_contact_sidebar" className="flex items-center gap-2 font-medium text-whatsapp-ink"><MessageCircle className="size-4" aria-hidden /> WhatsApp us</WhatsAppLink>
                <TrackedContactLink event="tel_click" href={`tel:${site.contact.phoneE164}`} className="flex items-center gap-2 text-ink/85 hover:text-ink"><Phone className="size-4 text-primary" aria-hidden /> {site.contact.phoneDisplay}</TrackedContactLink>
                <TrackedContactLink event="email_click" href={`mailto:${site.contact.email}`} className="flex items-center gap-2 text-ink/85 hover:text-ink"><Mail className="size-4 text-primary" aria-hidden /> {site.contact.email}</TrackedContactLink>
              </div>
            </div>
            <div>
              <p className="font-semibold text-ink">What happens next</p>
              <ol className="mt-3 space-y-2 text-sm text-muted">
                <li>1. We read your message and check availability.</li>
                <li>2. We reply with a day-by-day itinerary and price.</li>
                <li>3. You confirm with a small deposit — the rest is due on arrival.</li>
              </ol>
            </div>
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
