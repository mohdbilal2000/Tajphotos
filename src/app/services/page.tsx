import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { site } from "@/config/site";
import { services, fleet, serviceCategories, servicesByCategory, availabilityLabel } from "@/content/services";
import { getImage } from "@/content/images";
import { tajMahal, transport } from "@/content/facts";
import { Section, SectionHeader } from "@/components/ui/Section";
import { AvailabilityTable } from "@/components/services/AvailabilityTable";
import { FleetList } from "@/components/services/FleetList";
import { CtaCard } from "@/components/sections/CtaCard";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { FaqList } from "@/components/content/RichText";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata, faqJsonLd, graph } from "@/lib/seo";
import { absoluteUrl } from "@/lib/utils";

const faqs = [
  {
    q: "What kind of car do you use for a Golden Triangle tour?",
    a: "A Toyota Innova Crysta or Innova Hycross for one to four travellers, a Camry or E-Class sedan for couples who want a quieter ride, and a Force Urbania or Tempo Traveller from five people up. We quote seats as people plus their luggage, not as registration capacity — four adults with four suitcases in a nominal seven-seater is the most common cause of an uncomfortable Golden Triangle drive.",
  },
  {
    q: "Is there a skip-the-line ticket for the Taj Mahal?",
    a: `No, and anyone selling one is selling you nothing. Tickets are issued by the Archaeological Survey of India at a fixed price — ₹${tajMahal.ticketForeigner.total} for foreign nationals including the ₹${tajMahal.ticketForeigner.mausoleum} mausoleum add-on — and everybody queues in the same security line. What actually works is being at the gate before it opens, with your ticket already bought in your own name, which is what we do.`,
  },
  {
    q: "When can you arrange Taj Mahal night viewing?",
    a: `${tajMahal.nightViewing.schedule}, between ${tajMahal.nightViewing.window.replace(", in", " in")}. ${tajMahal.nightViewing.excluded}. Permits are issued 24 hours ahead at the ASI office on Mall Road, Agra, and the 400 nightly places sell out, so tell us early and we will send you the eligible dates for your month before you fix the itinerary.`,
  },
  {
    q: "Can I take the Gatimaan Express instead of driving to Agra?",
    a: `Yes, and for a same-day trip it is often the better call: ${transport.gatimaanExpress.duration} from Hazrat Nizamuddin to Agra Cantt, departing ${transport.gatimaanExpress.depart} and returning ${transport.gatimaanExpress.returnDepart}. ${transport.gatimaanExpress.note}, which rules it out on the one day the Taj Mahal is closed anyway. We book the Executive Chair Car seat, meet you on the platform and drive you from the station.`,
  },
  {
    q: "Can you arrange a guide who speaks French, German, Spanish or Japanese?",
    a: "Usually, with seven to ten days' notice. English and Hindi guides are available daily; the licensed pool for other languages in Agra and Jaipur is genuinely small, and in peak season it books out. We would rather tell you that now than confirm it and substitute an English guide on the morning.",
  },
  {
    q: "What happens if something goes wrong while I'm travelling?",
    a: `One WhatsApp thread, answered by a named member of the team, for the whole trip — the delayed flight, the cancelled train, the stomach that turns on day three. Enquiries before you travel are answered ${site.contact.hoursNote.replace("We reply on WhatsApp within minutes, ", "")}; once your trip has started, that same thread is watched around the clock on your travel days.`,
  },
  {
    q: "Do you arrange wheelchair access at the Taj Mahal?",
    a: "Yes, with about a week's notice: a wheelchair at the monument, a step-free route through the complex, and a driver briefed on the nearest drop-off. We will also be straight with you about where it does not work — parts of Agra Fort and the upper levels of Amber Fort cannot be reached by wheelchair, and we would rather swap those for something you can enjoy than promise access and apologise on the day.",
  },
];

export const metadata: Metadata = buildMetadata({
  title: "Services & Availability: Cars, Guides, Access & Photography",
  description:
    "Every service we arrange for private India itineraries — chauffeur-driven cars, the Gatimaan Express, licensed guides by language, Taj Mahal sunrise and night-viewing access, photography, accessibility — with the real availability and notice we need.",
  path: "/services",
  keywords: ["private car and driver India", "Taj Mahal night viewing booking", "licensed guide Agra", "Gatimaan Express booking", "Taj Mahal sunrise tickets", "wheelchair access Taj Mahal"],
});

export default function ServicesPage() {
  const hero = getImage("india-private-car-1");

  return (
    <>
      <JsonLd
        data={graph({
          "@type": "CollectionPage",
          "@id": absoluteUrl("/services"),
          name: "Services & Availability",
          url: absoluteUrl("/services"),
          description: metadata.description as string,
          about: services.map((s) => ({ "@type": "Service", name: s.name, serviceType: s.category, provider: { "@id": `${site.url}/#organization` }, areaServed: { "@type": "Country", name: "India" } })),
        }, faqJsonLd(faqs))}
      />

      <header className="border-b border-border bg-surface">
        <div className="container-site grid gap-10 pb-16 pt-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-16 lg:pb-20">
          <div>
            <Breadcrumbs items={[{ name: "Services", path: "/services" }]} />
            <p className="mt-10 border-t border-border pt-4 text-label font-semibold uppercase text-accent">Services &amp; availability</p>
            <h1 className="mt-7 max-w-[22ch] text-display-1 font-normal">Everything we arrange, and the days we can&apos;t.</h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted">
              A services page normally lists what a company would like to sell you. This one also
              lists the notice we need and the dates that are genuinely impossible — the Friday
              closure, the lunar calendar behind night viewing, the small pool of non-English guides.
              It is a shorter conversation if you know first.
            </p>
          </div>
          <div className="figure aspect-[4/3] w-full rounded-3xl shadow-lift">
            <Image src={hero.src} alt={hero.alt} placeholder="blur" preload fetchPriority="high" sizes="(min-width: 1024px) 44vw, 92vw" />
          </div>
        </div>
      </header>

      {/* Availability key — four states, explained once. */}
      <Section className="pb-0">
        <SectionHeader eyebrow="The key" title="Four answers, used honestly" />
        <dl className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {[
            { k: "daily" as const, d: "No date restriction at all. Cars, arrivals, and a person to call." },
            { k: "except-friday" as const, d: `Anything inside the Taj Mahal. It is closed to visitors every ${tajMahal.closedDay} and no operator can change that.` },
            { k: "seasonal" as const, d: "Tied to the calendar rather than our diary — night viewing follows the full moon; tiger safaris follow the park season." },
            { k: "on-request" as const, d: "Depends on someone else's inventory on your dates. We confirm it before you pay, not after." },
          ].map((row) => (
            <div key={row.k} className="bg-bg px-6 py-7">
              <dt className="text-label font-semibold uppercase text-accent">{availabilityLabel[row.k]}</dt>
              <dd className="mt-3 text-sm leading-relaxed text-ink">{row.d}</dd>
            </div>
          ))}
        </dl>
      </Section>

      {serviceCategories.map((cat, i) => {
        const list = servicesByCategory(cat.key);
        if (!list.length) return null;
        return (
          <Section key={cat.key} tone={i % 2 === 1 ? "surface" : "bg"} id={cat.key}>
            <div className="flex flex-wrap items-end justify-between gap-6 border-t border-border pt-4">
              <div>
                <p className="eyebrow">{String(i + 1).padStart(2, "0")} · {cat.label}</p>
                <h2 className="mt-5 font-display text-display-3 font-normal">{cat.blurb}</h2>
              </div>
            </div>
            <AvailabilityTable services={list} className="mt-12" />
          </Section>
        );
      })}

      {/* Fleet */}
      <Section id="fleet" tone="surface">
        <SectionHeader
          eyebrow="The fleet"
          title="Cars, and the one train worth taking"
          text="Every car is air-conditioned and confirmed by registration before you pay, with seatbelts in every seat and a driver who does this route for a living. Tolls, parking, fuel and the driver's own costs are ours."
        />
        <FleetList fleet={fleet} className="mt-14" />
        <div className="mt-10 grid gap-8 border-t border-border pt-8 sm:grid-cols-2 lg:gap-16">
          <p className="text-sm leading-relaxed text-muted">
            Delhi to Agra is {transport.delhiAgraCar.distanceKm} km and {transport.delhiAgraCar.hours} hours on the{" "}
            {transport.delhiAgraCar.route}, with a ₹{transport.delhiAgraCar.tollOneWayInr} one-way toll we pay, not you.
            Delhi to Jaipur is {transport.delhiJaipur.distanceKm} km; Agra to Jaipur {transport.agraJaipur.distanceKm} km,
            longer if you stop at Fatehpur Sikri and the Chand Baori stepwell — and you should.
          </p>
          <p className="text-sm leading-relaxed text-muted">
            We do not stop at marble emporiums, carpet showrooms or gem workshops. Not as a &ldquo;quick
            look&rdquo;, not on the way back. Commission stops are the single most common complaint about
            Golden Triangle tours, and the easiest thing in this business to simply not do.
          </p>
        </div>
        <Link href="/tours#transfer" className="arrow-link mt-10">Cars &amp; transfers as a standalone booking <ArrowRight className="size-4" aria-hidden /></Link>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <SectionHeader eyebrow="Questions" title="The practical answers" className="lg:sticky lg:top-32 lg:self-start" />
          <FaqList items={faqs} />
        </div>
      </Section>

      <Section className="pt-0">
        <CtaCard
          title="Send us the dates and we'll tell you what's possible."
          text="Including the parts that aren't. You'll get a day-by-day plan with the closures, drives and ticket costs written in."
          label="Plan my trip"
        />
      </Section>
    </>
  );
}
