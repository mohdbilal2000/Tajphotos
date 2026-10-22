import Link from "next/link";
import Image from "next/image";
import type { StaticImageData } from "next/image";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface RailItem { href: string; title: string; caption: string; image: StaticImageData; alt: string }

/**
 * Two auto-scrolling rails moving in opposite directions (the reference site's "Places that stay
 * with you" pattern). Pure CSS: each track renders its items twice and translates -50%, so the loop
 * is seamless with no JavaScript. Hovering or focusing inside a rail pauses it; under
 * prefers-reduced-motion the animation stops and the rail becomes a normal horizontal scroller.
 * The duplicate copy is aria-hidden and untabbable so screen readers and keyboards meet each card once.
 */
function Rail({ items, reverse }: { items: RailItem[]; reverse?: boolean }) {
  return (
    <div className="rail group/rail relative overflow-hidden motion-reduce:overflow-x-auto motion-reduce:scrollbar-none">
      <div className={cn("flex w-max py-2 group-hover/rail:[animation-play-state:paused] group-focus-within/rail:[animation-play-state:paused] motion-reduce:animate-none", reverse ? "animate-[marquee_70s_linear_infinite_reverse]" : "animate-[marquee_60s_linear_infinite]")}>
        {[0, 1].map((copy) =>
          items.map((it) => (
            <Link
              key={`${copy}-${it.href}`}
              href={it.href as "/tours"}
              aria-hidden={copy === 1 || undefined}
              tabIndex={copy === 1 ? -1 : undefined}
              className="group relative isolate mr-4 block h-[13rem] w-[19rem] shrink-0 overflow-hidden rounded-[1.25rem] shadow-soft sm:h-[15rem] sm:w-[23rem]"
            >
              <Image src={it.image} alt={copy === 1 ? "" : it.alt} placeholder="blur" sizes="368px" className="absolute inset-0 -z-10 size-full object-cover transition-transform duration-[900ms] group-hover:scale-[1.06]" />
              <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" />
              <span aria-hidden className="absolute right-3 top-3 flex size-9 items-center justify-center rounded-full bg-white/20 text-white ring-1 ring-white/40 backdrop-blur transition group-hover:bg-white group-hover:text-ink">
                <ArrowUpRight className="size-4" />
              </span>
              <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                <p className="line-clamp-2 text-[0.625rem] font-semibold uppercase leading-relaxed tracking-[0.16em] text-white/75">{it.caption}</p>
                <p className="mt-1.5 font-display text-[1.75rem] leading-none">{it.title}</p>
              </div>
            </Link>
          )),
        )}
      </div>
    </div>
  );
}

export function ExploreRails({ top, bottom, className }: { top: RailItem[]; bottom: RailItem[]; className?: string }) {
  return (
    <div className={cn("space-y-4 [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]", className)}>
      <Rail items={top} />
      <Rail items={bottom} reverse />
    </div>
  );
}
