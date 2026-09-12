import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Camera, ShieldCheck, Car, UserCheck, Sun, Heart, ImageIcon, Award, Clock3, MapPin } from "lucide-react";
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
import { publishes } from "@/lib/sections";
import type { BrandIconKey } from "@/config/brands/types";

export const metadata: Metadata = buildMetadata({
  title: `${site.name} — ${brand.tagline}`,
  description: site.description,
  path: "/",
});

/** Lucide components for the icon keys brand homepage copy is allowed to use. */
const ICONS: Record<BrandIconKey, typeof Camera> = {
  camera: Camera,
  userCheck: UserCheck,
  car: Car,
  shield: ShieldCheck,
  sun: Sun,
  heart: Heart,
  image: ImageIcon,
  award: Award,
  clock: Clock3,
  mapPin: MapPin,
};

const chooser = [
  { title: "Same-day Taj from Delhi", slug: "same-day", blurb: "Sunrise to sunset, back for dinner" },
  { title: "Taj sunrise + photoshoot", slug: "photography", blurb: "A professional photographer walks with you" },
  { title: "Golden Triangle, 3–7 days", slug: "golden-triangle", blurb: "Delhi, Agra and Jaipur, done right" },
  { title: "Rajasthan extensions", slug: "udaipur", blurb: "Udaipur, Jodhpur, Ranthambore and more" },
  { title: "Private car & driver", slug: "transfer", blurb: "Go at your own pace, no shopping stops" },
];



export default function Home() {
  // Each brand leads with a different photograph — four homepages opening on the same image is
  // a near-duplicate signal in its own right, and the strongest one a person actually notices.
  const hero = getImage(brand.home.heroImage);
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "WebPage", name: metadata.title, url: site.url, description: site.description }} />
      <Hero
        image={hero.src}
        alt={hero.alt}
        eyebrow={brand.home.heroEyebrow}
        title={brand.home.heroTitle}
        subtitle={brand.home.heroSubtitle}
      />

      {publishes("tours") && (
        <>
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
        </>
      )}

      <Section>
        <SectionHeader eyebrow={brand.home.whyEyebrow} title={brand.home.whyTitle} />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {brand.home.whyPoints.map((f) => {
            const Icon = ICONS[f.icon];
            return (
              <div key={f.title} className="rounded-2xl border border-border bg-surface p-6">
                <Icon className="size-6 text-primary" aria-hidden />
                <p className="mt-3 font-semibold text-ink">{f.title}</p>
                <p className="mt-1.5 text-sm text-muted">{f.text}</p>
              </div>
            );
          })}
        </div>
        <StatStrip className="mt-14 grid grid-cols-2 gap-8 border-t border-border pt-10 sm:grid-cols-4" />
      </Section>

      <Section tone="ink" className="overflow-hidden">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="eyebrow text-highlight">{brand.home.showcaseEyebrow}</p>
            <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">{brand.home.showcaseTitle}</h2>
            <p className="mt-4 max-w-lg text-white/80 leading-relaxed">{brand.home.showcaseText}</p>
            {/* Points at /quote rather than a tour anchor: two brands publish no tours at all, and
                this is the panel most likely to be the last thing read before someone converts. */}
            <ButtonLink href="/quote" variant="secondary" className="mt-6 bg-white text-ink hover:bg-white/90">{brand.quote.cta} <ArrowRight className="size-4" aria-hidden /></ButtonLink>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {brand.home.showcaseImages.map((id, i) => {
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

      {publishes("destinations") && (
        <Section>
          <SectionHeader eyebrow="Destinations" title="Where we take you" />
          <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {destinations.map((d) => <DestinationCard key={d.slug} destination={d} />)}
          </div>
        </Section>
      )}

      <Section tone="surface">
        <SectionHeader eyebrow="How it works" title={`Three steps to your ${brand.key === "tajphotographs" ? "print or licence" : "quote"}`} />
        <ol className="mt-10 grid gap-6 sm:grid-cols-3">
          {brand.home.steps.map((s, i) => (
            <li key={s.t} className="rounded-2xl border border-border bg-white p-6">
              <span className="font-display text-3xl font-semibold text-accent">{i + 1}</span>
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
        <FaqList items={brand.home.faqs} className="mx-auto mt-10 max-w-3xl" />
      </Section>

      <Section>
        <CtaCard title={brand.home.ctaTitle} text={brand.home.ctaText} label={brand.quote.cta} />
      </Section>

      {/* Static category anchors so /tours#golden-triangle etc. exist even before hydration */}
      {publishes("tours") && <div className="sr-only">{tourCategories.map((c) => <span key={c.key} id={c.key} />)}</div>}
    </>
  );
}
