import { site } from "@/config/site";
import { tours, guides, destinations } from "@/content";
import { cn } from "@/lib/utils";

/**
 * Counts the site can prove by itself, not marketing numbers. A traveller count or "years" figure
 * only belongs here once it is real; the star rating appears once site.stats.ratingVerified is set
 * from the Google Business Profile.
 */
export function StatStrip({ className }: { className?: string }) {
  const stats = [
    { value: String(tours.length), label: "Private tours" },
    { value: String(destinations.length), label: "Cities covered" },
    { value: String(guides.length), label: "Free planning guides" },
    ...(site.stats.ratingVerified
      ? [{ value: `${site.stats.rating.value}`, label: `${site.stats.rating.count.toLocaleString()} reviews` }]
      : [{ value: "7 AM–11 PM", label: "WhatsApp, every day" }]),
  ];
  return (
    <dl className={cn("grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4", className)}>
      {stats.map((s) => (
        <div key={s.label} className="border-t border-border pt-5">
          <dt className="sr-only">{s.label}</dt>
          <dd className="font-display text-[2.75rem] font-normal leading-[1.05] tracking-tight text-ink">{s.value}</dd>
          <dd className="mt-3 text-label font-semibold uppercase text-muted">{s.label}</dd>
        </div>
      ))}
    </dl>
  );
}
