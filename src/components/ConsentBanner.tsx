"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

type Consent = "granted" | "denied";
const STORAGE_KEY = "tp_consent";

type GtagWindow = Window & { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void };

function applyConsent(value: Consent) {
  const w = window as GtagWindow;
  w.dataLayer = w.dataLayer ?? [];
  w.gtag = w.gtag ?? function gtag(...args: unknown[]) { w.dataLayer!.push(args); };
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

  const choose = (value: Consent) => {
    try { localStorage.setItem(STORAGE_KEY, value); } catch {}
    applyConsent(value);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div role="dialog" aria-label="Cookie consent" className="fixed inset-x-0 bottom-0 z-[90] border-t border-border bg-white/97 p-4 shadow-lift backdrop-blur sm:p-5">
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
