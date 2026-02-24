const ALLOWED_TAGS = new Set([
  "p", "a", "b", "i", "u", "s",
  "h1", "h2", "h3", "h4",
  "blockquote", "ul", "ol", "li",
  "figure", "img", "figcaption",
  "video", "source", "br",
]);

const ALLOWED_ATTRS: Record<string, Set<string>> = {
  a: new Set(["href", "title"]),
  img: new Set(["src", "alt", "width", "height"]),
  source: new Set(["src", "type"]),
  video: new Set(["controls", "autoplay", "muted", "loop", "poster"]),
  h2: new Set(["id"]),
  h3: new Set(["id"]),
  h4: new Set(["id"]),
};

/**
 * Lightweight HTML sanitizer (browser-side).
 * Removes <script>, <style>, <iframe> and on* attributes.
 * Only allows whitelisted tags and attributes.
 */
export function sanitizeHtml(input: string): string {
  if (!input) return "";

  const doc = new DOMParser().parseFromString(input, "text/html");

  const clean = (node: Node): void => {
    const toRemove: Node[] = [];

    node.childNodes.forEach((child) => {
      if (child.nodeType === Node.ELEMENT_NODE) {
        const el = child as Element;
        const tag = el.tagName.toLowerCase();

        if (!ALLOWED_TAGS.has(tag)) {
          toRemove.push(child);
          return;
        }

        // Remove disallowed attributes
        const allowedSet = ALLOWED_ATTRS[tag];
        const attrs = Array.from(el.attributes);
        for (const attr of attrs) {
          const name = attr.name.toLowerCase();
          if (name.startsWith("on") || !(allowedSet && allowedSet.has(name))) {
            el.removeAttribute(attr.name);
          }
        }

        clean(child);
      } else if (child.nodeType !== Node.TEXT_NODE) {
        toRemove.push(child);
      }
    });

    toRemove.forEach((n) => node.removeChild(n));
  };

  clean(doc.body);
  return doc.body.innerHTML;
}
