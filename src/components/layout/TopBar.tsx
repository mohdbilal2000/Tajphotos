import { Mail, Headphones, Sparkles } from "lucide-react";
import { site } from "@/config/site";
import { TrackedContactLink } from "@/components/TrackedContactLink";

/**
 * Thin utility strip above the masthead: contact on the left, one
 * true service line in the middle, a location mark on the right. It scrolls away with the page; only
 * the masthead below it is sticky. The middle line is our own reply-time promise, not a promotion.
 */
export function TopBar() {
  return (
    <div className="bg-ink text-[0.6875rem] text-white/75">
      <div className="container-site flex h-9 items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <TrackedContactLink event="email_click" href={`mailto:${site.contact.email}`} className="inline-flex items-center gap-1.5 transition hover:text-white">
            <Mail className="size-3.5" aria-hidden /> <span className="hidden sm:inline">{site.contact.email}</span><span className="sm:hidden">Email</span>
          </TrackedContactLink>
          <span aria-hidden className="h-3 w-px bg-white/20" />
          <TrackedContactLink event="tel_click" href={`tel:${site.contact.phoneE164}`} className="inline-flex items-center gap-1.5 transition hover:text-white">
            <Headphones className="size-3.5" aria-hidden /> Travel support
          </TrackedContactLink>
        </div>
        <p className="hidden items-center gap-2 font-semibold uppercase tracking-[0.18em] text-white/80 md:flex">
          <Sparkles className="size-3 text-highlight" aria-hidden /> Free itinerary &amp; quote · reply in about 15 minutes
        </p>
        <p className="hidden font-semibold uppercase tracking-[0.2em] text-white/50 sm:block">Agra · Private travel</p>
      </div>
    </div>
  );
}
