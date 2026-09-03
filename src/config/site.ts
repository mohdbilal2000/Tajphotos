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
  foundingYear: 2016, // TODO: confirm
  contact: {
    // TODO: replace with real numbers before launch (E.164 format without "+" for WhatsApp links)
    whatsapp: env("NEXT_PUBLIC_WHATSAPP_NUMBER", "919999999999"),
    phoneDisplay: env("NEXT_PUBLIC_PHONE_DISPLAY", "+91 99999 99999"),
    phoneE164: env("NEXT_PUBLIC_PHONE_E164", "+919999999999"),
    email: env("NEXT_PUBLIC_EMAIL", "hello@tajphotos.com"),
    hoursNote: "We reply on WhatsApp within minutes, 7 days a week (7 AM – 11 PM IST)",
  },
  address: {
    // TODO: real office address (used for LocalBusiness schema + Google Business Profile consistency)
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
  /** Static indicative FX rates for the price toggle (update quarterly). Prices are quoted in USD. */
  fxRates: { USD: 1, INR: 84, EUR: 0.92, GBP: 0.78 } as Record<"USD" | "INR" | "EUR" | "GBP", number>,
  social: {
    // TODO: fill real profiles — they become schema.org sameAs links (entity signals for Google/AI engines)
    instagram: "https://www.instagram.com/tajphotos",
    facebook: "https://www.facebook.com/tajphotos",
    youtube: "https://www.youtube.com/@tajphotos",
    tripadvisor: "",
    googleBusiness: "",
    x: "",
    pinterest: "",
    linkedin: "",
  },
  credentials: [
    // TODO: confirm each before launch; remove any that do not apply
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

export const sameAs = Object.values(site.social).filter(Boolean) as string[];

/** wa.me deep link with a prefilled, URL-encoded message. */
export function whatsappLink(message?: string) {
  const base = `https://wa.me/${site.contact.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const defaultWhatsappMessage = `Hi ${site.name}! I'm planning a trip to India and would like help with an itinerary.`;
