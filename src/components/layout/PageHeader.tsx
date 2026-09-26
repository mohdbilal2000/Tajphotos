import type { ReactNode } from "react";
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
}: {
  crumbs: Crumb[];
  eyebrow?: string;
  title: ReactNode;
  text?: ReactNode;
  /** Anything that belongs under the standfirst: a search form, a count, a set of links. */
  children?: ReactNode;
  className?: string;
}) {
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
