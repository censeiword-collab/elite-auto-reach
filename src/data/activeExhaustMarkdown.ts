// Markdown content loader via import.meta.glob (eager, raw)

const mdModules = import.meta.glob("../content/active-exhaust/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

/**
 * Get markdown content by filename (without path and extension).
 * E.g. getMarkdown("hub") → content of hub.md
 */
export function getMarkdown(name: string): string | undefined {
  const key = `../content/active-exhaust/${name}.md`;
  return mdModules[key];
}

/**
 * Get all available markdown file names.
 */
export function getMarkdownKeys(): string[] {
  return Object.keys(mdModules).map((k) =>
    k.replace("../content/active-exhaust/", "").replace(".md", "")
  );
}
