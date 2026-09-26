import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { Tour } from "@/content/types";
import { getImage } from "@/content/images";
import { Price } from "@/components/ui/Price";
import { cn } from "@/lib/utils";

/**
 * A numbered index of journeys, the way a magazine lists its contents: number, title, route,
 * duration, price — one hairline-ruled row each, scannable in a single pass.
 *
 * The hover preview is pure CSS and pure layout: the plate lives *inside* its own row, absolutely
 * positioned into the right-hand margin and faded in by `group-hover`. There is no JavaScript, no
 * hover state, no mouse-position tracking and nothing to hydrate — which is the whole reason to
 * build it this way rather than as a client component with an active-index `useState`. Below `lg`
 * (where hover doesn't exist) each row simply carries a small inline thumbnail instead.
 */
export function JourneyIndex({ tours, className }: { tours: Tour[]; className?: string }) {
  return (
    <ol className={cn("border-t border-border", className)}>
      {tours.map((tour, i) => {
        const img = getImage(tour.heroImage);
        const route = [tour.startCity, ...(tour.endCity !== tour.startCity ? [tour.endCity] : [])].join(" → ");
        return (
          <li key={tour.slug} className="border-b border-border">
            <Link href={`/tours/${tour.slug}`} className="group relative flex items-center gap-5 py-6 sm:gap-8 sm:py-7">
              <span aria-hidden className="w-7 shrink-0 font-display text-sm tabular-nums text-muted transition-colors group-hover:text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className="min-w-0 flex-1">
                <h3 className="font-display text-2xl font-normal leading-tight text-ink transition-colors group-hover:text-accent sm:text-[1.75rem]">
                  {tour.shortTitle ?? tour.title}
                </h3>
                <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted">
                  <span>{tour.durationLabel}</span>
                  <span aria-hidden className="h-px w-3 bg-border" />
                  <span>{route}</span>
                  <span aria-hidden className="h-px w-3 bg-border" />
                  <span>{tour.groupSize.split(/[·\-]/)[0].trim()}</span>
                </p>
              </div>

              {/* Desktop: the plate that appears in the margin on hover. Centred on the row, allowed
                  to overflow it, and pointer-events-none so it can never eat the row's own click. */}
              <span
                aria-hidden
                className="pointer-events-none absolute right-[10.5rem] top-1/2 z-20 hidden h-[15rem] w-[11.5rem] -translate-y-1/2 scale-[0.97] overflow-hidden opacity-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-100 group-hover:opacity-100 lg:block"
              >
                <Image src={img.src} alt="" placeholder="blur" sizes="184px" className="size-full object-cover" />
              </span>

              {/* Mobile/tablet: a static thumbnail, because there is no hover to reveal anything. */}
              <span aria-hidden className="figure h-20 w-16 shrink-0 lg:hidden">
                <Image src={img.src} alt="" placeholder="blur" sizes="64px" />
              </span>

              <span className="hidden shrink-0 text-right lg:block">
                <span className="block text-sm text-ink">
                  <span className="text-muted">from </span><Price usd={tour.priceFrom.usd} className="font-medium" />
                </span>
                <span className="mt-1 block text-[0.625rem] uppercase tracking-[0.2em] text-muted">per person</span>
              </span>

              <ArrowRight aria-hidden className="hidden size-4 shrink-0 text-muted transition-all duration-300 group-hover:translate-x-1 group-hover:text-ink sm:block" />
            </Link>
          </li>
        );
      })}
    </ol>
  );
}
