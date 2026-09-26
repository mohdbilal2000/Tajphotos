import { Price } from "@/components/ui/Price";
import type { PriceTier } from "@/content/types";
import { cn } from "@/lib/utils";

// Every tour's own content already labels one real tier "most popular" (a genuine reflection of
// typical group size, not an invented decoy) — it just rendered with no visual distinction from
// any other row, wasting a well-evidenced pricing-page pattern the data already supported.
const isPopular = (note?: string) => Boolean(note?.toLowerCase().includes("most popular"));

export function PriceTable({ tiers, note, className }: { tiers: PriceTier[]; note?: string; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-2xl border border-border ${className ?? ""}`}>
      <table className="w-full text-sm">
        <thead className="bg-surface text-left">
          <tr>
            <th scope="col" className="px-4 py-3 font-semibold text-ink">Group size</th>
            <th scope="col" className="px-4 py-3 text-right font-semibold text-ink">Price per person</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {tiers.map((t) => {
            const popular = isPopular(t.note);
            return (
              <tr key={t.label} className={cn(popular && "bg-accent/10")}>
                <td className="px-4 py-3 text-ink/90">
                  <span className="inline-flex items-center gap-2">
                    {t.label}
                    {popular && <span className="bg-accent px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-accent-fg">Most popular</span>}
                  </span>
                  {t.note && <span className="block text-xs text-muted">{t.note}</span>}
                </td>
                <td className="px-4 py-3 text-right font-semibold text-accent"><Price usd={t.usd} /></td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {note && <p className="border-t border-border bg-surface/60 px-4 py-2.5 text-xs text-muted">{note}</p>}
    </div>
  );
}
