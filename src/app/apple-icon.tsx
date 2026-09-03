import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#8b2f1e", color: "#faf7f2", fontFamily: "Georgia, serif", fontSize: 112, fontWeight: 700 }}>
        T
      </div>
    ),
    { ...size },
  );
}
