import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { brand } from "@/config/brand";
import { publishes } from "@/lib/sections";

/**
 * Shared by all four brands, so the copy stays neutral — "wandered off the itinerary" is the
 * flagship's voice and reads as someone else's site on a print gallery.
 *
 * The links are gated for a more concrete reason: this page is also what an unpublished section
 * renders (see `src/lib/sections.ts`), so an ungated "Browse tours" button here would send a
 * visitor from one 404 straight to another on two of the four brands.
 */
export default function NotFound() {
  return (
    <Section className="text-center">
      <p className="eyebrow">404</p>
      <h1 className="mt-3 text-4xl font-semibold sm:text-5xl">We couldn&apos;t find that page</h1>
      <p className="mx-auto mt-4 max-w-md text-lg text-muted">
        The link is probably old or mistyped. Here is where most people go next.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <ButtonLink href="/quote">{brand.quote.cta}</ButtonLink>
        {publishes("tours") && <ButtonLink href="/tours" variant="secondary">Browse tours</ButtonLink>}
        {publishes("guides") && <ButtonLink href="/guides" variant="secondary">Read our guides</ButtonLink>}
      </div>
      <p className="mt-8 text-sm text-muted">
        Or go back to the <Link href="/" className="link">homepage</Link>.
      </p>
    </Section>
  );
}
