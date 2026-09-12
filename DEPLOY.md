# Deploying the portfolio

Four public websites are built from this one repository. Each is its own Vercel project on the
same repo and branch, distinguished only by the `NEXT_PUBLIC_BRAND` build-time variable.

| Vercel project | `NEXT_PUBLIC_BRAND` | Primary domain | Also attach (301s to primary) | Sells |
|---|---|---|---|---|
| taj-photos | `tajphotos` | `tajphotos.com` | `tajphotos.in` | Guided trips, cars, transfers, hotels |
| taj-photoshoots | `tajphotoshoots` | `tajmahalphotoshoots.com` | — | Portrait shoots (client is photographed) |
| taj-photo-tours | `tajphototours` | `tajphototours.com` | `tajphototours.in` | Photo tours (client holds the camera) |
| taj-photographs | `tajphotographs` | `tajmahalphotographs.com` | `tajmahalphotographs.in` | Prints, licences, photographic reference |
| taj-day-trips | `tajbackpackers` | `tajphotos.in` (see note) | — | Shared small-group day trips (backpackers) |

> **The backpacker brand's domain is a compromise, not a design.** `tajphotos.in` was being held
> as a defensive redirect, and a `.in` ccTLD genuinely suits the one audience that is usually
> already in India when it searches. But "Taj Photos" is the flagship's name, and reusing it for
> a budget shared-tour product will confuse both customers and the entity graph. Buying a
> dedicated name is a one-line change in `src/config/brands/tajbackpackers.ts` plus a domain
> attach in Vercel.

Two domains are deliberately **not** in this repo:

- `tajmahalphotography.com` — Danish's, already live. Untouched.
- `officialtajmahaltours.com` — out of scope for now. Park it or leave it unpointed; do not
  serve a copy of any brand on it.

## 1. Create each Vercel project

Import this repository five times. For each project:

- **Build command / framework**: defaults (Next.js) are correct.
- **Production branch**: the same branch for all four.
- **Environment variables**: set `NEXT_PUBLIC_BRAND` for Production, Preview and Development.
  An unset value falls back to `tajphotos` with a build warning; an unknown value fails the
  build on purpose, because a typo would otherwise publish flagship copy, schema and canonical
  URLs under another brand's domain.

## 2. Environment variables

Per project. Only `NEXT_PUBLIC_BRAND` is strictly required for a build to be correct; the rest
turn features on.

| Variable | Required | Notes |
|---|---|---|
| `NEXT_PUBLIC_BRAND` | **Yes** | One of `tajphotos`, `tajphotoshoots`, `tajphototours`, `tajphotographs`, `tajbackpackers`. |
| `RESEND_API_KEY` | **Before launch** | Without it, the quote form **fails loudly in production** rather than silently dropping a lead. Get it from resend.com. |
| `RESEND_FROM_EMAIL` | Recommended | e.g. `Taj Photo Tours <quotes@tajphototours.com>`. The sending domain must be verified in Resend. Defaults to `quotes@<brand domain>`. |
| `NEXT_PUBLIC_EMAIL` | Recommended | The brand inbox quote requests go to. Defaults to `hello@<brand domain>`. |
| `QUOTE_NOTIFY_EMAILS` | Optional | Comma-separated extra recipients — your own address, a shared inbox, a CRM drop-box. |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Recommended | E.164 **without** `+`, e.g. `919876543210`. Every WhatsApp CTA is hidden site-wide while this is unset — a button that opens an empty chat is worse than no button. |
| `NEXT_PUBLIC_PHONE_E164` / `NEXT_PUBLIC_PHONE_DISPLAY` | Optional | Both must be set for the phone link to render. |
| `NEXT_PUBLIC_SITE_URL` | No | Overrides the canonical origin. Leave unset in production — it defaults to the brand's own domain. Useful only for a staging host. |
| `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_CLARITY_ID` | Optional | Analytics. Consent Mode v2 defaults to denied until the visitor chooses. |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`, `NEXT_PUBLIC_BING_SITE_VERIFICATION` | Optional | Search Console / Bing Webmaster verification. |
| `INDEXNOW_KEY` | Optional | Powers `/api/indexnow`. |

The same WhatsApp number can be used across all five brands — it reaches you either way, and the
quote email records which brand the request came from.

## 3. Domains and DNS (GoDaddy → Vercel)

For each project, add the primary domain **and** its `.in` counterpart to the *same* project. The
`.in` redirect is implemented in `next.config.ts` as a host-conditional 301, so both hostnames
must resolve to the same deployment for it to fire. (Configuring the `.in` as a Vercel-level
redirect instead is equally fine — the outcome is identical.)

In GoDaddy DNS for each domain:

```
A      @      76.76.21.21
CNAME  www    cname.vercel-dns.com
```

Vercel shows the exact values when you add the domain — use those if they differ. Set the `.com`
as the project's primary domain so Vercel redirects `www` to the apex automatically.

Propagation is usually minutes, occasionally up to 48 hours. Vercel issues TLS certificates
automatically once DNS resolves.

## 4. Before you announce any of these sites

These are the things that are wrong in the repo right now and need real values. Most live in
`src/config/site.ts` (search for `TODO`).

1. **Business address and phone.** `site.address` and `site.geo` are placeholders. They feed
   LocalBusiness schema, so they must match your Google Business Profile exactly.
2. **Stats and rating.** `site.stats` contains invented numbers (`12,000+` travellers, 4.9 from
   1,150 reviews). `ratingVerified` is `false`, which correctly suppresses the AggregateRating
   schema — do not flip it to `true` until the figure comes from a real, independently checkable
   profile. Marking up your own numbers is a Google policy violation, not just a stretch.
3. **Credentials.** `site.credentials` claims licensed guides, registered operator status and GST
   registration. Delete any that are not true today.
4. **Social profiles.** `brand.social` is empty per brand. These become `sameAs` entity signals,
   so fill in the ones that exist and leave the rest empty rather than pointing at a placeholder.
5. **Photography.** Every brand currently draws from the same 30 shared images. Distinct imagery
   per brand is the single highest-value remaining task — see the warning below.

## 5. Two account-level problems to fix before launch

### Vercel is on the Hobby plan

Both teams (`techishealthy`, `bilals-projects`) are on **Hobby**, which Vercel's terms restrict to
non-commercial use. Five sites taking paid bookings is unambiguously commercial. The risk is not a
polite email — it is enforcement against the account, which would take every site down at once,
including ones unrelated to this project. Move to Pro before pointing any real domain at these.

### There are already ~10 Taj/Agra travel sites in this account

Listed on Vercel today: `tajagraguide`, `indiventure-travellers`, `tajguidessf` (x2),
`agratourguide`, `voyageurs-en-inde`, `ma-travels`, `travellano`, `madshif-travel-creator`,
`travel-trove-experience` — plus `taj-mahal-photography`, which is live and earning.

Adding five more makes **fifteen sites in one niche under one owner**. That is a materially
different risk from the five this repo was designed around, and it is the thing most likely to
undo all of this work. Before launching, go through that list and for each one either (a) keep it
because it sells something genuinely distinct and is actively maintained, or (b) 301 it into the
brand that covers it and shut it down. Consolidating dead sites into live ones also passes their
link equity forward instead of stranding it.

Be specific about what "distinct" means: a different service, a different audience, and different
photographs, people and reviews. A French-language site (`voyageurs-en-inde`) is a legitimately
distinct property. Three variations on "Agra tour guide" are not.

## 6. The one thing that will sink every site if you get it wrong

These sites share a codebase, an owner and a subject. That is fine and normal. What is not
fine is four sites that are *the same site four times* — Google's site-reputation and doorway
policies are built for exactly that pattern, and the failure mode is not one site ranking badly,
it is all of them being demoted together, plus the association reaching `tajmahalphotography.com` —
the one that is already earning.

The code already enforces the structural half of the separation:

- Each brand publishes only the sections it sells; the rest **404** and are absent from the
  sitemap and both llms feeds (`src/lib/sections.ts`).
- Guides carry an explicit brand audience, so articles are not duplicated across domains.
- Each brand has its own homepage copy, hero image, showcase panel, palette, typography, schema
  types and quote questions.
- Every site links openly to its siblings and declares `Techleaf` as its `parentOrganization`. A
  declared brand portfolio is a normal business structure; a concealed one is what gets caught.

What the code **cannot** do for you:

- **Distinct photographs per brand.** Shared hero and gallery images across several domains is a
  duplicate signal no amount of different copy offsets. This matters more than any other item
  on this list.
- **Distinct people.** Each brand needs its own named photographers or guides with real bios.
- **Distinct reviews.** Never copy the same testimonial onto more than one domain.
- **Google Business Profiles.** All four brands share one legal entity and one address. Do not
  attempt four GBPs at that address in the same category — multiple profiles at one address is
  the most reliable way to get all of them suspended. Verify one profile, for the flagship,
  unless you genuinely have separate staffed premises.

## 7. Local development

```bash
pnpm install
NEXT_PUBLIC_BRAND=tajphototours pnpm dev      # any of the five brand keys
```

Checks, all of which must pass before a deploy:

```bash
pnpm typecheck
pnpm lint
pnpm content:lint                              # content model + image manifest
for B in tajphotos tajphotoshoots tajphototours tajphotographs tajbackpackers; do
  NEXT_PUBLIC_BRAND=$B pnpm build || echo "FAILED: $B"
done
```

Building all five matters: a change that only breaks the brands you were not looking at is the
most likely failure mode in this repo, because four of them are never exercised by a default
`pnpm build`.

## 8. Adding a brand later

Add a file under `src/config/brands/`, register it in `src/config/brand.ts`, add a font pairing
in `src/config/fonts.ts`, and create a Vercel project with the new `NEXT_PUBLIC_BRAND`. Nothing
else in the application needs to change.

Before you do: a fifth near-identical site is a cost, not a free option. Add one only when it
sells something the existing ones genuinely do not.
