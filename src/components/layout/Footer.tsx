import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { InstagramIcon, FacebookIcon, YoutubeIcon } from "@/components/ui/BrandIcons";
import { TrackedContactLink } from "@/components/TrackedContactLink";
import { site } from "@/config/site";
import { PARENT, siblingBrands } from "@/config/brand";
import { publishes } from "@/lib/sections";
import { tours, destinations, latestGuides } from "@/content";
import { brand } from "@/config/brand";

const year = 2026;

export function Footer() {
  const topTours = tours.slice(0, 8);
  return (
    <footer className="mt-24 border-t border-border bg-surface text-sm">
      <div className="container-site grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Link href="/" className="font-display text-2xl font-semibold text-ink">{site.name}</Link>
          <p className="mt-3 max-w-sm text-muted leading-relaxed">{site.tagline}. Registered in Agra, Uttar Pradesh, India.</p>
          <ul className="mt-5 space-y-2 text-muted">
            <li className="flex items-start gap-2"><MapPin className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden /><span>{site.address.streetAddress}, {site.address.addressLocality} {site.address.postalCode}, India</span></li>
            <li className="flex items-center gap-2"><Phone className="size-4 shrink-0 text-primary" aria-hidden /><TrackedContactLink event="tel_click" href={`tel:${site.contact.phoneE164}`} className="hover:text-ink">{site.contact.phoneDisplay}</TrackedContactLink></li>
            <li className="flex items-center gap-2"><Mail className="size-4 shrink-0 text-primary" aria-hidden /><TrackedContactLink event="email_click" href={`mailto:${site.contact.email}`} className="hover:text-ink">{site.contact.email}</TrackedContactLink></li>
          </ul>
          <div className="mt-5 flex gap-3">
            {site.social.instagram && <a href={site.social.instagram} aria-label="Instagram" className="rounded-full border border-border p-2 hover:bg-white" target="_blank" rel="noopener noreferrer"><InstagramIcon /></a>}
            {site.social.facebook && <a href={site.social.facebook} aria-label="Facebook" className="rounded-full border border-border p-2 hover:bg-white" target="_blank" rel="noopener noreferrer"><FacebookIcon /></a>}
            {site.social.youtube && <a href={site.social.youtube} aria-label="YouTube" className="rounded-full border border-border p-2 hover:bg-white" target="_blank" rel="noopener noreferrer"><YoutubeIcon /></a>}
          </div>
        </div>
        {/* Sections a brand does not publish are 404s (src/lib/sections.ts), so they must not be
            linked here either — a footer is the most-crawled block on any site. */}
        {publishes("tours") && (
          <div>
            <p className="font-semibold text-ink">Popular tours</p>
            <ul className="mt-3 space-y-2 text-muted">
              {topTours.map((t) => (
                <li key={t.slug}><Link href={`/tours/${t.slug}` as "/tours"} className="hover:text-ink">{t.shortTitle ?? t.title}</Link></li>
              ))}
              <li><Link href="/tours" className="font-medium text-primary hover:underline">All tours →</Link></li>
            </ul>
          </div>
        )}
        {(publishes("destinations") || publishes("guides")) && (
          <div>
            {publishes("destinations") && (
              <>
                <p className="font-semibold text-ink">Destinations</p>
                <ul className="mt-3 space-y-2 text-muted">
                  {destinations.map((d) => (
                    <li key={d.slug}><Link href={`/destinations/${d.slug}` as "/destinations"} className="hover:text-ink">{d.name}</Link></li>
                  ))}
                </ul>
              </>
            )}
            {publishes("guides") && (
              <>
                <p className={publishes("destinations") ? "mt-6 font-semibold text-ink" : "font-semibold text-ink"}>Latest guides</p>
                <ul className="mt-3 space-y-2 text-muted">
                  {latestGuides(4).map((g) => (
                    <li key={g.slug}><Link href={`/guides/${g.slug}` as "/guides"} className="hover:text-ink">{g.title}</Link></li>
                  ))}
                </ul>
              </>
            )}
          </div>
        )}
        <div>
          <p className="font-semibold text-ink">Company</p>
          <ul className="mt-3 space-y-2 text-muted">
            <li><Link href="/about" className="hover:text-ink">About us</Link></li>
            <li><Link href="/reviews" className="hover:text-ink">Reviews</Link></li>
            <li><Link href="/faq" className="hover:text-ink">FAQ</Link></li>
            <li><Link href="/quote" className="hover:text-ink">{brand.quote.cta}</Link></li>
            <li><Link href="/contact" className="hover:text-ink">Contact</Link></li>
            {publishes("guides") && <li><Link href="/guides" className="hover:text-ink">Travel guides</Link></li>}
            <li><Link href="/privacy" className="hover:text-ink">Privacy policy</Link></li>
            <li><Link href="/terms" className="hover:text-ink">Terms &amp; cancellation</Link></li>
            <li><Link href="/credits" className="hover:text-ink">Photo credits</Link></li>
          </ul>
          <ul className="mt-6 space-y-1.5 text-xs text-muted">
            {site.credentials.map((c) => (
              <li key={c.short}>✓ {c.label}</li>
            ))}
          </ul>
        </div>
      </div>
      {/* The sibling brands, named and linked.
          These are the referral paths that let each site stay narrow — someone who wants to be
          photographed does not belong on the photo-tour site, and saying so beats upselling them.
          It is also the disclosure that keeps a brand portfolio legitimate: four related sites
          under one owner that openly link to each other and to their parent read as a declared
          group, which is a normal business structure. The same four hiding from each other is
          what Google's site-reputation policy is built to catch. */}
      <div className="border-t border-border">
        <div className="container-site py-6">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Also from {PARENT.name}</p>
          <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-xs text-muted">
            {siblingBrands.map((b) => (
              <li key={b.key}>
                <a href={`https://${b.domain}`} className="hover:text-ink" rel="noopener">
                  <span className="font-medium text-ink/80">{b.name}</span> — {b.product.replace(/\.$/, "")}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container-site flex flex-col gap-2 py-5 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legalName}. All rights reserved. {PARENT.disclosure}, registered in Agra, Uttar Pradesh, India.
          </p>
          <p>
            Every booking is quoted individually — we publish no fixed rates. Monument tickets are set by the
            Archaeological Survey of India and subject to change.
          </p>
        </div>
      </div>
    </footer>
  );
}
