"use client";
import { useId } from "react";
import { site } from "@/config/site";
import { useCurrency } from "@/context/CurrencyContext";
import { cn } from "@/lib/utils";

export function CurrencySwitcher({ className }: { className?: string }) {
  const { currency, setCurrency } = useCurrency();
  const id = useId();
  return (
    <div className={cn("inline-flex items-center gap-2", className)}>
      <label htmlFor={id} className="text-xs font-medium text-muted">Currency</label>
      <select
        id={id}
        value={currency}
        onChange={(e) => setCurrency(e.target.value as typeof currency)}
        className="border border-border bg-surface px-3 py-1.5 text-xs font-medium uppercase tracking-wider text-ink"
      >
        {site.currencies.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>
    </div>
  );
}
