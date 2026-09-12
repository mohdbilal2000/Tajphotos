import type { Brand, BrandKey } from "./brands/types";
import { PARENT } from "./brands/types";
import tajphotos from "./brands/tajphotos";
import tajphotoshoots from "./brands/tajphotoshoots";
import tajphototours from "./brands/tajphototours";
import tajphotographs from "./brands/tajphotographs";
import tajbackpackers from "./brands/tajbackpackers";

export type { Brand, BrandKey, QuoteQuestion, QuoteOption } from "./brands/types";
export { PARENT };

export const brands: Record<BrandKey, Brand> = {
  tajphotos,
  tajphotoshoots,
  tajphototours,
  tajphotographs,
  tajbackpackers,
};

export const brandList = Object.values(brands);

/**
 * Which brand this build is. Pinned per Vercel project as a build-time environment variable —
 * `NEXT_PUBLIC_BRAND` must be written out in full here (not built from a variable) because
 * Next.js inlines these by literal textual match at build time.
 */
const requested = process.env.NEXT_PUBLIC_BRAND;

function resolveBrand(): Brand {
  if (!requested) {
    // No brand pinned: the flagship is the only safe default, and a silent wrong-brand deploy is
    // far more expensive to notice than a build log line.
    console.warn(
      "[brand] NEXT_PUBLIC_BRAND is not set — defaulting to 'tajphotos'. " +
        `Set it to one of: ${Object.keys(brands).join(", ")}.`,
    );
    return tajphotos;
  }
  const found = brands[requested as BrandKey];
  if (!found) {
    // Fail the build rather than shipping a site under the wrong identity: a typo'd brand key
    // would otherwise silently publish flagship copy, schema and canonicals on another domain.
    throw new Error(
      `[brand] NEXT_PUBLIC_BRAND="${requested}" is not a known brand. ` +
        `Expected one of: ${Object.keys(brands).join(", ")}.`,
    );
  }
  return found;
}

const resolved = resolveBrand();

const env = (key: string | undefined, fallback: string) => (key && key.trim()) || fallback;

/**
 * The active brand, with contact details layered in from the environment.
 *
 * Contact details are env-driven rather than committed because the inboxes and the WhatsApp
 * number are operational settings that differ per deployment and change without a code review.
 * They intentionally default to EMPTY rather than to a plausible-looking placeholder: a fake
 * phone number that renders as a real CTA is worse than no CTA at all, so every contact surface
 * checks `hasWhatsApp`/`hasPhone` before rendering.
 */
export const brand: Brand = {
  ...resolved,
  contact: {
    email: env(process.env.NEXT_PUBLIC_EMAIL, resolved.contact.email),
    whatsapp: env(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER, ""),
    phoneDisplay: env(process.env.NEXT_PUBLIC_PHONE_DISPLAY, ""),
    phoneE164: env(process.env.NEXT_PUBLIC_PHONE_E164, ""),
  },
};

export const hasWhatsApp = Boolean(brand.contact.whatsapp);
export const hasPhone = Boolean(brand.contact.phoneE164 && brand.contact.phoneDisplay);

/** Canonical origin for this brand. Overridable for preview deployments. */
export const siteUrl = env(process.env.NEXT_PUBLIC_SITE_URL, `https://${brand.domain}`);

/**
 * The brand palette as inline custom properties for the `<html>` element.
 *
 * Applied as an element-level `style` attribute rather than an injected `<style>` block because
 * Tailwind v4's `@theme` emits its own `:root` declarations — an element style wins on
 * specificity without depending on stylesheet order, and is present in the very first byte of
 * SSR'd HTML, so there is no flash of the default palette before hydration.
 */
export const brandCssVars = {
  "--color-bg": brand.palette.bg,
  "--color-surface": brand.palette.surface,
  "--color-surface-2": brand.palette.surface2,
  "--color-ink": brand.palette.ink,
  "--color-muted": brand.palette.muted,
  "--color-border": brand.palette.border,
  "--color-primary": brand.palette.primary,
  "--color-primary-hover": brand.palette.primaryHover,
  "--color-primary-fg": brand.palette.primaryFg,
  "--color-accent": brand.palette.accent,
  "--color-accent-hover": brand.palette.accentHover,
  "--color-accent-fg": brand.palette.accentFg,
  "--color-highlight": brand.palette.highlight,
  ...radiusVars(brand.style.radius),
} as React.CSSProperties;

/**
 * Corner radius is a strong, cheap signal of brand identity — a pill-button site and a
 * square-cornered site read as different products even at identical hue. Overriding the three
 * shared radius tokens re-shapes every card, button and input at once.
 */
function radiusVars(scale: Brand["style"]["radius"]): Record<string, string> {
  switch (scale) {
    case "none":
      return { "--radius-xl": "0.125rem", "--radius-2xl": "0.125rem", "--radius-3xl": "0.25rem", "--brand-btn-radius": "0.125rem" };
    case "soft":
      return { "--radius-xl": "0.75rem", "--radius-2xl": "1rem", "--radius-3xl": "1.5rem", "--brand-btn-radius": "0.75rem" };
    case "pill":
    default:
      return { "--radius-xl": "1rem", "--radius-2xl": "1.25rem", "--radius-3xl": "1.75rem", "--brand-btn-radius": "9999px" };
  }
}

/** wa.me deep link with a prefilled message. Returns null when no number is configured. */
export function whatsappLink(message?: string): string | null {
  if (!hasWhatsApp) return null;
  const base = `https://wa.me/${brand.contact.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** Cross-links to the sibling brands — the referral paths that keep each site's scope narrow. */
export const siblingBrands = brandList.filter((b) => b.key !== brand.key);
