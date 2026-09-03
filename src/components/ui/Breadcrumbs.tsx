import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";
import { cn } from "@/lib/utils";

export interface Crumb { name: string; path: string }

export function Breadcrumbs({ items, className, light }: { items: Crumb[]; className?: string; light?: boolean }) {
  const all = [{ name: "Home", path: "/" }, ...items];
  return (
    <nav aria-label="Breadcrumb" className={cn("text-sm", light ? "text-white/80" : "text-muted", className)}>
      <JsonLd data={{ "@context": "https://schema.org", ...breadcrumbJsonLd(all) }} />
      <ol className="flex flex-wrap items-center gap-1.5">
        {all.map((c, i) => {
          const last = i === all.length - 1;
          return (
            <li key={c.path} className="flex items-center gap-1.5">
              {last ? (
                <span aria-current="page" className={cn("font-medium", light ? "text-white" : "text-ink")}>{c.name}</span>
              ) : (
                <Link href={c.path as "/"} className="hover:underline underline-offset-4">{c.name}</Link>
              )}
              {!last && <ChevronRight className="size-3.5 opacity-60" aria-hidden />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
