import Link from "next/link";
import Image from "next/image";
import { CalendarDays } from "lucide-react";
import type { Guide } from "@/content/types";
import { getImage } from "@/content/images";
import { formatDate, cn } from "@/lib/utils";

export function ArticleCard({ guide, className }: { guide: Guide; className?: string }) {
  const img = getImage(guide.heroImage);
  return (
    <Link href={`/guides/${guide.slug}`} className={cn("group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift", className)}>
      <div className="relative aspect-[16/10] overflow-hidden bg-surface-2">
        <Image src={img.src} alt={img.alt} placeholder="blur" sizes="(min-width: 1024px) 30vw, 88vw" className="size-full object-cover transition-transform duration-700 group-hover:scale-[1.05]" />
        <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[0.6875rem] font-semibold capitalize text-ink shadow-sm">{guide.category.replace(/-/g, " ")}</span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-sans text-[1.0625rem] font-semibold leading-snug tracking-tight text-ink transition-colors group-hover:text-primary">{guide.title}</h3>
        <p className="mt-2 line-clamp-2 grow text-sm leading-relaxed text-muted">{guide.summary}</p>
        <p className="mt-4 flex items-center gap-1.5 border-t border-border pt-3 text-xs text-muted"><CalendarDays className="size-3.5" aria-hidden /> Updated {formatDate(guide.dateModified)}</p>
      </div>
    </Link>
  );
}
