# TajPhotos growth playbook

Compiled 23 Oct 2026 from search results, marketplace listings and this repository. Competitor figures
come from search snippets and listings, not from their live sites, so re-check them before quoting.

## What shipped in code (this branch)

| Area | Change |
|---|---|
| Entities | `src/content/entities.ts` maps every city and monument to its Wikipedia/Wikidata page. Destinations, attractions, tours, guides and `Organization.knowsAbout` emit `sameAs` from it. |
| Tour offers | `TouristTrip` now carries an `AggregateOffer` (low to high price) with one `Offer` per group-size tier, each a per-person `UnitPriceSpecification` with `eligibleQuantity`. Cancellation, start time and group size are `additionalProperty`. |
| Attractions | Taj Mahal (Friday), Red Fort, Lotus Temple and Akshardham (Monday) carry their weekly closure as `OpeningHoursSpecification`. |
| Guides | `Article` gains `articleSection` and entity-linked `about`. Open Graph gains article authors and section. |
| Hubs | `/tours`, `/guides`, `/destinations` emit `CollectionPage` plus `ItemList`. `/contact` emits `ContactPage`. `/faq` and `/` emit `WebPage` plus `FAQPage` in one graph. |
| Crawlers | `robots.ts` names Applebot-Extended, Meta-ExternalAgent/Fetcher, Google-CloudVertexBot and MistralAI-User. `next.config.ts` serves them blocking HTML. |
| Conversion | Tour cards always show the free-cancellation window and the group size the price is based on. The mobile booking bar shows the cancellation window. |
| Content | New guide: best Taj Mahal photo spots with timings. Destination pages had empty dates, now fixed, and the content linter rejects non-ISO dates. |

FAQ rich results stopped showing in Google Search on 7 May 2026. The `FAQPage` markup stays because it
is valid schema.org that AI engines still parse, and it costs nothing.

## Owner actions only you can do (ordered by revenue impact)

1. **Replace placeholder trust content.** Team, founder letter, credentials, stats and address are listed in the README. Nothing below works while these are fictional.
2. **Claim Google Business Profile** at the real Agra address. Set the primary category to "Tour operator". Then add its URL to `site.social.googleBusiness` so it lands in `sameAs`.
3. **Collect real reviews.** Send every past guest the `/review` link. Add them verbatim to `src/content/reviews.ts`. Flip `ratingVerified` only with a real Google or TripAdvisor figure.
4. **List the top five tours on marketplaces.** Use Viator/GetYourGuide, TourRadar, Magpie and GoWithGuide. Competitors earn both bookings and review counts there.
5. **Connect Google "Things to do" operator booking** through a connectivity partner such as your booking software. This puts your own price beside OTA prices on your Business Profile.
6. **Verify Search Console and Bing Webmaster Tools.** Set the two `NEXT_PUBLIC_*_SITE_VERIFICATION` env vars. Watch the new AI performance reports in both.
7. **Set `INDEXNOW_KEY`** and ping `/api/indexnow` after each deploy.
8. **Fill `site.social`** with real Instagram, YouTube, TripAdvisor, Pinterest and LinkedIn profiles. Every real profile strengthens the entity.

## Next code work (not started)

- Inline deposit checkout with Razorpay or PayPal on tour pages, keeping WhatsApp as the parallel path.
- A photography hub page with sample galleries and couple, proposal and anniversary variants.
- New tours: luxury same-day car with 5-star lunch, sunrise plus sunset in one day, Delhi–Agra–Varanasi 4 days.
- Spanish and French pages for the top five tours, with real `hreflang`.
- Guides: Gatimaan versus car cost comparison, car-size tiers for families.

## Measuring AI visibility

- Run a monthly prompt audit in ChatGPT, Perplexity, Gemini, Copilot and Google AI Mode. Use questions like "best same-day Taj Mahal tour from Delhi" and record whether TajPhotos is cited.
- Track AI referrals in analytics by referrer: chatgpt.com, perplexity.ai, gemini.google.com, copilot.microsoft.com.
- Use the Search Console and Bing AI performance reports once verified.
