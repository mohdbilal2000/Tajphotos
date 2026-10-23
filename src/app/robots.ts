import type { MetadataRoute } from "next";
import { site } from "@/config/site";

/**
 * Crawler policy, reviewed October 2026.
 *
 * The goal is to be findable and citable everywhere travellers ask questions, so every search and
 * AI answer-engine crawler is allowed by name. Naming them matters: some operators read only their
 * own group, and an explicit allow survives a future tightening of the wildcard rule.
 *
 * - Search + AI answers: Googlebot (also feeds AI Overviews and AI Mode), Bingbot (also feeds
 *   Copilot), OAI-SearchBot and ChatGPT-User, Claude-SearchBot and Claude-User, PerplexityBot and
 *   Perplexity-User, Applebot, DuckAssistBot, Amazonbot, MistralAI-User, Meta-ExternalFetcher.
 * - Model training and grounding tokens: GPTBot, ClaudeBot, Google-Extended, Applebot-Extended,
 *   Meta-ExternalAgent, Google-CloudVertexBot. Allowed on purpose, because being inside the models'
 *   knowledge helps a small operator get named in answers. Remove a token here to opt out of one
 *   vendor's training without losing its search visibility.
 * - Blocked: Bytespider and CCBot, which have a poor citation-to-cost ratio. Bytespider does not
 *   reliably honour robots.txt, so also block it at the edge.
 *
 * Opting out of Google AI Overviews alone is done with the Search Console AI control, not here.
 */
export default function robots(): MetadataRoute.Robots {
  const disallow = ["/api/", "/thank-you", "/_next/", "/plan-my-trip/success"];
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow },
      {
        userAgent: [
          "Googlebot",
          "Google-Extended",
          "Google-CloudVertexBot",
          "Bingbot",
          "OAI-SearchBot",
          "ChatGPT-User",
          "GPTBot",
          "Claude-SearchBot",
          "Claude-User",
          "ClaudeBot",
          "PerplexityBot",
          "Perplexity-User",
          "Applebot",
          "Applebot-Extended",
          "DuckAssistBot",
          "Amazonbot",
          "MistralAI-User",
          "Meta-ExternalAgent",
          "Meta-ExternalFetcher",
        ],
        allow: "/",
        disallow,
      },
      { userAgent: ["Bytespider", "CCBot"], disallow: "/" },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
