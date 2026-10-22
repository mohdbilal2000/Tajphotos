import { Navigation } from "lucide-react";
import type { Tour } from "@/content/types";
import { destinations } from "@/content";
import { cn } from "@/lib/utils";

/**
 * A route map for every tour page. Baymard's travel UX research found most tour sites (57%) show no
 * map on the tour details page, which leaves travellers guessing how far apart the stops are.
 *
 * Static SVG rendered on the server — no map library, no JavaScript. Stops are projected from real
 * coordinates, joined in visiting order and numbered, with a keyless Google Maps directions link
 * (Google's official Maps URLs). Coordinates come from destination content where we have it, else a
 * small table of well-known city centres; a place we can't locate is skipped rather than guessed.
 */
const KNOWN: Record<string, [number, number]> = {
  Delhi: [28.6139, 77.209],
  "New Delhi": [28.6139, 77.209],
  Agra: [27.1767, 78.0081],
  Jaipur: [26.9124, 75.7873],
  Udaipur: [24.5854, 73.7125],
  Jodhpur: [26.2389, 73.0243],
};

function coordsFor(name: string): [number, number] | undefined {
  const d = destinations.find((x) => x.name.toLowerCase() === name.toLowerCase());
  return d ? [d.geo.latitude, d.geo.longitude] : KNOWN[name];
}

export function RouteMap({ tour, className }: { tour: Tour; className?: string }) {
  const names = [tour.startCity, ...tour.destinations.map((s) => destinations.find((d) => d.slug === s)?.name ?? s), tour.endCity]
    .filter((n) => n && coordsFor(n));
  // collapse consecutive repeats (Delhi, Delhi → Delhi)
  const stops = names.filter((n, i) => n !== names[i - 1]);
  if (stops.length === 0) return null;
  const unique = [...new Set(stops)];
  const pts = unique.map((n) => ({ name: n, c: coordsFor(n)! }));

  const W = 640, H = 360, PAD = 70;
  const lats = pts.map((p) => p.c[0]), lngs = pts.map((p) => p.c[1]);
  const [minLat, maxLat, minLng, maxLng] = [Math.min(...lats), Math.max(...lats), Math.min(...lngs), Math.max(...lngs)];
  // keep aspect honest: scale both axes by the same factor so distances aren't distorted
  const spanLng = Math.max(maxLng - minLng, 0.5), spanLat = Math.max(maxLat - minLat, 0.5);
  const k = Math.min((W - PAD * 2) / spanLng, (H - PAD * 2) / spanLat);
  const cx = (minLng + maxLng) / 2, cy = (minLat + maxLat) / 2;
  const xy = (c: [number, number]) => ({ x: W / 2 + (c[1] - cx) * k, y: H / 2 - (c[0] - cy) * k });
  const P = Object.fromEntries(pts.map((p) => [p.name, xy(p.c)]));
  const path = stops.map((n, i) => `${i ? "L" : "M"} ${P[n].x.toFixed(1)} ${P[n].y.toFixed(1)}`).join(" ");
  const loops = stops.length > 1 && stops[0] === stops[stops.length - 1];

  // Label placement: for each city try right / left / above / below and keep the spot farthest from
  // every route segment, so a line never runs through a city name.
  const segs = stops.slice(1).map((n, i) => [P[stops[i]], P[n]] as const);
  const distToSeg = (px: number, py: number, a: { x: number; y: number }, b: { x: number; y: number }) => {
    const dx = b.x - a.x, dy = b.y - a.y, L = dx * dx + dy * dy || 1;
    const t = Math.max(0, Math.min(1, ((px - a.x) * dx + (py - a.y) * dy) / L));
    return Math.hypot(px - (a.x + t * dx), py - (a.y + t * dy));
  };
  const labelFor = (name: string) => {
    const { x, y } = P[name];
    const w = name.length * 8.5; // approx rendered width at 16px
    const opts = [
      { cx: x + 22 + w / 2, ly: y + 5, lx: x + 22, anchor: "start" as const },
      { cx: x - 22 - w / 2, ly: y + 5, lx: x - 22, anchor: "end" as const },
      { cx: x, ly: y - 22, lx: x, anchor: "middle" as const },
      { cx: x, ly: y + 34, lx: x, anchor: "middle" as const },
    ].filter((o) => o.cx - w / 2 > 4 && o.cx + w / 2 < W - 4);
    const score = (o: (typeof opts)[number]) => Math.min(...segs.map(([a, b]) => Math.min(
      distToSeg(o.cx - w / 2, o.ly - 5, a, b), distToSeg(o.cx, o.ly - 5, a, b), distToSeg(o.cx + w / 2, o.ly - 5, a, b),
    )), 999);
    return opts.sort((p, q) => score(q) - score(p))[0] ?? { lx: x + 22, ly: y + 5, anchor: "start" as const };
  };

  const q = (n: string) => encodeURIComponent(`${n}, India`);
  const gmaps =
    stops.length === 1
      ? `https://www.google.com/maps/search/?api=1&query=${q(stops[0])}`
      : `https://www.google.com/maps/dir/?api=1&origin=${q(stops[0])}&destination=${q(stops[stops.length - 1])}${
          stops.length > 2 ? `&waypoints=${stops.slice(1, -1).map(q).join("%7C")}` : ""
        }&travelmode=driving`;

  return (
    <figure className={cn("overflow-hidden rounded-[1.5rem] bg-ink text-white shadow-soft", className)}>
      <div className="relative">
        <div aria-hidden className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:40px_40px]" />
        <svg viewBox={`0 0 ${W} ${H}`} className="relative block w-full" role="img" aria-label={`Route: ${stops.join(" to ")}`}>
          {stops.length > 1 && <path d={path} fill="none" stroke="#c9a227" strokeWidth="2.5" strokeDasharray="7 7" strokeLinecap="round" strokeLinejoin="round" />}
          {pts.map((p, i) => {
            const { x, y } = P[p.name];
            const lab = labelFor(p.name);
            return (
              <g key={p.name}>
                <circle cx={x} cy={y} r="16" fill="#c9a227" fillOpacity="0.18" />
                <circle cx={x} cy={y} r="9" fill="#c9a227" stroke="#141210" strokeWidth="3" />
                <text x={x} y={y + 3.5} textAnchor="middle" fontSize="9" fontWeight="700" fill="#141210">{i + 1}</text>
                <g transform={`translate(${lab.lx} ${lab.ly})`}>
                  <text textAnchor={lab.anchor} fontSize="16" fill="white" fontFamily="var(--font-display-serif), Georgia, serif" stroke="#141210" strokeWidth="5" paintOrder="stroke">{p.name}</text>
                </g>
              </g>
            );
          })}
        </svg>
      </div>
      <figcaption className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 px-5 py-4 text-xs text-white/70">
        <span>{stops.join(" → ")}{loops ? " (round trip)" : ""}</span>
        <a href={gmaps} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-semibold text-white transition hover:text-highlight">
          <Navigation className="size-3.5" aria-hidden /> Open route in Google Maps
        </a>
      </figcaption>
    </figure>
  );
}
