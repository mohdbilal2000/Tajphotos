import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Section({ className, children, tone = "bg", ...props }: ComponentProps<"section"> & { tone?: "bg" | "surface" | "ink" }) {
  const tones = { bg: "bg-bg", surface: "bg-surface", ink: "bg-ink text-bg" };
  return (
    <section className={cn("py-16 sm:py-20 lg:py-24", tones[tone], className)} {...props}>
      <div className="container-site">{children}</div>
    </section>
  );
}

export function SectionHeader({ eyebrow, title, text, align = "left", className, id }: { eyebrow?: string; title: ReactNode; text?: ReactNode; align?: "left" | "center"; className?: string; id?: string }) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h2 id={id} className="text-3xl font-semibold sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">{title}</h2>
      {text && <p className="mt-4 text-lg leading-relaxed text-muted">{text}</p>}
    </div>
  );
}
