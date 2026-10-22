import type { ReactNode } from "react";
import Image from "next/image";
import { getImage } from "@/content/images";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import { cn } from "@/lib/utils";

/**
 * The standard opener for every page that isn't the homepage: breadcrumbs, an optional micro-label,
 * a display-serif H1 and an optional standfirst — all on the raised paper tone with a hairline
 * under it. Extracted because eight pages were each hand-rolling the same three lines of markup,
 * which is how a site drifts out of alignment one page at a time.
 */
export function PageHeader({
  crumbs,
  eyebrow,
  title,
  text,
  children,
  className,
  image,
}: {
  crumbs: Crumb[];
  eyebrow?: string;
  title: ReactNode;
  text?: ReactNode;
  /** Anything that belongs under the standfirst: a search form, a count, a set of links. */
  children?: ReactNode;
  className?: string;
  /** An image id from content/images. With one, the opener becomes a photo banner in the same
   *  language as the homepage hero, so every section of the site starts on a place, not a form. */
  image?: string;
}) {
  if (image) {
    const img = getImage(image);
    return (
      <header className={cn("relative isolate overflow-hidden bg-ink text-white", className)}>
        <Image src={img.src} alt={img.alt} preload fetchPriority="high" placeholder="blur" sizes="100vw" className="absolute inset-0 -z-20 size-full object-cover" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/92 from-5% via-ink/55 via-50% to-ink/25" />
        <div className="container-site flex min-h-[54svh] flex-col pb-12 pt-8 sm:pb-14 lg:min-h-[min(62svh,36rem)]">
          <Breadcrumbs items={crumbs} light />
          <div className="mt-auto pt-20">
            {eyebrow && <p className="text-shadow-hero text-label font-semibold uppercase text-white/85">{eyebrow}</p>}
            <h1 className="text-shadow-hero mt-5 max-w-[22ch] text-display-2 font-normal">{title}</h1>
            {text && <p className="text-shadow-hero mt-5 max-w-2xl text-lg leading-relaxed text-white/85">{text}</p>}
            {children}
          </div>
        </div>
      </header>
    );
  }
  return (
    <header className={cn("border-b border-border bg-surface", className)}>
      <div className="container-site pb-12 pt-10 sm:pb-14">
        <Breadcrumbs items={crumbs} />
        {eyebrow && <p className="eyebrow mt-9 border-t border-border pt-4">{eyebrow}</p>}
        <h1 className={cn("max-w-[24ch] text-display-2 font-normal", eyebrow ? "mt-6" : "mt-8")}>{title}</h1>
        {text && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{text}</p>}
        {children}
      </div>
    </header>
  );
}
