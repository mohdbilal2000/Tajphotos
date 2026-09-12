/**
 * Multi-brand model.
 *
 * Four separate public websites are built from this one codebase, each deployed as its own
 * Vercel project with `NEXT_PUBLIC_BRAND` pinned at build time. They are NOT palette swaps of
 * one another: Google's site-reputation/doorway policy treats a set of near-identical sites in
 * the same niche, under common ownership, as a spam network — the failure mode is all of them
 * being demoted at once. So every brand here MUST differ in the three things that actually
 * distinguish an entity: the service sold (`product`), the audience it is sold to, and the
 * proof (photos, people, reviews) shown as evidence. Shared code is fine and invisible to
 * crawlers; shared *content* is the thing that gets caught.
 *
 * All four are sub-brands of one legal entity (Techleaf) — deliberately disclosed, not hidden,
 * via `parent` below. A transparently-declared brand portfolio is a normal business structure
 * and reads as such to both Google and AI answer engines; a concealed one is what gets
 * penalised. This also means one GST registration and one set of accounts, not four.
 */

export type BrandKey = "tajphotos" | "tajphotoshoots" | "tajphototours" | "tajphotographs";

/** A palette is a full override of the design tokens declared in globals.css `@theme`. */
export interface BrandPalette {
  bg: string;
  surface: string;
  surface2: string;
  ink: string;
  muted: string;
  border: string;
  primary: string;
  primaryHover: string;
  primaryFg: string;
  accent: string;
  accentHover: string;
  accentFg: string;
  highlight: string;
  /** `<meta name="theme-color">` and the PWA manifest colour. */
  themeColor: string;
}

/**
 * Structural differences, not just colour. Two sites with identical section order read as the
 * same template however different the palette is, so each brand picks its own hero treatment,
 * card shape and section rhythm.
 */
export interface BrandStyle {
  /** Hero composition. */
  hero: "split" | "full-bleed" | "gallery-grid" | "editorial";
  /** Card silhouette used across listings. */
  card: "rounded" | "sharp" | "frame" | "overlay";
  /** Corner radius scale multiplier applied to the shared radius tokens. */
  radius: "none" | "soft" | "pill";
  /** Display-font expression: sets weight/tracking/case for headings. */
  headings: "serif-editorial" | "serif-romantic" | "sans-industrial" | "serif-gallery";
  /** Whether listing pages default to a dense grid or a spacious single column. */
  density: "dense" | "spacious";
}

/** One answer option in the quote flow. */
export interface QuoteOption {
  value: string;
  label: string;
  /** Short clarifier shown under the label — keeps options self-explanatory without a help modal. */
  hint?: string;
}

/**
 * A single question in the quote flow.
 *
 * The flow is deliberately short. Every additional required field measurably reduces completion,
 * and this business quotes custom prices anyway — the only fields that MUST be answered are the
 * ones needed to write a quote at all. Everything else is `optional` and exists to make the
 * first reply specific rather than a request for more information.
 */
export interface QuoteQuestion {
  id: string;
  question: string;
  /** `single`/`multi` render as tappable chips; `text` as one input. Chips beat dropdowns on mobile. */
  type: "single" | "multi" | "text";
  options?: QuoteOption[];
  placeholder?: string;
  required?: boolean;
  /** Rendered as small helper text under the question. */
  help?: string;
}

/** Icons available to brand homepage copy, mapped to lucide components in src/app/page.tsx. */
export type BrandIconKey = "camera" | "userCheck" | "car" | "shield" | "sun" | "heart" | "image" | "award" | "clock" | "mapPin";

/**
 * Homepage copy, per brand.
 *
 * The homepage is the page that has to prove these are four different businesses. Shared
 * components are invisible to a crawler, but shared *words* are not — four homepages opening
 * with the same headline about Golden Triangle tours is the near-duplicate signal, whatever the
 * palette does. Even the hero image differs per brand, so no two sites lead with the same
 * photograph.
 */
export interface BrandHome {
  heroEyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  /** ImageId from src/content/images.ts — each brand leads with a different photograph. */
  heroImage: string;
  whyEyebrow: string;
  whyTitle: string;
  whyPoints: { icon: BrandIconKey; title: string; text: string }[];
  /** Full-bleed showcase panel: its own headline, copy and three images per brand. */
  showcaseEyebrow: string;
  showcaseTitle: string;
  showcaseText: string;
  showcaseImages: [string, string, string];
  steps: { t: string; d: string }[];
  faqs: { q: string; a: string }[];
  ctaTitle: string;
  ctaText: string;
}

export interface Brand {
  key: BrandKey;
  /** Apex domain, no protocol. The `.in` counterpart (if any) 301s here — see next.config.ts. */
  domain: string;
  /** `.in` domains that permanently redirect to `domain`. May be empty. */
  redirectDomains: string[];

  name: string;
  legalName: string;
  tagline: string;
  /** Meta description default, 140–160 chars, answer-first. */
  description: string;

  /**
   * The one sentence that makes this brand a different business from its siblings.
   * If two brands could share this sentence, one of them should not exist.
   */
  product: string;
  /** Who this is for — drives copy, imagery and the quote flow. */
  audience: string;

  palette: BrandPalette;
  style: BrandStyle;

  /**
   * schema.org types for this brand's Organization node, most specific first.
   *
   * These genuinely differ: a tour operator and an image-licensing business are not the same
   * class of entity, and declaring all four as `TourOperator` because the flagship is one both
   * misdescribes them and hands Google four identical entities in one niche — the exact signal
   * the brand split exists to avoid.
   */
  schemaTypes: string[];

  home: BrandHome;

  /** Which content sections this brand publishes. Absent sections are removed from nav + sitemap. */
  sections: {
    tours: boolean;
    destinations: boolean;
    guides: boolean;
    gallery: boolean;
  };

  /**
   * Rates are never published on any of these sites — every job is scoped and quoted
   * individually, so a public number would be wrong in both directions: it would overcharge the
   * simple bookings and quietly exclude what was actually asked for.
   *
   * This gates the machine-readable surfaces that would otherwise contradict the pages —
   * Offer/priceSpecification in JSON-LD, `tours.json`, and the llms.txt feeds. Schema that
   * carries a price the page does not show is both a structured-data violation and, more
   * practically, a number an AI answer engine will quote back to a customer as if it were
   * binding. The price UI itself was removed rather than hidden behind this flag; if a brand
   * ever opts back in, restore those components from git history.
   */
  showPrices: boolean;

  quote: {
    /** CTA label used site-wide. */
    cta: string;
    /** Headline above the quote form. */
    heading: string;
    /** One line under the headline setting the expectation for what happens next. */
    promise: string;
    questions: QuoteQuestion[];
  };

  contact: {
    /** Brand inbox. Real addresses are set per-deployment via env — see config/brand.ts. */
    email: string;
    /** E.164 without "+", for wa.me links. */
    whatsapp: string;
    phoneDisplay: string;
    phoneE164: string;
  };

  social: Partial<Record<"instagram" | "facebook" | "youtube" | "pinterest" | "tripadvisor", string>>;
}

/** The single legal entity behind all four brands. Disclosed in every footer and in JSON-LD. */
export const PARENT = {
  name: "Techleaf",
  url: "https://techleaf.us",
  /** Shown in every footer: transparency is the thing that keeps a brand portfolio legitimate. */
  disclosure: "A Techleaf brand",
} as const;
