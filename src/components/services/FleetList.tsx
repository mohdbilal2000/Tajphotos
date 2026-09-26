import type { FleetVehicle } from "@/content/types";
import { InlineText } from "@/components/content/RichText";
import { cn } from "@/lib/utils";

/**
 * Seats are stated as the number of people we would actually put in the vehicle *with their
 * luggage*, not the registration capacity — the gap between those two numbers is the single most
 * common reason a private tour feels cramped, and publishing the honest figure is cheap.
 */
export function FleetList({ fleet, className }: { fleet: FleetVehicle[]; className?: string }) {
  return (
    <ul className={cn("border-t border-border", className)}>
      {fleet.map((v) => (
        <li key={v.slug} className="grid gap-4 border-b border-border py-7 lg:grid-cols-[1.1fr_0.5fr_0.5fr_1.6fr] lg:gap-8">
          <h3 className="font-display text-xl font-normal leading-snug text-ink">{v.name}</h3>
          <p className="text-sm text-ink lg:text-center">
            <span className="text-[0.625rem] uppercase tracking-[0.2em] text-muted lg:hidden">Seats · </span>
            {v.seats}
          </p>
          <p className="text-sm text-ink lg:text-center">
            <span className="text-[0.625rem] uppercase tracking-[0.2em] text-muted lg:hidden">Luggage · </span>
            {v.luggage}
          </p>
          <div>
            <p className="text-label font-semibold uppercase text-accent">{v.bestFor}</p>
            {v.note && <p className="mt-2.5 text-sm leading-relaxed text-muted"><InlineText text={v.note} /></p>}
          </div>
        </li>
      ))}
    </ul>
  );
}
