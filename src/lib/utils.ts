import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind classes safely. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Build an absolute URL on the site origin. */
export function absoluteUrl(path = "/", base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://tajphotos.com") {
  const origin = base.replace(/\/$/, "");
  return path.startsWith("http") ? path : `${origin}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Slugify a heading for anchor ids. */
export function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/** Format a price in a currency with no decimals. */
export function formatPrice(amount: number, currency: "USD" | "INR" | "EUR" | "GBP" = "USD") {
  return new Intl.NumberFormat(currency === "INR" ? "en-IN" : "en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Estimate reading time in minutes from a word count. */
export function readingTime(words: number) {
  return Math.max(1, Math.round(words / 220));
}

/** Format an ISO date as e.g. "3 September 2026". */
export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

/** Rough word count across a Block[] for reading-time estimates. */
export function blockWordCount(blocks: import("@/content/types").Block[]) {
  let n = 0;
  for (const b of blocks) {
    switch (b.type) {
      case "p":
      case "h2":
      case "h3":
        n += b.text.split(/\s+/).length;
        break;
      case "ul":
      case "ol":
        n += b.items.join(" ").split(/\s+/).length;
        break;
      case "table":
        n += b.rows.flat().join(" ").split(/\s+/).length;
        break;
      case "faq":
        n += b.items.map((f) => `${f.q} ${f.a}`).join(" ").split(/\s+/).length;
        break;
      default:
        n += 40;
    }
  }
  return n;
}
