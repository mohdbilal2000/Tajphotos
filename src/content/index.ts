import { tours } from "@/content/tours";
import { destinations } from "@/content/destinations";
import { guides as allGuides } from "@/content/guides";
import type { Tour, Destination, Guide, TourCategory } from "@/content/types";
import { publishes, publishedSectionPaths } from "@/lib/sections";
import { brand } from "@/config/brand";

/**
 * Guides scoped to the active brand (see `Guide.brands`). Filtered here, at the single point
 * every page, the sitemap and both llms feeds read from, so a brand cannot accidentally publish
 * an article written for one of its siblings.
 */
export const guides = allGuides.filter((g) => !g.brands || g.brands.includes(brand.key as NonNullable<Guide["brands"]>[number]));

export { tours, destinations };
export { team, getTeamMember } from "@/content/team";
export { reviews, reviewsForTour } from "@/content/reviews";

export const tourCategories: { key: TourCategory; label: string; blurb: string }[] = [
  { key: "golden-triangle", label: "Golden Triangle", blurb: "Delhi, Agra and Jaipur in 3–7 days" },
  { key: "same-day", label: "Same-day Taj Mahal", blurb: "From Delhi by car or express train" },
  { key: "photography", label: "Photography tours", blurb: "Professional photoshoots at the Taj" },
  { key: "agra", label: "Agra tours", blurb: "Taj Mahal, Agra Fort, Fatehpur Sikri" },
  { key: "delhi", label: "Delhi tours", blurb: "Old & New Delhi with a local" },
  { key: "jaipur", label: "Jaipur tours", blurb: "Amber Fort, Hawa Mahal and bazaars" },
  { key: "udaipur", label: "Udaipur tours", blurb: "Lakes, palaces and sunsets" },
  { key: "rajasthan", label: "Rajasthan circuits", blurb: "Jodhpur, Pushkar, Ranthambore, Jaisalmer" },
  { key: "extension", label: "Extensions", blurb: "Varanasi, Khajuraho, Ranthambore add-ons" },
  { key: "transfer", label: "Cars & transfers", blurb: "Private chauffeur-driven cars" },
];

export const getTour = (slug: string): Tour | undefined => tours.find((t) => t.slug === slug);
export const getDestination = (slug: string): Destination | undefined => destinations.find((d) => d.slug === slug);
export const getGuide = (slug: string): Guide | undefined => guides.find((g) => g.slug === slug);

export const toursByCategory = (c: TourCategory) => tours.filter((t) => t.category === c);
export const featuredTours = () => tours.filter((t) => t.badges?.some((b) => /best seller|popular|featured/i.test(b))).slice(0, 6);
export const toursForDestination = (slug: string) => tours.filter((t) => t.destinations.includes(slug));
export const guidesForCategory = (c: Guide["category"]) => guides.filter((g) => g.category === c);
export const latestGuides = (n = 6) => [...guides].sort((a, b) => b.dateModified.localeCompare(a.dateModified)).slice(0, n);
export const relatedTours = (slugs: string[]) => slugs.map(getTour).filter((t): t is Tour => Boolean(t));
export const relatedGuides = (slugs: string[]) => slugs.map(getGuide).filter((g): g is Guide => Boolean(g));

/** Latest modification date across all content, for lastmod on hub pages. */
export const latestContentDate = () =>
  [...tours, ...destinations, ...guides].map((c) => c.dateModified).sort().at(-1) ?? new Date().toISOString().slice(0, 10);

/**
 * Static list of all crawlable routes (used by sitemap + llms.txt).
 *
 * Scoped to the sections the active brand publishes: the content library is shared across the
 * four brands, but advertising a section a brand does not sell would put near-identical pages on
 * four domains under one owner. See `src/lib/sections.ts`.
 */
export function allRoutes() {
  const staticPages = ["/", ...publishedSectionPaths(), "/quote", "/about", "/contact", "/reviews", "/faq", "/credits", "/privacy", "/terms"];
  return {
    staticPages,
    tourPaths: publishes("tours") ? tours.map((t) => `/tours/${t.slug}`) : [],
    destinationPaths: publishes("destinations") ? destinations.map((d) => `/destinations/${d.slug}`) : [],
    guidePaths: publishes("guides") ? guides.map((g) => `/guides/${g.slug}`) : [],
  };
}
