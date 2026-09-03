import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { site } from "@/config/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({ title: "Privacy Policy", description: `How ${site.name} collects, uses and protects your data.`, path: "/privacy" });

export default function PrivacyPage() {
  return (
    <>
      <div className="border-b border-border bg-surface py-8"><div className="container-site"><Breadcrumbs items={[{ name: "Privacy", path: "/privacy" }]} /><h1 className="mt-2 text-3xl font-semibold sm:text-4xl">Privacy policy</h1></div></div>
      <Section>
        <div className="prose-site max-w-[720px]">
          <p><em>Last updated: 3 September 2026. TODO: have this reviewed by a lawyer familiar with India&apos;s DPDP Act 2023 and, if you serve EU visitors, UK/EU GDPR, before launch.</em></p>
          <h2>What we collect</h2>
          <p>When you use our plan-my-trip form, we collect your name, contact details, travel dates, and anything else you choose to share, in order to reply with an itinerary and price. We use Google Analytics and Microsoft Clarity to understand how visitors use this site, and Vercel Analytics for performance monitoring.</p>
          <h2>How we use it</h2>
          <p>We use your enquiry details only to plan and deliver your trip, and to follow up about it. We do not sell your data. We may email you occasional trip-planning tips if you agree to it; you can unsubscribe at any time.</p>
          <h2>Cookies</h2>
          <p>We use essential cookies to remember your currency preference, and analytics cookies (which you can decline in the consent banner) to understand site usage.</p>
          <h2>Your rights</h2>
          <p>You can ask us to access, correct or delete your data at any time by emailing {site.contact.email}.</p>
          <h2>Contact</h2>
          <p>{site.legalName}, {site.address.streetAddress}, {site.address.addressLocality}, India. {site.contact.email}</p>
        </div>
      </Section>
    </>
  );
}
