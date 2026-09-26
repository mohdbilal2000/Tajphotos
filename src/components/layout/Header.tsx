"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Phone } from "lucide-react";
import { site, defaultWhatsappMessage } from "@/config/site";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { TrackedContactLink } from "@/components/TrackedContactLink";
import { cn } from "@/lib/utils";

/**
 * A masthead, not a floating app bar. It stays paper-coloured at every scroll position rather than
 * fading in over the hero image: a translucent bar over a photograph is where contrast guarantees
 * go to die, and a magazine puts its name on the paper above the picture anyway. The only thing
 * scrolling changes is the hairline rule, so the bar doesn't sit as a visible seam on a hero.
 */

const nav = [
  {
    label: "Tours",
    href: "/tours",
    children: [
      { label: "Golden Triangle", href: "/tours#golden-triangle", blurb: "Delhi · Agra · Jaipur, 3–7 days" },
      { label: "Same-day Taj Mahal from Delhi", href: "/tours#same-day", blurb: "By car or Gatimaan Express" },
      { label: "Taj Mahal photoshoots", href: "/tours#photography", blurb: "A photographer at the gate before it opens" },
      { label: "Agra", href: "/tours#agra", blurb: "Taj, Agra Fort, Fatehpur Sikri" },
      { label: "Jaipur & Rajasthan", href: "/tours#jaipur", blurb: "Amber Fort to the Udaipur lakes" },
      { label: "Cars & transfers", href: "/tours#transfer", blurb: "Private chauffeur-driven cars" },
    ],
  },
  { label: "Stays", href: "/stays" },
  { label: "Services", href: "/services" },
  { label: "Destinations", href: "/destinations" },
  { label: "Guides", href: "/guides" },
  { label: "About", href: "/about" },
] as const;

/** Letterspaced sans wordmark over a hairline, with the one fact that matters under it. */
function Wordmark({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("group block leading-none", className)} aria-label={`${site.name} home`}>
      <span className="block text-[0.95rem] font-semibold uppercase tracking-[0.34em] text-ink transition-colors group-hover:text-accent">
        Tajphotos
      </span>
      <span className="mt-1.5 block border-t border-border pt-1.5 text-[0.5625rem] font-medium uppercase tracking-[0.28em] text-muted">
        Agra · India
      </span>
    </Link>
  );
}

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

  const linkBase = "text-label font-semibold uppercase transition-colors";

  return (
    <header className={cn("sticky top-0 z-50 bg-bg transition-[border-color] duration-300", scrolled || open ? "border-b border-border" : "border-b border-transparent")}>
      <div className="container-site flex h-20 items-center justify-between gap-6 lg:h-24">
        <Wordmark />

        <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
          {nav.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return "children" in item ? (
              <div key={item.label} className="group relative">
                <Link href={item.href} className={cn(linkBase, "flex items-center gap-1.5 py-2 text-ink hover:text-accent", active && "text-accent")}>
                  {item.label} <ChevronDown className="size-3 opacity-50 transition-transform duration-300 group-hover:rotate-180" aria-hidden />
                </Link>
                <div className="invisible absolute left-1/2 top-full -translate-x-1/2 pt-3 opacity-0 transition-opacity duration-200 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                  <div className="w-[26rem] border border-border bg-surface p-2 shadow-lift">
                    {item.children.map((c) => (
                      <Link key={c.href} href={c.href as "/tours"} className="block border-b border-border/60 px-4 py-3 last:border-0 hover:bg-bg">
                        <span className="block text-sm font-medium text-ink">{c.label}</span>
                        <span className="mt-0.5 block text-xs text-muted">{c.blurb}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link key={item.label} href={item.href} className={cn(linkBase, "py-2 text-ink hover:text-accent", active && "text-accent")}>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          <TrackedContactLink event="tel_click" href={`tel:${site.contact.phoneE164}`} className="hidden items-center gap-2 text-xs font-medium tabular-nums text-muted transition-colors hover:text-ink xl:flex" aria-label={`Call ${site.contact.phoneDisplay}`}>
            <Phone className="size-3.5" aria-hidden /> {site.contact.phoneDisplay}
          </TrackedContactLink>
          <Link href="/plan-my-trip" className="btn-primary hidden px-6 py-3 sm:inline-flex">Enquire</Link>
          <button type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-controls="mobile-nav" aria-label={open ? "Close menu" : "Open menu"} className="-mr-2 p-2 text-ink lg:hidden">
            {open ? <X className="size-6" aria-hidden /> : <Menu className="size-6" aria-hidden />}
          </button>
        </div>
      </div>

      {/* Mobile drawer — a full-height paper sheet with the nav set large, the way a printed contents page reads. */}
      <div id="mobile-nav" hidden={!open} className="lg:hidden">
        <div className="container-site max-h-[calc(100dvh-5rem)] overflow-y-auto border-t border-border pb-10 pt-6">
          <ul>
            {nav.map((item) => (
              <li key={item.label} className="border-b border-border py-4">
                <Link href={item.href} className="font-display text-3xl font-normal text-ink">{item.label}</Link>
                {"children" in item && (
                  <ul className="mt-3 space-y-2">
                    {item.children.map((c) => (
                      <li key={c.href}><Link href={c.href as "/tours"} className="text-sm text-muted hover:text-ink">{c.label}</Link></li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          <div className="mt-7 grid gap-3">
            <Link href="/plan-my-trip" className="btn-primary">Plan my trip</Link>
            <WhatsAppLink message={defaultWhatsappMessage} event="whatsapp_click_menu" className="btn-whatsapp">WhatsApp us</WhatsAppLink>
          </div>
          <TrackedContactLink event="tel_click" href={`tel:${site.contact.phoneE164}`} className="mt-5 flex items-center justify-center gap-2 text-sm text-muted"><Phone className="size-4" aria-hidden /> {site.contact.phoneDisplay}</TrackedContactLink>
        </div>
      </div>
    </header>
  );
}
