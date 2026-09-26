import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { StaticImageData } from "next/image";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { defaultWhatsappMessage, site } from "@/config/site";
import { cn } from "@/lib/utils";

/**
 * A full-bleed photograph with the headline set on the image, and a hairline meta rail across the
 * bottom. Deliberately not a hero "card": no badge cluster, no stacked pill buttons, no star
 * rating. One statement, one primary action, and three facts a traveller actually wants
 * (where we are, what it costs to ask, how fast we answer).
 *
 * Height uses `svh`, not `vh`, so mobile browser chrome can never crop the headline. The desktop
 * cap is written as `min(88svh, 48rem)` INSIDE min-height rather than as a separate `max-h`,
 * because min-height wins over max-height in the CSS cascade — a `min-h-[88svh] max-h-[48rem]`
 * pair silently does nothing on a tall display and the hero grows without limit.
 */
export function Hero({
  image,
  alt,
  eyebrow,
  title,
  subtitle,
  primaryHref = "/tours",
  primaryLabel = "See the journeys",
  meta,
}: {
  image: StaticImageData;
  alt: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  primaryHref?: string;
  primaryLabel?: string;
  /** The bottom rail. Defaults to the three facts above. */
  meta?: { label: string; value: string }[];
}) {
  const rail = meta ?? [
    { label: "Based in", value: "Tajganj, Agra" },
    { label: "Reply time", value: "About 15 minutes" },
    { label: "Deposit", value: "Balance on arrival" },
  ];
  return (
    <section className="relative isolate flex min-h-[78svh] flex-col justify-end overflow-hidden bg-ink text-white lg:min-h-[min(88svh,48rem)]">
      <Image
        src={image}
        alt={alt}
        preload
        fetchPriority="high"
        sizes="100vw"
        className="absolute inset-0 -z-20 size-full object-cover"
      />
      {/* Two stacked gradients rather than one: a soft top wash so the masthead's hairline doesn't
          collide with a bright sky, and a long, multi-stop foot so the headline never depends on
          luck. The foot is deliberately spread over the lower two thirds — a short, steep scrim
          reads as a grey bar laid across the photograph. */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/30 via-transparent to-transparent" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/92 from-8% via-ink/62 via-52% to-transparent to-95%" />

      <div className="container-site relative pb-10 pt-32 sm:pb-12 lg:pb-14 lg:pt-40">
        <p className="text-shadow-hero text-label font-semibold uppercase text-white">{eyebrow}</p>
        <h1 className="mt-6 max-w-[22ch] text-display-1 font-normal text-shadow-hero">{title}</h1>
        <p className="mt-7 max-w-xl text-lg leading-relaxed text-white/85 sm:text-xl">{subtitle}</p>
        <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
          <Link href={primaryHref as "/tours"} className="btn-secondary border-white/45 text-white hover:border-white hover:bg-white hover:text-ink">
            {primaryLabel} <ArrowRight className="size-4" aria-hidden />
          </Link>
          <WhatsAppLink message={defaultWhatsappMessage} event="whatsapp_click_hero" className="arrow-link text-white hover:text-highlight">
            Or just ask on WhatsApp <ArrowRight className="size-4" aria-hidden />
          </WhatsAppLink>
        </div>
      </div>

      <div className="relative border-t border-white/20">
        <div className="container-site grid grid-cols-1 divide-y divide-white/15 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {rail.map((m, i) => (
            <div key={m.label} className={cn("py-4 sm:py-5", i > 0 && "sm:pl-6", i < rail.length - 1 && "sm:pr-6")}>
              <p className="text-[0.5625rem] font-semibold uppercase tracking-[0.26em] text-white/55">{m.label}</p>
              <p className="mt-1.5 text-sm text-white/90">{m.value}</p>
            </div>
          ))}
        </div>
      </div>

      <span className="sr-only">{site.tagline}</span>
    </section>
  );
}
