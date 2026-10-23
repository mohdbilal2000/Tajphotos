import type { Metadata } from "next";
import { guides, latestGuides } from "@/content";
import { Section } from "@/components/ui/Section";
import { PageHeader } from "@/components/layout/PageHeader";
import { ArticleCard } from "@/components/guides/ArticleCard";
import { buildMetadata, graph, itemListJsonLd, webPageJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = buildMetadata({
  title: "Travel Guides — Tickets, Timings & Practical Tips",
  description: "Practical, up-to-date guides on Taj Mahal tickets, Delhi–Agra logistics, best times to visit, and planning your Golden Triangle trip.",
  path: "/guides",
});

export default function GuidesPage() {
  const ordered = latestGuides(guides.length);
  return (
    <>
      <JsonLd data={graph(webPageJsonLd({ path: "/guides", type: "CollectionPage", name: "Travel guides", description: "Practical guides on Taj Mahal tickets, timings and Golden Triangle planning." }), itemListJsonLd("Travel guides", ordered.map((g) => ({ name: g.title, path: `/guides/${g.slug}` }))))} />
      <PageHeader
        image="taj-mahal-detail-1"
        crumbs={[{ name: "Guides", path: "/guides" }]}
        eyebrow="The practical reading"
        title="Travel guides"
        text="Written and kept up to date by our Agra-based team — tickets, timings, closures, costs and the things nobody tells you until you are standing there."
      />
      <Section>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{ordered.map((g) => <ArticleCard key={g.slug} guide={g} />)}</div>
      </Section>
    </>
  );
}
