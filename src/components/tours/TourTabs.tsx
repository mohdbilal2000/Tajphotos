"use client";
import { useState, useTransition, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { renderTourCategory } from "@/components/tours/tourTabActions";

/**
 * Category tabs over server-rendered card grids. Only the first tab's grid is in the prerendered
 * page (passed in as `initial`); every other tab is rendered on the server the first time it is
 * chosen, via a server function, and kept afterwards. Prerendering every category repeated most
 * cards twice and roughly tripled the homepage's HTML and hydration work. Each tour stays
 * crawlable from /tours, the sitemap and the cards in the first tab.
 */
export function TourTabs({ tabs, initial }: { tabs: { key: string; label: string; count: number }[]; initial: ReactNode }) {
  const first = tabs[0]?.key;
  const [active, setActive] = useState(first);
  const [panels, setPanels] = useState<Record<string, ReactNode>>(() => (first ? { [first]: initial } : {}));
  const [pending, startTransition] = useTransition();

  const choose = (key: string) => {
    setActive(key);
    if (key in panels) return;
    startTransition(async () => {
      const node = await renderTourCategory(key);
      setPanels((prev) => ({ ...prev, [key]: node }));
    });
  };

  return (
    <div>
      <div role="tablist" aria-label="Tour categories" className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 scrollbar-none sm:mx-0 sm:flex-wrap sm:px-0">
        {tabs.map((t) => (
          <button
            key={t.key}
            role="tab"
            id={`tab-${t.key}`}
            aria-selected={active === t.key}
            aria-controls={`panel-${t.key}`}
            onClick={() => choose(t.key)}
            className={cn(
              "shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
              active === t.key ? "border-primary bg-primary text-primary-fg" : "border-border bg-surface text-ink hover:border-ink/40",
            )}
          >
            {t.label} <span className={cn("ml-1 text-xs", active === t.key ? "text-primary-fg/70" : "text-muted")}>{t.count}</span>
          </button>
        ))}
      </div>
      {tabs.map((t) => (
        <div
          key={t.key}
          role="tabpanel"
          id={`panel-${t.key}`}
          aria-labelledby={`tab-${t.key}`}
          aria-busy={active === t.key && pending && !(t.key in panels)}
          hidden={active !== t.key}
          className={cn("mt-8", !(t.key in panels) && "min-h-[28rem]")}
        >
          {panels[t.key] ?? null}
        </div>
      ))}
    </div>
  );
}
