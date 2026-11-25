"use server";
import { tourCategories, toursByCategory } from "@/content";
import { TourCardGrid } from "@/components/tours/TourCardGrid";

/**
 * Renders one category's card grid on demand for the homepage's TourTabs. Only the first tab is in
 * the prerendered page; shipping every category up front repeated most cards twice and made up a
 * large share of the homepage's HTML and RSC payload. Unknown keys render nothing.
 */
export async function renderTourCategory(key: string) {
  const category = tourCategories.find((c) => c.key === key);
  if (!category) return null;
  return <TourCardGrid list={toursByCategory(category.key)} />;
}
