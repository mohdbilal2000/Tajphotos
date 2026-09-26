import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

/** A square, hairline-ruled label. Uppercase micro-type, never a coloured pill. */
export function Badge({ children, tone = "accent", className }: { children: ReactNode; tone?: "accent" | "primary" | "neutral" | "success" | "glass"; className?: string }) {
  const tones = {
    accent: "border-accent/40 bg-accent/8 text-accent",
    primary: "border-primary/35 bg-primary/8 text-primary",
    neutral: "border-border bg-surface-2 text-ink",
    success: "border-success/35 bg-success/8 text-success",
    glass: "border-white/35 bg-ink/45 text-white backdrop-blur-sm",
  };
  return <span className={cn("inline-flex items-center gap-1.5 border px-2.5 py-1 text-[0.625rem] font-semibold uppercase tracking-[0.16em]", tones[tone], className)}>{children}</span>;
}
