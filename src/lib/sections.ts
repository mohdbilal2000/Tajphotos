import { notFound } from "next/navigation";
import { brand } from "@/config/brand";

export type SectionName = keyof typeof brand.sections;

/**
 * Whether the active brand publishes a content section at all.
 *
 * This is the mechanism that makes the four sites genuinely different rather than re-skinned.
 * The content library (tours, destinations, guides) is shared by the codebase, but a brand
 * publishing a section it does not sell is exactly the near-duplicate page the brand split exists
 * to avoid — a print gallery does not sell a Golden Triangle itinerary, and serving that page on
 * four domains under one owner is a doorway network however different the colours are.
 *
 * `publishes` therefore has to be enforced in three places, all of which matter:
 *   1. the route itself, so an unpublished section 404s instead of being quietly reachable;
 *   2. the sitemap, llms.txt and llms-full.txt, so it is never advertised to a crawler; and
 *   3. the header and footer, so nothing links to a page that will 404.
 * Getting only the third right is the common mistake: unlinked pages are still indexed, because
 * crawlers find them through the sitemap and through the other three domains.
 */
export function publishes(section: SectionName): boolean {
  return brand.sections[section];
}

/**
 * Guard for a route belonging to an optional section: 404s when this brand does not publish it.
 *
 * A 404 is correct here rather than a redirect. The page genuinely does not exist on this
 * hostname, and redirecting every unpublished section to the homepage is the soft-404 pattern
 * Search Console flags — and it would also mask link-building mistakes rather than surface them.
 */
export function requireSection(section: SectionName): void {
  if (!publishes(section)) notFound();
}

/** Paths for sections this brand publishes; the source of truth for sitemap and llms.txt. */
export function publishedSectionPaths(): string[] {
  return ([
    ["tours", "/tours"],
    ["destinations", "/destinations"],
    ["guides", "/guides"],
  ] as const)
    .filter(([section]) => publishes(section))
    .map(([, path]) => path);
}
