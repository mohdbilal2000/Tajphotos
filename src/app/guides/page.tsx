import type { Metadata } from "next";
import { guides, latestGuides } from "@/content";
import { Section } from "@/components/ui/Section";
import { PageHeader } from "@/components/layout/PageHeader";
import { ArticleCard } from "@/components/guides/ArticleCard";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Travel Guides — Tickets, Timings & Practical Tips",
  description: "Practical, up-to-date guides on Taj Mahal tickets, Delhi–Agra logistics, best times to visit, and planning your Golden Triangle trip.",
  path: "/guides",
});

export default function GuidesPage() {
  const ordered = latestGuides(guides.length);
  return (
    <>
      <PageHeader
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
