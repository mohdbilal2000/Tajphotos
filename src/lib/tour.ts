import type { Tour } from "@/content/types";

/**
 * Small, pure helpers that read a tour's own data so every surface (card, booking card, sticky
 * bar, JSON-LD, llms.txt) says the same thing about price basis and cancellation — never a
 * blanket claim stamped on a tour whose text doesn't support it.
 */

/** Hours before start in the tour's cancellation text, e.g. 48 — undefined when not stated. */
export function cancellationWindowHours(tour: Tour): number | undefined {
  if (!/free cancellation/i.test(tour.cancellation)) return undefined;
  const h = tour.cancellation.match(/(\d+)\s*hours?/i)?.[1];
  return h ? Number(h) : undefined;
}

/** "Free cancellation · 48 h before" (or just "Free cancellation") when the tour offers it. */
export function cancellationShort(tour: Tour): string | undefined {
  if (!/free cancellation/i.test(tour.cancellation)) return undefined;
  const h = cancellationWindowHours(tour);
  return h ? `Free cancellation · ${h} h before` : "Free cancellation";
}

/**
 * The group size the headline price is based on, read from `priceNote` ("based on 2 travellers")
 * or from the tier marked "most popular". Shown next to "from $X / person" so a 2-traveller rate is
 * never mistaken for the solo price.
 */
export function priceBasis(tour: Tour): string | undefined {
  const fromNote = tour.priceNote.match(/(\d+)\s*travellers?/i)?.[1];
  if (fromNote) return `${fromNote} travellers`;
  const popular = tour.priceTiers?.find((t) => /most popular/i.test(t.note ?? ""));
  if (popular) return popular.label;
  if (/per day/i.test(tour.priceNote)) return "per day";
  return undefined;
}

/** Lowest and highest per-person tier, falling back to priceFrom. */
export function priceRange(tour: Tour): { low: number; high: number } {
  const all = [tour.priceFrom.usd, ...(tour.priceTiers?.map((t) => t.usd) ?? [])];
  return { low: Math.min(...all), high: Math.max(...all) };
}

/** Traveller count expressed by a tier label such as "4 travellers" or "2–3 people". */
export function tierQuantity(label: string): { min: number; max?: number } | undefined {
  const m = label.match(/(\d+)\s*(?:[-–to]+\s*(\d+))?/);
  if (!m) return undefined;
  return { min: Number(m[1]), ...(m[2] ? { max: Number(m[2]) } : {}) };
}
