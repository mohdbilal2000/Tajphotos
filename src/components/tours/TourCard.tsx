import Link from "next/link";
import Image from "next/image";
import type { Tour } from "@/content/types";
import { getImage } from "@/content/images";
import { Price } from "@/components/ui/Price";
import { cn } from "@/lib/utils";

/**
 * An image, a rule, and type under it. No card border, no shadow, no hover-lift, no badge cluster
 * over the photograph — the photograph is the product, and covering its corners with a pill is the
 * fastest way to make a real photo look like stock. Duration, group size and price live in one
 * hairline-ruled meta line instead of three separate chip rows.
 */
export function TourCard({ tour, className, preload }: { tour: Tour; className?: string; preload?: boolean }) {
  const img = getImage(tour.heroImage);
  return (
    <Link href={`/tours/${tour.slug}`} className={cn("group flex flex-col", className)}>
      <div className="figure aspect-[4/5] w-full">
        <Image
          src={img.src}
          alt={img.alt}
          placeholder="blur"
          preload={preload}
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 88vw"
        />
      </div>
      <div className="mt-5 flex flex-1 flex-col">
        <p className="text-label font-semibold uppercase text-accent">{tour.durationLabel}</p>
        <h3 className="mt-3 font-display text-2xl font-normal leading-tight text-ink transition-colors group-hover:text-accent">
          {tour.shortTitle ?? tour.title}
        </h3>
        <p className="mt-2.5 line-clamp-2 text-sm leading-relaxed text-muted">{tour.tagline}</p>
        <div className="mt-5 flex items-baseline justify-between border-t border-border pt-4">
          <p className="text-sm text-ink">
            <span className="text-muted">From </span>
            <Price usd={tour.priceFrom.usd} className="font-medium" />
            <span className="text-muted"> / person</span>
          </p>
          <span className="text-label font-semibold uppercase text-muted transition-colors group-hover:text-ink">View</span>
        </div>
      </div>
    </Link>
  );
}

export function TourCardRow({ tours, className }: { tours: Tour[]; className?: string }) {
  return (
    <div className={cn("-mx-5 flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-2 scrollbar-none sm:mx-0 sm:grid sm:snap-none sm:grid-cols-2 sm:gap-x-8 sm:gap-y-14 sm:overflow-visible sm:px-0 lg:grid-cols-3", className)}>
      {tours.map((t) => (
        <TourCard key={t.slug} tour={t} className="w-[76vw] shrink-0 snap-start sm:w-auto" />
      ))}
    </div>
  );
}
