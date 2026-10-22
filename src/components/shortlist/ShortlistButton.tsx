"use client";
import { Heart } from "lucide-react";
import { useShortlist, type ShortlistItem } from "@/context/ShortlistContext";
import { cn } from "@/lib/utils";

export function ShortlistButton({ item, className }: { item: ShortlistItem; className?: string }) {
  const { has, toggle } = useShortlist();
  const on = has(item.slug);
  return (
    <button
      type="button"
      onClick={() => toggle(item)}
      aria-pressed={on}
      aria-label={on ? `Remove ${item.name} from your shortlist` : `Save ${item.name} to your shortlist`}
      className={cn("relative z-10 flex size-10 items-center justify-center rounded-full shadow-sm backdrop-blur transition active:scale-90", on ? "bg-accent text-white" : "bg-white/90 text-ink hover:text-accent", className)}
    >
      <Heart className={cn("size-[1.125rem] transition-transform", on && "scale-110 fill-current")} aria-hidden />
    </button>
  );
}
