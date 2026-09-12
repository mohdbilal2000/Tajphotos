import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";
import { ConsentBanner } from "@/components/ConsentBanner";
import "./globals.css";
import { site } from "@/config/site";
import { brand, brandCssVars } from "@/config/brand";
import { fontClassNames, fontCssVars } from "@/config/fonts";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { JsonLd } from "@/components/JsonLd";
import { graph, organizationJsonLd, websiteJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    // Each brand sells a different thing, so the homepage title is the brand's own tagline
    // rather than a portfolio-wide boilerplate — four sites sharing one title template is
    // precisely the near-duplicate signal the brand split exists to avoid.
    default: `${site.name} — ${brand.tagline}`,
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
  themeColor: brand.palette.themeColor,
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // The brand palette and typography ride on the <html> element as inline custom properties:
    // element-level styles outrank Tailwind v4's `@theme` :root declarations without depending on
    // stylesheet order, and they are in the first bytes of the SSR'd HTML, so there is no flash
    // of the default brand's colours before hydration.
    <html lang="en" className={`${fontClassNames} h-full`} style={{ ...brandCssVars, ...fontCssVars }} data-brand={brand.key}>
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
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-fg">
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">{children}</main>
        <Footer />
        <WhatsAppFloat />
        <ConsentBanner />
        <Analytics />
        <SpeedInsights />
        {site.analytics.gaId && <GoogleAnalytics gaId={site.analytics.gaId} />}
      </body>
    </html>
  );
}
