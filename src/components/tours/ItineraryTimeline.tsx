import { MapPin, UtensilsCrossed, BedDouble, Car } from "lucide-react";
import type { ItineraryDay } from "@/content/types";
import { InlineText } from "@/components/content/RichText";

export function ItineraryTimeline({ days, className }: { days: ItineraryDay[]; className?: string }) {
  const multiDay = days.length > 1;
  return (
    <ol className={`relative space-y-8 border-l border-border pl-8 sm:pl-10 ${className ?? ""}`}>
      {days.map((d) => (
        <li key={d.day} className="relative">
          <span className="absolute -left-[calc(2rem+1px)] flex size-8 items-center justify-center bg-primary font-display text-sm font-normal text-primary-fg sm:-left-[calc(2.5rem+1px)] sm:size-10">
            {d.day}
          </span>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">{multiDay ? `Day ${d.day}` : "Your day"}</p>
          <h3 className="mt-1 text-xl font-semibold text-ink">{d.title}</h3>
          <p className="mt-1.5 text-muted"><InlineText text={d.summary} /></p>
          <ul className="mt-3 space-y-1.5 text-sm text-ink/85">
            {d.details.map((line, i) => (
              <li key={i} className="flex gap-2"><MapPin className="mt-0.5 size-4 shrink-0 text-primary/70" aria-hidden /><InlineText text={line} /></li>
            ))}
          </ul>
          {(d.meals || d.stay || d.drive) && (
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-muted">
              {d.drive && <span className="inline-flex items-center gap-1.5"><Car className="size-3.5" aria-hidden /> {d.drive}</span>}
              {d.meals && <span className="inline-flex items-center gap-1.5"><UtensilsCrossed className="size-3.5" aria-hidden /> {d.meals}</span>}
              {d.stay && <span className="inline-flex items-center gap-1.5"><BedDouble className="size-3.5" aria-hidden /> {d.stay}</span>}
            </div>
          )}
        </li>
      ))}
    </ol>
  );
}
