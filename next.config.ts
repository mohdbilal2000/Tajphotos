import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

// Next.js only sends a single blocking HTML document (vs. a streamed, hydration-dependent
// response) to user agents matched here. The framework's own default list covers Googlebot,
// Bingbot and Applebot — the three crawlers documented to render JavaScript — but none of the
// AI answer-engine crawlers this site's robots.ts explicitly courts (OAI-SearchBot, ChatGPT-User,
// PerplexityBot, Perplexity-User, Claude-SearchBot, Claude-User, DuckAssistBot, Amazonbot), all of
// which are documented or empirically shown NOT to execute JS. The site has no Suspense/PPR/"use
// cache" today so this is currently inert, but setting htmlLimitedBots REPLACES Next's default
// (it does not extend it — see the Next.js docs), so the moment any future feature (live
// availability, a real-time FX rate) adopts streaming, every uncovered AI crawler would silently
// start receiving a hydration-dependent shell instead of the full page. Keep the Next.js default
// pattern verbatim below and only ever add to it, never replace it outright.
const NEXT_DEFAULT_HTML_LIMITED_BOTS =
  /[\w-]+-Google|Google-[\w-]+|Chrome-Lighthouse|Slurp|DuckDuckBot|baiduspider|yandex|sogou|bitlybot|tumblr|vkShare|quora link preview|redditbot|ia_archiver|Bingbot|BingPreview|applebot|facebookexternalhit|facebookcatalog|Twitterbot|LinkedInBot|Slackbot|Discordbot|WhatsApp|SkypeUriPreview|Yeti|googleweblight/i;
const AI_CRAWLER_UAS = "OAI-SearchBot|ChatGPT-User|OAI-AdsBot|GPTBot|PerplexityBot|Perplexity-User|Claude-SearchBot|Claude-User|ClaudeBot|DuckAssistBot|Amazonbot|MistralAI-User|meta-externalagent|meta-externalfetcher";
const htmlLimitedBots = new RegExp(`${NEXT_DEFAULT_HTML_LIMITED_BOTS.source}|${AI_CRAWLER_UAS}`, "i");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  typedRoutes: true,
  htmlLimitedBots,
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
