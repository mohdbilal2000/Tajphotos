import { clsx, type ClassValue } from "clsx";
import { siteUrl } from "@/config/brand";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind classes safely. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Build an absolute URL on the active brand's origin.
 *
 * The origin MUST come from the brand resolver, not a hard-coded default. Every canonical tag,
 * sitemap entry, OG url and JSON-LD `@id` on the site flows through here, so a fallback pinned to
 * one brand's domain would have three of the four brands telling Google their pages live on the
 * flagship — the strongest possible signal that all four sites are one site, which is the exact
 * opposite of what the brand split is for.
 */
export function absoluteUrl(path = "/", base = siteUrl) {
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
