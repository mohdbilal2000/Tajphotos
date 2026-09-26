import type { Availability, Service } from "@/content/types";
import { availabilityLabel, availabilityNote } from "@/content/services";
import { InlineText } from "@/components/content/RichText";
import { cn } from "@/lib/utils";

/**
 * The honest version of a services list: alongside what we arrange, the days it is genuinely
 * available and how far ahead we need to know. Most operators publish the first column only, which
 * is how travellers end up asking for a Friday sunrise or a night viewing on a new moon.
 *
 * Rendered as a real <table> on desktop (this is tabular data — three comparable attributes per
 * row — and a screen reader should be able to navigate it as one) and as ruled blocks below `md`,
 * where a four-column table would either overflow or shrink to unreadable.
 */

const dot: Record<Availability, string> = {
  daily: "bg-success",
  "except-friday": "bg-accent",
  seasonal: "bg-warning",
  "on-request": "bg-primary",
};

function AvailabilityCell({ value }: { value: Availability }) {
  return (
    <span className="inline-flex items-start gap-2">
      <span aria-hidden className={cn("mt-[0.45rem] size-1.5 shrink-0 rounded-full", dot[value])} />
      <span>
        <span className="block text-ink">{availabilityLabel[value]}</span>
        <span className="mt-1 block text-xs text-muted">{availabilityNote[value]}</span>
      </span>
    </span>
  );
}

export function AvailabilityTable({ services, className }: { services: Service[]; className?: string }) {
  return (
    <div className={className}>
      {/* Desktop table */}
      <table className="hidden w-full border-collapse text-left align-top md:table">
        <caption className="sr-only">Services we arrange, with availability and the notice we need</caption>
        <thead>
          <tr className="border-y border-border">
            {["Service", "What it means", "Availability", "Notice we need"].map((h) => (
              <th key={h} scope="col" className="py-3 pr-6 text-label font-semibold uppercase text-muted last:pr-0">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {services.map((s) => (
            <tr key={s.slug} className="border-b border-border align-top">
              <th scope="row" className="w-[20%] py-7 pr-6 font-display text-xl font-normal leading-snug text-ink">
                {s.name}
                {s.includedInTours && <span className="mt-2 block text-[0.625rem] font-semibold uppercase tracking-[0.18em] text-accent">Included in tour price</span>}
              </th>
              <td className="w-[40%] py-7 pr-6 text-sm leading-relaxed text-muted">
                <InlineText text={s.what} />
                {s.note && <span className="mt-3 block border-l border-border pl-3 text-xs leading-relaxed text-muted/90"><InlineText text={s.note} /></span>}
              </td>
              <td className="w-[22%] py-7 pr-6 text-sm"><AvailabilityCell value={s.availability} /></td>
              <td className="w-[18%] py-7 text-sm text-ink">{s.leadTime}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile blocks */}
      <ul className="border-t border-border md:hidden">
        {services.map((s) => (
          <li key={s.slug} className="border-b border-border py-7">
            <h3 className="font-display text-xl font-normal leading-snug text-ink">{s.name}</h3>
            {s.includedInTours && <p className="mt-2 text-[0.625rem] font-semibold uppercase tracking-[0.18em] text-accent">Included in tour price</p>}
            <p className="mt-3 text-sm leading-relaxed text-muted"><InlineText text={s.what} /></p>
            {s.note && <p className="mt-3 border-l border-border pl-3 text-xs leading-relaxed text-muted"><InlineText text={s.note} /></p>}
            <dl className="mt-5 grid grid-cols-2 gap-5 border-t border-border pt-4 text-sm">
              <div>
                <dt className="text-[0.625rem] font-semibold uppercase tracking-[0.2em] text-muted">Availability</dt>
                <dd className="mt-2"><AvailabilityCell value={s.availability} /></dd>
              </div>
              <div>
                <dt className="text-[0.625rem] font-semibold uppercase tracking-[0.2em] text-muted">Notice we need</dt>
                <dd className="mt-2 text-ink">{s.leadTime}</dd>
              </div>
            </dl>
          </li>
        ))}
      </ul>
    </div>
  );
}
