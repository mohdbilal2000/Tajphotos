import { brand, siblingBrands, PARENT } from "@/config/brand";

/**
 * The wider Techleaf group, for cross-referral and disclosure.
 *
 * WHY THIS IS REFERRALS AND NOT MIRROR PAGES
 *
 * The commercial goal is that a visitor on any one site can find every service the group offers.
 * There are two ways to do that and they have opposite outcomes.
 *
 * The tempting one is to give every site a sub-page for every other site's topic — a /tours page
 * on the photoshoot site, a /photoshoots page on the photo-tour site, and so on. Six sites times
 * six topics is thirty-six near-duplicate pages on six domains under one owner, all targeting the
 * same queries. That is the doorway-network pattern precisely, and the failure mode is every site
 * demoted at once, including the one that is already earning.
 *
 * The one implemented here is referral: a short, contextual hand-off at the moment a visitor
 * shows they want something this site does not sell ("you want to be photographed, not to shoot —
 * that is our other brand"), plus one honest /services page per site that describes the group and
 * links out. Same commercial outcome — every service is reachable from every site — with no
 * duplicated topic pages, and it reads to both a person and a crawler as what it is: a disclosed
 * group of related businesses, which is a normal structure.
 *
 * The distinction that matters for link policy is whether a link serves the visitor. A referral
 * a visitor follows because it answers their actual need is useful. A block of links placed on
 * every page to pass ranking signal between sites you own is a link scheme, and it is detectable
 * precisely because nobody clicks it. Keep these contextual, keep them honest, and do not add
 * links that no visitor would have a reason to follow.
 */

export interface NetworkSite {
  name: string;
  /** Apex domain, no protocol. */
  domain: string;
  /** What it sells, in one sentence — this is the referral copy. */
  sells: string;
  /** Who should follow this link. Written as the visitor's own situation, not as marketing. */
  forYouIf: string;
  /** Sibling brands share this codebase; the wider group does not. */
  sameCodebase: boolean;
}

/**
 * Sister businesses outside this codebase.
 *
 * TODO CONFIRM: domains are inferred from the repository names
 * (mohdbilal2000/asiabylocals, mohdbilal2000/guideindiatours). Correct them before launch —
 * a referral link to a domain that does not resolve is worse than no link at all.
 */
export const groupSites: NetworkSite[] = [
  {
    name: "Asia by Locals",
    domain: "asiabylocals.com",
    sells: "Local-led trips across Asia beyond India.",
    forYouIf: "you are continuing past India on the same trip",
    sameCodebase: false,
  },
  {
    name: "Guide India Tours",
    domain: "guideindiatours.com",
    sells: "Licensed guides and tours across India, beyond Agra and the Golden Triangle.",
    forYouIf: "you need a guide somewhere we do not cover from Agra",
    sameCodebase: false,
  },
];

/** Sibling brands, expressed as referral targets. */
export const siblingSites: NetworkSite[] = siblingBrands.map((b) => ({
  name: b.name,
  domain: b.domain,
  sells: b.product,
  forYouIf: b.audience.replace(/^[A-Z]/, (c) => c.toLowerCase()).replace(/\.$/, ""),
  sameCodebase: true,
}));

/** Everything in the group except the site the visitor is currently on. */
export const allGroupSites: NetworkSite[] = [...siblingSites, ...groupSites];

/**
 * The parent company's own service, promoted on these sites.
 *
 * PLACEMENT IS THE WHOLE QUESTION HERE. Techleaf builds websites; that is a real business and
 * disclosing it is honest. But the trust pitch of every brand in this group is "we are Agra
 * locals who do this every day", and a prominent "we also build websites" undercuts exactly
 * that — a honeymooning couple who reads it on the homepage now wonders whether the tour
 * business is somebody's side project. That doubt is expensive and hard to measure.
 *
 * So it lives in two places only: the /services page, where the visitor has already chosen to
 * read about the group, and one line in the footer. It is deliberately kept away from the
 * homepage and away from anything near the quote CTA, where a second, unrelated offer competes
 * with the only conversion that pays for the site.
 *
 * Set `enabled: false` to remove it everywhere at once.
 */
export const parentService = {
  enabled: true,
  headline: "Techleaf also builds websites",
  /** A fixed-scope product, so unlike the tour brands it genuinely can carry a price. */
  from: "$499",
  pitch:
    "Every site in this group was built in-house. If you run a business and want one that looks like these and loads like these, that is the other half of what Techleaf does.",
  cta: "Talk to Techleaf",
  url: PARENT.url,
} as const;

export { PARENT, brand };
