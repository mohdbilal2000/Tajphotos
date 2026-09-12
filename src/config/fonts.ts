import { Fraunces, Manrope, Cormorant_Garamond, Jost, Archivo, Inter, Spectral } from "next/font/google";
import { brand } from "@/config/brand";

/**
 * Per-brand typography.
 *
 * Colour alone does not make two sites read as different products — typeface does more of that
 * work than any other single variable, so each brand gets a display/body pairing matched to what
 * it sells: an editorial serif for trip planning, a romantic garalde for portraits, a grotesque
 * for the photography workshops, and a book serif for the print gallery.
 *
 * WHY EVERY PAIR IS DECLARED HERE, AND WHY NONE IS PRELOADED
 * `next/font` is a compile-time transform: every argument must be an explicitly written literal,
 * so the loader cannot be handed `preload: isActiveBrand(...)` or a family chosen from a
 * variable. All four pairs are therefore declared unconditionally, and since this module is
 * reachable from the root layout, marking any of them `preload: true` would emit preload links
 * for all four brands' fonts on every page — six unused files in the critical path.
 *
 * `preload: false` is the correct trade here: the `@font-face` rules still exist and the browser
 * downloads a family the moment rendered CSS references one, which for a given build is only the
 * active brand's pair. The cost is one round trip after CSS parse rather than a head preload.
 * That is covered by `display: "swap"` plus `adjustFontFallback` (on by default for Google
 * fonts), which sizes the fallback metrics to the real face so the swap does not shift layout.
 *
 * If a brand's LCP ever proves font-bound, the fix is to give that brand its own deployment
 * entry that imports only its own pair with a literal `preload: true` — not to preload here.
 */
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-display-src", display: "swap", axes: ["opsz", "SOFT"], weight: "variable", preload: false });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-body-src", display: "swap", preload: false });

const cormorant = Cormorant_Garamond({ subsets: ["latin"], variable: "--font-display-src", display: "swap", weight: ["400", "600"], preload: false });
const jost = Jost({ subsets: ["latin"], variable: "--font-body-src", display: "swap", preload: false });

const archivo = Archivo({ subsets: ["latin"], variable: "--font-display-src", display: "swap", weight: "variable", preload: false });
const inter = Inter({ subsets: ["latin"], variable: "--font-body-src", display: "swap", preload: false });

const spectral = Spectral({ subsets: ["latin"], variable: "--font-display-src", display: "swap", weight: ["400", "600"], preload: false });

const pairs = {
  tajphotos: { display: fraunces, body: manrope, displayStack: '"Georgia", "Times New Roman", serif' },
  tajphotoshoots: { display: cormorant, body: jost, displayStack: '"Georgia", "Times New Roman", serif' },
  tajphototours: { display: archivo, body: inter, displayStack: "ui-sans-serif, system-ui, sans-serif" },
  tajphotographs: { display: spectral, body: inter, displayStack: '"Georgia", "Times New Roman", serif' },
} as const;

const pair = pairs[brand.key];

/** Applied to `<html>` so `--font-display-src` / `--font-body-src` resolve for this brand. */
export const fontClassNames = `${pair.display.variable} ${pair.body.variable}`;

/**
 * Heading expression. Weight, tracking and optical sizing differ per brand so the same H1 markup
 * reads as four distinct voices — a high-contrast garalde at 500 is a different object from a
 * tightly-tracked grotesque at 700, before any colour is applied.
 */
const headingStyles: Record<typeof brand.style.headings, Record<string, string>> = {
  "serif-editorial": { "--brand-h-weight": "600", "--brand-h-tracking": "-0.02em", "--brand-h-opsz": '"opsz" 32, "SOFT" 20' },
  "serif-romantic": { "--brand-h-weight": "500", "--brand-h-tracking": "-0.005em", "--brand-h-opsz": "normal" },
  "sans-industrial": { "--brand-h-weight": "700", "--brand-h-tracking": "-0.035em", "--brand-h-opsz": "normal" },
  "serif-gallery": { "--brand-h-weight": "500", "--brand-h-tracking": "-0.01em", "--brand-h-opsz": "normal" },
};

export const fontCssVars = {
  ...headingStyles[brand.style.headings],
  "--brand-display-fallback": pair.displayStack,
} as React.CSSProperties;
