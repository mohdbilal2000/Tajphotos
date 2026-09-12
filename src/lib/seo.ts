import type { Metadata } from "next";
import { site, sameAs } from "@/config/site";
import { brand, PARENT, hasPhone } from "@/config/brand";
import { absoluteUrl } from "@/lib/utils";
import type { FAQ, Tour, Destination, Guide, Review } from "@/content/types";

/* ---------------------------------- Metadata --------------------------------- */

interface PageMeta {
  title: string; // without brand suffix (template adds it)
  description: string;
  path: string; // "/tours/golden-triangle-tour-4-days"
  image?: string; // absolute or site-relative; defaults to route OG image
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  noIndex?: boolean;
  keywords?: string[];
}

/** Consistent metadata for every page: canonical, OG, Twitter, robots. */
export function buildMetadata(m: PageMeta): Metadata {
  const url = absoluteUrl(m.path);
  const images = m.image ? [{ url: absoluteUrl(m.image), width: 1200, height: 630, alt: m.title }] : undefined;
  return {
    title: m.title,
    description: m.description,
    keywords: m.keywords,
    alternates: { canonical: url },
    openGraph: {
      type: m.type ?? "website",
      url,
      title: m.title,
      description: m.description,
      siteName: site.name,
      locale: site.locale,
      images,
      ...(m.type === "article" ? { publishedTime: m.publishedTime, modifiedTime: m.modifiedTime } : {}),
    },
    twitter: { card: "summary_large_image", title: m.title, description: m.description, images: images?.map((i) => i.url) },
    robots: m.noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  };
}

/* ----------------------------------- JSON-LD ---------------------------------- */

type JsonLd = Record<string, unknown>;

const ORG_ID = `${site.url}/#organization`;
const WEBSITE_ID = `${site.url}/#website`;

export function organizationJsonLd(): JsonLd {
  return {
    // Per-brand (see `brand.schemaTypes`): a photographic image library is not a TourOperator,
    // and declaring all four brands as the same class of entity would both misdescribe three of
    // them and present Google with four identical entities in one niche.
    "@type": brand.schemaTypes,
    "@id": ORG_ID,
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    /**
     * The disclosed parent. All four brands are one legal entity, and saying so in the entity
     * graph is what makes this a declared brand portfolio rather than an undisclosed network —
     * the distinction Google's site-reputation policy actually turns on.
     */
    parentOrganization: { "@type": "Organization", name: PARENT.name, url: PARENT.url },
    /** What separates this brand from its siblings, stated for answer engines in one sentence. */
    slogan: brand.tagline,
    knowsAbout: [brand.product],
    logo: { "@type": "ImageObject", url: absoluteUrl("/icon-512.png"), width: 512, height: 512 },
    image: absoluteUrl("/opengraph-image"),
    description: site.description,
    foundingDate: String(site.foundingYear),
    ...(hasPhone ? { telephone: site.contact.phoneE164 } : {}),
    ...(site.contact.email ? { email: site.contact.email } : {}),
    address: { "@type": "PostalAddress", ...site.address },
    geo: { "@type": "GeoCoordinates", ...site.geo },
    areaServed: ["Agra", "Delhi", "Jaipur", "Udaipur", "Rajasthan", "Uttar Pradesh", "India"].map((name) => ({ "@type": "Place", name })),
    openingHoursSpecification: site.openingHours.map((h) => {
      const [days, hours] = h.split(" ");
      const [opens, closes] = hours.split("-");
      const map: Record<string, string> = { Mo: "Monday", Tu: "Tuesday", We: "Wednesday", Th: "Thursday", Fr: "Friday", Sa: "Saturday", Su: "Sunday" };
      const [from, to] = days.split("-");
      const order = Object.keys(map);
      const range = order.slice(order.indexOf(from), order.indexOf(to ?? from) + 1).map((d) => map[d]);
      return { "@type": "OpeningHoursSpecification", dayOfWeek: range, opens, closes };
    }),
    // `priceRange` is deliberately omitted while no rate is published: an "$$" band is itself a
    // price claim, and it is the one field consumers most often surface as though it were one.
    ...(site.showPrices ? { priceRange: site.priceRange } : {}),
    currenciesAccepted: "INR, USD, EUR, GBP",
    paymentAccepted: "Cash, Credit Card, Bank Transfer, UPI, PayPal",
    knowsLanguage: ["en", "hi"],
    sameAs,
    // Only emit AggregateRating once the figure is verified against a real third-party source
    // (Google's self-serving-reviews policy) — see site.stats.ratingVerified.
    ...(site.stats.ratingVerified
      ? { aggregateRating: { "@type": "AggregateRating", ratingValue: site.stats.rating.value, reviewCount: site.stats.rating.count, bestRating: 5, worstRating: 1 } }
      : {}),
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "reservations",
        ...(hasPhone ? { telephone: site.contact.phoneE164 } : {}),
        ...(site.contact.email ? { email: site.contact.email } : {}),
        url: absoluteUrl("/quote"),
        availableLanguage: ["English", "Hindi"],
        areaServed: "Worldwide",
      },
    ],
  };
}

export function websiteJsonLd(): JsonLd {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: site.url,
    name: site.name,
    description: site.description,
    publisher: { "@id": ORG_ID },
    inLanguage: "en",
    potentialAction: { "@type": "SearchAction", target: { "@type": "EntryPoint", urlTemplate: `${site.url}/tours?q={search_term_string}` }, "query-input": "required name=search_term_string" },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]): JsonLd {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: absoluteUrl(it.path) })),
  };
}

export function faqJsonLd(faqs: FAQ[]): JsonLd {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: stripInline(f.a) } })),
  };
}

export function tourJsonLd(tour: Tour, opts: { image: string; destinationNames: string[]; reviews?: Review[] }): JsonLd {
  const url = absoluteUrl(`/tours/${tour.slug}`);
  const reviews = opts.reviews ?? [];
  return {
    "@type": ["TouristTrip", "Product"],
    "@id": `${url}#trip`,
    name: tour.title,
    description: tour.summary,
    url,
    image: absoluteUrl(opts.image),
    touristType: tour.bestFor,
    provider: { "@id": ORG_ID },
    brand: { "@id": ORG_ID },
    itinerary: {
      "@type": "ItemList",
      numberOfItems: tour.itinerary.length,
      itemListElement: tour.itinerary.map((d) => ({
        "@type": "ListItem",
        position: d.day,
        item: { "@type": "TouristAttraction", name: d.title, description: stripInline(d.summary) },
      })),
    },
    subjectOf: opts.destinationNames.map((name) => ({ "@type": "Place", name })),
    // With no published rate (see `brand.showPrices`), the Offer carries availability and the
    // quote endpoint but NO price. Emitting a number the page doesn't show is a structured-data
    // violation, and more practically it is a figure an AI answer engine will quote back to a
    // customer as though it were binding. `priceSpecification` is omitted entirely rather than
    // set to 0, which reads as "free". The rolling `priceValidUntil` window that used to guard
    // price freshness goes with it — there is no price left to date-stamp.
    offers: {
      "@type": "Offer",
      url,
      availability: "https://schema.org/InStock",
      validFrom: tour.datePublished,
      category: "Tour",
      seller: { "@id": ORG_ID },
      ...(site.showPrices
        ? {
            price: tour.priceFrom.usd,
            priceCurrency: "USD",
            priceSpecification: { "@type": "UnitPriceSpecification", price: tour.priceFrom.usd, priceCurrency: "USD", unitText: "per person" },
            priceValidUntil: priceValidUntil(),
          }
        : {
            // Tells a consumer the price exists but must be requested, and where to request it,
            // rather than leaving them to infer a missing field means "unknown" or "free".
            description: "Priced individually to your dates, group size and requirements — request a quote for an exact price.",
            potentialAction: { "@type": "https://schema.org/BuyAction", target: absoluteUrl("/quote") },
          }),
    },
    // Same rule as above: tour.rating only ever comes from real imported reviews (see reviewsForTour),
    // never fabricated — safe to emit whenever it's present.
    ...(tour.rating
      ? { aggregateRating: { "@type": "AggregateRating", ratingValue: tour.rating.value, reviewCount: tour.rating.count, bestRating: 5, worstRating: 1 } }
      : {}),
    ...(reviews.length
      ? {
          review: reviews.slice(0, 5).map((r) => ({
            "@type": "Review",
            author: { "@type": "Person", name: r.name },
            datePublished: r.date,
            reviewBody: r.text,
            name: r.title,
            reviewRating: { "@type": "Rating", ratingValue: r.rating, bestRating: 5, worstRating: 1 },
          })),
        }
      : {}),
  };
}

export function destinationJsonLd(d: Destination, image: string): JsonLd {
  const url = absoluteUrl(`/destinations/${d.slug}`);
  return {
    "@type": "TouristDestination",
    "@id": `${url}#place`,
    name: d.name,
    description: d.summary,
    url,
    image: absoluteUrl(image),
    geo: { "@type": "GeoCoordinates", ...d.geo },
    containedInPlace: { "@type": "Country", name: "India" },
    includesAttraction: d.attractions.map((a) => ({ "@type": "TouristAttraction", name: a.name, description: stripInline(a.summary) })),
    touristType: ["Culture lovers", "Photographers", "Families", "Couples"],
  };
}

export function articleJsonLd(g: Guide, opts: { image: string; author: { name: string; url: string; jobTitle: string } }): JsonLd {
  const url = absoluteUrl(`/guides/${g.slug}`);
  return {
    "@type": ["Article", "BlogPosting"],
    "@id": `${url}#article`,
    headline: g.title,
    description: g.summary,
    url,
    mainEntityOfPage: url,
    image: absoluteUrl(opts.image),
    datePublished: g.datePublished,
    dateModified: g.dateModified,
    author: { "@type": "Person", name: opts.author.name, url: opts.author.url, jobTitle: opts.author.jobTitle, worksFor: { "@id": ORG_ID } },
    publisher: { "@id": ORG_ID },
    inLanguage: "en",
    keywords: g.keywords.join(", "),
    speakable: { "@type": "SpeakableSpecification", cssSelector: [".speakable"] },
    ...(g.sources?.length ? { citation: g.sources.map((s) => ({ "@type": "CreativeWork", name: s.title, url: s.url })) } : {}),
  };
}

/** Wrap several nodes in one @graph so pages emit a single script tag. */
export function graph(...nodes: JsonLd[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}

/** A rolling ~120-day price-validity horizon for Offer schema, computed at render/build time. */
export function priceValidUntil(days = 120) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

/** Remove our lightweight inline markup for plain-text schema fields. */
export function stripInline(text: string) {
  return text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/`([^`]+)`/g, "$1");
}
