"use client";
import { useCurrency } from "@/context/CurrencyContext";

/**
 * Renders a USD amount converted to the visitor's chosen display currency, with a small "≈ $X
 * USD" caption whenever that isn't USD — a converted number with no reference point adds mental
 * math a visitor has to do themselves before trusting the price, exactly where trust matters most.
 */
export function Price({ usd, className, showUsdReference = false }: { usd: number; className?: string; showUsdReference?: boolean }) {
  const { format, currency } = useCurrency();
  return (
    <span className={className}>
      {format(usd)}
      {showUsdReference && currency !== "USD" && <span className="ml-1 text-xs font-normal text-muted">(≈ ${usd} USD)</span>}
    </span>
  );
}
