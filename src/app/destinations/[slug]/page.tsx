import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { destinations, getDestination, toursForDestination, relatedGuides as relatedGuidesFn, guides as allGuides } from "@/content";
import { getImage } from "@/content/images";
import { Hero } from "@/components/sections/Hero";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { RichText, FaqList } from "@/components/content/RichText";
import { InlineText } from "@/components/content/RichText";
import { TourCardRow } from "@/components/tours/TourCard";
import { ArticleCard } from "@/components/guides/ArticleCard";
import { CtaCard } from "@/components/sections/CtaCard";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata, destinationJsonLd, faqJsonLd, graph, webPageJsonLd } from "@/lib/seo";
import { absoluteUrl, formatDate } from "@/lib/utils";
import { getImage as img } from "@/content/images";

export function generateStaticParams() {
  return destinations.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const d = getDestination(slug);
  if (!d) return {};
  return buildMetadata({ title: d.title, description: d.summary, path: `/destinations/${d.slug}`, image: img(d.heroImage).src.src, keywords: d.keywords });
}

export default async function DestinationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const d = getDestination(slug);
  if (!d) notFound();

  const heroImg = getImage(d.heroImage);
  const relatedTours = toursForDestination(d.slug);
  const explicitGuides = relatedGuidesFn(d.relatedGuides ?? []);
  // Fallback internal links: guides that point at a tour visiting this destination.
  const guides = explicitGuides.length ? explicitGuides : allGuides.filter((g) => g.relatedTours.some((s) => relatedTours.some((t) => t.slug === s))).slice(0, 3);

  return (
    <>
      <JsonLd data={graph(webPageJsonLd({ path: `/destinations/${d.slug}`, name: d.title, description: d.summary, dateModified: d.dateModified, mainEntityId: `${absoluteUrl(`/destinations/${d.slug}`)}#place` }), destinationJsonLd(d, heroImg.src.src), faqJsonLd(d.faqs))} />

      <Hero image={heroImg.src} alt={heroImg.alt} eyebrow={d.region} title={d.title} subtitle={d.tagline} primaryHref={`/tours#${d.slug}`} primaryLabel={`See ${d.name} tours`} />

      <div className="border-b border-border bg-surface py-4">
        <div className="container-site"><Breadcrumbs items={[{ name: "Destinations", path: "/destinations" }, { name: d.name, path: `/destinations/${d.slug}` }]} /></div>
      </div>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_20rem]">
          <div className="min-w-0">
            {/* Answer-first summary for answer engines / voice (see webPageJsonLd speakable). */}
            <p className="speakable mb-6 max-w-2xl text-lg text-ink/85">{d.summary}</p>
            <RichText blocks={d.intro} />
            <p className="mt-6 text-xs text-muted">Updated <time dateTime={d.dateModified}>{formatDate(d.dateModified)}</time></p>
          </div>
          <dl className="grid h-fit gap-3 rounded-2xl border border-border bg-surface p-6 sm:grid-cols-2 lg:grid-cols-1">
            {d.quickFacts.map((f) => (
              <div key={f.label}>
                <dt className="text-xs font-semibold uppercase tracking-wide text-muted">{f.label}</dt>
                <dd className="mt-0.5 text-sm font-medium text-ink"><InlineText text={f.value} /></dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      {relatedTours.length > 0 && (
        <Section tone="surface">
          <SectionHeader eyebrow="Tours" title={`${d.name} tours`} />
          <TourCardRow tours={relatedTours} className="mt-8" />
        </Section>
      )}

      <Section>
        <SectionHeader eyebrow="Top experiences" title={`What to see in ${d.name}`} />
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {d.attractions.map((a) => (
            <div key={a.name} className="rounded-2xl border border-border bg-surface p-5">
              <p className="font-semibold text-ink">{a.name}</p>
              <p className="mt-1.5 text-sm text-muted"><InlineText text={a.summary} /></p>
              {(a.timings || a.tickets) && (
                <p className="mt-2 text-xs text-muted">{a.timings}{a.timings && a.tickets && " · "}{a.tickets}</p>
              )}
              {a.tip && <p className="mt-2 text-xs font-medium text-accent">Tip: <InlineText text={a.tip} /></p>}
            </div>
          ))}
        </div>
      </Section>

      <Section tone="surface">
        <SectionHeader eyebrow="Practical" title="Best time to visit" />
        <RichText blocks={d.bestTime} className="mt-6" />
      </Section>

      <Section>
        <SectionHeader eyebrow="Practical" title="Getting there" />
        <RichText blocks={d.gettingThere} className="mt-6" />
      </Section>

      {guides.length > 0 && (
        <Section tone="surface">
          <SectionHeader eyebrow="Guides" title={`Read more about ${d.name}`} />
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{guides.map((g) => <ArticleCard key={g.slug} guide={g} />)}</div>
        </Section>
      )}

      <Section>
        <SectionHeader eyebrow="FAQ" title={`${d.name} — frequently asked questions`} />
        <FaqList items={d.faqs} className="mt-8" />
      </Section>

      <Section tone="surface">
        <CtaCard title={`Plan your ${d.name} trip`} text="Tell us your dates and we'll build an itinerary around them." className="mx-auto" />
      </Section>
    </>
  );
}
