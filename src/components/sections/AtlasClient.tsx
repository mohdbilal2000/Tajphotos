"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { StaticImageData } from "next/image";
import { ArrowRight, ArrowUpRight, BookOpen, Navigation, Plane } from "lucide-react";
import { whatsappLink } from "@/config/site";
import { cn } from "@/lib/utils";

export interface AtlasStop {
  key: string;
  name: string;
  caption: string;
  line: string;
  lat: number;
  lng: number;
  imageId: string;
  image: StaticImageData;
  alt: string;
  href?: string;
  tours: { slug: string; title: string; meta: string }[];
  guides: { slug: string; title: string }[];
}
export interface AtlasRoute {
  key: string;
  label: string;
  tour: string;
  days?: string;
  path: string[];
  flights?: string[];
  legs: { from: string; to: string; info: string }[];
}

// Cos-latitude corrected projection of north-west India into a 660×520 sheet. 104 px per degree of
// latitude ≈ 111 km, which is what makes the scale bar below honest.
const W = 660, H = 520, K = 104, COS = Math.cos((26.5 * Math.PI) / 180);
const px = (lng: number, lat: number) => ({ x: 34 + (lng - 72.55) * K * COS, y: 34 + (29 - lat) * K });
const KM100 = (100 / 111) * K;

const LABEL: Record<string, "left" | "right" | "below"> = { "fatehpur-sikri": "left", jaipur: "left", agra: "below" };

/** Gentle arc between two points; flights bow further so they read as "not a road". */
function arc(a: { x: number; y: number }, b: { x: number; y: number }, bow: number) {
  const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2, dx = b.x - a.x, dy = b.y - a.y;
  return `M${a.x},${a.y} Q${mx - dy * bow},${my + dx * bow} ${b.x},${b.y}`;
}

// Decorative geography, deliberately approximate and unlabelled beyond names: the Aravalli ridge
// runs south-west from Delhi towards Udaipur, the Yamuna flows from Delhi past Agra.
const aravalli = [[77.1, 28.3], [76.2, 27.6], [74.7, 26.4], [74.1, 25.4], [73.6, 24.4]].map(([g, l]) => px(g, l));
const yamuna = [[77.25, 28.9], [77.27, 28.6], [77.55, 28.0], [77.68, 27.49], [78.03, 27.16], [78.6, 26.75]].map(([g, l]) => px(g, l));
const poly = (p: { x: number; y: number }[]) => p.map((q, i) => `${i ? "L" : "M"}${q.x},${q.y}`).join(" ");

export function AtlasClient({ stops, routes }: { stops: AtlasStop[]; routes: AtlasRoute[] }) {
  const [rk, setRk] = useState(routes[0].key);
  const route = routes.find((r) => r.key === rk)!;
  const [sel, setSel] = useState("agra");
  const stop = stops.find((s) => s.key === sel)!;
  const P = Object.fromEntries(stops.map((s) => [s.key, px(s.lng, s.lat)]));
  const onRoute = new Set(route.path);
  const names = route.path.map((k) => stops.find((s) => s.key === k)!.name);
  const dirUrl = `https://www.google.com/maps/dir/${names.map((n) => encodeURIComponent(n + ", India")).join("/")}`;
  const wa = whatsappLink(`Hi TajPhotos — I'd like to plan the ${route.label.replace("+ ", "Golden Triangle + ")} route (${names.join(" → ")}). Dates: `);

  const pick = (k: string) => {
    setSel(k);
    if (!onRoute.has(k)) {
      const r = routes.find((x) => x.path.includes(k));
      if (r) setRk(r.key);
    }
  };

  return (
    <div className="grid gap-5 lg:grid-cols-[1.5fr_1fr]">
      <div className="min-w-0 overflow-hidden rounded-[1.75rem] border border-border bg-[#f3ede2] shadow-soft">
        {/* route chooser */}
        <div className="flex gap-2 overflow-x-auto border-b border-border/70 p-3 scrollbar-none sm:p-4" role="tablist" aria-label="Choose a route">
          {routes.map((r) => (
            <button
              key={r.key}
              type="button"
              role="tab"
              aria-selected={r.key === rk}
              onClick={() => { setRk(r.key); setSel(r.path[1] ?? r.path[0]); }}
              className={cn(
                "shrink-0 rounded-full px-4 py-2 text-left text-sm transition",
                r.key === rk ? "bg-primary text-primary-fg shadow-soft" : "bg-surface/70 text-ink hover:bg-surface",
              )}
            >
              <span className="font-semibold">{r.label}</span>
              {r.days && <span className={cn("ml-2 text-xs", r.key === rk ? "text-primary-fg/75" : "text-muted")}>{r.days.split(" /")[0]}</span>}
            </button>
          ))}
        </div>

        <div className="relative aspect-[660/520] w-full">
          <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 size-full" aria-hidden>
            <defs>
              <radialGradient id="atl-paper" cx="55%" cy="40%" r="75%">
                <stop offset="0%" stopColor="#faf6ee" /><stop offset="100%" stopColor="#ece3d2" />
              </radialGradient>
              <pattern id="atl-dots" width="14" height="14" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="0.9" fill="#8a3b22" opacity="0.12" /></pattern>
            </defs>
            <rect width={W} height={H} fill="url(#atl-paper)" />
            {/* Thar: a dotted wash to the west */}
            <ellipse cx={px(72.9, 26.6).x} cy={px(72.9, 26.6).y} rx="120" ry="170" fill="url(#atl-dots)" />
            <text x={px(72.75, 27.6).x} y={px(72.75, 27.6).y} className="fill-accent/50 font-display italic" fontSize="15">Thar Desert</text>
            <path d={poly(aravalli)} fill="none" stroke="#b9a07a" strokeOpacity="0.28" strokeWidth="26" strokeLinecap="round" strokeLinejoin="round" />
            <text x={px(74.75, 25.85).x} y={px(74.75, 25.85).y} transform={`rotate(-50 ${px(74.75, 25.85).x} ${px(74.75, 25.85).y})`} className="fill-[#8c7553]" fontSize="10" letterSpacing="3">ARAVALLI HILLS</text>
            <path d={poly(yamuna)} fill="none" stroke="#7aa2b8" strokeOpacity="0.7" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            <text x={px(77.75, 27.9).x} y={px(77.75, 27.9).y} className="fill-[#5f8aa1] italic" fontSize="11">Yamuna</text>

            {/* every route, faint, so the network is visible */}
            {routes.flatMap((r) => r.path.slice(1).map((k, i) => (
              <path key={`${r.key}${i}`} d={arc(P[r.path[i]], P[k], 0.12)} fill="none" stroke="#1b3a34" strokeOpacity="0.1" strokeWidth="1.5" strokeDasharray="3 5" />
            )))}
            {/* the chosen route, drawn on */}
            <g key={rk}>
              {route.path.slice(1).map((k, i) => {
                const from = route.path[i];
                const flight = route.flights?.includes(`${from}-${k}`);
                return (
                  <path
                    key={i}
                    d={arc(P[from], P[k], flight ? 0.28 : 0.12)}
                    pathLength={1}
                    fill="none"
                    stroke={flight ? "#8a3b22" : "#1b3a34"}
                    strokeWidth={flight ? 2 : 3}
                    strokeLinecap="round"
                    strokeDasharray={flight ? "0.02 0.02" : "1 1"}
                    className={flight ? undefined : "atlas-draw"}
                    style={{ animationDelay: `${i * 0.35}s` }}
                  />
                );
              })}
            </g>
            {/* compass + scale */}
            <g transform={`translate(${W - 46} 46)`} className="text-ink">
              <circle r="18" fill="none" stroke="currentColor" strokeOpacity="0.25" />
              <path d="M0,-14 L4,0 L0,14 L-4,0Z" fill="currentColor" fillOpacity="0.55" />
              <text y="-22" textAnchor="middle" fontSize="10" fill="currentColor" fillOpacity="0.6">N</text>
            </g>
            <g transform={`translate(${W - KM100 - 70} ${H - 22})`}>
              <line x2={KM100} stroke="#1b1b1b" strokeOpacity="0.55" strokeWidth="2" />
              <line y1="-4" y2="4" stroke="#1b1b1b" strokeOpacity="0.55" /><line x1={KM100} x2={KM100} y1="-4" y2="4" stroke="#1b1b1b" strokeOpacity="0.55" />
              <text x={KM100 + 8} y="4" fontSize="10" fill="#1b1b1b" fillOpacity="0.6">100 km</text>
            </g>
          </svg>

          {stops.map((s) => {
            const p = P[s.key];
            const on = onRoute.has(s.key);
            const active = s.key === sel;
            const left = LABEL[s.key] === "left";
            const below = LABEL[s.key] === "below";
            return (
              <button
                key={s.key}
                type="button"
                onClick={() => pick(s.key)}
                aria-pressed={active}
                aria-label={`${s.name}, ${s.caption}`}
                style={{ left: `${(p.x / W) * 100}%`, top: `${(p.y / H) * 100}%` }}
                className={cn("group absolute flex items-center", below ? "-translate-x-1/2 -translate-y-[0.6rem] flex-col gap-1.5 sm:-translate-y-[1rem]" : "-translate-y-1/2 gap-2", left && "-translate-x-[calc(100%-0.5rem)] flex-row-reverse", !left && !below && "-translate-x-2", active && "z-10")}
              >
                {active ? (
                  <span className={cn("relative block size-9 overflow-hidden rounded-full shadow-lift ring-[3px] ring-accent sm:size-14", !below && "-m-2.5")}>
                    <Image src={s.image} alt="" fill sizes="64px" className="object-cover" />
                  </span>
                ) : (
                  <span className={cn("block size-3.5 rounded-full ring-4 transition sm:size-4", on ? "bg-primary ring-primary/20 group-hover:ring-primary/35" : "bg-surface ring-ink/15 group-hover:ring-ink/30")} />
                )}
                <span className={cn("whitespace-nowrap rounded-full px-2 py-0.5 text-left leading-tight transition sm:px-2.5 sm:py-1", active ? "bg-ink text-bg" : "bg-surface/85 text-ink backdrop-blur", !on && !active && "opacity-60")}>
                  <span className="block font-display text-[0.8rem] sm:text-base">{s.name}</span>
                  <span className={cn("hidden text-[0.55rem] font-semibold uppercase tracking-[0.18em] sm:block", active ? "text-bg/60" : "text-muted")}>{s.caption}</span>
                </span>
              </button>
            );
          })}
        </div>

        {/* the legs, in words — same numbers as the itinerary */}
        <div className="border-t border-border/70 bg-surface/60 p-4 sm:p-5">
          <ol className="grid gap-2 text-sm sm:grid-cols-2">
            {route.legs.map((l, i) => (
              <li key={i} className="flex items-baseline gap-2">
                <span className="text-xs font-semibold tabular-nums text-accent">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-ink"><span className="font-semibold">{l.from} → {l.to}</span> <span className="text-muted">· {l.info}</span>{/flight/i.test(l.info) && <Plane className="ml-1 inline size-3.5 text-accent" aria-hidden />}</span>
              </li>
            ))}
          </ol>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-fg shadow-soft transition hover:-translate-y-px hover:bg-accent-hover">
              Plan this route on WhatsApp <ArrowRight className="size-4" aria-hidden />
            </a>
            <Link href={`/tours/${route.tour}` as "/tours"} className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary underline decoration-primary/30 underline-offset-4 hover:decoration-primary">
              See the {route.days?.split(" /")[0]} itinerary
            </Link>
            <a href={dirUrl} target="_blank" rel="noopener noreferrer" className="ml-auto inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-muted hover:text-ink">
              <Navigation className="size-3.5" aria-hidden /> Google Maps
            </a>
          </div>
          <p className="mt-3 text-xs text-muted">Free cancellation up to 48 hours before most tours · small deposit, balance paid in India.</p>
        </div>
      </div>

      {/* the place you tapped */}
      <article key={stop.key} className="flex min-w-0 flex-col overflow-hidden rounded-[1.75rem] border border-border bg-surface shadow-soft motion-safe:animate-[fade-up_0.5s_cubic-bezier(0.16,1,0.3,1)_both]">
        <div className="relative aspect-[16/11] overflow-hidden">
          <Image src={stop.image} alt={stop.alt} fill placeholder="blur" sizes="(min-width: 1024px) 36vw, 92vw" className="object-cover" />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
          <div className="absolute inset-x-5 bottom-4 text-white">
            <p className="text-[0.625rem] font-semibold uppercase tracking-[0.22em] text-white/75">{stop.caption} · {stop.lat.toFixed(2)}°N {stop.lng.toFixed(2)}°E</p>
            <h3 className="mt-1 font-display text-4xl font-normal leading-none">{stop.name}</h3>
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-5 p-5 sm:p-6">
          <p className="text-[0.95rem] leading-relaxed text-ink">{stop.line}</p>
          {stop.tours.length > 0 && (
            <div>
              <p className="eyebrow">Tours that go here</p>
              <ul className="mt-2 divide-y divide-border">
                {stop.tours.map((t) => (
                  <li key={t.slug}>
                    <Link href={`/tours/${t.slug}` as "/tours"} className="group flex items-center justify-between gap-3 py-2.5 text-sm">
                      <span className="min-w-0"><span className="block truncate font-semibold text-ink group-hover:text-primary">{t.title}</span><span className="text-xs text-muted">{t.meta}</span></span>
                      <ArrowUpRight className="size-4 shrink-0 text-muted transition group-hover:text-primary" aria-hidden />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {stop.guides.length > 0 && (
            <div>
              <p className="eyebrow">Read before you go</p>
              <ul className="mt-2 space-y-1.5">
                {stop.guides.map((g) => (
                  <li key={g.slug}>
                    <Link href={`/guides/${g.slug}` as "/guides"} className="inline-flex items-start gap-2 text-sm text-ink hover:text-primary">
                      <BookOpen className="mt-0.5 size-3.5 shrink-0 text-accent" aria-hidden /> {g.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {stop.href && (
            <Link href={stop.href as "/destinations"} className="group mt-auto flex items-center justify-between border-t border-border pt-4 text-sm font-semibold text-ink">
              Everything about {stop.name}
              <span className="flex size-10 items-center justify-center rounded-full bg-primary text-primary-fg transition group-hover:translate-x-0.5"><ArrowRight className="size-4" aria-hidden /></span>
            </Link>
          )}
        </div>
      </article>
    </div>
  );
}
