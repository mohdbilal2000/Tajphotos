import Image from "next/image";
import { MessageCircle, ArrowRight, Star } from "lucide-react";
import type { StaticImageData } from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { defaultWhatsappMessage, site } from "@/config/site";

export function Hero({
  image,
  alt,
  eyebrow,
  title,
  subtitle,
  primaryHref = "/tours",
  primaryLabel = "Explore tours",
}: {
  image: StaticImageData;
  alt: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  primaryHref?: string;
  primaryLabel?: string;
}) {
  return (
    <section className="relative flex min-h-[88vh] items-end overflow-hidden bg-ink sm:min-h-[92vh]">
      <Image src={image} alt={alt} priority fetchPriority="high" sizes="100vw" className="absolute inset-0 -z-20 size-full object-cover" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/55 to-ink/10" />
      <div className="container-site relative py-14 text-white sm:py-20">
        <p className="eyebrow text-highlight">{eyebrow}</p>
        <h1 className="mt-4 max-w-3xl text-shadow-hero text-4xl font-semibold leading-[1.05] sm:text-6xl lg:text-[4.25rem]">{title}</h1>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/90 sm:text-xl">{subtitle}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href={primaryHref as "/tours"} size="lg">
            {primaryLabel} <ArrowRight className="size-4" aria-hidden />
          </ButtonLink>
          <WhatsAppLink message={defaultWhatsappMessage} event="whatsapp_click_hero" className="btn-whatsapp btn-lg">
            <MessageCircle className="size-4" aria-hidden /> Plan on WhatsApp
          </WhatsAppLink>
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/85">
          {/* Same rule as StatStrip/AggregateRating JSON-LD: never show a specific star rating
              and review count as a confident claim until site.stats.ratingVerified is a real,
              independently-checkable number — this is the most prominent spot on the whole site,
              so it's the last place to let a placeholder read as a real trust signal. */}
          {site.stats.ratingVerified && (
            <span className="inline-flex items-center gap-1.5"><Star className="size-4 fill-current text-highlight" aria-hidden /> {site.stats.rating.value} ({site.stats.rating.count.toLocaleString()} reviews)</span>
          )}
          <span>Free cancellation</span>
          <span>{site.contact.hoursNote}</span>
        </div>
      </div>
    </section>
  );
}
