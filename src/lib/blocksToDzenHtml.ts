import { sanitizeHtml } from "@/lib/sanitizeHtml";
import type { PortfolioBlock } from "@/lib/portfolioBlocks";

function esc(s: string): string {
  return (s || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function figure(src: string, caption?: string): string {
  if (!src) return "";
  const cap = caption ? `<figcaption>${esc(caption)}</figcaption>` : "";
  return `<figure><img src="${esc(src)}" />${cap}</figure>`;
}

/**
 * Builds Dzen-safe HTML using ONLY allowed tags.
 * Also sanitizes any paragraph HTML.
 */
export function blocksToDzenHtml(blocks: PortfolioBlock[], opts?: { coverImageUrl?: string; title?: string }): string {
  const safeBlocks = Array.isArray(blocks) ? blocks : [];

  let out: string[] = [];

  // Ensure a title in <h1> exists (Dzen tip: title tag may be ignored in post conversion)
  const hasH1 = safeBlocks.some((b) => b.type === "heading" && b.level === 1 && (b.text || "").trim().length > 0);
  if (!hasH1 && opts?.title) {
    out.push(`<h1>${esc(opts.title)}</h1>`);
  }

  // Ensure cover is first figure, if provided (and not already first)
  if (opts?.coverImageUrl) {
    out.push(figure(opts.coverImageUrl));
  }

  for (const b of safeBlocks) {
    switch (b.type) {
      case "heading": {
        const lvl = b.level ?? 2;
        const text = (b.text || "").trim();
        if (!text) break;
        out.push(`<h${lvl}>${esc(text)}</h${lvl}>`);
        break;
      }
      case "paragraph": {
        const html = sanitizeHtml(b.html || "");
        if (!html.trim()) break;
        // sanitizer already limits tags; paragraph content can contain <p>, <b>, <a>, lists, etc.
        out.push(html);
        break;
      }
      case "list": {
        const items = Array.isArray(b.items) ? b.items.filter(Boolean) : [];
        if (items.length === 0) break;
        const tag = b.ordered ? "ol" : "ul";
        out.push(`<${tag}>${items.map((i) => `<li>${esc(i)}</li>`).join("")}</${tag}>`);
        break;
      }
      case "quote": {
        const t = (b.text || "").trim();
        if (!t) break;
        out.push(`<blockquote>${esc(t)}</blockquote>`);
        break;
      }
      case "image": {
        out.push(figure(b.src, b.caption));
        break;
      }
      case "gallery": {
        const imgs = Array.isArray(b.images) ? b.images : [];
        for (const img of imgs) out.push(figure(img.src, img.caption));
        break;
      }
      default:
        break;
    }
  }

  // Final sanitize defensive
  return sanitizeHtml(out.join("\n"));
}
