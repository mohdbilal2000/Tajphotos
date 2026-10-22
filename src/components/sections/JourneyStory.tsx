"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { StaticImageData } from "next/image";
import { ArrowRight, BookOpen, MapPin, Compass } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Chapter {
  time: string;
  place: string;
  title: string;
  body: string;
  fact: string;
  image: StaticImageData;
  alt: string;
  destination: { href: string; label: string };
  guide?: { href: string; label: string };
  tour?: { href: string; label: string };
}

/**
 * "A day, then a week" — scroll-led storytelling instead of a grid of rectangles.
 *
 * Desktop: the photograph is pinned (sticky) on the left while the chapters scroll past on the right;
 * whichever chapter is centred in the viewport becomes active, and its photo cross-fades in with a
 * slow push-in, so the page feels like moving through the place rather than past a list of it.
 * Every chapter is also a crossroads: a fact, the city guide, a travel guide (blog) and a tour — the
 * story is how people discover the information, not decoration on top of it.
 *
 * Mobile: no pinning (it fights small screens); each chapter carries its own photo inline.
 * One IntersectionObserver, no scroll listeners; reduced-motion users get instant swaps.
 */
export function JourneyStory({ chapters }: { chapters: Chapter[] }) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i));
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
      {/* Pinned photograph (desktop) */}
      <div className="relative hidden lg:block">
        <div className="sticky top-28 h-[calc(100svh-9rem)] max-h-[46rem] overflow-hidden rounded-[2rem] bg-ink shadow-lift">
          {chapters.map((c, i) => (
            <div key={c.title} aria-hidden={i !== active} className={cn("absolute inset-0 transition-opacity duration-1000 ease-out motion-reduce:transition-none", i === active ? "opacity-100" : "opacity-0")}>
              <Image
                src={c.image}
                alt={c.alt}
                fill
                placeholder="blur"
                sizes="55vw"
                className={cn("object-cover transition-transform duration-[6000ms] ease-out motion-reduce:transition-none", i === active ? "scale-110" : "scale-100")}
              />
            </div>
          ))}
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-ink/30" />
          <div className="absolute inset-x-0 top-0 flex items-center justify-between p-6 text-white">
            <span className="rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] ring-1 ring-white/25 backdrop-blur">{chapters[active].time}</span>
            <span className="text-xs font-semibold tabular-nums tracking-[0.2em] text-white/70">
              {String(active + 1).padStart(2, "0")} / {String(chapters.length).padStart(2, "0")}
            </span>
          </div>
          <div className="absolute inset-x-0 bottom-0 p-8 text-white">
            <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white/75"><MapPin className="size-3.5" aria-hidden /> {chapters[active].place}</p>
            <p className="mt-3 max-w-md font-display text-4xl leading-[1.05]">{chapters[active].title}</p>
            {/* progress: one segment per chapter */}
            <div className="mt-6 flex gap-1.5">
              {chapters.map((c, i) => (
                <span key={c.title} className={cn("h-1 flex-1 rounded-full transition-colors duration-500", i <= active ? "bg-highlight" : "bg-white/20")} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Chapters */}
      <ol className="relative space-y-6 lg:space-y-[30vh] lg:py-[18vh]">
        {chapters.map((c, i) => (
          <li
            key={c.title}
            data-i={i}
            ref={(el) => { refs.current[i] = el; }}
            className={cn("rounded-[1.75rem] border bg-surface p-6 shadow-soft transition-all duration-700 sm:p-8", i === active ? "border-accent/30 lg:shadow-lift" : "border-border lg:opacity-50")}
          >
            <div className="relative mb-6 aspect-[16/10] overflow-hidden rounded-[1.25rem] lg:hidden">
              <Image src={c.image} alt={c.alt} fill placeholder="blur" sizes="92vw" className="object-cover" />
              <span className="absolute left-3 top-3 rounded-full bg-ink/60 px-3 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur">{c.time}</span>
            </div>
            <p className="flex items-center gap-2 text-label font-semibold uppercase text-accent">
              <span className="hidden lg:inline">{c.time} ·</span> {c.place}
            </p>
            <h3 className="mt-3 font-display text-[1.875rem] font-normal leading-tight text-ink sm:text-[2.25rem]">{c.title}</h3>
            <p className="mt-4 leading-relaxed text-muted">{c.body}</p>
            <p className="mt-5 flex gap-3 rounded-2xl bg-bg p-4 text-sm leading-relaxed text-ink">
              <Compass className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden /> {c.fact}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <Link href={c.destination.href as "/destinations"} className="inline-flex items-center gap-1.5 rounded-full border border-border bg-bg px-3.5 py-2 text-xs font-semibold text-ink transition hover:border-ink/40">
                <MapPin className="size-3.5 text-accent" aria-hidden /> {c.destination.label}
              </Link>
              {c.guide && (
                <Link href={c.guide.href as "/guides"} className="inline-flex items-center gap-1.5 rounded-full border border-border bg-bg px-3.5 py-2 text-xs font-semibold text-ink transition hover:border-ink/40">
                  <BookOpen className="size-3.5 text-primary" aria-hidden /> {c.guide.label}
                </Link>
              )}
              {c.tour && (
                <Link href={c.tour.href as "/tours"} className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3.5 py-2 text-xs font-semibold text-primary-fg transition hover:bg-primary-hover">
                  {c.tour.label} <ArrowRight className="size-3.5" aria-hidden />
                </Link>
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
