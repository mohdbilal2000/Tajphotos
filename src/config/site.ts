/**
 * Single source of truth for brand, contact and business identity.
 * Everything here is used by the UI, structured data (JSON-LD), sitemap, llms.txt and metadata,
 * so editing this file updates the whole site consistently (important for SEO/AEO entity signals).
 *
 * Values marked TODO are placeholders — replace them before launch.
 * Public env vars override the contact details without a code change.
 */

const env = (key: string, fallback: string) => process.env[key] ?? fallback;

export const site = {
  name: "TajPhotos",
  legalName: "TajPhotos Tours & Travels",
  tagline: "Golden Triangle tours & Taj Mahal photography experiences, run by Agra locals",
  description:
    "Private Taj Mahal, Agra, Delhi, Jaipur and Udaipur tours with licensed local guides, professional photographers and safe chauffeur-driven cars. Tailor-made Golden Triangle itineraries from Delhi.",
  url: env("NEXT_PUBLIC_SITE_URL", "https://tajphotos.com"),
  locale: "en_IN",
  language: "en",
  // A new business (launched 2026). Never back-date this: it feeds foundingDate in the schema.
  foundingYear: 2026,
  contact: {
    whatsapp: env("NEXT_PUBLIC_WHATSAPP_NUMBER", "918909741833"),
    phoneDisplay: env("NEXT_PUBLIC_PHONE_DISPLAY", "+91 89097 41833"),
    phoneE164: env("NEXT_PUBLIC_PHONE_E164", "+918909741833"),
    email: env("NEXT_PUBLIC_EMAIL", "hello@tajphotos.com"),
    hoursNote: "We reply on WhatsApp within minutes, 7 days a week (7 AM – 11 PM IST)",
  },
  address: {
    // Street and PIN stay empty until there is a real, verifiable office. They must match the
    // Google Business Profile exactly once it exists; a made-up street hurts more than none.
    streetAddress: "",
    addressLocality: "Agra",
    addressRegion: "Uttar Pradesh",
    postalCode: "",
    addressCountry: "IN",
  },
  geo: { latitude: 27.1767, longitude: 78.0081 }, // Agra city centre until there is an office pin
  openingHours: ["Mo-Su 07:00-23:00"],
  priceRange: "$$",
  currencies: ["USD", "INR", "EUR", "GBP"] as const,
  /** Static indicative FX rates for the price toggle (update quarterly). Prices are quoted in USD. */
  // Updated 2026-09-06 against live market rates (was materially stale: INR had drifted ~11-13%
  // low and EUR/GBP ~5-7% high, distorting every converted price shown on the site). Static and
  // indicative by design — re-check quarterly, not live-fetched, so a converted price never
  // depends on a third-party API being up.
  fxRates: { USD: 1, INR: 95, EUR: 0.86, GBP: 0.74 } as Record<"USD" | "INR" | "EUR" | "GBP", number>,
  social: {
    // TODO: fill real profiles — they become schema.org sameAs links (entity signals for Google/AI engines)
    // Only profiles that actually exist and belong to this business. Unclaimed handles would point
    // Google's entity graph at someone else's account.
    instagram: "",
    facebook: "",
    youtube: "",
    tripadvisor: "",
    googleBusiness: "",
    /** The "Ask for reviews" short link from the Google Business Profile (g.page/r/…/review). Not a sameAs. */
    googleReview: env("NEXT_PUBLIC_GOOGLE_REVIEW_URL", ""),
    x: "",
    pinterest: "",
    linkedin: "",
  },
  credentials: [
    // Add each one only once the certificate exists (Udyam, GST, Ministry of Tourism approval…).
    // Every surface that lists credentials hides itself while this is empty.
  ] as { label: string; short: string }[],
  stats: {
    // Fill rating from the Google Business Profile once real reviews exist, then flip the flag.
    rating: { value: 0, count: 0, source: "Google" },
    // Google's self-serving-reviews policy: only emit AggregateRating JSON-LD once this rating
    // is a real, independently-verifiable figure (e.g. pulled from your Google Business Profile
    // or TripAdvisor listing) — never mark up your own placeholder/testimonial numbers as schema.
    ratingVerified: false,
  },
  verification: {
    google: env("NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION", ""),
    bing: env("NEXT_PUBLIC_BING_SITE_VERIFICATION", ""),
  },
  analytics: {
    gaId: env("NEXT_PUBLIC_GA_ID", ""),
    clarityId: env("NEXT_PUBLIC_CLARITY_ID", ""),
  },
} as const;

export type Currency = (typeof site.currencies)[number];

export const sameAs = Object.entries(site.social).filter(([k, v]) => v && k !== "googleReview").map(([, v]) => v) as string[];

/** wa.me deep link with a prefilled, URL-encoded message. */
export function whatsappLink(message?: string) {
  const base = `https://wa.me/${site.contact.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const defaultWhatsappMessage = `Hi ${site.name}! I'm planning a trip to India and would like help with an itinerary.`;
