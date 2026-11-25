import type { Tour } from "@/content/types";
import { TourCard } from "@/components/tours/TourCard";

/** The homepage's three-up tour grid. Cards skip the blur placeholder: they sit well below the fold. */
export function TourCardGrid({ list }: { list: Tour[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {list.map((t) => <TourCard key={t.slug} tour={t} blur={false} />)}
    </div>
  );
}
