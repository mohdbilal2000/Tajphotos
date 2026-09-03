import Link from "next/link";
import Image from "next/image";
import type { Guide } from "@/content/types";
import { getImage } from "@/content/images";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

export function ArticleCard({ guide, className }: { guide: Guide; className?: string }) {
  const img = getImage(guide.heroImage);
  return (
    <Link href={`/guides/${guide.slug}`} className={cn("group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift", className)}>
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image src={img.src} alt={img.alt} placeholder="blur" sizes="(min-width: 1024px) 380px, 90vw" className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-accent">{guide.category.replace(/-/g, " ")}</p>
        <h3 className="text-lg font-semibold leading-snug text-ink">{guide.title}</h3>
        <p className="line-clamp-2 text-sm text-muted">{guide.summary}</p>
        <p className="mt-auto pt-2 text-xs text-muted">Updated {formatDate(guide.dateModified)}</p>
      </div>
    </Link>
  );
}
