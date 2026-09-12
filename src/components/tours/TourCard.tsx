import Link from "next/link";
import Image from "next/image";
import { Clock, Users, Star } from "lucide-react";
import type { Tour } from "@/content/types";
import { getImage } from "@/content/images";
import { Badge } from "@/components/ui/Badge";
import { QuoteBadge } from "@/components/ui/QuoteBadge";
import { cn } from "@/lib/utils";

export function TourCard({ tour, className, priority }: { tour: Tour; className?: string; priority?: boolean }) {
  const img = getImage(tour.heroImage);
  return (
    <Link
      href={`/tours/${tour.slug}`}
      className={cn("group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift", className)}
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={img.src}
          alt={img.alt}
          placeholder="blur"
          priority={priority}
          sizes="(min-width: 1024px) 380px, (min-width: 640px) 45vw, 90vw"
          className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-3">
          {tour.badges?.[0] ? <Badge tone="glass">{tour.badges[0]}</Badge> : <span />}
          {tour.rating && (
            <Badge tone="glass" className="gap-1">
              <Star className="size-3 fill-current text-accent" aria-hidden /> {tour.rating.value.toFixed(1)}
            </Badge>
          )}
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <h3 className="text-lg font-semibold leading-snug text-ink">{tour.shortTitle ?? tour.title}</h3>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted">
          <span className="inline-flex items-center gap-1"><Clock className="size-3.5" aria-hidden /> {tour.durationLabel}</span>
          <span className="inline-flex items-center gap-1"><Users className="size-3.5" aria-hidden /> {tour.groupSize.split("·")[0].trim()}</span>
        </div>
        <p className="line-clamp-2 text-sm text-muted">{tour.tagline}</p>
        <div className="mt-auto flex items-end justify-between pt-2">
          <QuoteBadge />
          <span className="text-sm font-semibold text-primary underline decoration-primary/40 underline-offset-4 group-hover:decoration-primary">View tour</span>
        </div>
      </div>
    </Link>
  );
}

export function TourCardRow({ tours, className }: { tours: Tour[]; className?: string }) {
  return (
    <div className={cn("-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 scrollbar-none sm:mx-0 sm:grid sm:snap-none sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-3", className)}>
      {tours.map((t) => (
        <TourCard key={t.slug} tour={t} className="w-[78vw] shrink-0 snap-start sm:w-auto" />
      ))}
    </div>
  );
}
