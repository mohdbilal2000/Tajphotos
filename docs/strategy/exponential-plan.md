# TajPhotos: the exponential plan

One page, brutally honest, updated 27 Nov 2026. "Do now" = running or buildable this week with what
we have. "Needs you" = blocked on accounts, documents or money. "Don't" = things that feel like
growth and actually burn the domain.

## 0. The one strategic decision: ONE site, not four

tajphotos.com, tajphotoshoots.com, tajphotos.in and tajmahalphototours.com must not become four
blogs. Four sites on the same topics from the same owner split authority four ways, compete with
each other in search, confuse Google's entity graph (we already saw this damage with the leaked
staging app), and under Google's site-reputation / scaled-content policies a thin network is a
liability, not an asset.

The move that actually uses those domains:
- **tajphotos.com** — everything lives here. All content, all tools, all authority.
- **tajphotos.in, tajphotoshoots.com, tajmahalphototours.com** — permanent 301 redirects to
  tajphotos.com (keeps type-in traffic, protects the brand, costs nothing). In Vercel: add each
  domain → Redirect to tajphotos.com (308).
- Categories get **sections** (/guides, /tools, /photoshoots…), not separate domains. If one day a
  genuinely different product exists (say a pure photography-booking SaaS), that earns its own
  domain then.

## 1. The exponential lever: stop being a brochure, become the utility

Tour sites ask for links. **Tool sites earn them.** The plan: make tajphotos.com the page every
blogger, forum answer and AI engine cites for Taj Mahal *timing* questions.

Live as of today (built this week):
- **/tools/taj-mahal-sunrise-time** — gate/sunrise/golden-hour table computed for the monument's
  coordinates. Nobody ranking today computes this; they copy approximations.
- **/tools/taj-mahal-full-moon-calendar** — every night-viewing window for 2 years, Fridays struck
  out, with the official-source hedge.

Next tools, in order of link-magnet value (each is a static page, no API costs):
1. **Friday-aware itinerary checker** — pick arrival date → which day your Taj visit must fall.
2. **Ticket price calculator** — nationality + mausoleum + night viewing → total in ₹/€/$.
3. **Photo-spot map** — every legal vantage point (Mehtab Bagh, fort window, rooftops) with
   coordinates, best hour and lens; built on our atlas component.
4. **Crowd calendar** — month × day-of-week heat map from published visitor patterns (hedged).
5. **Month pages** — /best-time/january … december, generated from one data file.

## 2. The agent fleet (what "our own agents" really means here)

| Agent | Status | What it does |
|---|---|---|
| SEO writer | **Running** (weekly, Mondays) | Finds keywords from autocomplete + GSC, researches official sources, drafts guides, validates, opens a PR. ~30 articles/month for API cost only. |
| Social content agent | **Built today** | Every new/updated guide → Instagram, Pinterest, LinkedIn, X, Facebook and YouTube-Short drafts in `data/social/`, in the weekly PR. You paste or schedule; nothing posts itself. |
| Broken-link prospector | **Built** (`scratchpad` script → promote on request) | Crawls travel pages, finds dead outbound links our guides can replace, drafts the outreach email. First 6 found, 3 emails drafted. |
| Fact refresher | To build (small) | Monthly action: re-checks ticket prices/timings on official sites, flags drift, bumps dateModified. |
| Rank/citation watcher | Needs GSC | Weekly: Search Console queries + "does ChatGPT/Perplexity cite us" probes, logged to a dashboard file. |

## 3. Social — the honest version

Posting bots that act like humans (auto-DM, auto-follow, auto-comment, scraped automation) get
accounts banned on Instagram, LinkedIn and Snapchat — that's their ToS, enforced by ML that
catches datacenter IPs instantly. We don't build those; losing @tajphotos in month one is the
opposite of exponential.

What works and scales:
- **Content agent above** makes volume free; a human (or a scheduler) posts in 10 min/day.
- **Official schedulers** — Meta Business Suite (IG+FB, free), Pinterest native scheduler,
  YouTube uploads via API (legit), Buffer free tier. The Orshot connection available to this
  workspace can design branded images AND schedule/publish to instagram, facebook, linkedin, x,
  tiktok, youtube, pinterest — through official logins you connect once. Say the word and I design
  the first post template and queue a week as drafts.
- **LinkedIn/anything manual-feel** — Claude in Chrome on your own machine as a co-pilot, you
  pressing send. Fine. Not from this server.
- **Snapchat** — no useful organic API; lowest ROI for inbound tourism. Park it.

## 4. Needs you (the multipliers code can't fake)
1. Google Business Profile + Search Console + sitemap submit (the single biggest unlock left).
2. Delete the leaked v0 app; 301 the three spare domains (5 min in Vercel each).
3. `ANTHROPIC_API_KEY` secret in GitHub → the weekly engine actually fires.
4. Real photos, team names, licence numbers, address → every trust signal we've stubbed.
5. Accounts: Instagram/Facebook/Pinterest/YouTube created under the brand (then I wire sameAs,
   feeds, and Orshot scheduling).
6. Font performance fix approval ("font fix kar do") → Lighthouse ~75 → ~90.

## 5. Don't (the 100 we deliberately leave)
Four parallel blogs · bought "high-DR" backlinks · AI-generated Taj images on a photography brand ·
engagement bots · review incentives/fakes · keyword-stuffed GBP names · doorway pages per city ·
auto-translated spam locales (proper hi/es/fr/de localisation is a *later* yes, done right).
