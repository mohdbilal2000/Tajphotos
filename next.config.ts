import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  typedRoutes: true,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 414, 640, 768, 1024, 1280, 1536, 1920],
    imageSizes: [64, 96, 128, 256, 384, 512],
    qualities: [60, 70, 75, 82],
    minimumCacheTTL: 60 * 60 * 24 * 365,
  },
  async headers() {
    return [
      { source: "/(.*)", headers: securityHeaders },
      { source: "/(llms|llms-full).txt", headers: [{ key: "Cache-Control", value: "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800" }] },
    ];
  },
  async redirects() {
    return [
      { source: "/tour/:slug", destination: "/tours/:slug", permanent: true },
      { source: "/blog/:slug", destination: "/guides/:slug", permanent: true },
      { source: "/destination/:slug", destination: "/destinations/:slug", permanent: true },
    ];
  },
};

export default nextConfig;
