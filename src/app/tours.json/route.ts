import { tours } from "@/content";
import { site, whatsappLink } from "@/config/site";
import { absoluteUrl } from "@/lib/utils";
import { priceValidUntil } from "@/lib/seo";
import { getImage } from "@/content/images";

/**
 * A flat, machine-readable feed of every tour: slug, price (all supported currencies), duration,
 * group size, destinations, and — the part that actually matters — an explicit `enquiryAction`
 * naming the two real ways to proceed, since this business quotes and confirms bookings with a
 * human rather than selling a fixed-price, instantly-purchasable SKU. No commerce/agentic-checkout
 * protocol (OpenAI ACP, Google AP2/UCP) currently models that "get back to me with a quote" shape,
 * so this feed's job is legibility and hand-off, not machine-completable checkout: an agent (or a
 * human's copy-paste) that reads this can accurately describe a tour and route the traveller to
 * WhatsApp or /plan-my-trip, rather than reconstructing intent from 16 separate marketing pages.
 * Linked from llms-full.txt; not yet linked from robots.txt/sitemap since it's a data file, not a
 * page — reconsider if a specific agent/aggregator asks for it there.
 */
export function GET() {
  const feed = {
    business: { name: site.name, url: site.url, description: site.description, whatsapp: whatsappLink(), enquiryFormUrl: absoluteUrl("/plan-my-trip") },
    generatedAt: new Date().toISOString(),
    priceValidUntil: priceValidUntil(),
    currency: "USD",
    tours: tours.map((t) => ({
      slug: t.slug,
      title: t.title,
      url: absoluteUrl(`/tours/${t.slug}`),
      summary: t.summary,
      category: t.category,
      durationDays: t.durationDays,
      durationLabel: t.durationLabel,
      groupSize: t.groupSize,
      startCity: t.startCity,
      endCity: t.endCity,
      destinations: t.destinations,
      priceFromUsd: t.priceFrom.usd,
      priceNote: t.priceNote,
      priceTiers: t.priceTiers ?? null,
      image: absoluteUrl(getImage(t.heroImage).src.src),
      enquiryAction: {
        description: "Prices vary by group size, season and hotel category and are confirmed by a person, not booked instantly — message us to get an exact quote.",
        whatsapp: whatsappLink(`Hi ${site.name}! I'm interested in "${t.title}" (${absoluteUrl(`/tours/${t.slug}`)}). Could you share availability and an exact price?`),
        enquiryForm: absoluteUrl("/plan-my-trip"),
      },
    })),
  };
  return Response.json(feed, { headers: { "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800" } });
}
