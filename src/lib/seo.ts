import type { Metadata } from "next";
import { site, sameAs } from "@/config/site";
import { absoluteUrl } from "@/lib/utils";
import type { FAQ, Tour, Destination, Guide, Review, TeamMember } from "@/content/types";
import { entities, entitySameAs, entityForAttraction, destinationEntity, knowsAboutKeys } from "@/content/entities";
import { cancellationWindowHours, priceRange, tierQuantity } from "@/lib/tour";

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
  imageAlt?: string;
  authors?: string[];
  section?: string;
}

const xProfile: string = site.social.x;
const xHandle = xProfile ? `@${xProfile.replace(/\/+$/, "").split("/").pop()}` : "";

/** Consistent metadata for every page: canonical, OG, Twitter, robots. */
export function buildMetadata(m: PageMeta): Metadata {
  const url = absoluteUrl(m.path);
  const images = m.image ? [{ url: absoluteUrl(m.image), width: 1200, height: 630, alt: m.imageAlt ?? m.title }] : undefined;
  return {
    title: m.title,
    description: m.description,
    keywords: m.keywords,
    ...(m.authors ? { authors: m.authors.map((name) => ({ name })) } : {}),
    // Page-level `alternates` replaces the layout's, so the RSS discovery link and the (single-language)
    // hreflang pair are repeated here rather than relying on inheritance.
    alternates: { canonical: url, languages: { en: url, "x-default": url }, types: { "application/rss+xml": absoluteUrl("/feed.xml") } },
    openGraph: {
      type: m.type ?? "website",
      url,
      title: m.title,
      description: m.description,
      siteName: site.name,
      locale: site.locale,
      images,
      ...(m.type === "article" ? { publishedTime: m.publishedTime, modifiedTime: m.modifiedTime, ...(m.authors ? { authors: m.authors } : {}), ...(m.section ? { section: m.section } : {}) } : {}),
    },
    twitter: { card: "summary_large_image", ...(xHandle ? { site: xHandle, creator: xHandle } : {}), title: m.title, description: m.description, images: images?.map((i) => i.url) },
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
    "@type": ["TravelAgency", "TourOperator", "LocalBusiness", "Organization"],
    "@id": ORG_ID,
    name: site.name,
    legalName: site.legalName,
    alternateName: "Taj Photos",
    url: site.url,
    logo: { "@type": "ImageObject", url: absoluteUrl("/icon-512.png"), width: 512, height: 512 },
    image: absoluteUrl("/opengraph-image"),
    description: site.description,
    foundingDate: String(site.foundingYear),
    telephone: site.contact.phoneE164,
    email: site.contact.email,
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
    priceRange: site.priceRange,
    currenciesAccepted: "INR, USD, EUR, GBP",
    paymentAccepted: "Cash, Credit Card, Bank Transfer, UPI, PayPal",
    knowsLanguage: ["en", "hi"],
    knowsAbout: knowsAboutKeys.map((k) => ({ "@type": "Thing", name: entities[k].name, sameAs: entitySameAs(k) })),
    sameAs,
    hasMap: `https://www.google.com/maps/search/?api=1&query=${site.geo.latitude},${site.geo.longitude}`,
    // Only emit AggregateRating once the figure is verified against a real third-party source
    // (Google's self-serving-reviews policy) — see site.stats.ratingVerified.
    ...(site.stats.ratingVerified
      ? { aggregateRating: { "@type": "AggregateRating", ratingValue: site.stats.rating.value, reviewCount: site.stats.rating.count, bestRating: 5, worstRating: 1 } }
      : {}),
    contactPoint: [{ "@type": "ContactPoint", contactType: "reservations", telephone: site.contact.phoneE164, email: site.contact.email, availableLanguage: ["English", "Hindi"], areaServed: "Worldwide" }],
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
    // TouristTrip has no "destination" property; the visited cities go on the itinerary's places and,
    // for Product consumers, as `areaServed`-style Place references via `about`.
    about: tour.destinations.map((slug, i) => {
      const key = destinationEntity[slug];
      return key ? { "@type": "City", name: entities[key].name, sameAs: entitySameAs(key) } : { "@type": "Place", name: opts.destinationNames[i] ?? slug };
    }),
    ...(tour.startTime ? { additionalProperty: [{ "@type": "PropertyValue", name: "Start time", value: tour.startTime }, { "@type": "PropertyValue", name: "Cancellation policy", value: tour.cancellation }, { "@type": "PropertyValue", name: "Group size", value: tour.groupSize }] } : {}),
    offers: tourOffers(tour, url),
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
    ...(destinationEntity[d.slug] ? { sameAs: entitySameAs(destinationEntity[d.slug]) } : {}),
    containedInPlace: { "@type": "Country", name: "India", sameAs: entitySameAs("india") },
    includesAttraction: d.attractions.map((a) => {
      const key = entityForAttraction(a.name, d.slug);
      const closed = key ? (entities[key] as { closedOn?: string }).closedOn : undefined;
      return {
        "@type": "TouristAttraction",
        name: a.name,
        description: stripInline(a.summary),
        ...(key ? { sameAs: entitySameAs(key) } : {}),
        ...(closed ? { openingHoursSpecification: { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].filter((day) => day !== closed) } } : {}),
        ...(a.tickets ? { isAccessibleForFree: /^free/i.test(a.tickets) } : {}),
      };
    }),
    touristType: ["Culture lovers", "Photographers", "Families", "Couples"],
  };
}

export function articleJsonLd(g: Guide, opts: { image: string; author: TeamMember; wordCount?: number; about?: string[] }): JsonLd {
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
    author: personJsonLd(opts.author),
    isPartOf: { "@id": WEBSITE_ID },
    ...(opts.wordCount ? { wordCount: opts.wordCount } : {}),
    articleSection: g.category.replace(/-/g, " "),
    about: guideEntities(g).map((k) => ({ "@type": entities[k].type, name: entities[k].name, sameAs: entitySameAs(k) })),
    ...(opts.about?.length ? { mentions: opts.about.map((name) => ({ "@type": "Place", name })) } : {}),
    publisher: { "@id": ORG_ID },
    inLanguage: "en",
    keywords: g.keywords.join(", "),
    speakable: { "@type": "SpeakableSpecification", cssSelector: [".speakable"] },
    ...(g.sources?.length ? { citation: g.sources.map((s) => ({ "@type": "CreativeWork", name: s.title, url: s.url })) } : {}),
  };
}

export const personId = (slug: string) => `${site.url}/about#${slug}`;

/** A team member as a schema.org Person — the author entity every guide byline points at (E-E-A-T). */
export function personJsonLd(m: TeamMember): JsonLd {
  return {
    "@type": "Person",
    "@id": personId(m.slug),
    name: m.name,
    jobTitle: m.role,
    description: stripInline(m.bio),
    url: personId(m.slug),
    knowsLanguage: m.languages,
    worksFor: { "@id": ORG_ID },
    ...(m.credentials?.length ? { hasCredential: m.credentials.map((c) => ({ "@type": "EducationalOccupationalCredential", name: c })) } : {}),
    ...(m.sameAs?.length ? { sameAs: m.sameAs } : {}),
  };
}

/**
 * WebPage wrapper: ties a page to the WebSite, carries dateModified/breadcrumb and the speakable
 * selectors (Google only reads `speakable` on WebPage/Article). `.speakable` marks the answer-first
 * summary and the FAQ answers.
 */
export function webPageJsonLd(p: { path: string; name: string; description: string; type?: string; dateModified?: string; datePublished?: string; mainEntityId?: string }): JsonLd {
  const url = absoluteUrl(p.path);
  return {
    "@type": p.type ?? "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: p.name,
    description: p.description,
    isPartOf: { "@id": WEBSITE_ID },
    publisher: { "@id": ORG_ID },
    inLanguage: "en",
    ...(p.datePublished ? { datePublished: p.datePublished } : {}),
    ...(p.dateModified ? { dateModified: p.dateModified } : {}),
    ...(p.mainEntityId ? { mainEntity: { "@id": p.mainEntityId } } : {}),
    speakable: { "@type": "SpeakableSpecification", cssSelector: [".speakable"] },
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

/**
 * One Offer per group-size tier (each a per-person UnitPriceSpecification), wrapped in an
 * AggregateOffer so search and AI engines see the real low/high range rather than only the
 * best-case two-traveller price. Cancellation terms ride along as a machine-readable property.
 */
function tourOffers(tour: Tour, url: string) {
  const { low, high } = priceRange(tour);
  const hours = cancellationWindowHours(tour);
  const base = {
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
    priceValidUntil: priceValidUntil(),
    validFrom: tour.datePublished,
    url,
    seller: { "@id": ORG_ID },
  };
  const tiers = tour.priceTiers ?? [{ label: tour.priceNote, usd: tour.priceFrom.usd }];
  return {
    "@type": "AggregateOffer",
    lowPrice: low,
    highPrice: high,
    offerCount: tiers.length,
    ...base,
    ...(hours ? { description: tour.cancellation } : {}),
    offers: tiers.map((t) => {
      const q = tierQuantity(t.label);
      return {
        "@type": "Offer",
        name: t.label,
        ...(t.note ? { description: t.note } : {}),
        price: t.usd,
        ...base,
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: t.usd,
          priceCurrency: "USD",
          unitText: /per day/i.test(tour.priceNote) ? "per vehicle per day" : "per person",
          ...(q && !/per day/i.test(tour.priceNote) ? { eligibleQuantity: { "@type": "QuantitativeValue", minValue: q.min, ...(q.max ? { maxValue: q.max } : { maxValue: q.min }), unitText: "travellers" } } : {}),
        },
      };
    }),
  };
}

/** Entities a guide is about, inferred from its slug, title and keywords against the registry. */
function guideEntities(g: Guide) {
  const text = `${g.slug} ${g.title} ${g.keywords.join(" ")}`;
  const keys = new Set<keyof typeof entities>();
  for (const k of Object.keys(entities) as (keyof typeof entities)[]) {
    if (["india", "uttar-pradesh", "rajasthan"].includes(k)) continue;
    const name = entities[k].name.replace(/\s*\(.*\)|,.*$/g, "");
    if (new RegExp(`\\b${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i").test(text) || text.toLowerCase().includes(k)) keys.add(k);
  }
  return [...keys].slice(0, 6);
}

/** ItemList of links for hub pages (tours, guides, destinations). */
export function itemListJsonLd(name: string, items: { name: string; path: string }[]): JsonLd {
  return {
    "@type": "ItemList",
    name,
    numberOfItems: items.length,
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, url: absoluteUrl(it.path) })),
  };
}
