import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Camera, ShieldCheck, Car, UserCheck } from "lucide-react";
import { site } from "@/config/site";
import { tours, destinations, latestGuides, reviews, featuredTours, tourCategories } from "@/content";
import { getImage } from "@/content/images";
import { Hero } from "@/components/sections/Hero";
import { Section, SectionHeader } from "@/components/ui/Section";
import { TourCardRow } from "@/components/tours/TourCard";
import { DestinationCard } from "@/components/destinations/DestinationCard";
import { ArticleCard } from "@/components/guides/ArticleCard";
import { StatStrip } from "@/components/sections/StatStrip";
import { TrustWall } from "@/components/sections/TrustWall";
import { TestimonialGrid } from "@/components/sections/Testimonial";
import { CtaCard } from "@/components/sections/CtaCard";
import { FaqList } from "@/components/content/RichText";
import { ButtonLink } from "@/components/ui/Button";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { brand } from "@/config/brand";

export const metadata: Metadata = buildMetadata({
  title: `${site.name} — Golden Triangle Tours & Taj Mahal Photography, by Agra Locals`,
  description: site.description,
  path: "/",
});

const chooser = [
  { title: "Same-day Taj from Delhi", slug: "same-day", blurb: "Sunrise to sunset, back for dinner" },
  { title: "Taj sunrise + photoshoot", slug: "photography", blurb: "A professional photographer walks with you" },
  { title: "Golden Triangle, 3–7 days", slug: "golden-triangle", blurb: "Delhi, Agra and Jaipur, done right" },
  { title: "Rajasthan extensions", slug: "udaipur", blurb: "Udaipur, Jodhpur, Ranthambore and more" },
  { title: "Private car & driver", slug: "transfer", blurb: "Go at your own pace, no shopping stops" },
];

const homeFaqs = [
  { q: "Is the Taj Mahal closed on Fridays?", a: "Yes. The Taj Mahal is closed to tourists every Friday, though local Muslims may enter for prayers. We route Friday visitors to Agra Fort, Mehtab Bagh and Fatehpur Sikri instead, or suggest a nearby day." },
  { q: "How far is Agra from Delhi, and how do you get there?", a: "Agra is about 230 km from Delhi, roughly 3–4 hours by private car on the Yamuna Expressway, or 1 hour 40 minutes on the Gatimaan Express train (which does not run on Fridays)." },
  { q: "Do you really include a professional photographer?", a: "On our photography and sunrise tours, yes — a local photographer walks with you at the Taj Mahal and hands over edited photos afterwards. It's optional on standard tours and can always be added." },
  { q: "Is it safe to book directly instead of through a marketplace?", a: "We're a registered Agra-based operator with licensed guides and named team members, not an anonymous listing. You can reach us on WhatsApp before paying anything, and we take a modest deposit with the balance due on arrival." },
];

export default function Home() {
  const hero = getImage("taj-mahal-sunrise-1");
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "WebPage", name: metadata.title, url: site.url, description: site.description }} />
      <Hero
        image={hero.src}
        alt={hero.alt}
        eyebrow="Agra-based · Licensed local guides"
        title="Private Taj Mahal & Golden Triangle tours, photographed beautifully"
        subtitle="Same-day trips from Delhi, sunrise tours and tailor-made Rajasthan journeys — with a professional photographer on request and no shopping-stop detours, ever."
      />

      <Section>
        <SectionHeader eyebrow="Choose your trip" title="Where would you like to start?" align="center" className="mx-auto" />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {chooser.map((c) => (
            <Link key={c.slug} href={`/tours#${c.slug}`} className="group flex flex-col justify-between rounded-2xl border border-border bg-surface p-5 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lift">
              <div>
                <p className="font-display text-lg font-semibold text-ink">{c.title}</p>
                <p className="mt-1.5 text-sm text-muted">{c.blurb}</p>
              </div>
              <ArrowRight className="mt-4 size-4 text-primary transition-transform group-hover:translate-x-1" aria-hidden />
            </Link>
          ))}
        </div>
      </Section>

      <Section tone="surface">
        <SectionHeader eyebrow="Best sellers" title="Our most-loved tours" text="Private, guided, and priced honestly — no per-pax surprises mid-page." />
        <TourCardRow tours={(featuredTours().length ? featuredTours() : tours).slice(0, 6)} className="mt-10" />
        <div className="mt-8 text-center"><ButtonLink href="/tours" variant="secondary">Browse all tours <ArrowRight className="size-4" aria-hidden /></ButtonLink></div>
      </Section>

      <Section>
        <SectionHeader eyebrow="Why Taj Photos" title="A small team that actually shows up" />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Camera, title: "Own photographer", text: "Not an add-on afterthought — photography is what we started with." },
            { icon: UserCheck, title: "Licensed guides", text: "Ministry of Tourism registered, not a driver moonlighting as a guide." },
            { icon: Car, title: "Cars under 3 years old", text: "Air-conditioned, seatbelts checked, no roadside surprises." },
            { icon: ShieldCheck, title: "No shopping stops", text: "We're not paid commission to detour you through emporiums." },
          ].map((f) => (
            <div key={f.title} className="rounded-2xl border border-border bg-surface p-6">
              <f.icon className="size-6 text-primary" aria-hidden />
              <p className="mt-3 font-semibold text-ink">{f.title}</p>
              <p className="mt-1.5 text-sm text-muted">{f.text}</p>
            </div>
          ))}
        </div>
        <StatStrip className="mt-14 grid grid-cols-2 gap-8 border-t border-border pt-10 sm:grid-cols-4" />
      </Section>

      <Section tone="ink" className="overflow-hidden">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="eyebrow text-highlight">Taj Mahal photography</p>
            <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">Every edited photo, done by someone who knows the light</h2>
            <p className="mt-4 max-w-lg text-white/80 leading-relaxed">Our photographers know exactly where the golden light lands on the marble each month, and how to get you the shot without the crowds. Sunrise, couples, families, proposals — we&apos;ve done it hundreds of times.</p>
            <ButtonLink href="/tours#photography" variant="secondary" className="mt-6 bg-white text-ink hover:bg-white/90">See photography tours <ArrowRight className="size-4" aria-hidden /></ButtonLink>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {["taj-mahal-couple-1", "taj-mahal-detail-1", "taj-mahal-sunrise-2"].map((id, i) => {
              const img = getImage(id);
              return (
                <div key={id} className={`relative overflow-hidden rounded-2xl ${i === 0 ? "col-span-3 aspect-[16/10]" : "aspect-square"}`}>
                  <Image src={img.src} alt={img.alt} placeholder="blur" sizes="(min-width: 1024px) 30vw, 45vw" className="size-full object-cover" />
                </div>
              );
            })}
          </div>
        </div>
      </Section>

      {reviews.length > 0 && (
        <Section tone="surface">
          <SectionHeader eyebrow="Reviews" title="What travellers say" align="center" className="mx-auto" />
          <TestimonialGrid reviews={reviews} className="mt-10" />
          <div className="mt-8 text-center"><ButtonLink href="/reviews" variant="secondary">Read all reviews <ArrowRight className="size-4" aria-hidden /></ButtonLink></div>
        </Section>
      )}

      <Section>
        <SectionHeader eyebrow="Destinations" title="Where we take you" />
        <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {destinations.map((d) => <DestinationCard key={d.slug} destination={d} />)}
        </div>
      </Section>

      <Section tone="surface">
        <SectionHeader eyebrow="How it works" title="Three steps to your itinerary" />
        <ol className="mt-10 grid gap-6 sm:grid-cols-3">
          {[
            { n: "1", t: "Tell us your dates", d: "A two-minute WhatsApp message or form — no account needed." },
            { n: "2", t: "Get a price in ~15 minutes", d: "A real itinerary from a real person, during our hours." },
            { n: "3", t: "Confirm with a small deposit", d: "Pay the rest on arrival. Free cancellation up to 48 hours before." },
          ].map((s) => (
            <li key={s.n} className="rounded-2xl border border-border bg-white p-6">
              <span className="font-display text-3xl font-semibold text-accent">{s.n}</span>
              <p className="mt-2 font-semibold text-ink">{s.t}</p>
              <p className="mt-1.5 text-sm text-muted">{s.d}</p>
            </li>
          ))}
        </ol>
        <TrustWall className="mt-10" />
      </Section>

      <Section>
        <SectionHeader eyebrow="Plan ahead" title="Practical guides before you go" />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {latestGuides(3).map((g) => <ArticleCard key={g.slug} guide={g} />)}
        </div>
      </Section>

      <Section tone="surface">
        <SectionHeader eyebrow="FAQ" title="Common questions" align="center" className="mx-auto" />
        <FaqList items={homeFaqs} className="mx-auto mt-10 max-w-3xl" />
      </Section>

      <Section>
        <CtaCard title="Tell us where you'd like to go" text="Free to ask, no obligation — we'll reply with a real itinerary and honest price." label={brand.quote.cta} />
      </Section>

      {/* Static category anchors so /tours#golden-triangle etc. exist even before hydration */}
      <div className="sr-only">{tourCategories.map((c) => <span key={c.key} id={c.key} />)}</div>
    </>
  );
}
