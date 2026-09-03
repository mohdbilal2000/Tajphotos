"use client";
import { Section } from "@/components/ui/Section";
import { Button, ButtonLink } from "@/components/ui/Button";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <Section className="text-center">
      <p className="eyebrow">Something went wrong</p>
      <h1 className="mt-3 text-4xl font-semibold">We hit a bump in the road</h1>
      <p className="mx-auto mt-4 max-w-md text-muted">Please try again, or message us on WhatsApp and we will help right away.</p>
      <div className="mt-8 flex justify-center gap-3">
        <Button onClick={reset}>Try again</Button>
        <ButtonLink href="/" variant="secondary">Home</ButtonLink>
      </div>
    </Section>
  );
}
