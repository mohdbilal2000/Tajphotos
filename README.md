# TajPhotos — Golden Triangle & Taj Mahal Tours

A production Next.js 16 (App Router, React 19, TypeScript, Tailwind CSS v4) marketing and lead-generation
site for an Agra-based tour operator: Golden Triangle (Delhi–Agra–Jaipur) packages, same-day Taj Mahal
trips from Delhi, Taj Mahal photography experiences, and Rajasthan/Udaipur extensions.

Built for organic search **and** AI answer engines (Google AI Overviews, ChatGPT, Perplexity, Gemini,
Claude, Bing Copilot) as the primary lead source, on top of dedicated research into 2026 GEO/AEO
practice, Core Web Vitals, and the competitive/UX landscape for this niche. That research (keyword map,
competitor teardown, verified destination facts, imagery sourcing) informed every decision below but
isn't part of this repository — ask for the reports if you want them again.

## ⚠️ Before you launch — placeholder content that must be replaced

This ships as a fully working, realistic-looking site so it's easy to review and deploy — which means
some of what's convincing about it is invented and **must not go live unedited**:

- **The team on `/about` is entirely fictional** (`src/content/team.ts`). "Imran Khan," "Rahul Sharma"
  and "Priya Verma," their years of experience, and their credentials — including a specific
  Ministry of Tourism guide licence claim — are placeholder people, not real staff. Replace with your
  actual team, their real names, and only credentials they actually hold. Attaching a real licence
  number to a fictional person is a false claim, not a stylistic placeholder.
- **The "Registered and recognised" checkmarks are unconfirmed** (`site.credentials` in
  `src/config/site.ts`, rendered on `/about` and in the footer of every page). Verify each one before
  launch (Ministry of Tourism recognition, GST registration, etc.) and delete any that don't apply to
  you — a licensing claim on a live public site is a specific, checkable claim, not marketing copy.
- **`site.stats`** (travellers hosted, years operating, countries) are placeholder numbers marked
  `// TODO` in `src/config/site.ts` — replace with your real figures. The star rating specifically
  (`site.stats.rating`) is already safe by default: it's gated behind `ratingVerified: false` and won't
  render anywhere (StatStrip, the homepage hero, the Open Graph image, or AggregateRating schema) until
  you set it to `true` with a real number from Google/TripAdvisor — don't flip that flag until it is one.
- **Contact details** (WhatsApp number, phone, email, office address, social profiles) are placeholders
  — replace every `NEXT_PUBLIC_*` contact env var and the `site.address`/`site.social` fields.
- **`src/content/reviews.ts` is an empty array on purpose.** Don't fill it with invented testimonials —
  see the "Reviews" section below for how to collect and add real ones.

## Stack

- **Next.js 16.3** App Router, Turbopack, TypeScript, `typedRoutes`
- **Tailwind CSS v4** (`@theme` tokens — see `src/app/globals.css` for the full "Marble & Marigold" palette)
- **Fraunces** (display) + **Manrope** (body/UI), via `next/font/google`
- Content as typed TypeScript data (`src/content/`) — no CMS, no database; fast, type-checked, git-diffable
- `next/image` with static imports (AVIF/WebP, automatic blur placeholders)
- Server Actions + `useActionState` for the enquiry form, emailed via [Resend](https://resend.com) (free tier)
- `@vercel/analytics` + `@vercel/speed-insights` + optional GA4/Clarity, gated behind a real consent banner
- Structured data (JSON-LD): `TravelAgency`/`LocalBusiness`, `TouristTrip`+`Offer`, `Article`, `FAQPage`,
  `BreadcrumbList`, `WebSite`+`SearchAction` — see `src/lib/seo.ts`

## Getting started

```bash
pnpm install
cp .env.example .env.local   # fill in what you have; everything degrades gracefully if unset
pnpm dev
```

Open http://localhost:3000.

### Adding or editing content

Tours, destinations and guides are plain TypeScript objects, not a CMS:

- `src/content/tours/<slug>.ts` — export default a `Tour` (see `src/content/types.ts` for the full shape)
- `src/content/destinations/<slug>.ts` — a `Destination`
- `src/content/guides/<slug>.ts` — a `Guide`

After adding, removing or renaming a file, regenerate the barrel index:

```bash
pnpm content:index
```

Prices are entered once in USD (`priceFrom.usd`, `priceTiers[].usd`) — the `<Price>` component and
`useCurrency()` hook convert to the visitor's chosen currency (USD/INR/EUR/GBP) using the static rates
in `src/config/site.ts` (`fxRates`; update quarterly, or wire to a live FX API later).

Shared facts that repeat across many pages (Taj Mahal ticket prices, hours, the Friday closure, Gatimaan
Express timings, e-Visa fees) live in `src/content/facts.ts` — reference them instead of retyping numbers,
both for consistency and because AI answer engines specifically reward internally-consistent facts.

### Adding imagery

We ship with license-safe placeholder photography (Unsplash/Pexels/Wikimedia Commons — see `/credits`)
until the client has their own photos. To add more:

1. Add entries to an `imagery.json` array (`id`, `tag`, `subject`, `source_page`, `download_url`, `author`,
   `license`, `license_url`, `orientation`, `use_for`).
2. `pnpm images:fetch imagery.json` — downloads, resizes (sharp), and regenerates `src/content/images.ts`
   with static imports (so `next/image` gets width/height/blurDataURL automatically).
3. Reference the `id` from any content file's `heroImage`/`gallery` fields.

To replace placeholder photography with the client's real photos, drop new files into
`src/assets/images/<id>.jpg` (same filename as an existing `id`) and re-run `pnpm images:fetch`, or add
new ids and repoint content.

### The enquiry form / lead pipeline

`src/app/plan-my-trip/actions.ts` validates with Zod (including a honeypot field) and calls
`src/lib/mail.ts`, which emails the team via Resend and auto-replies to the traveller. Without
`RESEND_API_KEY` set, submissions still "succeed" from the visitor's point of view but are only logged —
set the env var before launch. WhatsApp (`wa.me` deep links with a prefilled message) is the primary CTA
throughout the site; the form is the fallback for visitors who prefer it.

### SEO / AEO plumbing already wired

- `app/sitemap.ts`, `app/robots.ts` (explicit allow-list for AI crawlers, block for training-only bots),
  `app/manifest.ts`, `app/opengraph-image.tsx` (dynamic, via `next/og`)
- `app/llms.txt` and `app/llms-full.txt` route handlers — low-priority per 2026 research (no major AI
  vendor reads it reliably yet) but zero-cost to keep
- `app/api/indexnow/route.ts` — pings Bing/Yandex/Naver on demand; run `node scripts/write-indexnow-key.mjs`
  once you've picked an `INDEXNOW_KEY`, then `curl -X POST https://yourdomain.com/api/indexnow` after each
  content deploy (Google doesn't use IndexNow — rely on the sitemap + Search Console for it)
- `app/feed.xml` — RSS of guides

### Design system

Full research-backed spec (palettes with computed WCAG contrast, type pairings, spacing/motion tokens,
component inventory, page wireframes, copy patterns) is in the research reports under
`competitors-ux.md`. The implemented tokens live in `src/app/globals.css`.

## Quality checks

```bash
pnpm typecheck
pnpm lint
pnpm build
pnpm start -p 3000 &         # in another terminal, or backgrounded
pnpm lighthouse http://localhost:3000/ http://localhost:3000/tours/<a-real-slug>
```

## Content roadmap

This launch ships a curated set of the highest-priority (P0) pages. The full keyword research
identified ~80 pages worth building over time (more Golden Triangle day-count variants, a dedicated
`/photography` hub, city-to-city `/transfers` pages, and ~35 more guide articles) — see the keyword
research report for the prioritized list. The content model here (`src/content/types.ts`) already
supports all of it; it's additive, not a rebuild.

## Deploying

Built for Vercel (image optimization, ISR, edge network and ✅ adapter all work out of the box). Set the
environment variables from `.env.example` in the Vercel project, then connect the repository — no other
configuration needed.
