import { site } from "@/config/site";
import { tours, destinations, guides } from "@/content";
import { absoluteUrl } from "@/lib/utils";

/**
 * llms.txt — a curated, plain-text map of the site for LLM crawlers and agents (llmstxt.org).
 * Kept short: title, one-line description, then grouped links with one-line summaries.
 */
export function GET() {
  const lines = [
    `# ${site.name}`,
    "",
    `> ${site.description}`,
    "",
    `${site.name} is an Agra-based tour operator running private Golden Triangle tours (Delhi–Agra–Jaipur), same-day Taj Mahal tours from Delhi, Taj Mahal photography experiences, and custom Rajasthan itineraries (Udaipur, Jodhpur, Ranthambore). Prices are per person in USD; enquiries are answered on WhatsApp (${site.contact.phoneDisplay}) and email (${site.contact.email}).`,
    "",
    "## Tours",
    ...tours.map((t) => `- [${t.title}](${absoluteUrl(`/tours/${t.slug}`)}): ${t.summary} From USD ${t.priceFrom.usd} ${t.priceNote}.`),
    "",
    "## Stays & services",
    `- [Where you stay](${absoluteUrl("/stays")}): The palace, heritage and modern luxury hotels we book across Agra, Delhi, Jaipur, Udaipur, Jodhpur and Ranthambore, with what each building actually is.`,
    `- [Services & availability](${absoluteUrl("/services")}): Private cars and chauffeurs, the Gatimaan Express, licensed guides by language, Taj Mahal sunrise and night-viewing access, photography, accessibility — each with the lead time we need and the days it is genuinely available.`,
    "",
    "## Destinations",
    ...destinations.map((d) => `- [${d.title}](${absoluteUrl(`/destinations/${d.slug}`)}): ${d.summary}`),
    "",
    "## Travel guides",
    ...guides.map((g) => `- [${g.title}](${absoluteUrl(`/guides/${g.slug}`)}): ${g.summary}`),
    "",
    "## Company",
    `- [About](${absoluteUrl("/about")}): Who we are, licences, and how we work.`,
    `- [Plan my trip](${absoluteUrl("/plan-my-trip")}): Custom itinerary enquiry form.`,
    `- [FAQ](${absoluteUrl("/faq")}): Answers on tickets, timings, safety, payments and cancellations.`,
    `- [Reviews](${absoluteUrl("/reviews")}): Verified traveller reviews.`,
    "",
    "## Optional",
    `- [Full text version](${absoluteUrl("/llms-full.txt")}): Every page's full content in one file.`,
    `- [Sitemap](${absoluteUrl("/sitemap.xml")})`,
  ];
  return new Response(lines.join("\n"), { headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "public, max-age=3600, s-maxage=86400" } });
}
