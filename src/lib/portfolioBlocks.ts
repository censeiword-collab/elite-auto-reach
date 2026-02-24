export type PortfolioBlock =
  | { type: "heading"; level: 1 | 2 | 3 | 4; text: string }
  | { type: "paragraph"; html: string }
  | { type: "list"; ordered: boolean; items: string[] }
  | { type: "quote"; text: string }
  | { type: "image"; src: string; caption?: string }
  | { type: "gallery"; images: { src: string; caption?: string }[] };

export function isPortfolioBlocks(value: unknown): value is PortfolioBlock[] {
  if (!Array.isArray(value)) return false;
  return value.every((b) => b && typeof b === "object" && "type" in b);
}

export function slugifyRuEn(input: string): string {
  return (input || "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9а-я\-]/g, "")
    .replace(/\-+/g, "-")
    .replace(/^\-+|\-+$/g, "");
}

export function stripHtmlToText(html: string): string {
  return (html || "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}
