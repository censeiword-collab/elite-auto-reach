// Utility functions for the active exhaust SEO section

import { getBrandBySlug } from "./activeExhaustBrands";
import { getModelByAnySlug, getModelBySlug, getModelsByBrand } from "./activeExhaustModels";

/**
 * Resolves a slug to either a brand page or a model page.
 * Returns { type: "brand", brandSlug } or { type: "model", brandSlug, modelSlug }.
 */
export function resolveExhaustSlug(slug: string): 
  | { type: "brand"; brandSlug: string }
  | { type: "model"; brandSlug: string; modelSlug: string }
  | null {
  // Check if it's a brand slug
  const brand = getBrandBySlug(slug);
  if (brand) return { type: "brand", brandSlug: slug };

  // Check if it's a model slug (search across all brands)
  const model = getModelByAnySlug(slug);
  if (model) return { type: "model", brandSlug: model.brandSlug, modelSlug: model.slug };

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
