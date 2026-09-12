import type { Metadata } from "next";
import Link from "next/link";
import { Search } from "lucide-react";
import { tours, tourCategories, toursByCategory } from "@/content";
import type { Tour } from "@/content/types";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { TourCard } from "@/components/tours/TourCard";
import { buildMetadata } from "@/lib/seo";
import { requireSection } from "@/lib/sections";

export const metadata: Metadata = buildMetadata({
  title: "All Tours — Golden Triangle, Taj Mahal, Jaipur & Udaipur",
  description: "Private, guided tours of Agra, Delhi, Jaipur and Udaipur, from same-day Taj Mahal trips to multi-day Golden Triangle and Rajasthan itineraries. Priced honestly, per person.",
  path: "/tours",
});

// The homepage WebSite JSON-LD advertises a SearchAction targeting /tours?q={search_term_string}
// (the "sitelinks search box" schema) — this page is what makes that claim true rather than
// aspirational. Reading `q` opts the route out of static generation, an acceptable tradeoff for a
// low-traffic utility page versus emitting structured data for a search feature that doesn't exist.
function matchesQuery(t: Tour, q: string) {
  const haystack = [t.title, t.tagline, t.summary, t.category, ...t.keywords, ...t.destinations].join(" ").toLowerCase();
  return q.toLowerCase().split(/\s+/).filter(Boolean).every((word) => haystack.includes(word));
}

export default async function ToursPage({ searchParams }: PageProps<"/tours">) {
  requireSection("tours");
  const { q } = await searchParams;
  const query = typeof q === "string" ? q.trim() : "";
  const results = query ? tours.filter((t) => matchesQuery(t, query)) : null;

  return (
    <>
      <div className="border-b border-border bg-surface py-6">
        <div className="container-site">
          <Breadcrumbs items={[{ name: "Tours", path: "/tours" }]} />
          <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">All tours</h1>
          <p className="mt-2 max-w-2xl text-muted">{tours.length} private, guided tours across Agra, Delhi, Jaipur and Rajasthan.</p>
          <form action="/tours" className="mt-5 flex max-w-md items-center gap-2 rounded-full border border-border bg-white pl-4 pr-1.5 py-1.5 focus-within:border-ink/30">
            <Search className="size-4 shrink-0 text-muted" aria-hidden />
            <label htmlFor="tour-search" className="sr-only">Search tours</label>
            <input
              id="tour-search"
              type="search"
              name="q"
              defaultValue={query}
              placeholder="Search tours — e.g. sunrise, Jaipur, photography"
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted"
            />
            <button type="submit" className="btn-primary px-4 py-2 text-sm">Search</button>
          </form>
        </div>
      </div>

      {results ? (
        <Section>
          <SectionHeader title={`${results.length} result${results.length === 1 ? "" : "s"} for "${query}"`} />
          {results.length ? (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((t) => <TourCard key={t.slug} tour={t} />)}
            </div>
          ) : (
            <p className="mt-6 text-muted">
              No tours matched that search. Try a destination (Agra, Jaipur, Udaipur) or a theme (sunrise, photography, private car) — or{" "}
              <Link href="/tours" className="link">browse every tour</Link> instead.
            </p>
          )}
        </Section>
      ) : (
        tourCategories.map((cat) => {
          const list = toursByCategory(cat.key);
          if (!list.length) return null;
          return (
            <Section key={cat.key} id={cat.key} className="scroll-mt-20">
              <SectionHeader eyebrow={cat.blurb} title={cat.label} />
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {list.map((t) => <TourCard key={t.slug} tour={t} />)}
              </div>
            </Section>
          );
        })
      )}
    </>
  );
}
