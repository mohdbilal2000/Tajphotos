import { Stars } from "@/components/ui/Stars";
import { formatDate } from "@/lib/utils";
import type { Review } from "@/content/types";
import { cn } from "@/lib/utils";

export function TestimonialCard({ review, className }: { review: Review; className?: string }) {
  return (
    <figure className={cn("flex h-full flex-col rounded-2xl border border-border bg-surface p-6", className)}>
      <Stars value={review.rating} />
      <blockquote className="mt-3 flex-1 text-ink/90 leading-relaxed">“{review.text}”</blockquote>
      <figcaption className="mt-5 flex items-center justify-between text-sm">
        <span className="font-medium text-ink">{review.name}, {review.country}</span>
        <span className="text-muted">{formatDate(review.date)} · via {review.source}</span>
      </figcaption>
    </figure>
  );
}

export function TestimonialGrid({ reviews, className }: { reviews: Review[]; className?: string }) {
  if (!reviews.length) return null;
  return (
    <div className={cn("grid gap-5 sm:grid-cols-2 lg:grid-cols-3", className)}>
      {reviews.slice(0, 6).map((r) => (
        <TestimonialCard key={r.id} review={r} />
      ))}
    </div>
  );
}
