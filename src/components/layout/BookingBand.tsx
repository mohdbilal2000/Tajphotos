import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { defaultWhatsappMessage } from "@/config/site";
import { getImage } from "@/content/images";

/**
 * The last thing on every page: one dark plate, one question, two ways to answer it. The reassurance
 * line repeats terms already stated on the tour pages — it adds no new promise.
 */
export function BookingBand() {
  const img = getImage("taj-mahal-mist-1");
  return (
    <div className="container-site">
      <div className="relative isolate overflow-hidden rounded-[2rem] bg-ink px-6 py-12 text-white shadow-lift sm:px-12 sm:py-16">
        <Image src={img.src} alt="" fill sizes="(min-width: 1280px) 1200px, 100vw" className="-z-20 object-cover opacity-45" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/85 to-ink/30" />
        <p className="text-label font-semibold uppercase text-highlight">Your dates, our town</p>
        <h2 className="mt-4 max-w-[20ch] font-display text-4xl font-normal leading-tight sm:text-5xl">Tell us when you land. We&apos;ll draw the rest.</h2>
        <p className="mt-4 max-w-xl text-white/80">A real person in Agra replies on WhatsApp, usually in about 15 minutes. Free cancellation up to 48 hours before most tours; the balance is paid on arrival.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <WhatsAppLink message={defaultWhatsappMessage} event="whatsapp_click_band" className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-fg transition hover:-translate-y-px hover:bg-accent-hover">
            <MessageCircle className="size-4" aria-hidden /> Ask on WhatsApp
          </WhatsAppLink>
          <Link href="/plan-my-trip" className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
            Plan my trip <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </div>
    </div>
  );
}
