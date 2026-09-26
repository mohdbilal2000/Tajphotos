import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { PageHeader } from "@/components/layout/PageHeader";
import { FaqList } from "@/components/content/RichText";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata, faqJsonLd } from "@/lib/seo";
import { tajMahal, transport, visa } from "@/content/facts";

const faqs = [
  { q: "Is the Taj Mahal closed on Fridays?", a: `Yes, the Taj Mahal is closed to tourists every ${tajMahal.closedDay}, though local Muslims may still enter for prayers. Plan Friday visits around Agra Fort, Mehtab Bagh or Fatehpur Sikri instead.` },
  { q: "What are the Taj Mahal ticket prices?", a: `Foreign visitors pay ₹${tajMahal.ticketForeigner.entry} plus a ₹${tajMahal.ticketForeigner.mausoleum} mausoleum add-on (₹${tajMahal.ticketForeigner.total} total). Indian citizens pay ₹${tajMahal.ticketIndian.entry}, SAARC/BIMSTEC nationals ₹${tajMahal.ticketSaarc.entry}, and children under ${tajMahal.childFreeUnder} enter free. Book at ${tajMahal.officialTicketSite}.` },
  { q: "How far is Agra from Delhi?", a: `About ${transport.delhiAgraCar.distanceKm} km, roughly ${transport.delhiAgraCar.hours} hours by private car via the ${transport.delhiAgraCar.route}, or ${transport.gatimaanExpress.duration} on the ${transport.gatimaanExpress.train} (not on Fridays).` },
  { q: "Can I bring a tripod or drone to the Taj Mahal?", a: "No. Tripods, monopods, gimbals, drones and video cameras are not allowed inside the complex. Handheld phones and cameras are fine, except inside the main mausoleum, where no photography is permitted." },
  { q: "Do I need a visa to visit India?", a: `Most travellers need an e-Tourist Visa, from US$${visa.eTouristVisa30Day} for 30 days. Apply only at ${visa.officialSite} — several look-alike sites charge extra fees.` },
  { q: "How do I book, and what's the cancellation policy?", a: "Message us on WhatsApp or use the plan-my-trip form for a free itinerary and quote. A small deposit confirms your booking, with free cancellation up to 48 hours before your tour starts." },
];

export const metadata: Metadata = buildMetadata({ title: "FAQ — Taj Mahal Tickets, Timings & Booking", description: "Answers on Taj Mahal tickets, timings, Friday closures, visas and how booking works.", path: "/faq" });

export default function FaqPage() {
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", ...faqJsonLd(faqs) }} />
      <PageHeader
        crumbs={[{ name: "FAQ", path: "/faq" }]}
        eyebrow="Questions"
        title="Frequently asked questions"
        text="Tickets, timings, closures, safety, payments and cancellations — answered in the first sentence."
      />
      <Section><FaqList items={faqs} className="mx-auto max-w-3xl" /></Section>
    </>
  );
}
