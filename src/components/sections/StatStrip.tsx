import { site } from "@/config/site";

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
      ? [{ value: `★ ${site.stats.rating.value}`, label: `${site.stats.rating.count.toLocaleString()} reviews` }]
      : []),
    { value: site.stats.countries, label: "Countries visited from" },
  ];
  return (
    <dl className={className ? className : "grid grid-cols-2 gap-6 sm:grid-cols-4"}>
      {stats.map((s) => (
        <div key={s.label} className="text-center sm:text-left">
          <dt className="sr-only">{s.label}</dt>
          <dd className="font-display text-3xl font-semibold text-ink sm:text-4xl">{s.value}</dd>
          <dd className="mt-1 text-sm text-muted">{s.label}</dd>
        </div>
      ))}
    </dl>
  );
}
