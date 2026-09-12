/**
 * Brand-derived site identity.
 *
 * This is a thin, stable facade over `@/config/brand` — the four brands each build from this
 * same codebase (see `src/config/brands/types.ts`), so everything brand-specific is resolved
 * there and re-shaped here into the single `site` object the UI, JSON-LD, sitemap, llms.txt and
 * metadata have always consumed. Adding a brand therefore touches `src/config/brands/` only.
 *
 * Values marked TODO are still placeholders — replace them before launch.
 */

import { brand, siteUrl, hasPhone, PARENT } from "@/config/brand";

export { brand, siteUrl, hasWhatsApp, hasPhone, whatsappLink, siblingBrands, PARENT } from "@/config/brand";

const env = (key: string | undefined, fallback: string) => (key && key.trim()) || fallback;

export const site = {
  name: brand.name,
  legalName: brand.legalName,
  tagline: brand.tagline,
  description: brand.description,
  url: siteUrl,
  locale: "en_IN",
  language: "en",
  foundingYear: 2016, // TODO: confirm
  /** The one sentence that separates this brand from its siblings — used in copy and schema. */
  product: brand.product,
  audience: brand.audience,
  contact: {
    ...brand.contact,
    hoursNote: "We reply on WhatsApp within minutes, 7 days a week (7 AM – 11 PM IST)",
  },
  address: {
    // TODO: real office address (used for LocalBusiness schema + Google Business Profile consistency).
    // NOTE: all four brands share one legal entity and one office. That means they cannot each
    // hold a separate Google Business Profile at this address — multiple GBPs on one address in
    // one category is the single most reliable way to get all of them suspended. Verify one
    // profile, for the flagship, unless genuinely distinct staffed premises exist.
    streetAddress: "Fatehabad Road, Tajganj",
    addressLocality: "Agra",
    addressRegion: "Uttar Pradesh",
    postalCode: "282001",
    addressCountry: "IN",
  },
  geo: { latitude: 27.1638, longitude: 78.0421 }, // Tajganj, Agra (TODO: refine to office)
  openingHours: ["Mo-Su 07:00-23:00"],
  priceRange: "$$",
  currencies: ["USD", "INR", "EUR", "GBP"] as const,
  /**
   * Static indicative FX rates. Retained for any future price display, but note that
   * `brand.showPrices` is false across the whole portfolio: nothing is quoted publicly, because
   * every job is scoped individually. Re-check quarterly if a brand ever opts back in.
   */
  fxRates: { USD: 1, INR: 95, EUR: 0.86, GBP: 0.74 } as Record<"USD" | "INR" | "EUR" | "GBP", number>,
  showPrices: brand.showPrices,
  social: {
    instagram: brand.social.instagram ?? "",
    facebook: brand.social.facebook ?? "",
    youtube: brand.social.youtube ?? "",
    pinterest: brand.social.pinterest ?? "",
    tripadvisor: brand.social.tripadvisor ?? "",
    googleBusiness: "",
    x: "",
    linkedin: "",
  },
  parent: PARENT,
  credentials: [
    // TODO: confirm each before launch; remove any that do not apply.
    { label: "Licensed local guides (Ministry of Tourism, Govt. of India)", short: "Licensed guides" },
    { label: "Registered Agra-based tour operator", short: "Registered operator" },
    { label: "GST-registered business", short: "GST registered" },
  ],
  stats: {
    // TODO: use real numbers. These feed trust bars and the About page.
    travellersServed: "12,000+",
    yearsOperating: "10+",
    rating: { value: 4.9, count: 1_150, source: "Google & TripAdvisor" },
    countries: "60+",
    // Google's self-serving-reviews policy: only emit AggregateRating JSON-LD once this rating
    // is a real, independently-verifiable figure — never mark up placeholder numbers as schema.
    ratingVerified: false,
  },
  verification: {
    google: env(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION, ""),
    bing: env(process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION, ""),
  },
  analytics: {
    gaId: env(process.env.NEXT_PUBLIC_GA_ID, ""),
    clarityId: env(process.env.NEXT_PUBLIC_CLARITY_ID, ""),
  },
} as const;

export type Currency = (typeof site.currencies)[number];

export const sameAs = [
  ...Object.values(site.social).filter(Boolean),
  // The parent company is a legitimate `sameAs` edge: it is how the entity graph learns these
  // four brands are one disclosed business rather than an undisclosed network.
  PARENT.url,
] as string[];

export const defaultWhatsappMessage = `Hi ${site.name}! I'd like a quote — could you help?`;

/** True when there is any reachable contact channel at all; guards empty contact blocks. */
export const hasDirectContact = hasPhone || Boolean(site.contact.email);
