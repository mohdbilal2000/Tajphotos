"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Map, BookOpen, Wrench, MessageCircle } from "lucide-react";
import { whatsappLink, defaultWhatsappMessage } from "@/config/site";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const tabs = [
  { href: "/", label: "Home", icon: Home, exact: true },
  { href: "/tours", label: "Journeys", icon: Map, exact: false },
  null, // centre slot: WhatsApp
  { href: "/tools", label: "Tools", icon: Wrench, exact: false },
  { href: "/guides", label: "Guides", icon: BookOpen, exact: false },
] as const;

/**
 * App-style bottom navigation, phones and tablets only. The centre slot is the one action the
 * business runs on — WhatsApp — raised like a camera/compose button. Tour pages already pin
 * StickyMobileBar to the bottom, so this bar hides itself there via :has() in globals.css, and
 * the float/consent offsets were sized for it from the start (4.75rem clearance).
 */
export function MobileTabBar() {
  const pathname = usePathname();
  return (
    <nav
      aria-label="Quick navigation"
      className="mobile-tab-bar fixed inset-x-0 bottom-0 z-40 border-t border-border bg-surface/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden"
    >
      <ul className="mx-auto flex h-[3.75rem] max-w-md items-stretch justify-between px-2">
        {tabs.map((t) =>
          t === null ? (
            <li key="wa" className="relative -top-4 flex w-16 justify-center">
              <a
                href={whatsappLink(defaultWhatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("whatsapp_click_tabbar", {})}
                aria-label="Chat on WhatsApp"
                className="flex size-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-lift ring-4 ring-bg transition-transform active:scale-95"
              >
                <MessageCircle className="size-6" aria-hidden />
              </a>
            </li>
          ) : (
            <li key={t.href} className="flex flex-1">
              <Link
                href={t.href as "/"}
                aria-current={(t.exact ? pathname === t.href : pathname.startsWith(t.href)) ? "page" : undefined}
                className={cn(
                  "flex flex-1 flex-col items-center justify-center gap-0.5 rounded-xl text-[0.625rem] font-semibold uppercase tracking-wide transition-colors active:scale-95",
                  (t.exact ? pathname === t.href : pathname.startsWith(t.href)) ? "text-primary" : "text-muted hover:text-ink",
                )}
              >
                <t.icon className="size-5" aria-hidden />
                {t.label}
              </Link>
            </li>
          ),
        )}
      </ul>
    </nav>
  );
}
