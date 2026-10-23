import Link from "next/link";
import Image from "next/image";
import { Clock, MapPin, Star, Sparkles, ArrowRight, ArrowUpRight, BadgeCheck, CalendarCheck, Car, Ticket, Camera, MessageCircle, BookOpen } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Tour } from "@/content/types";
import { getImage } from "@/content/images";
import { destinations, guides } from "@/content";
import { Tilt } from "@/components/ui/Tilt";
import { ShortlistButton } from "@/components/shortlist/ShortlistButton";
import { Price } from "@/components/ui/Price";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { site } from "@/config/site";
import { cn } from "@/lib/utils";
import { cancellationShort, priceBasis } from "@/lib/tour";

/**
 * Up to three benefits, each derived from the tour's own data — never a blanket claim stamped on
 * every card. A perk appears only if the tour's `inclusions` or `cancellation` text supports it, so
 * a photoshoot (no car) and a car hire (no guide) show different, accurate lists.
 */
function perksFor(tour: Tour): { icon: LucideIcon; label: string }[] {
  const inc = tour.inclusions.join(" ").toLowerCase();
  const out: { icon: LucideIcon; label: string }[] = [];
  if (/photographer/.test(inc)) out.push({ icon: Camera, label: "Professional photographer" });
  if (/guide/.test(inc)) out.push({ icon: BadgeCheck, label: "Private guide included" });
  if (/(car|chauffeur|vehicle)/.test(inc) && !/not included/.test(tour.transport.toLowerCase())) out.push({ icon: Car, label: "Private car & driver" });
  if (/entry ticket/.test(inc) && !/not included|payable separately/.test(inc.match(/[^.]*entry ticket[^.]*/)?.[0] ?? "")) out.push({ icon: Ticket, label: "Monument tickets included" });
  const cancel = cancellationShort(tour);
  // Cancellation is the purchase-risk answer, so it always keeps a slot when the tour offers it.
  const top = out.slice(0, cancel ? 2 : 3);
  if (cancel) top.push({ icon: CalendarCheck, label: cancel });
  return top;
}

/**
 * Journey card — our own implementation of the booking-card pattern, content entirely ours:
 * image with an icon badge and a hover "View tour" pill → duration (+ rating only when real) →
 * title → tagline → map-pin route → divider → derived benefits → "Starting from" price row with a
 * round arrow. The whole card is one click target via a stretched title link; the WhatsApp button
 * sits above it (`relative z-10`) because links cannot nest.
 */
export function TourCard({ tour, className, preload }: { tour: Tour; className?: string; preload?: boolean }) {
  const img = getImage(tour.heroImage);
  // Start city first (a Delhi day trip to Agra should read "Delhi · Agra", not just "Agra"), then the
  // destinations in visiting order, de-duplicated.
  const route = [...new Set([tour.startCity, ...tour.destinations.map((s) => destinations.find((d) => d.slug === s)?.name ?? s)])]
    .filter((n) => n && !/anywhere/i.test(n))
    .join(" · ");
  const perks = perksFor(tour);
  const name = tour.shortTitle ?? tour.title;
  // One related guide per card, so a tour is never a dead end: the reading that answers the
  // questions people have before booking it (tickets, timings, what to wear).
  const guide = tour.relatedGuides?.map((g) => guides.find((x) => x.slug === g)).find(Boolean);
  return (
    <Tilt className={className}>
    <article className={cn("group relative flex h-full flex-col overflow-hidden rounded-[1.375rem] border border-border/80 bg-surface shadow-soft transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:shadow-lift")}>
      <div className="relative m-2 aspect-[4/3] overflow-hidden rounded-[1rem] bg-surface-2">
        <Image
          src={img.src}
          alt={img.alt}
          placeholder="blur"
          preload={preload}
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 88vw"
          className="size-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-100" />
        {tour.badges?.[0] && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-[0.6875rem] font-semibold text-ink shadow-sm backdrop-blur">
            <Sparkles className="size-3 text-accent" aria-hidden /> {tour.badges[0]}
          </span>
        )}
        <ShortlistButton item={{ slug: tour.slug, name, usd: tour.priceFrom.usd }} className="absolute right-3 top-3" />
        <span aria-hidden className="absolute bottom-3 right-3 inline-flex translate-y-2 items-center gap-1.5 rounded-full bg-white/90 px-3.5 py-2 text-xs font-semibold text-ink opacity-0 backdrop-blur transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          View tour <ArrowUpRight className="size-3.5" />
        </span>
      </div>

      <div className="flex flex-1 flex-col px-5 pb-5 pt-3">
        <div className="flex items-center gap-4 text-xs text-muted">
          <span className="inline-flex items-center gap-1.5"><Clock className="size-3.5" aria-hidden /> {tour.durationLabel}</span>
          {tour.rating && (
            <span className="inline-flex items-center gap-1">
              <Star className="size-3.5 fill-highlight text-highlight" aria-hidden />
              <span className="font-semibold text-ink">{tour.rating.value.toFixed(1)}</span> ({tour.rating.count})
            </span>
          )}
        </div>

        <h3 className="mt-2.5 font-display text-[1.375rem] font-normal leading-tight text-ink">
          <Link href={`/tours/${tour.slug}`} className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none">
            {name}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">{tour.tagline}</p>

        {route && (
          <p className="mt-3 flex items-center gap-1.5 text-xs font-medium text-ink/80">
            <MapPin className="size-3.5 shrink-0 text-accent" aria-hidden /> <span className="truncate">{route}</span>
          </p>
        )}

        {perks.length > 0 && (
          <ul className="mt-4 space-y-2 border-t border-border pt-4 text-[0.8125rem] text-ink/85">
            {perks.map((p) => (
              <li key={p.label} className="flex items-center gap-2.5">
                <p.icon className="size-4 shrink-0 text-primary" aria-hidden /> {p.label}
              </li>
            ))}
          </ul>
        )}

        {guide && (
          <Link href={`/guides/${guide.slug}`} className="relative z-10 mt-4 flex items-start gap-2 rounded-xl bg-bg px-3 py-2.5 text-xs leading-snug text-muted transition hover:text-ink">
            <BookOpen className="mt-px size-3.5 shrink-0 text-accent" aria-hidden />
            <span><span className="font-semibold text-ink">Read before you go:</span> {guide.title}</span>
          </Link>
        )}

        <div className="mt-auto flex items-end justify-between gap-3 pt-5">
          <div>
            <p className="text-[0.625rem] font-semibold uppercase tracking-[0.16em] text-muted">Starting from</p>
            <p className="mt-0.5 text-[1.375rem] font-bold leading-none text-ink">
              <Price usd={tour.priceFrom.usd} /> <span className="text-xs font-normal text-muted">{/per day/i.test(tour.priceNote) ? "/ day" : "/ person"}</span>
            </p>
            {priceBasis(tour) && priceBasis(tour) !== "per day" && <p className="mt-1 text-[0.6875rem] text-muted">Based on {priceBasis(tour)}</p>}
          </div>
          <div className="relative z-10 flex items-center gap-2">
            <WhatsAppLink
              message={`Hi ${site.name}! I'm interested in "${name}". Is it available on my dates?`}
              event="whatsapp_click_card"
              className="inline-flex size-11 items-center justify-center rounded-full border border-border bg-bg text-whatsapp-ink transition hover:border-whatsapp-ink hover:bg-whatsapp-ink hover:text-white"
              aria-label={`Ask about ${name} on WhatsApp`}
            >
              <MessageCircle className="size-[1.125rem]" aria-hidden />
            </WhatsAppLink>
            <span aria-hidden className="inline-flex size-11 items-center justify-center rounded-full bg-primary text-primary-fg transition-transform duration-300 group-hover:translate-x-0.5 group-hover:bg-primary-hover">
              <ArrowRight className="size-[1.125rem]" />
            </span>
          </div>
        </div>
      </div>
    </article>
    </Tilt>
  );
}

export function TourCardRow({ tours, className }: { tours: Tour[]; className?: string }) {
  return (
    <div className={cn("-mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 scrollbar-none sm:mx-0 sm:grid sm:snap-none sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0 lg:grid-cols-3", className)}>
      {tours.map((t) => (
        <TourCard key={t.slug} tour={t} className="w-[82vw] shrink-0 snap-start sm:w-auto" />
      ))}
    </div>
  );
}
