import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, CalendarCheck, Wallet, BadgeCheck, MessageCircle, MapPin } from "lucide-react";
import { site } from "@/config/site";
import { tours, destinations, latestGuides, reviews, featuredTours, tourCategories, toursByCategory, stays, services, fleet, staysDisclosure } from "@/content";
import { getImage } from "@/content/images";
import { Hero } from "@/components/sections/Hero";
import { FounderNote } from "@/components/sections/FounderNote";
import { ExploreRails, type RailItem } from "@/components/sections/ExploreRails";
import { GoldenTriangleMap, type MapCity } from "@/components/sections/GoldenTriangleMap";
import { transport } from "@/content/facts";
import { Section, SectionHeader } from "@/components/ui/Section";
import { TourCard } from "@/components/tours/TourCard";
import { TourTabs } from "@/components/tours/TourTabs";
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

/**
 * Four promises, each one already made elsewhere on the site (terms, booking flow, contact hours) —
 * restated here as icon cards, the reference site's pattern. Nothing new is promised.
 */
const promises = [
  { icon: CalendarCheck, title: "Free cancellation", body: "Cancel free up to 48 hours before most tours. The exact window is on every tour card." },
  { icon: Wallet, title: "Small deposit, balance on arrival", body: "A deposit holds your car, guide and hotels. The rest is paid in Agra, in cash, card or transfer." },
  { icon: BadgeCheck, title: "Licensed local guides", body: "Ministry of Tourism-licensed guides, not drivers doubling as guides. No commission stops, ever." },
  { icon: MessageCircle, title: "A reply in about 15 minutes", body: `A real person on WhatsApp, ${site.contact.hoursNote.match(/\((.*)\)/)?.[1] ?? "7 AM – 11 PM IST"}. No ticket numbers.` },
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

function CardGrid({ list }: { list: typeof tours }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {list.map((t) => <TourCard key={t.slug} tour={t} />)}
    </div>
  );
}

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
  const railCategories: RailItem[] = tourCategories
    .map((c) => ({ c, t: toursByCategory(c.key)[0] }))
    .filter(({ t }) => Boolean(t))
    .map(({ c, t }) => {
      const img = getImage(t.heroImage);
      return { href: `/tours#${c.key}`, title: c.label, caption: c.blurb, image: img.src, alt: img.alt };
    });
  const railDestinations: RailItem[] = destinations.flatMap((d) =>
    [d.heroImage, ...d.gallery.slice(0, 1)].map((id) => {
      const img = getImage(id);
      return { href: `/destinations/${d.slug}`, title: d.name, caption: img.alt, image: img.src, alt: img.alt };
    }),
  );
  const cityCaption: Record<string, string> = { delhi: "The capital", agra: "Eternal romance", jaipur: "Royal heritage" };
  const mapCities: MapCity[] = ["delhi", "agra", "jaipur"]
    .map((slug) => destinations.find((d) => d.slug === slug))
    .filter((d): d is NonNullable<typeof d> => Boolean(d))
    .map((d) => {
      const img = getImage(d.heroImage);
      return {
        slug: d.slug,
        name: d.name,
        caption: cityCaption[d.slug] ?? d.region,
        tagline: d.tagline,
        highlights: d.attractions.slice(0, 3).map((a) => a.name.replace(/\s*\(.*\)$/, "")),
        image: img.src,
        alt: img.alt,
        lat: d.geo.latitude,
        lng: d.geo.longitude,
      };
    });
  const legs = `Delhi → Agra ${transport.delhiAgraCar.distanceKm} km · Agra → Jaipur ${transport.agraJaipur.distanceKm} km · Jaipur → Delhi ${transport.delhiJaipur.distanceKm} km`;
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

      {/* ------------------------------ Promises ----------------------------- */}
      <Section>
        <p className="max-w-4xl font-display text-display-3 font-normal text-ink">
          Most Golden Triangle pages look identical because most of them are resold. This one is
          not — we drive it, guide it and photograph it ourselves, out of one small office in Agra.
        </p>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {promises.map((p) => (
            <article key={p.title} className="group rounded-[1.375rem] border border-border bg-surface p-6 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-lift">
              <span className="flex size-11 items-center justify-center rounded-full bg-primary/8 text-primary ring-1 ring-primary/15 transition group-hover:bg-primary group-hover:text-primary-fg">
                <p.icon className="size-5" aria-hidden />
              </span>
              <h2 className="mt-5 font-sans text-base font-semibold text-ink">{p.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">{p.body}</p>
            </article>
          ))}
        </div>

        <div className="mt-14 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Where to</p>
            <h2 className="mt-3 font-display text-3xl font-normal text-ink">Where would you like to go?</h2>
          </div>
          <Link href="/destinations" className="arrow-link">All destinations <ArrowRight className="size-4" aria-hidden /></Link>
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {destinations.map((d) => {
            const img = getImage(d.heroImage);
            return (
              <Link key={d.slug} href={`/destinations/${d.slug}` as "/destinations"} className="group flex min-w-0 items-center gap-3 rounded-full border border-border bg-surface p-1.5 pr-4 shadow-soft transition hover:-translate-y-0.5 hover:border-ink/25">
                <span className="relative size-14 shrink-0 overflow-hidden rounded-full">
                  <Image src={img.src} alt="" fill sizes="56px" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-1 text-sm font-semibold text-ink"><MapPin className="size-3.5 text-accent" aria-hidden /> {d.name}</span>
                  <span className="mt-0.5 block truncate text-xs text-muted">{d.tagline}</span>
                </span>
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-bg text-ink transition group-hover:bg-primary group-hover:text-primary-fg"><ArrowUpRight className="size-4" aria-hidden /></span>
              </Link>
            );
          })}
        </div>
      </Section>

      {/* ------------------------------ Journeys ----------------------------- */}
      <Section tone="surface" id="journeys">
        <SectionHeader
          eyebrow="The journeys"
          title="Pick a trip, see the real price"
          text="Every one is private, guided and priced per person with the drives and monument tickets written into the plan — no per-pax surprise halfway down the page."
          aside={<Link href="/tours" className="arrow-link">All {tours.length} tours <ArrowRight className="size-4" aria-hidden /></Link>}
        />
        <div className="mt-12">
          <TourTabs
            tabs={[
              { key: "popular", label: "Most booked", count: journeys.length, content: <CardGrid list={journeys} /> },
              ...tourCategories
                .map((c) => ({ c, list: toursByCategory(c.key) }))
                .filter(({ list }) => list.length > 0)
                .map(({ c, list }) => ({ key: c.key, label: c.label, count: list.length, content: <CardGrid list={list} /> })),
            ]}
          />
        </div>
      </Section>

      {/* -------------------------- Places (rails) -------------------------- */}
      <section id="places" className="overflow-hidden py-20 sm:py-24 lg:py-28">
        <div className="container-site">
          <SectionHeader
            eyebrow="Explore"
            title="Places that stay with you"
            text="Every kind of trip we run, and every city we run it in."
            aside={<Link href="/tours" className="arrow-link">All tours <ArrowRight className="size-4" aria-hidden /></Link>}
          />
        </div>
        <ExploreRails top={railCategories} bottom={railDestinations} className="mt-12" />
      </section>

      {/* ------------------------- Golden Triangle map ------------------------ */}
      <Section tone="surface" id="route">
        <SectionHeader
          eyebrow="The signature route"
          title={<>Three cities. <em className="text-accent">One story.</em></>}
          text="Delhi's capital, Agra's Taj Mahal, Jaipur's Pink City. Tap a city to see what we'd show you there."
          align="center"
        />
        <div className="mt-12">
          <GoldenTriangleMap cities={mapCities} legs={legs} />
        </div>
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
                <div key={id} className={`figure rounded-2xl ${i === 0 ? "row-span-2 h-full min-h-[22rem]" : "aspect-[4/3]"}`}>
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
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
        <ol className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-border bg-border shadow-soft sm:grid-cols-3">
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
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
