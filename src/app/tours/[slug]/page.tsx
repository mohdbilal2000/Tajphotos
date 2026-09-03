import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CalendarCheck, ShieldCheck } from "lucide-react";
import { tours, getTour, destinations, relatedTours as relatedToursFn, relatedGuides as relatedGuidesFn, reviewsForTour } from "@/content";
import { getImage } from "@/content/images";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { PhotoGallery } from "@/components/PhotoGallery";
import { ChipRow } from "@/components/tours/ChipRow";
import { ItineraryTimeline } from "@/components/tours/ItineraryTimeline";
import { IncludedExcluded } from "@/components/tours/IncludedExcluded";
import { PriceTable } from "@/components/tours/PriceTable";
import { BookingCard } from "@/components/tours/BookingCard";
import { StickyMobileBar } from "@/components/tours/StickyMobileBar";
import { RichText, FaqList } from "@/components/content/RichText";
import { TourCardRow } from "@/components/tours/TourCard";
import { ArticleCard } from "@/components/guides/ArticleCard";
import { TestimonialGrid } from "@/components/sections/Testimonial";
import { CtaCard } from "@/components/sections/CtaCard";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata, tourJsonLd, faqJsonLd, graph } from "@/lib/seo";
import { Stars } from "@/components/ui/Stars";

export function generateStaticParams() {
  return tours.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tour = getTour(slug);
  if (!tour) return {};
  const img = getImage(tour.heroImage);
  return buildMetadata({
    title: tour.title,
    description: tour.summary,
    path: `/tours/${tour.slug}`,
    image: img.src.src,
    type: "article",
    publishedTime: tour.datePublished,
    modifiedTime: tour.dateModified,
    keywords: tour.keywords,
  });
}

export default async function TourPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tour = getTour(slug);
  if (!tour) notFound();

  const img = getImage(tour.heroImage);
  const destNames = tour.destinations.map((s) => destinations.find((d) => d.slug === s)?.name).filter((n): n is string => Boolean(n));
  const related = relatedToursFn(tour.relatedTours);
  const guides = relatedGuidesFn(tour.relatedGuides ?? []);
  const tourReviews = reviewsForTour(tour.slug);

  return (
    <>
      <JsonLd data={graph(tourJsonLd(tour, { image: img.src.src, destinationNames: destNames, reviews: tourReviews }), faqJsonLd(tour.faqs))} />

      <div className="border-b border-border bg-surface pb-6 pt-5">
        <div className="container-site">
          <Breadcrumbs items={[{ name: "Tours", path: "/tours" }, { name: tour.shortTitle ?? tour.title, path: `/tours/${tour.slug}` }]} />
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {tour.badges?.map((b) => <Badge key={b}>{b}</Badge>)}
            {tour.rating && (
              <span className="inline-flex items-center gap-1.5 text-sm text-ink/80">
                <Stars value={tour.rating.value} size="size-3.5" /> {tour.rating.value.toFixed(1)} ({tour.rating.count})
              </span>
            )}
          </div>
          <h1 className="mt-2 max-w-3xl text-3xl font-semibold sm:text-4xl lg:text-[2.75rem]">{tour.title}</h1>
          <p className="mt-2 max-w-2xl text-lg text-muted">{tour.tagline}</p>
        </div>
      </div>

      <div className="container-site py-10">
        <PhotoGallery images={[tour.heroImage, ...tour.gallery]} />
      </div>

      <div className="container-site grid gap-12 pb-16 lg:grid-cols-[1fr_22rem]">
        <div className="min-w-0 space-y-12">
          <div>
            <ChipRow tour={tour} />
            <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
              {tour.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2 text-sm text-ink/85"><ShieldCheck className="mt-0.5 size-4 shrink-0 text-primary/70" aria-hidden />{h}</li>
              ))}
            </ul>
          </div>

          <RichText blocks={tour.description} />

          <div>
            <h2 className="text-2xl font-semibold sm:text-3xl">Day-by-day itinerary</h2>
            <ItineraryTimeline days={tour.itinerary} className="mt-6" />
          </div>

          <div>
            <h2 className="text-2xl font-semibold sm:text-3xl">What&apos;s included</h2>
            <IncludedExcluded inclusions={tour.inclusions} exclusions={tour.exclusions} className="mt-6" />
          </div>

          {tour.priceTiers && (
            <div>
              <h2 className="text-2xl font-semibold sm:text-3xl">Pricing by group size</h2>
              <p className="mt-2 text-sm text-muted">{tour.priceNote}</p>
              <PriceTable tiers={tour.priceTiers} className="mt-6" />
            </div>
          )}

          {tourReviews.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold sm:text-3xl">Traveller reviews</h2>
              <TestimonialGrid reviews={tourReviews} className="mt-6" />
            </div>
          )}

          <div>
            <h2 className="text-2xl font-semibold sm:text-3xl">Frequently asked questions</h2>
            <FaqList items={tour.faqs} className="mt-6" />
          </div>

          {related.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold sm:text-3xl">You might also like</h2>
              <TourCardRow tours={related} className="mt-6" />
            </div>
          )}

          {guides.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold sm:text-3xl">Read before you go</h2>
              <div className="mt-6 grid gap-6 sm:grid-cols-2">{guides.map((g) => <ArticleCard key={g.slug} guide={g} />)}</div>
            </div>
          )}

          <CtaCard title="Want this tailored to your dates?" text="We'll tweak the pace, add stops, or combine it with another tour — free of charge." tourSlug={tour.slug} label="Make it yours" />
        </div>

        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-4">
            <BookingCard tour={tour} />
            <p className="flex items-center justify-center gap-1.5 text-center text-xs text-muted"><CalendarCheck className="size-3.5" aria-hidden /> Next available: check on WhatsApp</p>
          </div>
        </aside>
      </div>

      <StickyMobileBar tour={tour} />
    </>
  );
}
