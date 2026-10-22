"use client";

import { Children, useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * One card at a time. A native scroll-snap track (so touch swipe and trackpads just work), with
 * story-style progress bars, arrows and an optional autoplay that stops the moment anyone touches
 * it or prefers reduced motion.
 */
export function SlideDeck({
  children,
  label,
  autoplay = 0,
  bars = "top",
  className,
}: {
  children: ReactNode;
  label: string;
  autoplay?: number;
  bars?: "top" | "bottom";
  className?: string;
}) {
  const slides = Children.toArray(children);
  const track = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback(
    (i: number) => {
      const el = track.current;
      if (!el) return;
      const n = (i + slides.length) % slides.length;
      el.scrollTo({ left: n * el.clientWidth, behavior: "smooth" });
    },
    [slides.length],
  );

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const onScroll = () => setIndex(Math.round(el.scrollLeft / Math.max(el.clientWidth, 1)));
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!autoplay || paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setTimeout(() => go(index + 1), autoplay);
    return () => window.clearTimeout(t);
  }, [autoplay, paused, index, go]);

  const progress = (
    <div className="flex gap-1.5" aria-hidden>
      {slides.map((_, i) => (
        <span key={i} className="h-[3px] flex-1 overflow-hidden rounded-full bg-current/20">
          <span
            className={cn("block h-full rounded-full bg-current", i <= index ? "w-full" : "w-0")}
            style={i === index && autoplay && !paused ? { animation: `deck-fill ${autoplay}ms linear both` } : undefined}
          />
        </span>
      ))}
    </div>
  );

  return (
    <div
      className={cn("relative", className)}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
    >
      {bars === "top" && <div className="mb-4">{progress}</div>}
      <div
        ref={track}
        className="scrollbar-none flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain"
        onTouchStart={() => setPaused(true)}
      >
        {slides.map((s, i) => (
          <div key={i} className="w-full shrink-0 snap-center" role="group" aria-roledescription="slide" aria-label={`${i + 1} of ${slides.length}`}>
            {s}
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-3">
        {bars === "bottom" && <div className="flex-1">{progress}</div>}
        <span className={cn("text-xs tabular-nums opacity-70", bars === "top" && "flex-1")}>
          {String(index + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
        </span>
        <button type="button" onClick={() => go(index - 1)} aria-label="Previous" className="flex size-10 items-center justify-center rounded-full border border-current/25 transition hover:bg-current/10">
          <ChevronLeft className="size-4" aria-hidden />
        </button>
        <button type="button" onClick={() => go(index + 1)} aria-label="Next" className="flex size-10 items-center justify-center rounded-full border border-current/25 transition hover:bg-current/10">
          <ChevronRight className="size-4" aria-hidden />
        </button>
      </div>
    </div>
  );
}
