import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Vertical rhythm is deliberately larger than a typical marketing page. Whitespace is the only
 * thing on this site doing the job that borders, shadows and background tints used to do, so it
 * has to be generous enough to actually read as separation.
 */
export function Section({ className, children, tone = "bg", bleed, ...props }: ComponentProps<"section"> & { tone?: "bg" | "surface" | "ink"; bleed?: boolean }) {
  const tones = { bg: "bg-bg", surface: "bg-surface border-y border-border", ink: "bg-ink text-bg" };
  return (
    <section className={cn("py-20 sm:py-24 lg:py-32", tones[tone], className)} {...props}>
      {bleed ? children : <div className="container-site">{children}</div>}
    </section>
  );
}

/**
 * A section opener in three parts: a numbered/lettered micro-label on a rule, a display-serif
 * title, and an optional standfirst set at a wider measure. The rule is what makes a page of
 * sections read as one document.
 */
export function SectionHeader({
  eyebrow,
  title,
  text,
  align = "left",
  className,
  id,
  aside,
}: {
  eyebrow?: string;
  title: ReactNode;
  text?: ReactNode;
  align?: "left" | "center";
  className?: string;
  id?: string;
  /** Optional right-hand element (a link, a count) pinned to the baseline of the title on desktop. */
  aside?: ReactNode;
}) {
  return (
    <div className={cn(align === "center" && "text-center", className)}>
      {eyebrow && (
        <div className={cn("flex items-center gap-4 border-t border-border pt-4", align === "center" && "justify-center")}>
          <p className="eyebrow">{eyebrow}</p>
        </div>
      )}
      <div className={cn("mt-6 gap-8 lg:flex lg:items-end lg:justify-between", align === "center" && "lg:block")}>
        <h2 id={id} className={cn("text-display-2 font-normal", align === "center" ? "mx-auto max-w-3xl" : "max-w-3xl")}>{title}</h2>
        {aside && <div className="mt-6 shrink-0 lg:mt-0">{aside}</div>}
      </div>
      {text && <p className={cn("mt-6 max-w-2xl text-lg leading-relaxed text-muted", align === "center" && "mx-auto")}>{text}</p>}
    </div>
  );
}
