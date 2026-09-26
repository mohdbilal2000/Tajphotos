import { site } from "@/config/site";
import { cn } from "@/lib/utils";

export function StatStrip({ className }: { className?: string }) {
  const stats = [
    { value: site.stats.travellersServed, label: "Travellers hosted" },
    { value: site.stats.yearsOperating, label: "Years guiding Agra" },
    // Same rule as the AggregateRating JSON-LD in seo.ts: only show a specific star rating and
    // review count once site.stats.ratingVerified is true (a real number from Google/TripAdvisor)
    // — showing a placeholder "★4.9 · 1,150 reviews" as a confident stat, on a business with zero
    // real reviews in the codebase, is exactly the fabricated-social-proof problem this flag
    // exists to prevent on the schema side; it needs to prevent it here too.
    ...(site.stats.ratingVerified
      ? [{ value: `${site.stats.rating.value}`, label: `${site.stats.rating.count.toLocaleString()} reviews` }]
      : []),
    { value: site.stats.countries, label: "Countries travelled from" },
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
