import { site, whatsappLink } from "@/config/site";
import { absoluteUrl } from "@/lib/utils";

/**
 * A stable, memorable link (tajphotos.com/review) to hand out on WhatsApp after every trip —
 * per the gap-audit's top trust-signal recommendation, this needs to exist before any review can
 * be requested. Points at TripAdvisor first (it's the highest-authority tourism-specific directory
 * and TripAdvisor reviews now feed ChatGPT/Claude/Perplexity directly), falling back through Google
 * Business, then to a WhatsApp prompt so the link is never dead even before those profiles are
 * claimed. Re-point priority to Google once that profile exists, since GBP reviews carry the most
 * local-search ranking weight.
 */
export function GET() {
  // Falls through to /contact rather than assuming a WhatsApp number exists: whatsappLink()
  // returns null on a deployment with no number configured, and a redirect to an invalid URL
  // would throw a 500 on what is meant to be the friendliest link the business hands out.
  const destination =
    site.social.tripadvisor ||
    site.social.googleBusiness ||
    whatsappLink(`Hi ${site.name}! I had a great trip and would love to leave you a review — where should I post it?`) ||
    absoluteUrl("/contact");
  return Response.redirect(destination, 302);
}
