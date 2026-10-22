"use client";
import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Category tabs over pre-rendered card grids. The grids are rendered on the server and passed in as
 * ReactNode, so the only thing that ships to the client is this toggle — no tour content, no card
 * code. Inactive panels stay in the DOM (`hidden`), which keeps every tour crawlable.
 */
export function TourTabs({ tabs }: { tabs: { key: string; label: string; count: number; content: ReactNode }[] }) {
  const [active, setActive] = useState(tabs[0]?.key);
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
            onClick={() => setActive(t.key)}
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
        <div key={t.key} role="tabpanel" id={`panel-${t.key}`} aria-labelledby={`tab-${t.key}`} hidden={active !== t.key} className="mt-8">
          {t.content}
        </div>
      ))}
    </div>
  );
}
