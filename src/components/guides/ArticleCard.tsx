import Link from "next/link";
import Image from "next/image";
import type { Guide } from "@/content/types";
import { getImage } from "@/content/images";
import { formatDate, cn } from "@/lib/utils";

/** Text-led: a wide plate, a kicker, a headline, a date. Reads as a journal entry, not a product. */
export function ArticleCard({ guide, className }: { guide: Guide; className?: string }) {
  const img = getImage(guide.heroImage);
  return (
    <Link href={`/guides/${guide.slug}`} className={cn("group flex flex-col", className)}>
      <div className="figure aspect-[16/10] w-full">
        <Image src={img.src} alt={img.alt} placeholder="blur" sizes="(min-width: 1024px) 30vw, 88vw" />
      </div>
      <p className="mt-5 text-label font-semibold uppercase text-accent">{guide.category.replace(/-/g, " ")}</p>
      <h3 className="mt-3 font-display text-xl font-normal leading-snug text-ink transition-colors group-hover:text-accent">{guide.title}</h3>
      <p className="mt-2.5 line-clamp-2 grow text-sm leading-relaxed text-muted">{guide.summary}</p>
      <p className="mt-4 border-t border-border pt-3 text-xs text-muted">Updated {formatDate(guide.dateModified)}</p>
    </Link>
  );
}
