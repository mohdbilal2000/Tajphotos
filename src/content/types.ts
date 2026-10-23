/**
 * Content model for the whole site. Content lives in plain TypeScript files under src/content/
 * so it is type-checked at build time, tree-shaken, and statically prerendered.
 *
 * Writing rules (SEO/GEO/AEO):
 * - `summary` doubles as the meta description: 140–160 chars, answer-first, includes the primary keyword.
 * - Every `faqs` entry answers in the first sentence (40–60 words total) — this is what AI engines quote.
 * - Use consistent entity names: "Taj Mahal", "Agra Fort", "Amber Fort (Amer Fort)", "Golden Triangle".
 * - Dates are ISO (YYYY-MM-DD). `dateModified` feeds sitemap lastmod + Article schema.
 */

export type ImageId = string; // key of the image manifest in src/content/images.ts

export type Inline = string; // supports **bold**, *italic*, [text](/path) and `code`

export type Block =
  | { type: "p"; text: Inline }
  | { type: "h2"; text: string; id?: string }
  | { type: "h3"; text: string; id?: string }
  | { type: "ul"; items: Inline[] }
  | { type: "ol"; items: Inline[] }
  | { type: "table"; caption?: string; headers: string[]; rows: Inline[][] }
  | { type: "callout"; variant: "tip" | "info" | "warning"; title?: string; text: Inline }
  | { type: "image"; image: ImageId; caption?: Inline }
  | { type: "quote"; text: Inline; by?: string }
  | { type: "faq"; items: FAQ[] }
  | { type: "cta"; title: string; text?: Inline; tour?: string; label?: string };

export interface FAQ {
  q: string;
  a: Inline; // answer-first, 40–90 words
}

export interface Price {
  usd: number; // per person, base configuration
  inr?: number;
}

export interface PriceTier {
  label: string; // e.g. "2 travellers", "4–6 travellers", "Solo"
  usd: number;
  note?: string;
}

export interface ItineraryDay {
  day: number; // 1-based; day tours use 1
  title: string; // "Delhi → Agra: Taj Mahal at sunrise"
  summary: Inline; // one sentence
  details: Inline[]; // 3–7 bullet steps with times where useful
  meals?: string; // "Breakfast"
  stay?: string; // "Agra (4★ hotel)"
  drive?: string; // "Delhi → Agra, ~3.5 h via Yamuna Expressway"
}

export type TourCategory =
  | "golden-triangle"
  | "same-day"
  | "agra"
  | "delhi"
  | "jaipur"
  | "udaipur"
  | "rajasthan"
  | "photography"
  | "extension"
  | "transfer";

export interface Tour {
  slug: string; // URL: /tours/[slug]
  title: string; // H1, ≤ 65 chars, includes the primary keyword
  shortTitle?: string; // for cards/nav
  tagline: string; // ≤ 90 chars emotional hook
  summary: string; // meta description 140–160 chars
  category: TourCategory;
  durationDays: number;
  durationLabel: string; // "1 day", "4 days / 3 nights"
  startCity: string;
  endCity: string;
  destinations: string[]; // destination slugs in visiting order
  priceFrom: Price;
  priceNote: string; // "per person · private tour · 2 travellers"
  priceTiers?: PriceTier[];
  heroImage: ImageId;
  gallery: ImageId[];
  highlights: string[]; // 5–8 scannable lines
  itinerary: ItineraryDay[];
  inclusions: string[];
  exclusions: string[];
  faqs: FAQ[]; // 5–10
  bestFor: string[]; // "First-time visitors", "Couples", "Photographers"
  groupSize: string; // "Private · 1–6 travellers"
  transport: string; // "Private air-conditioned car with chauffeur"
  languages: string[];
  pickup: string; // "Any Delhi hotel or IGI Airport"
  startTime?: string; // "06:30 AM"
  cancellation: string; // "Free cancellation up to 48 hours before"
  badges?: string[]; // "Best seller", "Sunrise", "Skip the line"
  rating?: { value: number; count: number };
  relatedTours: string[]; // tour slugs
  relatedGuides?: string[]; // guide slugs
  keywords: string[]; // secondary keywords/entities to weave in
  description: Block[]; // long-form overview, 300–600 words, answer-first
  datePublished: string;
  dateModified: string;
}

export interface Attraction {
  name: string;
  summary: Inline; // 2–3 sentences with a concrete fact
  timings?: string;
  tickets?: string;
  time?: string; // suggested time needed
  tip?: Inline; // insider tip
  image?: ImageId;
}

export interface Destination {
  slug: string; // URL: /destinations/[slug]
  name: string; // "Agra"
  title: string; // H1: "Agra Travel Guide: Taj Mahal, Agra Fort & Beyond"
  tagline: string;
  summary: string; // meta description
  heroImage: ImageId;
  gallery: ImageId[];
  region: string; // "Uttar Pradesh, India"
  geo: { latitude: number; longitude: number };
  quickFacts: { label: string; value: Inline }[]; // Best time, Days needed, Nearest airport, Distance from Delhi
  intro: Block[];
  attractions: Attraction[];
  bestTime: Block[];
  gettingThere: Block[];
  foodAndShopping?: Block[];
  practical?: Block[]; // safety, dress code, money, etiquette
  faqs: FAQ[];
  relatedTours: string[];
  relatedGuides?: string[];
  keywords: string[];
  datePublished: string;
  dateModified: string;
}

export type GuideCategory = "planning" | "taj-mahal" | "agra" | "delhi" | "jaipur" | "udaipur" | "rajasthan" | "photography" | "practical";

export interface Guide {
  slug: string; // URL: /guides/[slug]
  title: string; // H1 ≤ 65 chars, question or "how to" form where natural
  summary: string; // meta description, answer-first
  category: GuideCategory;
  heroImage: ImageId;
  author: string; // team slug
  datePublished: string;
  dateModified: string;
  keyTakeaways: Inline[]; // 3–5 quotable facts (AEO)
  body: Block[]; // 900–2000 words, H2 questions, tables for comparisons
  faqs: FAQ[];
  relatedTours: string[];
  relatedGuides: string[];
  keywords: string[];
  sources?: { title: string; url: string }[]; // authoritative outbound citations
}

export interface Review {
  id: string;
  name: string;
  country: string;
  date: string;
  rating: 1 | 2 | 3 | 4 | 5;
  tour?: string; // tour slug
  title: string;
  text: string;
  source: "Google" | "TripAdvisor" | "Direct";
  avatarInitials?: string;
}

export interface TeamMember {
  slug: string;
  name: string;
  role: string; // "Founder & Licensed Guide"
  bio: Inline;
  languages: string[];
  years: number;
  image?: ImageId;
  credentials?: string[];
  sameAs?: string[];
  /** True for the business-level byline: emitted as the Organization, not a Person. */
  organisation?: boolean;
}

/* ------------------------------- Stays & services ------------------------------- */

/**
 * Our own categorisation of the properties we book — not a star rating and not a claim the hotel
 * makes about itself. "palace" means a genuine former royal residence now run as a hotel;
 * "heritage" a historic building (haveli, colonial-era hotel, restored fort); "contemporary" a
 * purpose-built modern luxury hotel; "boutique" a small owner-run property.
 */
export type StayTier = "palace" | "heritage" | "contemporary" | "boutique";

export interface Stay {
  slug: string;
  name: string;
  city: string;
  /** Destination slug, where we have a destination page for the city. */
  destination?: string;
  tier: StayTier;
  /** One sentence on why it is worth the money. */
  oneLine: string;
  /**
   * Two or three sentences of verifiable, checkable description — architecture, history, location.
   * Never a rate, never a star count, never a claim of affiliation. See the note in stays.ts.
   */
  detail: Inline;
  /** The one detail guests actually remember. */
  signature: string;
  image: ImageId;
  bestFor: string[];
}

export type ServiceCategory = "transport" | "access" | "photography" | "concierge" | "arrival";

/**
 * How reliably we can deliver something, stated honestly rather than as "always available":
 * - "daily": every day of the year.
 * - "except-friday": every day except Friday (anything inside the Taj Mahal).
 * - "seasonal": tied to a season or the lunar calendar (night viewing, tiger safaris).
 * - "on-request": depends on third-party availability on your dates, so we confirm before you pay.
 */
export type Availability = "daily" | "except-friday" | "seasonal" | "on-request";

export interface Service {
  slug: string;
  name: string;
  category: ServiceCategory;
  what: Inline;
  /** How far ahead we need to know, in plain words. */
  leadTime: string;
  availability: Availability;
  /** Set when the service is part of the tour price rather than an extra. */
  includedInTours?: boolean;
  note?: Inline;
}

export interface FleetVehicle {
  slug: string;
  name: string;
  /** Passengers we would actually seat in it with luggage, not the registration capacity. */
  seats: string;
  luggage: string;
  bestFor: string;
  note?: Inline;
}
