import { ImageResponse } from "next/og";
import { site } from "@/config/site";

export const alt = `${site.name} — Golden Triangle tours & Taj Mahal photography`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 64, background: "linear-gradient(135deg, #1c1917 0%, #3b1b14 55%, #8b2f1e 100%)", color: "#faf7f2", fontFamily: "Georgia, serif" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 40, fontWeight: 700 }}>
          Taj<span style={{ color: "#d9a441" }}>Photos</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 66, lineHeight: 1.05, fontWeight: 700, letterSpacing: -1.5, maxWidth: 1000 }}>Golden Triangle tours & Taj Mahal photography</div>
          <div style={{ fontSize: 30, color: "#e9e1d3", fontFamily: "sans-serif" }}>Private tours of Agra, Delhi, Jaipur & Udaipur — run by Agra locals</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "#d9a441", fontFamily: "sans-serif" }}>
          <span>tajphotos.com</span>
          <span>Rated {site.stats.rating.value}/5 · {site.stats.travellersServed} travellers</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
