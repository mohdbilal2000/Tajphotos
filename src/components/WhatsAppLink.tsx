"use client";
import type { ComponentProps } from "react";
import { whatsappLink } from "@/config/site";
import { trackEvent } from "@/lib/analytics";

/** Anchor to wa.me with prefilled message + conversion tracking. */
export function WhatsAppLink({ message, event = "whatsapp_click", children, ...props }: { message?: string; event?: string } & Omit<ComponentProps<"a">, "href">) {
  return (
    <a href={whatsappLink(message)} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent(event, { message: message?.slice(0, 80) ?? "" })} {...props}>
      {children}
    </a>
  );
}
