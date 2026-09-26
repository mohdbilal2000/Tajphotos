import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { site } from "@/config/site";
import { InlineText } from "@/components/content/RichText";
import { cn } from "@/lib/utils";

/**
 * The closing panel: ink ground, brass micro-label, one display line, two ways to start. The two
 * blurred colour orbs the previous version used as decoration are gone — they were the single most
 * "generated landing page" element on the site, and an ink panel with a hairline rail says premium
 * on its own.
 */
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
    <aside className={cn("bg-ink px-6 py-12 text-bg sm:px-12 sm:py-16", className)}>
      <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <p className="border-t border-white/25 pt-4 text-label font-semibold uppercase text-highlight">Plan it with a local</p>
          <Heading className="mt-6 max-w-2xl font-display text-display-3 font-normal">{title}</Heading>
          {text && (
            <p className="mt-5 max-w-xl leading-relaxed text-bg/75">
              <InlineText text={text} />
            </p>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
          <WhatsAppLink message={`Hi ${site.name}! I'm interested in ${tourSlug ? `the ${tourSlug.replace(/-/g, " ")}` : "planning a trip"}. Could you help?`} className="btn-whatsapp" event="whatsapp_click_cta">
            Chat on WhatsApp
          </WhatsAppLink>
          <ButtonLink href={tourSlug ? (`/tours/${tourSlug}` as "/tours") : "/plan-my-trip"} variant="ghost" className="text-bg decoration-white/35 hover:decoration-white">
            {label ?? (tourSlug ? "See this tour" : "Plan my trip")} <ArrowRight className="size-4" aria-hidden />
          </ButtonLink>
        </div>
      </div>
    </aside>
  );
}
