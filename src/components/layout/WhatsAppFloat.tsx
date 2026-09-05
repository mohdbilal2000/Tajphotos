import { MessageCircle } from "lucide-react";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { defaultWhatsappMessage } from "@/config/site";

/**
 * Floating WhatsApp button: bottom-right, thumb-reachable. `bottom` is owned entirely by the
 * `.whatsapp-float` rules in globals.css, not Tailwind utilities here — it has to react to two
 * things no static class can express: the cookie consent banner's real (measured, not guessed)
 * height on every page, and — below `lg` on tour pages — hiding itself entirely in favor of
 * StickyMobileBar's own WhatsApp CTA. See the comment in globals.css for the full rationale.
 */
export function WhatsAppFloat() {
  return (
    <WhatsAppLink
      message={defaultWhatsappMessage}
      event="whatsapp_click_float"
      aria-label="Chat with us on WhatsApp"
      className="whatsapp-float fixed right-4 z-40 flex size-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-lift transition-transform hover:scale-105 active:scale-95 sm:right-6"
    >
      <MessageCircle className="size-7" aria-hidden />
      <span className="absolute -right-0.5 -top-0.5 size-3 rounded-full bg-accent ring-2 ring-bg" aria-hidden />
    </WhatsAppLink>
  );
}
