import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function Stars({ value, className, size = "size-4" }: { value: number; className?: string; size?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-0.5 text-accent", className)} aria-label={`${value} out of 5 stars`} role="img">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} className={cn(size, i <= Math.round(value) ? "fill-current" : "opacity-30")} aria-hidden />
      ))}
    </span>
  );
}
