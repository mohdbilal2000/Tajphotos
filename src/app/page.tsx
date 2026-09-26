import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { site } from "@/config/site";
import { tours, destinations, latestGuides, reviews, featuredTours, tourCategories, stays, services, fleet, staysDisclosure } from "@/content";
import { getImage } from "@/content/images";
import { Hero } from "@/components/sections/Hero";
import { FounderNote } from "@/components/sections/FounderNote";
import { Section, SectionHeader } from "@/components/ui/Section";
import { JourneyIndex } from "@/components/tours/JourneyIndex";
import { DestinationCard } from "@/components/destinations/DestinationCard";
import { ArticleCard } from "@/components/guides/ArticleCard";
import { StayCard } from "@/components/stays/StayCard";
import { AvailabilityTable } from "@/components/services/AvailabilityTable";
import { FleetList } from "@/components/services/FleetList";
import { StatStrip } from "@/components/sections/StatStrip";
import { TrustWall } from "@/components/sections/TrustWall";
import { TestimonialGrid } from "@/components/sections/Testimonial";
import { CtaCard } from "@/components/sections/CtaCard";
import { FaqList } from "@/components/content/RichText";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: `${site.name} — Private Taj Mahal & Golden Triangle Journeys, by Agra Locals`,
  description: site.description,
  path: "/",
});

/** The three-column standfirst under the hero: what we do, what we refuse to do, what it costs to ask. */
const creed = [
  {
    head: "We live here",
    body: "Tajganj, a ten-minute walk from the East Gate. Our guides are Ministry of Tourism-licensed, not drivers doubling as guides, and the photographer was the first person this company employed.",
  },
  {
    head: "No commission stops",
    body: "No marble emporium, no carpet showroom, no gem workshop — not once, not as a \"quick stop\". We are not paid by them, so there is no reason to take you there and one very good reason not to.",
  },
  {
    head: "Ask for nothing",
    body: `Send a message and you get a real itinerary and an honest price from a person, usually within fifteen minutes during ${site.contact.hoursNote.match(/\((.*)\)/)?.[1] ?? "our hours"}. No account, no card, no obligation.`,
  },
];

const steps = [
  { t: "Tell us the dates and the shape", d: "Two minutes on WhatsApp or the form. How long, how many, how hard you want to push, and whether sunrise is worth a 4:30 AM alarm to you." },
  { t: "We send an itinerary, not a brochure", d: "A day-by-day plan with the drives, the closures and the ticket costs written in, plus the hotels we can actually hold on your dates." },
  { t: "A deposit holds it, the balance waits", d: "Free cancellation up to 48 hours before. The rest is payable on arrival in Agra, in cash, card or transfer." },
];

const homeFaqs = [
  { q: "Is the Taj Mahal closed on Fridays?", a: "Yes. The Taj Mahal is closed to tourists every Friday, though local Muslims may enter for prayers. We route Friday visitors to Agra Fort, Mehtab Bagh and Fatehpur Sikri instead, or suggest a nearby day." },
  { q: "How far is Agra from Delhi, and how do you get there?", a: "Agra is about 230 km from Delhi, roughly 3–4 hours by private car on the Yamuna Expressway, or 1 hour 40 minutes on the Gatimaan Express train (which does not run on Fridays)." },
  { q: "Do you really include a professional photographer?", a: "On our photography and sunrise tours, yes — a local photographer walks with you at the Taj Mahal and hands over edited photos afterwards. It's optional on standard tours and can always be added." },
  { q: "Can you book palace hotels like Rambagh or the Lake Palace?", a: "Yes. We hold and confirm rooms at palace, heritage and modern luxury properties across Agra, Delhi, Jaipur, Udaipur and Jodhpur before you pay anything. We are not the hotel and take no affiliate fee — if a property is full on your dates we say so and offer the nearest equivalent." },
  { q: "Is it safe to book directly instead of through a marketplace?", a: "We're a registered Agra-based operator with licensed guides and named team members, not an anonymous listing. You can reach us on WhatsApp before paying anything, and we take a modest deposit with the balance due on arrival." },
];

export default function Home() {
  const hero = getImage("taj-mahal-sunrise-1");
  // A curated six that tells the whole story — a same-day taster, the photography pair, the two
  // multi-day circuits and the standalone car — rather than `tours.slice(0, 6)`, which is
  // alphabetical and happens to open with two city day-tours. `featuredTours()` (badge-driven)
  // still wins if the content team has marked best sellers; these are the fallback order.
  const signature = [
    "taj-mahal-sunrise-tour-from-delhi",
    "taj-mahal-sunrise-tour-with-photographer",
    "golden-triangle-tour-4-days",
    "golden-triangle-tour-7-days-with-udaipur",
    "taj-mahal-photoshoot",
    "private-car-and-driver-india",
  ];
  const curated = signature.map((slug) => tours.find((t) => t.slug === slug)).filter((t): t is NonNullable<typeof t> => Boolean(t));
  const journeys = (featuredTours().length ? featuredTours() : curated.length ? curated : tours).slice(0, 6);
  const featuredStays = [stays[0], stays[5], stays[7]].filter(Boolean);
  const keyServices = services.filter((s) => ["taj-sunrise-entry", "taj-night-viewing", "private-car-driver", "licensed-guide", "hotel-booking"].includes(s.slug));

  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "WebPage", name: metadata.title, url: site.url, description: site.description }} />

      <Hero
        image={hero.src}
        alt={hero.alt}
        eyebrow="Agra · Est. 2016"
        title="The Taj Mahal, at the hour it is worth waking up for."
        subtitle="Private Golden Triangle journeys, same-day trips from Delhi, palace hotels and a photographer who knows where the light lands — planned by the people who grew up in its shadow."
        primaryHref="/tours"
        primaryLabel="See the journeys"
      />

      {/* ------------------------------- Creed ------------------------------- */}
      <Section>
        <p className="max-w-4xl font-display text-display-3 font-normal text-ink">
          Most Golden Triangle pages look identical because most of them are resold. This one is
          not — we drive it, guide it and photograph it ourselves, out of one small office in Agra.
        </p>
        <div className="mt-14 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-3">
          {creed.map((c, i) => (
            <div key={c.head} className="bg-bg px-6 py-8 sm:px-8 sm:py-10">
              <p aria-hidden className="text-label font-semibold uppercase text-accent">{String(i + 1).padStart(2, "0")}</p>
              <h2 className="mt-5 font-display text-2xl font-normal text-ink">{c.head}</h2>
              <p className="mt-3.5 text-sm leading-relaxed text-muted">{c.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ------------------------------ Journeys ----------------------------- */}
      <Section tone="surface">
        <SectionHeader
          eyebrow="The journeys"
          title="Six ways to do this properly"
          text="Every one is private, guided and priced per person with the drives and monument tickets written into the plan — no per-pax surprise halfway down the page."
          aside={<Link href="/tours" className="arrow-link">All {tours.length} tours <ArrowRight className="size-4" aria-hidden /></Link>}
        />
        <JourneyIndex tours={journeys} className="mt-14" />
      </Section>

      {/* ----------------------------- The letter ---------------------------- */}
      <FounderNote />

      {/* ---------------------------- Photography ---------------------------- */}
      <Section tone="ink" className="overflow-hidden">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-20">
          <div>
            <p className="border-t border-white/25 pt-4 text-label font-semibold uppercase text-highlight">Photography</p>
            <h2 className="mt-7 text-display-2 font-normal">We were photographers before we were a tour company.</h2>
            <p className="mt-6 max-w-lg leading-relaxed text-white/75">
              The marble changes colour four times between the gate opening and eight in the morning.
              Our photographers know which twenty minutes matter in every month of the year, which
              vantage points fill first, and how to frame the dome without four hundred strangers in
              the shot. Everything is handheld and ASI-compliant — no tripods, no drones, no promises
              we would have to break at the gate.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Link href="/tours#photography" className="btn-secondary border-white/45 text-white hover:border-white hover:bg-white hover:text-ink">
                Photography tours <ArrowRight className="size-4" aria-hidden />
              </Link>
              <Link href="/tours/taj-mahal-photoshoot" className="arrow-link text-white hover:text-highlight">
                Sessions from 30 minutes <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>
          </div>
          {/* An asymmetric three-plate arrangement: one tall, two stacked. Fixed aspect ratios, so it
              never reflows once the images land. */}
          <div className="grid grid-cols-2 gap-4">
            {(["taj-mahal-couple-1", "taj-mahal-detail-1", "taj-mahal-sunrise-2"] as const).map((id, i) => {
              const img = getImage(id);
              return (
                <div key={id} className={`figure ${i === 0 ? "row-span-2 h-full min-h-[22rem]" : "aspect-[4/3]"}`}>
                  <Image src={img.src} alt={img.alt} placeholder="blur" sizes="(min-width: 1024px) 28vw, 45vw" />
                </div>
              );
            })}
          </div>
        </div>
      </Section>

      {/* ------------------------------- Stays ------------------------------- */}
      <Section>
        <SectionHeader
          eyebrow="Where you sleep"
          title="Palaces, havelis and the honest modern option"
          text="A former royal residence on an island, a fort restored over years, or simply a very good room ten minutes from the gate. We hold it on your dates and confirm it before you pay anything."
          aside={<Link href="/stays" className="arrow-link">All {stays.length} hotels <ArrowRight className="size-4" aria-hidden /></Link>}
        />
        <div className="mt-14 grid gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {featuredStays.map((s) => <StayCard key={s.slug} stay={s} />)}
        </div>
        <p className="mt-12 max-w-3xl border-t border-border pt-5 text-xs leading-relaxed text-muted">{staysDisclosure}</p>
      </Section>

      {/* ------------------------ Services & availability -------------------- */}
      <Section tone="surface">
        <SectionHeader
          eyebrow="Services & availability"
          title="What we can arrange — and when we honestly can't"
          text="The column most operators leave off their services page. The Taj closes on Fridays, night viewing follows the moon, and a French-speaking guide in Agra needs more than a day's notice. Better to know now."
          aside={<Link href="/services" className="arrow-link">Everything we arrange <ArrowRight className="size-4" aria-hidden /></Link>}
        />
        <AvailabilityTable services={keyServices} className="mt-14" />

        <h3 className="mt-20 border-t border-border pt-4 text-label font-semibold uppercase text-accent">The cars</h3>
        <p className="mt-6 max-w-2xl font-display text-display-3 font-normal text-ink">Seats quoted as people plus luggage, not as registration capacity.</p>
        <FleetList fleet={fleet.slice(0, 4)} className="mt-10" />
        <Link href="/services#fleet" className="arrow-link mt-8">The full fleet and the train <ArrowRight className="size-4" aria-hidden /></Link>
      </Section>

      {/* ---------------------------- Destinations --------------------------- */}
      <Section>
        <SectionHeader
          eyebrow="Where you go"
          title="Four cities we know street by street"
          aside={<Link href="/destinations" className="arrow-link">All destinations <ArrowRight className="size-4" aria-hidden /></Link>}
        />
        <div className="mt-14 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          {destinations.map((d) => <DestinationCard key={d.slug} destination={d} />)}
        </div>
      </Section>

      {/* ------------------------------ Reviews ------------------------------ */}
      {reviews.length > 0 && (
        <Section tone="surface">
          <SectionHeader eyebrow="Reviews" title="What travellers say" aside={<Link href="/reviews" className="arrow-link">Read all <ArrowRight className="size-4" aria-hidden /></Link>} />
          <TestimonialGrid reviews={reviews} className="mt-14" />
        </Section>
      )}

      {/* ---------------------------- How it works --------------------------- */}
      <Section>
        <SectionHeader eyebrow="How it works" title="Three steps, no account, no card up front" />
        <ol className="mt-14 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.t} className="bg-bg px-6 py-8 sm:px-8 sm:py-10">
              <span aria-hidden className="font-display text-4xl font-normal leading-none text-accent">{String(i + 1).padStart(2, "0")}</span>
              <p className="mt-6 font-display text-xl font-normal text-ink">{s.t}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted">{s.d}</p>
            </li>
          ))}
        </ol>
        <TrustWall className="mt-6" />
        <StatStrip className="mt-20" />
      </Section>

      {/* ------------------------------- Guides ------------------------------ */}
      <Section tone="surface">
        <SectionHeader
          eyebrow="Before you go"
          title="The practical reading"
          aside={<Link href="/guides" className="arrow-link">All guides <ArrowRight className="size-4" aria-hidden /></Link>}
        />
        <div className="mt-14 grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {latestGuides(3).map((g) => <ArticleCard key={g.slug} guide={g} />)}
        </div>
      </Section>

      {/* -------------------------------- FAQ -------------------------------- */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <SectionHeader eyebrow="Questions" title="Asked most often" className="lg:sticky lg:top-32 lg:self-start" />
          <FaqList items={homeFaqs} />
        </div>
      </Section>

      <Section className="pt-0">
        <CtaCard title="Tell us where you'd like to go." text="Free to ask, no obligation, no account. We'll come back with a real day-by-day itinerary and an honest price." label="Plan my trip" />
      </Section>

      {/* Static category anchors so /tours#golden-triangle etc. exist even before hydration */}
      <div className="sr-only">{tourCategories.map((c) => <span key={c.key} id={c.key} />)}</div>
    </>
  );
}
