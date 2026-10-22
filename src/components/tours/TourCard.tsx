import Link from "next/link";
import Image from "next/image";
import { Clock, Users, MapPin, Check, MessageCircle, Star } from "lucide-react";
import type { Tour } from "@/content/types";
import { getImage } from "@/content/images";
import { tourCategories } from "@/content";
import { Price } from "@/components/ui/Price";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { site } from "@/config/site";
import { cn } from "@/lib/utils";

/** "Free cancellation up to 48 hours before…" → "Free cancellation · 48h". Null if the policy isn't a free one. */
function cancellationShort(text: string) {
  if (!/free cancellation/i.test(text)) return null;
  const h = text.match(/(\d+)\s*hours?/i)?.[1];
  return h ? `Free cancellation · ${h}h before` : "Free cancellation";
}

/**
 * Booking-site card: image on top with badges, then location, title, icon meta, a truthful perk line
 * and a price/CTA footer.
 *
 * The whole card is clickable through a stretched link on the title (`after:absolute inset-0`) rather
 * than by wrapping everything in <a>, because the WhatsApp button inside is a second link and links
 * can't nest. The WhatsApp button sits above the stretched area with `relative z-10`.
 *
 * What it deliberately doesn't copy from OTA cards: invented strike-through "was" prices and star
 * ratings. Stars render only when the tour carries a real `rating`; there's no discount field at all.
 */
export function TourCard({ tour, className, preload }: { tour: Tour; className?: string; preload?: boolean }) {
  const img = getImage(tour.heroImage);
  const category = tourCategories.find((c) => c.key === tour.category)?.label;
  const perk = cancellationShort(tour.cancellation);
  const route = tour.endCity !== tour.startCity ? `${tour.startCity} → ${tour.endCity}` : tour.startCity;
  return (
    <article className={cn("group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift", className)}>
      <div className="relative aspect-[4/3] overflow-hidden bg-surface-2">
        <Image
          src={img.src}
          alt={img.alt}
          placeholder="blur"
          preload={preload}
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 88vw"
          className="size-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
        />
        <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-2 p-3">
          {tour.badges?.[0] ? (
            <span className="rounded-full bg-white/95 px-2.5 py-1 text-[0.6875rem] font-semibold text-ink shadow-sm">{tour.badges[0]}</span>
          ) : <span />}
          {category && <span className="rounded-full bg-ink/70 px-2.5 py-1 text-[0.6875rem] font-medium text-white backdrop-blur-sm">{category}</span>}
        </div>
        <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-primary px-2.5 py-1 text-[0.6875rem] font-semibold text-primary-fg">
          <Clock className="size-3" aria-hidden /> {tour.durationLabel}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="flex items-center gap-1.5 text-xs text-muted">
          <MapPin className="size-3.5 text-accent" aria-hidden /> {route}
        </p>
        <h3 className="mt-2 line-clamp-2 font-sans text-[1.0625rem] font-semibold leading-snug tracking-tight text-ink">
          <Link href={`/tours/${tour.slug}`} className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none">
            {tour.shortTitle ?? tour.title}
          </Link>
        </h3>

        {tour.rating && (
          <p className="mt-2 flex items-center gap-1 text-xs text-muted">
            <Star className="size-3.5 fill-highlight text-highlight" aria-hidden />
            <span className="font-semibold text-ink">{tour.rating.value.toFixed(1)}</span> ({tour.rating.count})
          </p>
        )}

        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">{tour.tagline}</p>

        <ul className="mt-4 space-y-1.5 text-xs text-ink/85">
          <li className="flex min-w-0 items-center gap-2"><Users className="size-3.5 shrink-0 text-muted" aria-hidden /> <span className="truncate">{tour.groupSize.replace(/\s-\s/, " · ")}</span></li>
          {perk && <li className="flex items-center gap-2 text-success"><Check className="size-3.5" aria-hidden /> {perk}</li>}
        </ul>

        <div className="mt-auto pt-5" />
        <div className="flex items-end justify-between gap-3 border-t border-border pt-4">
          <div>
            <p className="text-[0.6875rem] uppercase tracking-wider text-muted">From</p>
            <p className="text-xl font-bold leading-tight text-ink">
              <Price usd={tour.priceFrom.usd} /> <span className="text-xs font-normal text-muted">/ person</span>
            </p>
          </div>
          <div className="relative z-10 flex items-center gap-2">
            <WhatsAppLink
              message={`Hi ${site.name}! I'm interested in "${tour.shortTitle ?? tour.title}". Is it available on my dates?`}
              event="whatsapp_click_card"
              className="inline-flex size-10 items-center justify-center rounded-xl bg-whatsapp-ink text-white transition hover:brightness-110"
              aria-label={`Ask about ${tour.shortTitle ?? tour.title} on WhatsApp`}
            >
              <MessageCircle className="size-4" aria-hidden />
            </WhatsAppLink>
            <span aria-hidden className="inline-flex h-10 items-center rounded-xl bg-primary px-4 text-sm font-semibold text-primary-fg transition group-hover:bg-primary-hover">
              View
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}

export function TourCardRow({ tours, className }: { tours: Tour[]; className?: string }) {
  return (
    <div className={cn("-mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 scrollbar-none sm:mx-0 sm:grid sm:snap-none sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0 lg:grid-cols-3", className)}>
      {tours.map((t) => (
        <TourCard key={t.slug} tour={t} className="w-[80vw] shrink-0 snap-start sm:w-auto" />
      ))}
    </div>
  );
}
