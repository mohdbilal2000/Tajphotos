import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Page not found", robots: { index: false, follow: true } };
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Section className="text-center">
      <p className="eyebrow">404</p>
      <h1 className="mt-3 text-4xl font-semibold sm:text-5xl">This page wandered off the itinerary</h1>
      <p className="mx-auto mt-4 max-w-md text-lg text-muted">The link may be old or mistyped. Here are the places travellers usually want next.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <ButtonLink href="/tours">Browse tours</ButtonLink>
        <ButtonLink href="/plan-my-trip" variant="secondary">Plan my trip</ButtonLink>
        <ButtonLink href="/guides" variant="secondary">Read our guides</ButtonLink>
      </div>
      <p className="mt-8 text-sm text-muted">Or go back to the <Link href="/" className="link">homepage</Link>.</p>
    </Section>
  );
}
