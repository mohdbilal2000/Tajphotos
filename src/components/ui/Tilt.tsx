"use client";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Gives a card physical depth: it tilts toward the pointer (max ~5°) with a soft light glare, and
 * children marked `[data-depth]` float forward on the Z axis. Writes CSS variables directly in a
 * rAF-free pointer handler — no React state, no re-renders. Does nothing on touch (no hover) and
 * under prefers-reduced-motion, so the card is simply a card there.
 */
export function Tilt({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reset = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
    el.style.setProperty("--glare", "0");
  };
  return (
    <div className={cn("[perspective:1100px]", className)}>
      <div
        ref={ref}
        onPointerMove={(e) => {
          if (e.pointerType !== "mouse" || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
          const el = ref.current!;
          const r = el.getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width - 0.5;
          const y = (e.clientY - r.top) / r.height - 0.5;
          el.style.setProperty("--rx", `${(-y * 6).toFixed(2)}deg`);
          el.style.setProperty("--ry", `${(x * 7).toFixed(2)}deg`);
          el.style.setProperty("--gx", `${(x + 0.5) * 100}%`);
          el.style.setProperty("--gy", `${(y + 0.5) * 100}%`);
          el.style.setProperty("--glare", "1");
        }}
        onPointerLeave={reset}
        className="relative h-full transition-transform duration-300 ease-out [transform-style:preserve-3d] [transform:rotateX(var(--rx,0deg))_rotateY(var(--ry,0deg))]"
      >
        {children}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[1.375rem] opacity-[var(--glare,0)] transition-opacity duration-300 [background:radial-gradient(circle_at_var(--gx,50%)_var(--gy,50%),rgba(255,255,255,0.35),transparent_45%)] mix-blend-soft-light"
        />
      </div>
    </div>
  );
}
