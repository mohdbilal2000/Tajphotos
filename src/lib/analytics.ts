"use client";
import { track } from "@vercel/analytics";

type Props = Record<string, string | number | boolean>;

/** Fire a conversion event to Vercel Analytics, GA4 (if configured) and Clarity (if configured). */
export function trackEvent(name: string, props: Props = {}) {
  try {
    track(name, props);
  } catch {}
  try {
    const w = window as unknown as { gtag?: (...a: unknown[]) => void; clarity?: (...a: unknown[]) => void };
    w.gtag?.("event", name, props);
    w.clarity?.("event", name);
  } catch {}
}
