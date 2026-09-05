import { site, whatsappLink } from "@/config/site";

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
  const destination = site.social.tripadvisor || site.social.googleBusiness || whatsappLink(`Hi ${site.name}! I had a great trip and would love to leave you a review — where should I post it?`);
  return Response.redirect(destination, 302);
}
