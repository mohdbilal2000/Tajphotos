import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function Badge({ children, tone = "accent", className }: { children: ReactNode; tone?: "accent" | "primary" | "neutral" | "success" | "glass"; className?: string }) {
  const tones = {
    accent: "bg-accent text-accent-ink",
    primary: "bg-primary text-primary-fg",
    neutral: "bg-surface-2 text-ink",
    success: "bg-success/10 text-success",
    glass: "bg-white/85 text-ink backdrop-blur",
  };
  return <span className={cn("inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold tracking-wide", tones[tone], className)}>{children}</span>;
}
