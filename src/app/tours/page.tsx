import type { Metadata } from "next";
import { tours, tourCategories, toursByCategory } from "@/content";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { TourCard } from "@/components/tours/TourCard";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "All Tours — Golden Triangle, Taj Mahal, Jaipur & Udaipur",
  description: "Private, guided tours of Agra, Delhi, Jaipur and Udaipur, from same-day Taj Mahal trips to multi-day Golden Triangle and Rajasthan itineraries. Priced honestly, per person.",
  path: "/tours",
});

export default function ToursPage() {
  return (
    <>
      <div className="border-b border-border bg-surface py-6"><div className="container-site"><Breadcrumbs items={[{ name: "Tours", path: "/tours" }]} /><h1 className="mt-2 text-3xl font-semibold sm:text-4xl">All tours</h1><p className="mt-2 max-w-2xl text-muted">{tours.length} private, guided tours across Agra, Delhi, Jaipur and Rajasthan.</p></div></div>
      {tourCategories.map((cat) => {
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
      })}
    </>
  );
}
