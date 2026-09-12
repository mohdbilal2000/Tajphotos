import { site } from "@/config/site";

/**
 * What stands in for a price, everywhere a price used to be.
 *
 * No rate is published on any brand in this portfolio (`brand.showPrices` is false): every job is
 * scoped to dates, group size, duration and what the visitor actually wants, so any number on a
 * card would be wrong in both directions — overcharging the simple bookings and quietly excluding
 * what was asked for.
 *
 * The copy is deliberately confident rather than coy. "Contact for pricing" reads as evasion and
 * is the single most common reason a no-price model loses to a competitor showing a number; the
 * fix is to say plainly why there's no list price and how fast a real one arrives. The /quote page
 * FAQ answers the same objection at length for anyone who wants it.
 */
export function QuoteBadge({ variant = "card" }: { variant?: "card" | "panel" | "bar" }) {
  if (variant === "panel") {
    return (
      <div>
        <p className="font-display text-2xl font-semibold text-accent">Priced to your plan</p>
        <p className="mt-1 text-sm text-muted">
          Your dates, group and pace change the cost, so we scope it properly instead of guessing. Free, and no obligation.
        </p>
      </div>
    );
  }
  if (variant === "bar") {
    return (
      <div>
        <p className="text-[0.65rem] uppercase tracking-wide text-muted">Your price</p>
        <p className="text-base font-semibold text-accent">Quoted to your plan</p>
      </div>
    );
  }
  return (
    <div>
      <p className="text-[0.7rem] uppercase tracking-wide text-muted">Your price</p>
      <p className="text-base font-semibold text-accent">
        Quoted to your plan <span className="block text-xs font-normal text-muted">Free · {site.contact.hoursNote.includes("minutes") ? "usually same day" : "fast reply"}</span>
      </p>
    </div>
  );
}
