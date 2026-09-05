"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

type Consent = "granted" | "denied";
const STORAGE_KEY = "tp_consent";

type GtagWindow = Window & { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void };

function applyConsent(value: Consent) {
  const w = window as GtagWindow;
  w.dataLayer = w.dataLayer ?? [];
  w.gtag = w.gtag ?? function gtag(...args: unknown[]) { w.dataLayer!.push(args); };
  // ad_storage/ad_user_data/ad_personalization are hardcoded "denied" — not tied to `value` —
  // because the privacy policy (src/app/privacy/page.tsx) only discloses analytics cookies today;
  // granting ad consent for a purpose never disclosed to the visitor would itself be a compliance
  // problem, not a fix. This is correct as long as no ad pixel (Google Ads conversion tag, Meta
  // Pixel, etc.) exists on the site. THE MOMENT one is added: update the privacy policy's Cookies
  // section to disclose it, then change these three values to track `value` like analytics_storage
  // does — otherwise that pixel will silently receive "denied" forever, even after a visitor clicks
  // Accept, and every Google Ads / remarketing report built on it will quietly undercount with no
  // error anywhere.
  w.gtag("consent", "update", { analytics_storage: value, ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" });
  try {
    window.dispatchEvent(new CustomEvent("tp:consent", { detail: value }));
  } catch {}
}

/**
 * DPDP Act (India, 2026) and GDPR baseline: an affirmative accept/reject banner, not a passive
 * "by browsing you agree" notice, with consent as easy to withdraw as to give. Defaults to denied
 * (Consent Mode v2) until the visitor actively chooses — GA4/Clarity in layout.tsx should only
 * fire after `tp_consent === "granted"` (listen for the "tp:consent" event or read localStorage).
 */
export function ConsentBanner() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Default consent is set even earlier, via a beforeInteractive script in layout.tsx —
    // this just applies any previously-saved choice once the page is interactive.
    // One-time sync-from-storage-on-mount, same rationale as CurrencyContext.
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Consent | null;
      if (saved) applyConsent(saved);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      else setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  useEffect(() => {
    // The banner's real height varies with text wrap (viewport width, locale), so the WhatsApp
    // float (globals.css, .whatsapp-float) reads a measured --consent-banner-h custom property
    // instead of a guessed offset — otherwise it either overlaps the banner at some widths or
    // leaves an ugly gap at others. Cleared on unmount so the float falls back to its resting
    // position the instant a choice is made (the banner unmounts on choose()).
    if (!visible || !ref.current) return;
    const el = ref.current;
    const set = () => document.documentElement.style.setProperty("--consent-banner-h", `${el.offsetHeight}px`);
    set();
    const ro = new ResizeObserver(set);
    ro.observe(el);
    return () => {
      ro.disconnect();
      document.documentElement.style.removeProperty("--consent-banner-h");
    };
  }, [visible]);

  const choose = (value: Consent) => {
    try { localStorage.setItem(STORAGE_KEY, value); } catch {}
    applyConsent(value);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div ref={ref} id="consent-banner" role="dialog" aria-label="Cookie consent" className="fixed inset-x-0 bottom-0 z-[90] border-t border-border bg-white/97 p-4 shadow-lift backdrop-blur sm:p-5">
      <div className="container-site flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-ink/85">
          We use cookies for analytics to improve this site. Read our <Link href="/privacy" className="link">privacy policy</Link>. You can change your choice at any time.
        </p>
        <div className="flex shrink-0 gap-2">
          <Button variant="secondary" onClick={() => choose("denied")}>Reject</Button>
          <Button onClick={() => choose("granted")}>Accept</Button>
        </div>
      </div>
    </div>
  );
}
