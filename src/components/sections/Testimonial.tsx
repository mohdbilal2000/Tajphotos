import { formatDate, cn } from "@/lib/utils";
import type { Review } from "@/content/types";

/**
 * A quotation, not a card. No box, no shadow, no avatar circle, and no star row — five gold stars
 * repeated six times across a grid is decoration, and on a site with no verified aggregate rating
 * it is decoration that overclaims. The rating stays available to screen readers and to the Review
 * JSON-LD; what a reader sees is the sentence.
 */
export function TestimonialCard({ review, className }: { review: Review; className?: string }) {
  return (
    <figure className={cn("flex h-full flex-col rounded-2xl border border-border bg-surface p-6 shadow-soft", className)}>
      <blockquote className="flex-1 font-display text-xl leading-snug text-ink">
        <p>&ldquo;{review.text}&rdquo;</p>
      </blockquote>
      <figcaption className="mt-6 text-xs text-muted">
        <span className="block text-label font-semibold uppercase text-ink">{review.name}</span>
        <span className="mt-1.5 block">
          {review.country} · {formatDate(review.date)} · via {review.source}
          <span className="sr-only"> · rated {review.rating} out of 5</span>
        </span>
      </figcaption>
    </figure>
  );
}

export function TestimonialGrid({ reviews, className }: { reviews: Review[]; className?: string }) {
  if (!reviews.length) return null;
  return (
    <div className={cn("grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3", className)}>
      {reviews.slice(0, 6).map((r) => (
        <TestimonialCard key={r.id} review={r} />
      ))}
    </div>
  );
}
