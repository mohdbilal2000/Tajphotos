"use client";
import { useCurrency } from "@/context/CurrencyContext";

/** Renders a USD amount converted to the visitor's chosen display currency. */
export function Price({ usd, className }: { usd: number; className?: string }) {
  const { format } = useCurrency();
  return <span className={className}>{format(usd)}</span>;
}
