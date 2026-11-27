# Build pack — six sites, six repos

You create the repos; each prompt below is written to be pasted into a fresh Claude Code session
with that empty repo open. Every prompt is self-contained: it names the domain, the product, the
audience, the non-negotiables and the definition of done.

**All six start from this repo as a template.** `mohdbilal2000/Tajphotos` already contains the
Next.js 16 stack, the quote funnel, the SEO/AEO plumbing (JSON-LD, llms.txt, IndexNow, sitemap),
the design system and 30 licensed images. Starting from scratch six times would throw that away.

---

## The portfolio at a glance

| # | Repo | Domain(s) | Sells | Buyer | Why it's a separate business |
|---|---|---|---|---|---|
| 1 | `taj-photos` | tajphotos.com | Guided trips, car, transfers, hotels | First-time India travellers, US/AU/UK/DE | One accountable local contact instead of five bookings |
| 2 | `taj-photoshoots` | tajmahalphotoshoots.com | Portrait shoots — **client is photographed** | Couples, proposals, families | Inverse product to #3; different photographers, different deliverable |
| 3 | `taj-photo-tours` | tajphototours.com + .in | Photo tours — **client holds the camera** | Enthusiast/pro photographers | Craft buyer; answers gear, light and permit questions, not scenery |
| 4 | `taj-photographs` | tajmahalphotographs.com + .in | Prints, image licences, free reference | Editors, publishers, researchers | Only informational-first property; earns the citations |
| 5 | `taj-day-trips` | tajphotos.in | Shared small-group departures | Backpackers, solo travellers | Differs by **operations**: fixed departure, per-seat, hostel pickup |
| 6 | `taj-mahal-tours` | officialtajmahaltours.com | Guide-only tours, no photography | Travellers who just want a great guide | Optional — only build if #1 proves guide demand it can't absorb |

Danish's `tajmahalphotography.com` is untouched and not in this pack.

---

## What to do, per site — five points each

| # | Site | The five things that actually matter |
|---|---|---|
| 1 | **taj-photos** | 1. Own the "Golden Triangle / Delhi–Agra" head terms — this is the volume site. 2. Sell the *bundle*: guide + car + tickets + hotel, and make "one contact, no gaps" the whole pitch. 3. Build the hotel-rate offer properly (affiliate vs contracted net rates is a legal decision — pick one). 4. Publish the trip-planning guides (itineraries, costs, transport) here and nowhere else. 5. This is the only site that should hold the Google Business Profile. |
| 2 | **taj-photoshoots** | 1. Lead every page with the sunrise-slot scarcity — the date drives the sale. 2. Split by occasion (couple / proposal / family / maternity), not by package tier. 3. Proposals are the highest-margin, lowest-competition wedge — give them a dedicated page. 4. Show a full real gallery per occasion; this audience buys on portfolio alone. 5. Turnaround time is a conversion lever: "some shots before you fly home" beats a discount. |
| 3 | **taj-photo-tours** | 1. Answer craft questions first — tripods, drones, ASI permits, moonlight nights, month-by-month light. 2. Position against shooting alone, not against other tours. 3. Target German, US and Australian photography communities specifically (forums, Flickr groups, YouTube). 4. Publish EXIF-honest sample work; this audience detects stock instantly. 5. Sell multi-day workshops as the margin product, day walks as the entry point. |
| 4 | **taj-photographs** | 1. Go deep on free reference — photo spots, camera rules, ticket timings, light tables. This is the AEO engine. 2. Structure every guide answer-first so AI engines can quote it. 3. Licensing needs a real usage-scoping form (medium, territory, run length, duration). 4. Sell archival prints as the passive-income tail. 5. Link OUT to the sibling brands for commissions — this site refers, it doesn't sell shoots. |
| 5 | **taj-day-trips** | 1. WhatsApp-first, form-second — this audience books for tomorrow, not next November. 2. Build hostel partnerships in Paharganj/Majnu-ka-Tilla; that's the real distribution channel. 3. "Solo travellers welcome" is the single highest-converting line on the site. 4. Same-day availability must be answerable in minutes or the lead is gone. 5. **This is the one brand where hiding prices genuinely costs you** — see the warning below. |
| 6 | **taj-mahal-tours** | 1. Only build this if #1 shows guide-only demand it can't serve. 2. If built: guide-led, zero photography, explicitly refers photo requests out. 3. Lean on licensed-guide credentials as the entire differentiator. 4. Multi-language guides (French, Spanish, German) are the real wedge here. 5. Otherwise 301 the domain to #1 and stop paying attention to it. |

---

## Non-negotiables — put these in every prompt

These are the things that, if broken, damage all six sites at once:

1. **No published rates anywhere** — not on pages, not in JSON-LD `Offer`, not in `tours.json`,
   not in `llms.txt`. Schema carrying a price the page doesn't show is a violation, and it is a
   number an AI answer engine will quote to your customer as binding. Government figures
   (monument tickets, e-visa fees) are facts and stay.
2. **Disclose the parent.** Every site declares `parentOrganization: Techleaf` in JSON-LD and
   links its siblings in the footer. A declared brand portfolio is a normal structure; a
   concealed network is what gets penalised.
3. **Distinct photographs, people and reviews per site.** This is the one thing no code can fix
   and the fastest way to be classified as a duplicate network.
4. **One Google Business Profile, for site #1 only.** All six share one address and one legal
   entity. Multiple GBPs at one address in one category gets all of them suspended.
5. **Each site publishes only what it sells.** Unsold sections must 404 and stay out of the
   sitemap and llms feeds — not merely be unlinked. Unlinked pages are still indexed.

---

## The backpacker pricing warning

Every other brand benefits from quote-only: the work genuinely varies and a list price would be
wrong. Site #5 is different. Backpackers filter on price before they click, and they are
comparing you against Hostelworld and GetYourGuide listings that show a number. A "request a
quote" button loses that comparison before it starts.

Recommendation: publish a `from` price on site #5 only. The codebase already supports it —
`showPrices: true` in the brand config restores every price surface. This is the one place the
portfolio-wide rule costs more than it protects.

---

## The prompts

Each block below is meant to be pasted whole into a fresh Claude Code session.

---

### Prompt 1 — `taj-photos` (flagship: trips, transport, hotels)

```
Build the website for tajphotos.com.

START FROM: github.com/mohdbilal2000/Tajphotos. Clone it as the template. It is a Next.js 16 +
React 19 multi-brand codebase. Keep ONLY the `tajphotos` brand: delete the other brand configs in
src/config/brands/, simplify src/config/brand.ts to a single brand, and remove the
NEXT_PUBLIC_BRAND switching. Read AGENTS.md first — this Next.js version renamed middleware.ts to
proxy.ts and has other breaking changes from training data.

THE BUSINESS: private Taj Mahal and Golden Triangle trips run by Agra locals. We arrange the
licensed guide, the private car, the monument tickets and the hotels — one contact instead of
five bookings. Photography is an add-on a guide arranges on request, never the headline.

AUDIENCE: first-time India travellers from the US, Australia, UK and Germany, planning 2-8 weeks
ahead, who are anxious about being scammed and about prepaying a business in another country.

BUILD:
1. Keep and extend the existing tours, destinations and guides content.
2. Write 8-10 new trip-planning guides: Golden Triangle itineraries by length, Delhi vs Agra
   basing, hotel selection, tipping, safe payment, what a private car actually includes.
3. Build a proper hotel section — we offer negotiated rates at a small selected list, not a
   booking engine. Make the selection criteria explicit and honest.
4. Add a "How we're different from a marketplace" page addressing prepayment fear directly.
5. Per-market trust: German visitors check for an Impressum; US/AU visitors look for
   cancellation terms and a real phone number. Make all three easy to find.

NON-NEGOTIABLES:
- No published prices anywhere: not on pages, not in JSON-LD Offer/priceSpecification, not in
  tours.json, not in llms.txt. Government fees (monument tickets, e-visa) are facts and stay.
- Every quote request goes to the brand inbox via Resend AND offers a WhatsApp handoff prefilled
  with everything the visitor typed.
- JSON-LD declares parentOrganization: Techleaf (techleaf.us). Footer links the sibling brands.
- Contact details come from env vars and default to EMPTY. If no WhatsApp number is configured,
  hide every WhatsApp CTA rather than rendering a dead button.
- src/config/site.ts contains placeholder business stats (12,000+ travellers, 4.9 from 1,150
  reviews) and unverified credential claims. Do not emit AggregateRating JSON-LD while
  ratingVerified is false. Flag every placeholder in a PRE-LAUNCH.md rather than inventing values.

DONE WHEN: pnpm typecheck, pnpm lint, pnpm content:lint and pnpm build all pass; the sitemap and
llms.txt contain no prices; and DEPLOY.md documents the Vercel project and GoDaddy DNS setup.
```

---

### Prompt 2 — `taj-photoshoots` (client is photographed)

```
Build the website for tajmahalphotoshoots.com.

START FROM: github.com/mohdbilal2000/Tajphotos. Clone as template, keep ONLY the `tajphotoshoots`
brand, delete the other brand configs and the NEXT_PUBLIC_BRAND switching. Read AGENTS.md first —
this Next.js version has breaking changes from training data (middleware.ts is now proxy.ts).

THE BUSINESS: portrait photoshoots at the Taj Mahal and around Agra. The client is IN FRONT OF
the camera — couples, proposals, pre-wedding, families, solo portraits, maternity. This is the
inverse of tajphototours.com, where the client holds the camera. Refer those requests across
rather than upselling them.

AUDIENCE: couples and families on a once-in-a-lifetime trip who want the pictures to be genuinely
good, not a stranger's phone snap.

DELETE: tours, destinations and transport entirely. Someone here wants pictures of themselves;
every extra service on the page is a reason to leave. Keep guides only where they serve a shoot
(what to wear, camera rules, best months, sunrise timing).

BUILD:
1. One landing page per occasion — couple, proposal, pre-wedding, family, solo, maternity. Not
   package tiers. People search "Taj Mahal proposal photographer", not "2-hour package".
2. Make the proposal page the best page on the site. Highest margin, lowest competition, and it
   needs its own trust story: shot from a distance, nobody knows, we step in after she says yes.
3. A real gallery per occasion. This audience buys on portfolio alone — nothing else moves them.
4. Lead every page with sunrise-slot scarcity. The date drives the entire sale.
5. Make turnaround a selling point: "some edited shots before you fly home" outperforms a
   discount with this audience.
6. Palette is warm blush/rosewood with Cormorant Garamond headings — romantic and unmistakably
   not the flagship. Do not reuse the flagship's palette or hero image.

NON-NEGOTIABLES:
- No published prices. Shoots vary too much to list, and no price may appear in JSON-LD, in any
  JSON feed, or in llms.txt.
- Quote form asks: occasion, locations, number of people, date (required), deliverables. Nothing
  more — every extra field costs completions.
- JSON-LD is ProfessionalService/LocalBusiness (NOT TourOperator), with
  parentOrganization: Techleaf.
- Original photographs only. Do not reuse images that appear on the sibling sites — shared
  imagery across domains is a duplicate-network signal that different copy does not offset.

DONE WHEN: typecheck, lint, content:lint and build pass; no tours or destinations routes resolve;
no price appears in any page or feed.
```

---

### Prompt 3 — `taj-photo-tours` (client holds the camera)

```
Build the website for tajphototours.com (tajphototours.in 301s to it).

START FROM: github.com/mohdbilal2000/Tajphotos. Clone as template, keep ONLY the `tajphototours`
brand. Read AGENTS.md first — breaking Next.js changes, middleware.ts is now proxy.ts.

THE BUSINESS: guided photography tours and workshops where the TRAVELLER shoots. Sunrise photo
walks, golden-hour workshops, multi-day shooting itineraries. Led by working photographers. The
deliberate inverse of tajmahalphotoshoots.com — refer portrait requests across, never upsell.

AUDIENCE: enthusiast and professional photographers from the US, Germany, Australia and the UK,
choosing between this and shooting Agra alone.

BUILD:
1. Answer craft questions before selling anything: tripods and drones are banned inside the
   complex, no photography inside the mausoleum chamber, commercial shoots need ASI permission
   filed 15+ days ahead, moonlight viewing runs five nights a month. Being straight about limits
   is the trust signal for this audience.
2. A month-by-month light guide — where the light lands, when winter fog kills the morning, what
   each season actually gives you.
3. A location guide: Mehtab Bagh, the river bank, rooftops, Agra Fort — and the hour each works.
4. Position against shooting alone, not against other tour operators.
5. Sell multi-day workshops as the margin product and sunrise walks as the entry point.
6. Show real sample work with honest EXIF. This audience spots stock instantly and will leave.
7. Palette is cool slate with amber accents, Archivo headings, square corners — a neutral ground
   so the photographs on the page carry all the colour.

NON-NEGOTIABLES:
- No published prices anywhere, including JSON-LD, tours.json and llms.txt.
- Quote form asks what gear they shoot (phone through professional — it changes pace and
  locations, nothing else), what they want to shoot, dates, group size, and any permit/gear
  needs. Treat "phone" respectfully; composition beats sensor and saying so converts.
- JSON-LD declares parentOrganization: Techleaf. Footer links siblings.
- Original photographs only, not shared with the other brands.

DONE WHEN: typecheck, lint, content:lint and build pass; tajphototours.in 301s to the .com; no
price in any page or feed.
```

---

### Prompt 4 — `taj-photographs` (prints, licensing, reference)

```
Build the website for tajmahalphotographs.com (tajmahalphotographs.in 301s to it).

START FROM: github.com/mohdbilal2000/Tajphotos. Clone as template, keep ONLY the `tajphotographs`
brand. Read AGENTS.md first — breaking Next.js changes, middleware.ts is now proxy.ts.

THE BUSINESS: an image library and reference desk. Fine-art prints and editorial/commercial
image licences, wrapped in the deepest free photographic reference in the portfolio. This is the
authority property — it refers commissions OUT to the sibling brands rather than selling shoots.

AUDIENCE: editors, publishers, designers and researchers, plus travellers working out how and
where to photograph the Taj Mahal before they arrive.

WHY IT MATTERS: this is the only informational-first site in the group. Editorial depth is what
earns citations from AI answer engines, and a genuinely useful free reference is the clearest
evidence that this group of sites is a real publisher rather than a set of landing pages.

DELETE: tours, destinations, transport. Keep and massively expand the guides.

BUILD:
1. A browsable gallery with per-image detail pages — subject, location, month, conditions.
2. A licensing request flow that scopes usage properly: medium, territory, run length, duration.
   Licence price depends entirely on these, which is exactly why nothing is listed.
3. Print ordering: sizes, archival paper stock, worldwide shipping.
4. The reference library, written answer-first so AI engines can quote it directly: photo spots,
   camera and drone rules, ASI permit process, ticket timings and prices by nationality,
   month-by-month light and weather, moonlight viewing dates.
5. ImageObject JSON-LD per image with real creator, licence and acquireLicensePage fields.
6. Palette is parchment/forest/brass with Spectral headings — an archival paper ground that
   flatters printed work.

NON-NEGOTIABLES:
- No published prices. Print price depends on size and finish; licence price on usage. Say that
  plainly rather than hiding behind "contact us".
- JSON-LD is ProfessionalService/Organization with parentOrganization: Techleaf.
- Never claim rights to images you don't hold. Check src/content/credits and keep attribution
  accurate — a licensing business that mislabels provenance is finished.
- Original photographs only.

DONE WHEN: typecheck, lint, content:lint and build pass; every image has valid ImageObject
JSON-LD; no price in any page or feed.
```

---

### Prompt 5 — `taj-day-trips` (backpackers, shared departures)

```
Build the website for tajphotos.in.

START FROM: github.com/mohdbilal2000/Tajphotos. Clone as template, keep ONLY the `tajbackpackers`
brand. Read AGENTS.md first — breaking Next.js changes, middleware.ts is now proxy.ts.

THE BUSINESS: shared small-group day trips to the Taj Mahal. A minibus leaves Delhi before 03:00,
picks up from hostels, caps at twelve people, and is back the same night. This differs from the
flagship by OPERATIONS, not price: a fixed departure eleven strangers board is a different
business from a private car booked for one couple.

AUDIENCE: backpackers and solo travellers, 20-35, hostel-based, usually already in India, very
often booking for tomorrow rather than next November.

BUILD:
1. WhatsApp-first, form-second. Same-day bookings must be answerable in minutes or the lead is
   gone. Make the WhatsApp CTA the loudest element on every page.
2. "Solo travellers welcome" belongs above the fold — it is the highest-converting line for this
   audience, and most people on these departures are travelling alone.
3. A hostel-pickup page listing the Paharganj and Majnu-ka-Tilla hostels you collect from.
   Hostel partnerships are the real distribution channel; the site should support that.
4. Be honest about the 02:00-03:00 departure and say why it is worth it — the first 40 minutes
   after the gates open is the entire product.
5. Compare shared vs private honestly, including the point where private becomes cheaper (around
   four people). Telling backpackers when NOT to buy the cheap option is what earns the sale.
6. Palette is warm cream/burnt orange/deep blue with Outfit headings — loud and young. This sits
   next to hostel noticeboards, not concierge desks.

PRICING — THIS SITE IS THE EXCEPTION: every other site in the portfolio is quote-only. This
audience filters on price before clicking and is comparing you against Hostelworld and
GetYourGuide listings that show a number. Set `showPrices: true` in the brand config and publish
an honest "from" price per seat. Discuss with the owner before shipping either way.

NON-NEGOTIABLES:
- No Thursday-night departure — the Taj Mahal is closed to tourists on Fridays. Say so plainly
  rather than letting someone book a wasted day.
- JSON-LD declares parentOrganization: Techleaf. Footer links siblings.
- Original photographs only.

DONE WHEN: typecheck, lint, content:lint and build pass; the WhatsApp path works end to end with
a prefilled message; Friday closure is handled in both copy and the quote flow.
```

---

### Prompt 6 — `taj-mahal-tours` (guide-only) — build LAST, or not at all

```
Build the website for officialtajmahaltours.com.

READ THIS FIRST: do not build this site until tajphotos.com has been live for 60+ days and has
shown guide-only demand it cannot absorb. If it hasn't, 301 this domain to tajphotos.com instead
and stop. A sixth near-identical site in this niche is a cost, not a free option — the portfolio
already carries concentration risk, and this is the weakest differentiation of the six.

IF THE DEMAND IS REAL:

START FROM: github.com/mohdbilal2000/Tajphotos. Clone as template, create a new brand config
`tajmahaltours` following the existing pattern. Read AGENTS.md first.

THE BUSINESS: licensed guide-only tours of the Taj Mahal and Agra. No photography, no transport
packages — the guide, their expertise, and nothing else. Photography requests are referred to the
sibling brands, not upsold.

AUDIENCE: independent travellers who have their own transport or are already in Agra, and who
want a genuinely excellent guide rather than a package.

BUILD:
1. Lead entirely on guide credentials — Ministry of Tourism licensing, years working, specialisms.
2. Named guide profiles with real bios and real photographs. The guide IS the product here.
3. Multi-language guiding is the real wedge: French, Spanish, German and Italian guides are
   scarce in Agra and command a premium. Build a page per language.
4. Sell depth, not coverage: Mughal architecture, pietra dura technique, the history most tours
   skip in twenty minutes.
5. Explicitly refer photography out to the sibling sites. Staying narrow is what keeps this site
   defensible next to tajphotos.com.

NON-NEGOTIABLES:
- Every licensing claim must be verifiable. Do not state "licensed guides" unless each named
  guide holds a current licence you can produce.
- No published prices. JSON-LD declares parentOrganization: Techleaf.
- Genuinely distinct content from tajphotos.com. If you find yourself rewriting the flagship's
  pages, that is the signal this site should not exist — stop and 301 the domain.

DONE WHEN: typecheck, lint, content:lint and build pass; every guide profile is a real person;
no content overlaps tajphotos.com.
```

---

## Redirects to set up regardless

| From | To | Why |
|---|---|---|
| tajphototours.in | tajphototours.com | Defensive ccTLD, no separate content |
| tajmahalphotographs.in | tajmahalphotographs.com | Defensive ccTLD, no separate content |
| officialtajmahaltours.com | tajphotos.com | Until and unless site #6 is justified |

## Two account-level blockers

1. **Vercel is on the Hobby plan**, which is restricted to non-commercial use. Six sites taking
   paid bookings is commercial. Enforcement hits the whole account, not one project. Upgrade to
   Pro before pointing any real domain at these.
2. **The account already hosts ~10 Taj/Agra travel sites** (tajagraguide, indiventure-travellers,
   tajguidessf x2, agratourguide, voyageurs-en-inde, ma-travels, travellano, and more) alongside
   the live taj-mahal-photography. Six more makes ~16 in one niche under one owner. Audit that
   estate and 301 the dead ones into the six live brands — it removes the concentration risk and
   passes their link equity forward instead of stranding it.
