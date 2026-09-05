"use client";
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { site, type Currency } from "@/config/site";

const STORAGE_KEY = "tp_currency";
const CurrencyCtx = createContext<{ currency: Currency; setCurrency: (c: Currency) => void; convert: (usd: number) => number; format: (usd: number) => string } | null>(null);

// CONSTRAINT — keep this file's price value real during SSR with no client-only dependency:
// GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot, ChatGPT-User and Perplexity-User are documented
// or empirically shown not to execute JavaScript, so whatever this component renders on the server
// (the "USD" default via a static site.fxRates table) is the only price those crawlers ever see. If
// this ever moves to a live-fetched FX rate, it MUST keep a server-computed fallback value — never
// gate the initial render behind a client-only useEffect/fetch with no SSR result, or every AI
// crawler this site is built to be cited by will see a blank or stale price. Price.tsx and
// PriceTable.tsx inherit this same constraint by consuming this context.
export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>("USD");

  useEffect(() => {
    // Reads localStorage after mount to avoid an SSR/client hydration mismatch (the server always
    // renders the "USD" default). eslint-disable: this one-time sync-from-storage-on-mount has no
    // external "change" event to subscribe to via useSyncExternalStore.
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Currency | null;
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (saved && site.currencies.includes(saved)) setCurrencyState(saved);
    } catch {}
  }, []);

  const setCurrency = useCallback((c: Currency) => {
    setCurrencyState(c);
    try { localStorage.setItem(STORAGE_KEY, c); } catch {}
  }, []);

  const convert = useCallback((usd: number) => Math.round(usd * site.fxRates[currency]), [currency]);
  const format = useCallback(
    (usd: number) => new Intl.NumberFormat(currency === "INR" ? "en-IN" : "en-US", { style: "currency", currency, maximumFractionDigits: 0 }).format(convert(usd)),
    [currency, convert],
  );

  const value = useMemo(() => ({ currency, setCurrency, convert, format }), [currency, setCurrency, convert, format]);
  return <CurrencyCtx.Provider value={value}>{children}</CurrencyCtx.Provider>;
}

export function useCurrency() {
  const ctx = useContext(CurrencyCtx);
  if (!ctx) throw new Error("useCurrency must be used inside <CurrencyProvider>");
  return ctx;
}
