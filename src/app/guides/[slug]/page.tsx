import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { guides, getGuide, relatedTours as relatedToursFn, relatedGuides as relatedGuidesFn, getTeamMember, guidesForCategory } from "@/content";
import { getImage } from "@/content/images";
import Image from "next/image";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { RichText, FaqList } from "@/components/content/RichText";
import { TourCardRow } from "@/components/tours/TourCard";
import { ArticleCard } from "@/components/guides/ArticleCard";
import { CtaCard } from "@/components/sections/CtaCard";
import { JsonLd } from "@/components/JsonLd";
import Link from "next/link";
import { buildMetadata, articleJsonLd, faqJsonLd, graph, webPageJsonLd } from "@/lib/seo";
import { absoluteUrl, blockWordCount, formatDate, readingTime } from "@/lib/utils";
import { CalendarClock, RefreshCcw } from "lucide-react";

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const g = getGuide(slug);
  if (!g) return {};
  const img = getImage(g.heroImage);
  return buildMetadata({ title: g.title, description: g.summary, path: `/guides/${g.slug}`, image: img.src.src, type: "article", publishedTime: g.datePublished, modifiedTime: g.dateModified, keywords: g.keywords });
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const g = getGuide(slug);
  if (!g) notFound();

  const heroImg = getImage(g.heroImage);
  const author = getTeamMember(g.author);
  const words = blockWordCount(g.body);
  const related = relatedToursFn(g.relatedTours);
  // Never leave a guide as an internal-linking dead end: fall back to guides in the same category.
  const explicitRelated = relatedGuidesFn(g.relatedGuides);
  const relatedArticles = explicitRelated.length ? explicitRelated : guidesForCategory(g.category).filter((x) => x.slug !== g.slug).slice(0, 3);

  return (
    <>
      <JsonLd
        data={graph(
          webPageJsonLd({ path: `/guides/${g.slug}`, name: g.title, description: g.summary, datePublished: g.datePublished, dateModified: g.dateModified, mainEntityId: `${absoluteUrl(`/guides/${g.slug}`)}#article` }),
          articleJsonLd(g, { image: heroImg.src.src, author, wordCount: words }),
          faqJsonLd(g.faqs),
        )}
      />

      <div className="relative flex min-h-[46vh] items-end overflow-hidden bg-ink">
        <Image src={heroImg.src} alt={heroImg.alt} preload fetchPriority="high" sizes="100vw" className="absolute inset-0 -z-20 size-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/50 to-ink/10" />
        <div className="container-site relative py-10 text-white">
          <Breadcrumbs items={[{ name: "Guides", path: "/guides" }, { name: g.title, path: `/guides/${g.slug}` }]} light />
          <h1 className="mt-3 max-w-3xl text-shadow-hero text-3xl font-semibold sm:text-5xl">{g.title}</h1>
          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/85">
            <span>By <Link href={`/about#${author.slug}`} rel="author" className="underline-offset-4 hover:underline">{author.name}</Link>, {author.role}</span>
            <span className="inline-flex items-center gap-1.5"><RefreshCcw className="size-3.5" aria-hidden /> Updated <time dateTime={g.dateModified}>{formatDate(g.dateModified)}</time></span>
            <span className="inline-flex items-center gap-1.5"><CalendarClock className="size-3.5" aria-hidden /> {readingTime(words)} min read</span>
          </div>
        </div>
      </div>

      <div className="container-site grid gap-12 py-12 lg:grid-cols-[1fr_18rem]">
        <article className="min-w-0 max-w-[720px]">
          <div className="rounded-2xl border border-accent/30 bg-accent/5 p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-accent">Key takeaways</p>
            <ul className="speakable mt-2.5 space-y-1.5 text-sm text-ink/90">
              {g.keyTakeaways.map((k, i) => <li key={i}>• {k}</li>)}
            </ul>
          </div>

          <RichText blocks={g.body} className="mt-8" />

          <div className="mt-10">
            <h2 className="text-2xl font-semibold">Frequently asked questions</h2>
            <FaqList items={g.faqs} className="mt-6" />
          </div>

          {g.sources && g.sources.length > 0 && (
            <div className="mt-8 border-t border-border pt-6 text-sm text-muted">
              <p className="font-semibold text-ink">Sources</p>
              <ul className="mt-2 space-y-1">
                {g.sources.map((s) => <li key={s.url}><a href={s.url} target="_blank" rel="noopener noreferrer" className="link">{s.title}</a></li>)}
              </ul>
            </div>
          )}
        </article>

        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-6">
            <div className="rounded-2xl border border-border bg-surface p-5">
              <p className="text-sm font-semibold text-ink"><Link href={`/about#${author.slug}`} rel="author" className="hover:underline">{author.name}</Link></p>
              <p className="text-xs text-muted">{author.role} · {author.years} yrs experience</p>
            </div>
            {related.length > 0 && (
              <div className="rounded-2xl border border-border bg-surface p-5">
                <p className="text-sm font-semibold text-ink">Related tour</p>
                {related.slice(0, 1).map((t) => (
                  <Link key={t.slug} href={`/tours/${t.slug}`} className="mt-2 block text-sm font-medium text-primary hover:underline">{t.shortTitle ?? t.title} →</Link>
                ))}
              </div>
            )}
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <Section tone="surface">
          <SectionHeader eyebrow="Book the trip" title="Tours that cover this" />
          <TourCardRow tours={related} className="mt-8" />
        </Section>
      )}

      {relatedArticles.length > 0 && (
        <Section>
          <SectionHeader eyebrow="Keep reading" title="Related guides" />
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{relatedArticles.map((rg) => <ArticleCard key={rg.slug} guide={rg} />)}</div>
        </Section>
      )}

      <Section tone="surface">
        <CtaCard title="Ready to book?" text="We'll turn this into a real itinerary with dates and prices." className="mx-auto" />
      </Section>
    </>
  );
}
