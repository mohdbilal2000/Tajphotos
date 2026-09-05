import type { MetadataRoute } from "next";
import { site } from "@/config/site";

/**
 * Crawler policy for 2026: explicitly allow the search + AI answer-engine crawlers that drive
 * citations (Googlebot, Bingbot, OAI-SearchBot/ChatGPT-User, PerplexityBot/Perplexity-User,
 * Claude-SearchBot/Claude-User, Applebot, DuckAssistBot, Amazonbot) rather than leaving them to a
 * wildcard; explicitly block training-only scrapers with a poor citation-to-cost ratio (Bytespider
 * in particular does not reliably honour robots.txt and should also be blocked at the WAF/edge).
 *
 * Google-Extended specifically (distinct from Googlebot) is the toggle for whether Google may use
 * this content for AI Overviews/Gemini grounding and model training — it's already implicitly
 * allowed via the wildcard rule below, but named explicitly here too since it's the crawler that
 * actually gates AI-citation eligibility for Google's surfaces, not just a training-data detail
 * worth burying in the default rule.
 */
export default function robots(): MetadataRoute.Robots {
  const disallow = ["/api/", "/thank-you", "/_next/", "/plan-my-trip/success"];
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow },
      { userAgent: ["Googlebot", "Google-Extended", "Bingbot", "OAI-SearchBot", "ChatGPT-User", "PerplexityBot", "Perplexity-User", "Claude-SearchBot", "Claude-User", "Applebot", "DuckAssistBot", "Amazonbot"], allow: "/", disallow },
      { userAgent: ["Bytespider", "CCBot"], disallow: "/" },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
