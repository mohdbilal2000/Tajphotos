"use client";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { StaticImageData } from "next/image";
import { ArrowRight, Thermometer, CloudFog, Sun, CloudRain, Snowflake, Sparkles } from "lucide-react";
import { Price } from "@/components/ui/Price";
import { cn } from "@/lib/utils";

export interface FinderTour {
  slug: string; name: string; tagline: string; usd: number; durationLabel: string;
  days: number; interests: string[]; image: StaticImageData; alt: string; udaipur: boolean;
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/**
 * Month conditions for Delhi–Agra–Jaipur, taken verbatim from the site's own destination guides
 * (agra.ts best-time table, the Delhi fog note, the Udaipur season) — the finder says nothing the
 * guides don't. "Best time to visit" answers are what make people trust an itinerary enough to book.
 */
function season(m: number) {
  if (m >= 9 || m <= 1) return { tone: "best", icon: Snowflake, label: "Best season", temp: "15–28°C, cool and dry", note: "Best conditions — and peak season, so book tickets and palace rooms ahead." };
  if (m === 2) return { tone: "good", icon: Sun, label: "Good", temp: "20–35°C, warming up", note: "Good light and thinner crowds than winter." };
  if (m >= 3 && m <= 5) return { tone: "hard", icon: Thermometer, label: "Very hot", temp: "25–45°C, hot and dry", note: "Very hot by midday — we plan monuments for early morning only." };
  return { tone: "ok", icon: CloudRain, label: "Monsoon", temp: "25–35°C, monsoon", note: "Humid with rain, lush surroundings and fewer crowds." };
}

const INTERESTS = [
  { key: "sunrise", label: "Sunrise & photography" },
  { key: "history", label: "Monuments & history" },
  { key: "palaces", label: "Palaces & lakes" },
  { key: "wildlife", label: "Tigers & wildlife" },
  { key: "night", label: "The Taj by moonlight" },
] as const;

const TIME = [
  { key: "day", label: "Just a day", test: (d: number) => d <= 1 },
  { key: "short", label: "2–4 days", test: (d: number) => d >= 2 && d <= 4 },
  { key: "long", label: "5 days or more", test: (d: number) => d >= 5 },
] as const;

export function TripFinder({ tours }: { tours: FinderTour[] }) {
  // The page is prerendered, so the server can't know "this month" for the visitor. Render October
  // (start of peak season) on the server, then switch to the visitor's actual month after mount —
  // no hydration mismatch, and the crawler-visible HTML still shows a meaningful default.
  const [month, setMonth] = useState(9);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time sync to the visitor's clock
    setMonth(new Date().getMonth());
  }, []);
  const [time, setTime] = useState<(typeof TIME)[number]["key"] | null>(null);
  const [interest, setInterest] = useState<string | null>(null);
  const s = season(month);
  const fog = month === 11 || month === 0;
  const udaipurSeason = month >= 9 || month <= 2;

  // Exact matches first; if there are fewer than three, top up with trips that fit the time
  // available but not the interest — clearly labelled as such, never passed off as a match.
  const results = useMemo(() => {
    const t = TIME.find((x) => x.key === time);
    const byTime = tours
      .filter((x) => (t ? t.test(x.days) : true))
      .sort((a, b) => Number(b.udaipur && udaipurSeason) - Number(a.udaipur && udaipurSeason));
    const exact = byTime.filter((x) => (interest ? x.interests.includes(interest) : true)).map((x) => ({ ...x, partial: false }));
    const extra = byTime.filter((x) => !exact.some((e) => e.slug === x.slug)).map((x) => ({ ...x, partial: true }));
    return [...exact, ...extra].slice(0, 3);
  }, [tours, time, interest, udaipurSeason]);

  const chip = (on: boolean) => cn("rounded-full border px-4 py-2 text-sm transition", on ? "border-primary bg-primary text-primary-fg" : "border-border bg-surface text-ink hover:border-ink/40");

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
      <div className="rounded-[1.75rem] border border-border bg-surface p-6 shadow-soft sm:p-8">
        <p className="text-label font-semibold uppercase text-muted">1 · When are you going?</p>
        <div className="mt-3 grid grid-cols-6 gap-1.5 sm:grid-cols-12 lg:grid-cols-6 xl:grid-cols-12">
          {MONTHS.map((m, i) => (
            <button key={m} type="button" onClick={() => setMonth(i)} aria-pressed={month === i} className={cn("rounded-xl py-2 text-xs font-semibold transition", month === i ? "bg-ink text-white" : "bg-bg text-ink hover:bg-surface-2")}>{m}</button>
          ))}
        </div>

        <div className={cn("mt-4 rounded-2xl p-4 text-sm", { best: "bg-success/10", good: "bg-primary/8", hard: "bg-warning/10", ok: "bg-pichola/10" }[s.tone])}>
          <p className="flex items-center gap-2 font-semibold text-ink"><s.icon className="size-4" aria-hidden /> {s.label} · {s.temp}</p>
          <p className="mt-1.5 leading-relaxed text-muted">{s.note}</p>
          {fog && <p className="mt-2 flex gap-2 leading-relaxed text-muted"><CloudFog className="mt-0.5 size-4 shrink-0" aria-hidden /> Late December and January can bring dense morning fog around Delhi — we build in a buffer before early Agra departures.</p>}
          <p className="mt-2 text-xs text-muted">The Taj Mahal is closed every Friday, whatever the month.</p>
        </div>

        <p className="mt-7 text-label font-semibold uppercase text-muted">2 · How much time do you have?</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {TIME.map((t) => <button key={t.key} type="button" onClick={() => setTime(time === t.key ? null : t.key)} aria-pressed={time === t.key} className={chip(time === t.key)}>{t.label}</button>)}
        </div>

        <p className="mt-7 text-label font-semibold uppercase text-muted">3 · What do you want most?</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {INTERESTS.map((x) => <button key={x.key} type="button" onClick={() => setInterest(interest === x.key ? null : x.key)} aria-pressed={interest === x.key} className={chip(interest === x.key)}>{x.label}</button>)}
        </div>
      </div>

      <div className="flex flex-col rounded-[1.75rem] bg-ink p-6 text-white shadow-lift sm:p-8">
        <p className="flex items-center gap-2 text-label font-semibold uppercase text-highlight"><Sparkles className="size-3.5" aria-hidden /> Our suggestion for {MONTHS[month]}</p>
        <ul className="mt-5 flex-1 space-y-3" aria-live="polite">
          {results.length === 0 && (
            <li className="rounded-2xl bg-white/5 p-5 text-sm leading-relaxed text-white/75">
              Nothing in our set tours matches all three — which usually means it’s a custom trip. Tell us what you picked and we’ll build it.
            </li>
          )}
          {results.map((t) => (
            <li key={t.slug}>
              <Link href={`/tours/${t.slug}` as "/tours"} className="group flex gap-4 rounded-2xl bg-white/5 p-3 transition hover:bg-white/10">
                <span className="relative size-20 shrink-0 overflow-hidden rounded-xl sm:size-24">
                  <Image src={t.image} alt={t.alt} fill sizes="96px" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                </span>
                <span className="min-w-0 flex-1 py-1">
                  {t.partial && <span className="mb-1 block text-[0.625rem] font-semibold uppercase tracking-[0.18em] text-white/45">Also fits your time</span>}
                  <span className="block font-display text-xl leading-tight">{t.name}</span>
                  <span className="mt-1 line-clamp-2 block text-xs leading-relaxed text-white/65">{t.tagline}</span>
                  <span className="mt-2 block text-xs text-white/80">{t.durationLabel} · from <Price usd={t.usd} className="font-semibold text-white" /></span>
                </span>
                <ArrowRight className="mt-2 size-4 shrink-0 text-white/50 transition group-hover:translate-x-1 group-hover:text-highlight" aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
        {!udaipurSeason && interest === "palaces" && (
          <p className="mt-4 text-xs leading-relaxed text-white/60">Udaipur is at its best October to March; in {MONTHS[month]} we’d usually keep Rajasthan to Jaipur and plan the lakes for winter.</p>
        )}
        <Link href="/plan-my-trip" className="mt-6 inline-flex items-center justify-between rounded-2xl border border-white/15 px-5 py-4 text-sm font-semibold transition hover:border-white/40">
          Or tell us your dates and we’ll plan it <ArrowRight className="size-4" aria-hidden />
        </Link>
      </div>
    </div>
  );
}
