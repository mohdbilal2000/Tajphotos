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
const AI_CRAWLER_UAS = "OAI-SearchBot|ChatGPT-User|OAI-AdsBot|GPTBot|PerplexityBot|Perplexity-User|Claude-SearchBot|Claude-User|ClaudeBot|DuckAssistBot|Amazonbot";
const htmlLimitedBots = new RegExp(`${NEXT_DEFAULT_HTML_LIMITED_BOTS.source}|${AI_CRAWLER_UAS}`, "i");

/**
 * The `.in` counterpart of each brand redirects to its `.com` rather than serving a copy.
 *
 * A ccTLD does rank better inside India, but the visitors these brands sell to are overseas, and
 * two domains serving identical content is the duplicate-content problem that canonical tags only
 * partly solve — while doubling every future content change. The `.in` names are held defensively
 * (so nobody else runs a lookalike) and pointed at the real site.
 *
 * Implemented as a host-conditional redirect rather than in `proxy.ts`: this is evaluated at the
 * edge before any application code runs, so it costs nothing per request, and Next 16 renamed
 * middleware to proxy precisely to discourage using it for simple redirects like this one.
 *
 * Both domains must be attached to the same Vercel project for this to fire — see DEPLOY.md.
 * A `.in` domain configured as a Vercel-level redirect instead never reaches this code, which is
 * fine: the outcome is identical and this stays as the in-repo source of truth.
 */
function ccTldRedirects() {
  // NOTE: tajphotos.in is deliberately absent — it now serves the backpacker brand (shared
  // small-group departures), which is a different product with its own content, not a copy of
  // the flagship. Only genuinely duplicate ccTLDs redirect.
  const IN_TO_COM: Record<string, string> = {
    "tajphototours.in": "https://tajphototours.com",
    "tajmahalphotographs.in": "https://tajmahalphotographs.com",
  };
  return Object.entries(IN_TO_COM).flatMap(([from, to]) =>
    // `www.` is listed explicitly because `has` matches the Host header exactly — a visitor
    // typing www.tajphotos.in would otherwise fall through and be served the site in place.
    [from, `www.${from}`].map((host) => ({
      source: "/:path*",
      has: [{ type: "host" as const, value: host }],
      destination: `${to}/:path*`,
      permanent: true,
    })),
  );
}

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
      // Every brand now shares one funnel at /quote. "Plan my trip" was the flagship's name for
      // it and means nothing on a print gallery, but the path is in circulation on printed cards,
      // WhatsApp history and existing backlinks — a 301 keeps that equity.
      { source: "/plan-my-trip", destination: "/quote", permanent: true },
      ...ccTldRedirects(),
    ];
  },
};

export default nextConfig;
