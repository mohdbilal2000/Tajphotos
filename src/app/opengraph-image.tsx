import { ImageResponse } from "next/og";
import { site } from "@/config/site";
import { brand } from "@/config/brand";

export const alt = `${site.name} — ${brand.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * The share card, drawn from the active brand.
 *
 * Everything here used to be hard-coded to the flagship. This image is cached by every platform
 * it is shared on and is often the very first thing a person sees of a brand, so a card showing
 * another brand's name, domain and tagline is both the most visible possible error and the
 * hardest to walk back once it has propagated.
 *
 * Colours come from the brand palette but are re-composed for a dark card: the site palettes are
 * all light-ground, and inverting them here keeps the four cards recognisably a set while still
 * reading as four different businesses in a crowded feed.
 */
export default function OgImage() {
  const name = site.name.trim().split(" ");
  const tail = name.pop() ?? site.name;
  const lead = name.join(" ");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
          background: `linear-gradient(135deg, ${brand.palette.ink} 0%, ${brand.palette.primary} 60%, ${brand.palette.accent} 100%)`,
          color: brand.palette.bg,
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 40, fontWeight: 700 }}>
          {lead ? <span>{lead}&nbsp;</span> : null}
          <span style={{ color: brand.palette.highlight }}>{tail}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 62, lineHeight: 1.05, fontWeight: 700, letterSpacing: -1.5, maxWidth: 1000 }}>{brand.tagline}</div>
          <div style={{ fontSize: 28, color: brand.palette.bg, opacity: 0.85, fontFamily: "sans-serif", maxWidth: 1000 }}>{brand.audience}</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: brand.palette.highlight, fontFamily: "sans-serif" }}>
          <span>{brand.domain}</span>
          {/* Same rule as StatStrip/Hero/AggregateRating JSON-LD: never bake a specific star
              rating into a confident claim until site.stats.ratingVerified is real — this image
              gets cached by every platform it's shared on, so a placeholder number here is the
              hardest of all of them to walk back once shipped. */}
          <span>{site.stats.ratingVerified ? `Rated ${site.stats.rating.value}/5 · ` : ""}{site.stats.travellersServed} travellers</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
