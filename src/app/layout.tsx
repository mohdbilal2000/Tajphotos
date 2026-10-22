import type { Metadata, Viewport } from "next";
import { Newsreader, Archivo } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";
import { ConsentBanner } from "@/components/ConsentBanner";
import "./globals.css";
import { site } from "@/config/site";
import { Header } from "@/components/layout/Header";
import { TopBar } from "@/components/layout/TopBar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { CurrencyProvider } from "@/context/CurrencyContext";
import { JsonLd } from "@/components/JsonLd";
import { graph, organizationJsonLd, websiteJsonLd } from "@/lib/seo";

/**
 * Type pairing: an editorial serif for display, a neutral grotesk for everything else.
 *
 * Newsreader carries an `opsz` axis, which is the reason to choose it over a static serif — the
 * same family sets a 6rem hero without the hairlines blowing out and a 1.25rem sub-head without
 * them disappearing, provided nothing pins the axis by hand (see globals.css). Italic is loaded
 * because the founder's letter and the pull-quotes use it as a voice, not as emphasis.
 *
 * It replaced Bodoni Moda, which was the first choice and looked better in the hero. Its Google
 * Fonts `latin` subset ships without U+002D, U+2013, U+2014 or U+002B: the @font-face unicode-range
 * still *claims* those codepoints, so the browser never falls through to another subset and simply
 * renders nothing. Headings like "Delhi–Agra", "4-Day Tour" and stats like "12,000+" lost their
 * punctuation site-wide, silently. If you swap this font again, render the replacement's PRELOADED
 * subset against a dash/plus test string before shipping — a missing glyph in a display face does
 * not throw, it just quietly deletes characters from your headlines.
 *
 * Both are variable fonts, self-hosted at build time by next/font (no runtime Google request),
 * subset to latin, so the whole type system is two woff2 files.
 */
const display = Newsreader({
  subsets: ["latin"],
  variable: "--font-display-serif",
  display: "swap",
  axes: ["opsz"],
  weight: "variable",
  style: ["normal", "italic"],
});
const archivo = Archivo({ subsets: ["latin"], variable: "--font-archivo", display: "swap", weight: "variable" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Golden Triangle Tours & Taj Mahal Photography, by Agra Locals`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.legalName, url: site.url }],
  creator: site.legalName,
  publisher: site.legalName,
  category: "travel",
  formatDetection: { telephone: true, email: true, address: true },
  alternates: { canonical: "/", types: { "application/rss+xml": `${site.url}/feed.xml` } },
  openGraph: { type: "website", siteName: site.name, locale: site.locale, url: site.url },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  verification: {
    ...(site.verification.google ? { google: site.verification.google } : {}),
    ...(site.verification.bing ? { other: { "msvalidate.01": site.verification.bing } } : {}),
  },
  other: { "geo.region": "IN-UP", "geo.placename": "Agra" },
};

export const viewport: Viewport = {
  themeColor: "#f4f1ec",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${archivo.variable} h-full`}>
      <body className="flex min-h-full flex-col">
        {/* Consent Mode v2 default — must run before any analytics script (GA4/Clarity), so it is
            beforeInteractive and defaults everything to denied until ConsentBanner applies a choice. */}
        <Script id="consent-default" strategy="beforeInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){ window.dataLayer.push(arguments); }
          window.gtag = gtag;
          gtag('consent', 'default', { analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', wait_for_update: 500 });
        `}</Script>
        <JsonLd data={graph(organizationJsonLd(), websiteJsonLd())} />
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-primary focus:px-4 focus:py-2 focus:text-label focus:font-semibold focus:uppercase focus:text-primary-fg">
          Skip to content
        </a>
        <CurrencyProvider>
          <TopBar />
          <Header />
          <main id="main" className="flex-1">{children}</main>
          <Footer />
          <WhatsAppFloat />
          <ConsentBanner />
        </CurrencyProvider>
        <Analytics />
        <SpeedInsights />
        {site.analytics.gaId && <GoogleAnalytics gaId={site.analytics.gaId} />}
      </body>
    </html>
  );
}
