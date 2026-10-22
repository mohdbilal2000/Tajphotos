import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { site } from "@/config/site";
import { stays, staysDisclosure, stayTierLabel } from "@/content/stays";
import { getImage } from "@/content/images";
import { Section, SectionHeader } from "@/components/ui/Section";
import { StayCard } from "@/components/stays/StayCard";
import { CtaCard } from "@/components/sections/CtaCard";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { FaqList } from "@/components/content/RichText";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata, faqJsonLd, graph } from "@/lib/seo";
import { absoluteUrl } from "@/lib/utils";

const faqs = [
  {
    q: "Can you book palace hotels like Rambagh Palace or the Taj Lake Palace?",
    a: "Yes. We hold and confirm rooms at palace, heritage and modern luxury properties across Agra, Delhi, Jaipur, Udaipur, Jodhpur and Ranthambore as part of a private itinerary. We are not the hotel and take no affiliate commission — if a property is full on your dates, we tell you and offer the nearest genuine equivalent rather than quietly substituting a lesser room.",
  },
  {
    q: "How far ahead should I book a palace hotel in Rajasthan?",
    a: "Four to eight weeks for October to March, which is peak season across the Golden Triangle and Rajasthan. Suites at the best-known properties — the island rooms at Taj Lake Palace, the historic suites at Rambagh Palace — go earlier than that, and the shoulder weeks around Diwali and New Year are the hardest of the year.",
  },
  {
    q: "Which Agra hotel actually has a Taj Mahal view?",
    a: "The Oberoi Amarvilas is the only hotel in Agra where every guest room and suite faces the Taj Mahal; it sits roughly 600 metres from the east gate. Several other Agra hotels have a limited number of Taj-view rooms, which is a meaningful difference when you are booking one night — ask us to confirm the specific room category, not just the hotel.",
  },
  {
    q: "Do you charge a fee for booking hotels?",
    a: "Hotel rooms are quoted inside your itinerary price, at the rate the property confirms for your dates. We do not add a separate booking fee, and you are always free to book a hotel direct in your own name and have us plan the transport, guiding and photography around it.",
  },
  {
    q: "Are these hotels suitable for families with children?",
    a: "Several are, and the difference matters. ITC Mughal in Agra, The Leela Palace New Delhi and The Oberoi Udaivilas all have the space, pools and interconnecting rooms families need. Small heritage havelis such as Samode Haveli are beautiful but have stairs, courtyards and few connecting rooms, so we will steer you away from them with a toddler.",
  },
];

export const metadata: Metadata = buildMetadata({
  title: "Where You Stay: Palace, Heritage & Luxury Hotels We Book",
  description:
    "The palace, heritage and modern luxury hotels we book for private Golden Triangle and Rajasthan itineraries — Agra, Delhi, Jaipur, Udaipur, Jodhpur and Ranthambore. Rooms held and confirmed before you pay.",
  path: "/stays",
  keywords: ["luxury hotels Golden Triangle", "palace hotels Rajasthan", "Taj Mahal view hotel Agra", "heritage hotels India", "Taj Lake Palace", "Rambagh Palace", "Oberoi Amarvilas"],
});

const cityOrder = ["Agra", "New Delhi", "Jaipur", "Udaipur", "Jodhpur", "Sawai Madhopur (Ranthambore)"];

export default function StaysPage() {
  const hero = getImage("udaipur-city-palace-1");
  const byCity = cityOrder
    .map((city) => ({ city, list: stays.filter((s) => s.city === city) }))
    .filter((g) => g.list.length > 0);

  return (
    <>
      <JsonLd
        data={graph({
          "@type": "CollectionPage",
          "@id": absoluteUrl("/stays"),
          name: "Where You Stay",
          url: absoluteUrl("/stays"),
          description: metadata.description as string,
          about: stays.map((s) => ({ "@type": "Hotel", name: s.name, address: { "@type": "PostalAddress", addressLocality: s.city, addressCountry: "IN" } })),
        }, faqJsonLd(faqs))}
      />

      {/* An editorial masthead rather than a photo hero with text on it: the page is a list of
          buildings, so the plate sits beside the title instead of underneath it. */}
      <header className="border-b border-border bg-surface">
        <div className="container-site grid gap-10 pb-16 pt-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-16 lg:pb-20">
          <div>
            <Breadcrumbs items={[{ name: "Where you stay", path: "/stays" }]} />
            <p className="mt-10 border-t border-border pt-4 text-label font-semibold uppercase text-accent">Where you stay</p>
            <h1 className="mt-7 max-w-[20ch] text-display-1 font-normal">Rooms with a history.</h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted">
              A palace on its own island. A fort restored over years. A hotel where every window
              frames the Taj Mahal. And — because it is often the right answer — a very good, very
              calm room ten minutes from the gate, with the difference spent on the photography.
            </p>
          </div>
          <div className="figure aspect-[4/3] w-full rounded-3xl shadow-lift">
            <Image src={hero.src} alt={hero.alt} placeholder="blur" preload fetchPriority="high" sizes="(min-width: 1024px) 44vw, 92vw" />
          </div>
        </div>
      </header>

      {/* How the tiers work, stated plainly, because "luxury" on its own means nothing. */}
      <Section className="pb-0">
        <SectionHeader eyebrow="How to read this list" title="Four kinds of building, not four star ratings" />
        <dl className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {(Object.keys(stayTierLabel) as (keyof typeof stayTierLabel)[]).map((tier) => (
            <div key={tier} className="bg-bg px-6 py-7">
              <dt className="text-label font-semibold uppercase text-accent">{tier}</dt>
              <dd className="mt-3 text-sm leading-relaxed text-ink">{stayTierLabel[tier]}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-8 max-w-3xl text-sm leading-relaxed text-muted">
          There are no rates and no star counts on this page, deliberately. Rates move by season and
          by date, and a figure published here is one we could not honour in December. Ask and we
          will quote what the property confirms for your dates.
        </p>
      </Section>

      {byCity.map((group, gi) => (
        <Section key={group.city} tone={gi % 2 === 1 ? "surface" : "bg"}>
          <div className="flex items-end justify-between gap-6 border-t border-border pt-4">
            <h2 className="font-display text-display-3 font-normal">{group.city}</h2>
            <p className="text-label font-semibold uppercase text-muted">{group.list.length} {group.list.length === 1 ? "property" : "properties"}</p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {group.list.map((s, i) => (
              <StayCard key={s.slug} stay={s} eager={gi === 0 && i === 0} />
            ))}
          </div>
          {group.list[0]?.destination && (
            <Link href={`/destinations/${group.list[0].destination}` as "/destinations"} className="arrow-link mt-12">
              {group.city} travel guide <ArrowRight className="size-4" aria-hidden />
            </Link>
          )}
        </Section>
      ))}

      <Section tone="surface">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <SectionHeader eyebrow="Questions" title="Booking a hotel through us" className="lg:sticky lg:top-32 lg:self-start" />
          <FaqList items={faqs} />
        </div>
      </Section>

      <Section>
        <p className="mb-14 max-w-3xl border-t border-border pt-5 text-xs leading-relaxed text-muted">{staysDisclosure}</p>
        <CtaCard
          title="Tell us the dates and we'll tell you what's actually free."
          text={`Availability at the palace properties changes daily in season. Send your dates and we'll come back with what we can hold — and what we can't. ${site.contact.hoursNote}.`}
          label="Plan my trip"
        />
      </Section>
    </>
  );
}
