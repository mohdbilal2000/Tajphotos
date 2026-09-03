import type { Review } from "@/content/types";

/**
 * TODO: replace with genuine reviews imported from Google / TripAdvisor (keep them verbatim, with dates).
 * Genuine reviews are a ranking + conversion asset; never fabricate ratings on a live site.
 */
export const reviews: Review[] = [];

export function reviewsForTour(slug: string) {
  return reviews.filter((r) => r.tour === slug);
}
