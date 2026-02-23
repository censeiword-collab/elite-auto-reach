/**
 * Transliterate and slugify a Russian/English string.
 * Lowercase, replace spaces with hyphens, keep [a-z0-9а-яё-].
 */
export function slugifyRuEn(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9а-яё-]/g, "")
    .replace(/-{2,}/g, "-")
    .replace(/^-|-$/g, "");
}
