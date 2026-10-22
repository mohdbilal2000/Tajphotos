"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { StaticImageData } from "next/image";
import { ArrowRight, Check, MapPin, Navigation, Map as MapIcon, Route } from "lucide-react";
import { cn } from "@/lib/utils";

export interface MapCity {
  slug: string;
  name: string;
  caption: string;
  tagline: string;
  highlights: string[];
  image: StaticImageData;
  alt: string;
  lat: number;
  lng: number;
}

/**
 * The Golden Triangle as an interactive route: real coordinates projected into an SVG, the three
 * cities as numbered photo nodes, and a detail card for the selected city.
 *
 * Google Maps: the "Open in Google Maps" link uses Google's documented Maps URLs
 * (google.com/maps/dir/?api=1), which need no API key and open real driving directions. If
 * NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY is set, a "Live map" tab also appears and embeds the Maps Embed
 * API directions view — that API is free with no usage limit, but Google requires a key for it, so
 * without one the tab simply isn't shown rather than rendering a broken iframe.
 */
const EMBED_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY ?? "";

export function GoldenTriangleMap({ cities, legs }: { cities: MapCity[]; legs: string }) {
  const [active, setActive] = useState(1);
  const [view, setView] = useState<"route" | "live">("route");
  const city = cities[active];

  // Equirectangular projection of the bounding box into a padded 600x440 viewBox. Fine at this
  // scale (a few hundred km); north is up, so Jaipur lands west, Agra south-east of Delhi.
  const W = 600, H = 440, PAD = 125;
  const lats = cities.map((c) => c.lat), lngs = cities.map((c) => c.lng);
  const [minLat, maxLat, minLng, maxLng] = [Math.min(...lats), Math.max(...lats), Math.min(...lngs), Math.max(...lngs)];
  const pt = (c: MapCity) => ({
    x: PAD + ((c.lng - minLng) / (maxLng - minLng || 1)) * (W - PAD * 2),
    y: PAD + ((maxLat - c.lat) / (maxLat - minLat || 1)) * (H - PAD * 2),
  });
  const pts = cities.map(pt);
  // Each leg is drawn separately and trimmed by GAP at both ends, so the route meets the edge of a
  // city photo instead of running underneath it and through its label.
  const GAP = 74;
  const trim = (a: { x: number; y: number }, b: { x: number; y: number }) => {
    const dx = b.x - a.x, dy = b.y - a.y, len = Math.hypot(dx, dy) || 1;
    const k = Math.min(GAP, len / 2 - 1) / len;
    return { x1: a.x + dx * k, y1: a.y + dy * k, x2: b.x - dx * k, y2: b.y - dy * k };
  };
  const legsXY = pts.map((p, i) => trim(p, pts[(i + 1) % pts.length]));

  const names = cities.map((c) => c.name);
  const dirUrl = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(names[0] + ", India")}&destination=${encodeURIComponent(names[0] + ", India")}&waypoints=${encodeURIComponent(names.slice(1).map((n) => n + ", India").join("|"))}&travelmode=driving`;
  const embedUrl = EMBED_KEY
    ? `https://www.google.com/maps/embed/v1/directions?key=${EMBED_KEY}&origin=${encodeURIComponent(names[0])}&destination=${encodeURIComponent(names[0])}&waypoints=${encodeURIComponent(names.slice(1).join("|"))}&mode=driving`
    : "";

  return (
    <div className="grid gap-5 lg:grid-cols-[1.45fr_1fr]">
      <div className="relative overflow-hidden rounded-[1.75rem] bg-ink text-white shadow-lift">
        <div className="flex items-center justify-end gap-4 border-b border-white/10 px-4 py-3 sm:justify-between sm:px-6 sm:py-4 text-[0.625rem] font-semibold uppercase tracking-[0.2em] text-white/70">
          <span className="hidden items-center gap-2 sm:flex"><span className="size-1.5 rounded-full bg-highlight" /> Your route, connected</span>
          <div className="flex items-center gap-1 rounded-full bg-white/5 p-1">
            <button type="button" onClick={() => setView("route")} aria-pressed={view === "route"} className={cn("inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 transition", view === "route" ? "bg-white text-ink" : "hover:text-white")}>
              <Route className="size-3" aria-hidden /> Route
            </button>
            {EMBED_KEY ? (
              <button type="button" onClick={() => setView("live")} aria-pressed={view === "live"} className={cn("inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 transition", view === "live" ? "bg-white text-ink" : "hover:text-white")}>
                <MapIcon className="size-3" aria-hidden /> Live map
              </button>
            ) : (
              <a href={dirUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 transition hover:text-white">
                <MapIcon className="size-3" aria-hidden /> Google Maps
              </a>
            )}
          </div>
        </div>

        {view === "live" && embedUrl ? (
          <iframe title="Golden Triangle driving route on Google Maps" src={embedUrl} className="block aspect-[600/440] w-full border-0 grayscale-[0.2]" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
        ) : (
          <div className="relative aspect-[600/440] w-full">
            {/* faint survey grid */}
            <div aria-hidden className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:44px_44px]" />
            <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 size-full" aria-hidden>
              <defs>
                <linearGradient id="gt-route" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#c9a227" /><stop offset="50%" stopColor="#f4e2b0" /><stop offset="100%" stopColor="#c9a227" />
                </linearGradient>
              </defs>
              <circle cx={W / 2} cy={H / 2} r={150} fill="none" stroke="white" strokeOpacity="0.06" />
              <circle cx={W / 2} cy={H / 2} r={210} fill="none" stroke="white" strokeOpacity="0.04" strokeDasharray="2 6" />
              {legsXY.map((l, i) => {
                // the leg arriving at the selected city is drawn solid and bright
                const arriving = (i + 1) % pts.length === active;
                return (
                  <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke={arriving ? "#fff3cf" : "url(#gt-route)"} strokeWidth={arriving ? 3 : 2} strokeDasharray={arriving ? undefined : "6 7"} strokeLinecap="round" className={arriving ? undefined : "motion-safe:animate-[dash_30s_linear_infinite]"} />
                );
              })}
            </svg>
            {cities.map((c, i) => {
              const p = pts[i];
              const on = i === active;
              return (
                <button
                  key={c.slug}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-pressed={on}
                  aria-label={`Show ${c.name}`}
                  style={{ left: `${(p.x / W) * 100}%`, top: `${(p.y / H) * 100}%` }}
                  className="group absolute -translate-x-1/2 -translate-y-1/2 text-center focus-visible:outline-highlight"
                >
                  <span className={cn("relative block overflow-hidden rounded-full ring-2 transition-all duration-500", on ? "size-16 ring-highlight shadow-[0_0_40px_rgba(201,162,39,0.45)] sm:size-24 lg:size-28" : "size-11 ring-white/30 group-hover:ring-white/70 sm:size-16 lg:size-20")}>
                    <Image src={c.image} alt="" fill sizes="112px" className="object-cover" />
                  </span>
                  <span className="absolute -right-1.5 -top-1 flex size-5 items-center justify-center rounded-full bg-highlight text-[0.5625rem] font-bold text-ink ring-2 ring-ink sm:size-7 sm:text-[0.625rem]">0{i + 1}</span>
                  <span className="mt-1.5 inline-block rounded-full bg-ink/85 px-2.5 py-1 ring-1 ring-white/10 backdrop-blur sm:mt-2">
                    <span className={cn("block font-display text-sm leading-none transition sm:text-lg", on ? "text-highlight" : "text-white")}>{c.name}</span>
                    <span className="mt-1 hidden whitespace-nowrap text-[0.5625rem] font-semibold uppercase tracking-[0.2em] text-white/55 sm:block">{c.caption}</span>
                  </span>
                </button>
              );
            })}
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 px-6 py-4 text-[0.625rem] font-semibold uppercase tracking-[0.2em] text-white/60">
          <span>{legs}</span>
          <a href={dirUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-white transition hover:text-highlight">
            <Navigation className="size-3" aria-hidden /> Open in Google Maps
          </a>
        </div>
      </div>

      <article key={city.slug} className="flex flex-col overflow-hidden rounded-[1.75rem] border border-border bg-surface shadow-soft motion-safe:animate-[fade-up_0.6s_cubic-bezier(0.16,1,0.3,1)_both]">
        <div className="relative m-2 aspect-[16/10] overflow-hidden rounded-[1.25rem]">
          <Image src={city.image} alt={city.alt} fill placeholder="blur" sizes="(min-width: 1024px) 38vw, 92vw" className="object-cover" />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" />
          <span className="absolute left-4 top-3 font-display text-4xl text-white">0{active + 1}</span>
          <span className="absolute bottom-3 right-4 inline-flex items-center gap-1 text-xs text-white"><MapPin className="size-3.5" aria-hidden /> {city.name}, India</span>
        </div>
        <div className="flex flex-1 flex-col px-6 pb-6 pt-4">
          <p className="text-label font-semibold uppercase text-accent">{city.caption}</p>
          <h3 className="mt-3 font-display text-[2.25rem] font-normal leading-none text-ink">
            {city.name}, <em className="text-accent">your way.</em>
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-muted">{city.tagline}</p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {city.highlights.map((h) => (
              <li key={h} className="inline-flex items-center gap-1.5 rounded-full border border-border bg-bg px-3 py-1.5 text-xs text-ink">
                <Check className="size-3 text-primary" aria-hidden /> {h}
              </li>
            ))}
          </ul>
          <Link href={`/destinations/${city.slug}` as "/destinations"} className="group mt-auto flex items-center justify-between border-t border-border pt-5 text-sm font-semibold text-ink">
            Explore {city.name}
            <span className="flex size-11 items-center justify-center rounded-full bg-primary text-primary-fg transition group-hover:translate-x-0.5"><ArrowRight className="size-4" aria-hidden /></span>
          </Link>
        </div>
      </article>
    </div>
  );
}
