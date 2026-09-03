import { MessageCircle, ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { site } from "@/config/site";
import { InlineText } from "@/components/content/RichText";
import { cn } from "@/lib/utils";

export function CtaCard({ title, text, tourSlug, label, className }: { title: string; text?: string; tourSlug?: string; label?: string; className?: string }) {
  return (
    <aside className={cn("relative overflow-hidden rounded-3xl bg-ink px-6 py-8 text-bg sm:px-10 sm:py-10", className)}>
      <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 size-64 rounded-full bg-primary/40 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-24 -left-10 size-64 rounded-full bg-accent/30 blur-3xl" />
      <div className="relative grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <p className="eyebrow text-accent">Plan with a local</p>
          <h3 className="mt-2 font-display text-2xl font-semibold sm:text-3xl">{title}</h3>
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
          <ButtonLink href={tourSlug ? (`/tours/${tourSlug}` as "/tours") : "/plan-my-trip"} variant="secondary">
            {label ?? (tourSlug ? "See this tour" : "Plan my trip")} <ArrowRight className="size-4" aria-hidden />
          </ButtonLink>
        </div>
      </div>
    </aside>
  );
}
