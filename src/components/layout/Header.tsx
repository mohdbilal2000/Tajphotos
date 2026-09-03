"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, MessageCircle, ChevronDown, Phone } from "lucide-react";
import { site, defaultWhatsappMessage } from "@/config/site";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { cn } from "@/lib/utils";

const nav = [
  {
    label: "Tours",
    href: "/tours",
    children: [
      { label: "Golden Triangle tours", href: "/tours#golden-triangle", blurb: "Delhi · Agra · Jaipur, 3–7 days" },
      { label: "Same-day Taj Mahal from Delhi", href: "/tours#same-day", blurb: "By car or Gatimaan Express" },
      { label: "Taj Mahal photoshoots", href: "/tours#photography", blurb: "Pro photographer at sunrise" },
      { label: "Agra tours", href: "/tours#agra", blurb: "Taj, Agra Fort, Fatehpur Sikri" },
      { label: "Jaipur & Rajasthan", href: "/tours#jaipur", blurb: "Amber Fort to Udaipur lakes" },
      { label: "Cars & transfers", href: "/tours#transfer", blurb: "Private chauffeur-driven cars" },
    ],
  },
  { label: "Destinations", href: "/destinations" },
  { label: "Travel guides", href: "/guides" },
  { label: "Reviews", href: "/reviews" },
  { label: "About", href: "/about" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  // Lazy initial value (not an effect) so there's nothing to set synchronously on mount — only the
  // scroll listener callback below calls setScrolled, which the set-state-in-effect rule allows.
  const [scrolled, setScrolled] = useState(() => typeof window !== "undefined" && window.scrollY > 8);
  const pathname = usePathname();

  // Close the mobile drawer on navigation. This is React's own documented pattern for resetting
  // state when a prop changes (react.dev "You Might Not Need an Effect"); the newer
  // react-hooks/set-state-in-effect rule doesn't special-case it yet.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header className={cn("sticky top-0 z-50 border-b transition-colors", scrolled || open ? "border-border bg-bg/90 backdrop-blur-md" : "border-transparent bg-bg/70 backdrop-blur-sm")}>
      <div className="container-site flex h-16 items-center justify-between gap-4 lg:h-[4.5rem]">
        <Link href="/" className="font-display text-[1.45rem] font-semibold tracking-tight text-ink" aria-label={`${site.name} home`}>
          Taj<span className="text-primary">Photos</span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {nav.map((item) =>
            "children" in item ? (
              <div key={item.label} className="group relative">
                <Link href={item.href} className={cn("flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium hover:bg-surface", pathname.startsWith(item.href) && "text-primary")}>
                  {item.label} <ChevronDown className="size-3.5 opacity-60 transition-transform group-hover:rotate-180" aria-hidden />
                </Link>
                <div className="invisible absolute left-0 top-full pt-2 opacity-0 transition-all group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                  <div className="w-[26rem] rounded-2xl border border-border bg-bg p-2 shadow-lift">
                    {item.children.map((c) => (
                      <Link key={c.href} href={c.href as "/tours"} className="block rounded-xl px-3 py-2.5 hover:bg-surface">
                        <span className="block text-sm font-medium text-ink">{c.label}</span>
                        <span className="block text-xs text-muted">{c.blurb}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link key={item.label} href={item.href} className={cn("rounded-full px-3.5 py-2 text-sm font-medium hover:bg-surface", pathname.startsWith(item.href) && "text-primary")}>
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="flex items-center gap-2">
          <a href={`tel:${site.contact.phoneE164}`} className="hidden items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-ink hover:bg-surface xl:flex" aria-label={`Call ${site.contact.phoneDisplay}`}>
            <Phone className="size-4 text-primary" aria-hidden /> {site.contact.phoneDisplay}
          </a>
          <WhatsAppLink message={defaultWhatsappMessage} event="whatsapp_click_header" className="btn-whatsapp hidden px-4 py-2.5 sm:inline-flex">
            <MessageCircle className="size-4" aria-hidden /> WhatsApp
          </WhatsAppLink>
          <Link href="/plan-my-trip" className="btn-primary hidden px-4 py-2.5 md:inline-flex">Plan my trip</Link>
          <button type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-controls="mobile-nav" aria-label={open ? "Close menu" : "Open menu"} className="rounded-full p-2 hover:bg-surface lg:hidden">
            {open ? <X className="size-6" aria-hidden /> : <Menu className="size-6" aria-hidden />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div id="mobile-nav" hidden={!open} className="lg:hidden">
        <div className="container-site max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-border pb-8 pt-4">
          <ul className="space-y-1">
            {nav.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className="block rounded-xl px-3 py-3 text-lg font-medium hover:bg-surface">{item.label}</Link>
                {"children" in item && (
                  <ul className="mb-2 ml-3 border-l border-border pl-3">
                    {item.children.map((c) => (
                      <li key={c.href}><Link href={c.href as "/tours"} className="block rounded-lg px-2 py-2 text-sm text-muted hover:text-ink">{c.label}</Link></li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <WhatsAppLink message={defaultWhatsappMessage} event="whatsapp_click_menu" className="btn-whatsapp"><MessageCircle className="size-4" aria-hidden /> WhatsApp</WhatsAppLink>
            <Link href="/plan-my-trip" className="btn-primary">Plan my trip</Link>
          </div>
          <a href={`tel:${site.contact.phoneE164}`} className="mt-4 flex items-center justify-center gap-2 text-sm text-muted"><Phone className="size-4" aria-hidden /> Call {site.contact.phoneDisplay}</a>
        </div>
      </div>
    </header>
  );
}
