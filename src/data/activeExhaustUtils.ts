// Utility functions for the active exhaust SEO section

import { getBrandBySlug, EXHAUST_BRANDS } from "./activeExhaustBrands";
import { getModelByAnySlug, getModelBySlug, getModelsByBrand } from "./activeExhaustModels";
import { EXHAUST_AREAS } from "./activeExhaustAreaPages";

/**
 * Resolves a slug to either a brand page, model page, or area page.
 * Handles simple slugs ("bmw", "x5"), compound slugs ("bmw-x5"), and area slugs ("kazan-sovetskiy").
 */
export function resolveExhaustSlug(slug: string): 
  | { type: "brand"; brandSlug: string }
  | { type: "model"; brandSlug: string; modelSlug: string }
  | { type: "area"; areaSlug: string }
  | null {
  // 1. Check if it's a kazan-area slug (e.g. "kazan-sovetskiy")
  if (slug.startsWith("kazan-")) {
    const areaSlug = slug.slice("kazan-".length);
    const area = EXHAUST_AREAS.find((a) => a.slug === areaSlug);
    if (area) return { type: "area", areaSlug };
  }

  // 2. Direct brand match
  const brand = getBrandBySlug(slug);
  if (brand) return { type: "brand", brandSlug: slug };

  // 3. Direct model match
  const model = getModelByAnySlug(slug);
  if (model) return { type: "model", brandSlug: model.brandSlug, modelSlug: model.slug };

  // 4. Try compound slug: "brand-model" (e.g. "bmw-x5" → brand "bmw" + model "x5")
  for (const b of EXHAUST_BRANDS) {
    if (slug.startsWith(b.slug + "-")) {
      const modelPart = slug.slice(b.slug.length + 1);
      const m = getModelBySlug(modelPart, b.slug);
      if (m) return { type: "model", brandSlug: b.slug, modelSlug: m.slug };
    }
  }

  return null;
}

/**
 * Base path for all active exhaust pages.
 */
export const EXHAUST_BASE = "/aktivnyy-vykhlop";

/**
 * Build canonical URL for an exhaust page.
 */
export function exhaustUrl(path?: string): string {
  if (!path) return EXHAUST_BASE;
  return `${EXHAUST_BASE}/${path}`;
}

/**
 * Breadcrumb items for exhaust pages.
 */
export function exhaustBreadcrumbs(items: Array<{ label: string; path?: string }>) {
  const base = [{ label: "Главная", path: "/" }, { label: "Активный выхлоп", path: EXHAUST_BASE }];
  return [...base, ...items];
}

/**
 * Pricing format helper.
 */
export function formatPrice(price: number): string {
  return `от ${price.toLocaleString("ru-RU")} ₽`;
}
