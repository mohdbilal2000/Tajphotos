import { Price } from "@/components/ui/Price";
import type { PriceTier } from "@/content/types";

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
          {tiers.map((t) => (
            <tr key={t.label}>
              <td className="px-4 py-3 text-ink/90">{t.label}{t.note && <span className="block text-xs text-muted">{t.note}</span>}</td>
              <td className="px-4 py-3 text-right font-semibold text-accent"><Price usd={t.usd} /></td>
            </tr>
          ))}
        </tbody>
      </table>
      {note && <p className="border-t border-border bg-surface/60 px-4 py-2.5 text-xs text-muted">{note}</p>}
    </div>
  );
}
