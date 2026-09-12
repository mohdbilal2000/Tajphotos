import type { Metadata } from "next";
import { guides, latestGuides } from "@/content";
import { Section } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ArticleCard } from "@/components/guides/ArticleCard";
import { buildMetadata } from "@/lib/seo";
import { requireSection } from "@/lib/sections";

export const metadata: Metadata = buildMetadata({
  title: "Travel Guides — Tickets, Timings & Practical Tips",
  description: "Practical, up-to-date guides on Taj Mahal tickets, Delhi–Agra logistics, best times to visit, and planning your Golden Triangle trip.",
  path: "/guides",
});

export default function GuidesPage() {
  requireSection("guides");
  const ordered = latestGuides(guides.length);
  return (
    <>
      <div className="border-b border-border bg-surface py-6"><div className="container-site"><Breadcrumbs items={[{ name: "Guides", path: "/guides" }]} /><h1 className="mt-2 text-3xl font-semibold sm:text-4xl">Travel guides</h1><p className="mt-2 max-w-2xl text-muted">Written and kept up to date by our Agra-based team.</p></div></div>
      <Section>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{ordered.map((g) => <ArticleCard key={g.slug} guide={g} />)}</div>
      </Section>
    </>
  );
}
