import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { site } from "@/config/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({ title: "Terms & Cancellation Policy", description: `Booking terms, payment and cancellation policy for ${site.name}.`, path: "/terms" });

export default function TermsPage() {
  return (
    <>
      <div className="border-b border-border bg-surface py-8"><div className="container-site"><Breadcrumbs items={[{ name: "Terms", path: "/terms" }]} /><h1 className="mt-2 text-3xl font-semibold sm:text-4xl">Terms &amp; cancellation policy</h1></div></div>
      <Section>
        <div className="prose-site max-w-[720px]">
          <p><em>Last updated: 3 September 2026. TODO: have this reviewed by a lawyer before launch, and confirm deposit percentages, refund windows and force-majeure wording against how the business actually operates.</em></p>
          <h2>Booking &amp; payment</h2>
          <p>A deposit (typically 20% of the tour price) confirms your booking; the balance is due on arrival, payable by cash or card. Prices are quoted per person in USD by default; other currencies shown are indicative, converted at the rate in effect when you book.</p>
          <h2>Cancellation</h2>
          <p>Free cancellation up to 48 hours before your tour start time, with a full refund of any deposit paid. Cancellations within 48 hours may forfeit the deposit, at our discretion, depending on how far in advance any third-party bookings (trains, monument tickets, hotels) were already made on your behalf.</p>
          <h2>Monument tickets and closures</h2>
          <p>Monument opening days, hours and ticket prices are set by the Archaeological Survey of India and local authorities and can change without notice — including the Taj Mahal&apos;s regular Friday closure. We will always suggest an alternative itinerary rather than cancel outright.</p>
          <h2>Liability</h2>
          <p>We take reasonable care to select safe drivers, guides and vehicles, but travel carries inherent risk. We recommend all travellers carry appropriate travel insurance.</p>
          <h2>Contact</h2>
          <p>{site.legalName}, {site.contact.email}, {site.contact.phoneDisplay}.</p>
        </div>
      </Section>
    </>
  );
}
