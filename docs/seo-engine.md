# TajPhotos SEO engine

This is our own version of a Distribb-style SEO subscription, built into this repo. It runs on
GitHub Actions and the Claude API. You pay only for the API usage, roughly USD 1–3 per article at
current Claude Opus 5.5 rates, so about USD 30–90 for 30 articles a month. Distribb charges
₹9,499 a month.

| Distribb feature | Ours | Where |
|---|---|---|
| Auto keyword research | Google autocomplete expansion (India, US, UK) across 40 topic seeds and 6 question prefixes. Drops anything an existing guide already answers and scores the rest by intent. Search Console queries are used too once available. | `scripts/seo-engine/discover.mjs` → `data/seo/keywords.json` |
| 30 SEO articles a month | 7 drafts every Monday. Each one: web research on official sources (ASI, IRCTC, Rajasthan Tourism…) → a draft in the site's own guide format → automatic checks → a pull request. | `scripts/seo-engine/write.mjs`, `.github/workflows/seo-engine.yml` |
| CMS integration | The site's content *is* the CMS: typed files in `src/content/guides/`. Merging the pull request publishes the guide. Sitemap, RSS, llms.txt, schema and internal links update on their own. | — |
| Content calendar / scheduling | The weekly schedule plus the PR queue. Merge one draft a day for a steady publishing rhythm. | GitHub → Pull requests |
| Quality gate | Every draft is checked in code: internal links resolve, image ids exist, title and summary lengths, no invented ratings/reviews/years, no filler phrases, one CTA to a real tour, minimum length. A draft that fails twice is dropped. | `validate()` in `write.mjs` |
| AI images | **Deliberately not included.** A photography brand showing AI-made Taj photos loses trust, and Google and travellers can tell. Use your own photographers' shots. | — |
| High-DR backlinks / link outreach | **No bought links.** Google penalises link schemes, and a new domain is the easiest to burn. Use the legitimate list in `docs/launch/link-building.md` instead. | — |

## One-time setup (you)
1. Create an API key at **console.anthropic.com**, add billing, and set a monthly spend limit (for example USD 100).
2. On GitHub, open the repo, then Settings → Secrets and variables → Actions → **New repository secret**: `ANTHROPIC_API_KEY`.
3. In Settings → Actions → General, under Workflow permissions, tick "Allow GitHub Actions to create and approve pull requests".
4. To try it now, go to Actions → **SEO engine** → **Run workflow** (count: 2).

## Every week (you, about 20 minutes)
Open the "SEO engine: new guide drafts" pull request and read each guide. Check prices, timings
and anything about your own service. Edit or delete files you don't want, then merge.

## Running it locally
```bash
pnpm exec tsx scripts/seo-engine/discover.mjs          # refresh the keyword queue
pnpm exec tsx scripts/seo-engine/write.mjs --count 2   # draft 2 guides (needs ANTHROPIC_API_KEY)
node scripts/gen-content-index.mjs && pnpm run content:lint && pnpm run build
```

`data/seo/keywords.json` is the queue. Each keyword's status is one of: queued, drafted, rejected
(with the reason), error, or exists. Add your own keywords by hand with `"status": "queued"`.
