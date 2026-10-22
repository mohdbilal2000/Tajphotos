"use client";
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

/**
 * A shortlist of tours the visitor is considering — the "save it for later" behaviour travellers
 * already know from Tripadvisor Trips and Airbnb wishlists. Stored on the visitor's own device
 * (localStorage), never sent anywhere until they choose to share it on WhatsApp. If storage is
 * unavailable (private mode, blocked site data) it still works for the current visit.
 */
export interface ShortlistItem { slug: string; name: string; usd: number }

const KEY = "tp_shortlist";
const Ctx = createContext<{ items: ShortlistItem[]; has: (slug: string) => boolean; toggle: (item: ShortlistItem) => void; remove: (slug: string) => void } | null>(null);

export function ShortlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ShortlistItem[]>([]);

  // Hydrate after mount so the server render (and crawlers) always see the empty state.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time hydration from storage
      if (raw) setItems(JSON.parse(raw));
    } catch { /* storage unavailable: start empty */ }
  }, []);

  const save = useCallback((next: ShortlistItem[]) => {
    setItems(next);
    try { localStorage.setItem(KEY, JSON.stringify(next)); } catch { /* keep in memory only */ }
  }, []);

  const value = useMemo(() => ({
    items,
    has: (slug: string) => items.some((i) => i.slug === slug),
    toggle: (item: ShortlistItem) => save(items.some((i) => i.slug === item.slug) ? items.filter((i) => i.slug !== item.slug) : [...items, item]),
    remove: (slug: string) => save(items.filter((i) => i.slug !== slug)),
  }), [items, save]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useShortlist() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useShortlist must be used inside ShortlistProvider");
  return v;
}
