import { MessageCircle, ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { site } from "@/config/site";
import { InlineText } from "@/components/content/RichText";
import { cn } from "@/lib/utils";
import { brand } from "@/config/brand";

export function CtaCard({
  title,
  text,
  tourSlug,
  label,
  className,
  headingLevel: Heading = "h2",
}: {
  title: string;
  text?: string;
  tourSlug?: string;
  label?: string;
  className?: string;
  /**
   * CtaCard is always its own top-level page section (every call site wraps it in its own
   * <Section>, a sibling of the page's other <h2> sections, never nested under one) — so h2 is
   * correct everywhere except inline use inside RichText's long-form article body, where a
   * preceding h2 subsection makes h3 the right level instead. Defaults to h2.
   */
  headingLevel?: "h2" | "h3";
}) {
  return (
    <aside className={cn("relative overflow-hidden rounded-3xl bg-ink px-6 py-8 text-bg sm:px-10 sm:py-10", className)}>
      <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 size-64 rounded-full bg-primary/40 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-24 -left-10 size-64 rounded-full bg-accent/30 blur-3xl" />
      <div className="relative grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <p className="eyebrow text-highlight">Plan with a local</p>
          <Heading className="mt-2 font-display text-2xl font-semibold sm:text-3xl">{title}</Heading>
          {text && (
            <p className="mt-3 max-w-xl text-bg/80 leading-relaxed">
              <InlineText text={text} />
            </p>
          )}
        </div>
        <div className="flex flex-wrap gap-3">
          <WhatsAppLink message={`Hi ${site.name}! I'm interested in ${tourSlug ? `the ${tourSlug.replace(/-/g, " ")}` : "planning a trip"}. Could you help?`} className="btn-whatsapp" event="whatsapp_click_cta">
            <MessageCircle className="size-4" aria-hidden /> Chat on WhatsApp
          </WhatsAppLink>
          <ButtonLink href={tourSlug ? (`/tours/${tourSlug}` as "/tours") : "/quote"} variant="secondary">
            {label ?? (tourSlug ? "See this tour" : brand.quote.cta)} <ArrowRight className="size-4" aria-hidden />
          </ButtonLink>
        </div>
      </div>
    </aside>
  );
}
