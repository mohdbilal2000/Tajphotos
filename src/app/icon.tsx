import { ImageResponse } from "next/og";

export const size = { width: 512, height: 512 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#8b2f1e", borderRadius: 96, color: "#faf7f2", fontFamily: "Georgia, serif", fontSize: 320, fontWeight: 700 }}>
        T
      </div>
    ),
    { ...size },
  );
}
