import Link from "next/link";
import { InstagramIcon, FacebookIcon, YoutubeIcon } from "@/components/ui/BrandIcons";
import { TrackedContactLink } from "@/components/TrackedContactLink";
import { site } from "@/config/site";
import { tours, destinations, latestGuides } from "@/content";
import { cn } from "@/lib/utils";

const year = 2026;

/** Small column heading — the same micro-label as the rest of the site, on a hairline. */
function ColHead({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn("border-b border-border pb-3 text-label font-semibold uppercase text-ink", className)}>{children}</p>;
}

const linkCls = "block py-1.5 text-sm text-muted transition-colors hover:text-ink";

export function Footer() {
  const topTours = tours.slice(0, 7);
  return (
    <footer className="mt-28 border-t border-border bg-bg">
      <div className="container-site grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:gap-10">
        <div>
          <p className="text-[0.95rem] font-semibold uppercase tracking-[0.34em] text-ink">Tajphotos</p>
          <p className="mt-5 max-w-sm font-display text-xl leading-snug text-ink">
            Private Taj Mahal and Golden Triangle journeys, photographed by the people who live there.
          </p>
          <address className="mt-6 space-y-1 text-sm not-italic text-muted">
            <p>{site.address.streetAddress}</p>
            <p>{site.address.addressLocality} {site.address.postalCode}, {site.address.addressRegion}, India</p>
            <p className="pt-3">
              <TrackedContactLink event="tel_click" href={`tel:${site.contact.phoneE164}`} className="tabular-nums transition-colors hover:text-ink">{site.contact.phoneDisplay}</TrackedContactLink>
            </p>
            <p>
              <TrackedContactLink event="email_click" href={`mailto:${site.contact.email}`} className="transition-colors hover:text-ink">{site.contact.email}</TrackedContactLink>
            </p>
          </address>
          <p className="mt-5 max-w-xs text-xs leading-relaxed text-muted">{site.contact.hoursNote}.</p>
          <div className="mt-6 flex gap-2">
            {site.social.instagram && <a href={site.social.instagram} aria-label="Instagram" className="border border-border p-2.5 text-ink transition-colors hover:border-ink" target="_blank" rel="noopener noreferrer"><InstagramIcon /></a>}
            {site.social.facebook && <a href={site.social.facebook} aria-label="Facebook" className="border border-border p-2.5 text-ink transition-colors hover:border-ink" target="_blank" rel="noopener noreferrer"><FacebookIcon /></a>}
            {site.social.youtube && <a href={site.social.youtube} aria-label="YouTube" className="border border-border p-2.5 text-ink transition-colors hover:border-ink" target="_blank" rel="noopener noreferrer"><YoutubeIcon /></a>}
          </div>
        </div>

        <div>
          <ColHead>Journeys</ColHead>
          <ul className="mt-3">
            {topTours.map((t) => (
              <li key={t.slug}><Link href={`/tours/${t.slug}` as "/tours"} className={linkCls}>{t.shortTitle ?? t.title}</Link></li>
            ))}
            <li><Link href="/tours" className="mt-2 inline-block text-label font-semibold uppercase text-accent hover:text-ink">All tours</Link></li>
          </ul>
        </div>

        <div>
          <ColHead>Where you go</ColHead>
          <ul className="mt-3">
            {destinations.map((d) => (
              <li key={d.slug}><Link href={`/destinations/${d.slug}` as "/destinations"} className={linkCls}>{d.name}</Link></li>
            ))}
            <li><Link href="/stays" className={linkCls}>Hotels we book</Link></li>
            <li><Link href="/services" className={linkCls}>Services &amp; availability</Link></li>
          </ul>
          <ColHead className="mt-9">Reading</ColHead>
          <ul className="mt-3">
            {latestGuides(4).map((g) => (
              <li key={g.slug}><Link href={`/guides/${g.slug}` as "/guides"} className={linkCls}>{g.title}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <ColHead>Company</ColHead>
          <ul className="mt-3">
            <li><Link href="/about" className={linkCls}>About us</Link></li>
            <li><Link href="/reviews" className={linkCls}>Reviews</Link></li>
            <li><Link href="/faq" className={linkCls}>FAQ</Link></li>
            <li><Link href="/plan-my-trip" className={linkCls}>Plan my trip</Link></li>
            <li><Link href="/contact" className={linkCls}>Contact</Link></li>
            <li><Link href="/privacy" className={linkCls}>Privacy policy</Link></li>
            <li><Link href="/terms" className={linkCls}>Terms &amp; cancellation</Link></li>
            <li><Link href="/credits" className={linkCls}>Photo credits</Link></li>
          </ul>
          <ul className="mt-7 space-y-2 border-t border-border pt-5 text-xs leading-relaxed text-muted">
            {site.credentials.map((c) => (
              <li key={c.short} className="flex gap-2"><span aria-hidden className="mt-2 h-px w-2.5 shrink-0 bg-accent" />{c.label}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* The wordmark set as a full-width rule of type — the one piece of unashamed display typography
          in the footer, and the cheapest way to make a page end deliberately rather than just stop. */}
      <div className="container-site overflow-hidden pb-6" aria-hidden>
        <p className="select-none whitespace-nowrap font-display text-[13vw] leading-[0.82] tracking-[-0.03em] text-ink/[0.07]">TajPhotos</p>
      </div>

      <div className="border-t border-border">
        <div className="container-site flex flex-col gap-2 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {site.legalName}</p>
          <p className="max-w-xl sm:text-right">Prices in USD per person unless stated. Monument tickets are set by the Archaeological Survey of India and change without notice.</p>
        </div>
      </div>
    </footer>
  );
}
