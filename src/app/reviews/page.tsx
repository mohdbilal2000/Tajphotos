import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { TestimonialGrid } from "@/components/sections/Testimonial";
import { StatStrip } from "@/components/sections/StatStrip";
import { CtaCard } from "@/components/sections/CtaCard";
import { reviews } from "@/content";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/config/site";

export const metadata: Metadata = buildMetadata({
  title: "Reviews",
  description: site.stats.ratingVerified
    ? "Genuine traveller reviews from Google and TripAdvisor."
    : "We're a young website with an established local business behind it — real reviews are on the way.",
  path: "/reviews",
});

export default function ReviewsPage() {
  return (
    <>
      <div className="border-b border-border bg-surface py-8"><div className="container-site"><Breadcrumbs items={[{ name: "Reviews", path: "/reviews" }]} /><h1 className="mt-2 text-3xl font-semibold sm:text-4xl">Traveller reviews</h1></div></div>
      <Section><StatStrip /></Section>
      <Section tone="surface">
        {reviews.length > 0 ? <TestimonialGrid reviews={reviews} /> : (
          <p className="mx-auto max-w-md text-center text-muted">
            We&apos;re just getting this page set up with real reviews from past travellers. If you&apos;ve toured with us,{" "}
            <a href="/review" className="link">leave one here</a> — it&apos;ll be one of the first.
          </p>
        )}
      </Section>
      <Section><CtaCard title="Ready to write your own review?" text="Book a tour with us and tell us how it went." className="mx-auto" /></Section>
    </>
  );
}
