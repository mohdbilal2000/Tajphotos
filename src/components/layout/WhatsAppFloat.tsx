import { MessageCircle } from "lucide-react";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { defaultWhatsappMessage } from "@/config/site";

/**
 * Floating WhatsApp button: bottom-right, thumb-reachable. Tour pages render their own
 * StickyMobileBar below `lg`, which already carries a WhatsApp CTA — this button hides itself
 * below `lg` whenever that bar is present (see the `body:has(#sticky-mobile-bar)` rule in
 * globals.css) rather than stacking two competing WhatsApp entry points, one of which (at the
 * `sm` breakpoint's bottom-6 position) would otherwise sit directly on top of that bar between
 * 640-1024px viewport widths.
 */
export function WhatsAppFloat() {
  return (
    <WhatsAppLink
      message={defaultWhatsappMessage}
      event="whatsapp_click_float"
      aria-label="Chat with us on WhatsApp"
      className="whatsapp-float fixed bottom-[calc(env(safe-area-inset-bottom)+4.75rem)] right-4 z-40 flex size-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-lift transition-transform hover:scale-105 active:scale-95 sm:bottom-6 sm:right-6"
    >
      <MessageCircle className="size-7" aria-hidden />
      <span className="absolute -right-0.5 -top-0.5 size-3 rounded-full bg-accent ring-2 ring-bg" aria-hidden />
    </WhatsAppLink>
  );
}
