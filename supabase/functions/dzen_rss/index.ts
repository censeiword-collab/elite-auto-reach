import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SITE = "https://sunmax-kzn.ru";
const FEED_TITLE = "SUNMAXKZN — Портфолио";
const FEED_URL = `${SITE}/feed/dzen.xml`;

const ALLOWED = new Set([
  "p","a","b","i","u","s","h1","h2","h3","h4",
  "blockquote","ul","ol","li","figure","img","figcaption",
  "video","source","br",
]);

const ALLOWED_ATTRS: Record<string, Set<string>> = {
  a: new Set(["href", "title"]),
  img: new Set(["src","alt","width","height"]),
  source: new Set(["src","type"]),
  video: new Set(["controls","autoplay","muted","loop","poster"]),
  h2: new Set(["id"]),
  h3: new Set(["id"]),
  h4: new Set(["id"]),
};

function sanitizeHtml(html: string): string {
  if (!html) return "";

  let out = html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<iframe[\s\S]*?<\/iframe>/gi, "");

  out = out.replace(/\s+on\w+\s*=\s*"[^"]*"/gi, "");
  out = out.replace(/\s+on\w+\s*=\s*'[^']*'/gi, "");

  out = out.replace(/<\/?([a-z][a-z0-9]*)\b[^>]*\/?>/gi, (match, tag) => {
    const t = tag.toLowerCase();
    if (!ALLOWED.has(t)) return "";
    if (match.startsWith("</")) return match;

    const allowedSet = ALLOWED_ATTRS[t];
    if (!allowedSet) {
      return match.replace(/\s+[a-z][a-z0-9-]*\s*=\s*("[^"]*"|'[^']*')/gi, "");
    }

    return match.replace(
      /\s+([a-z][a-z0-9-]*)\s*=\s*("[^"]*"|'[^']*')/gi,
      (attrMatch, name) => (allowedSet.has(name.toLowerCase()) ? attrMatch : ""),
    );
  });

  // Strip UTM from href
  out = out.replace(/href="([^"]*)"/gi, (_, url: string) => {
    try {
      const u = new URL(url);
      [...u.searchParams.keys()].forEach((k) => {
        if (k.startsWith("utm_")) u.searchParams.delete(k);
      });
      return `href="${u.toString()}"`;
    } catch {
      return `href="${url}"`;
    }
  });

  return out.trim();
}

function escapeXml(s: string): string {
  return (s || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function mimeFromUrl(url: string): string | null {
  const lower = (url || "").toLowerCase();
  if (lower.endsWith(".png")) return "image/png";
  if (lower.endsWith(".gif")) return "image/gif";
  if (lower.endsWith(".jpg") || lower.endsWith(".jpeg")) return "image/jpeg";
  return null; // reject webp etc
}

// RFC822 with +0300
function toRfc822MSK(iso: string): string {
  const d = new Date(iso);
  // convert to MSK (+3)
  const ms = d.getTime() + 3 * 60 * 60 * 1000;
  const x = new Date(ms);

  const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const dd = String(x.getUTCDate()).padStart(2, "0");
  const hh = String(x.getUTCHours()).padStart(2, "0");
  const mm = String(x.getUTCMinutes()).padStart(2, "0");
  const ss = String(x.getUTCSeconds()).padStart(2, "0");
  const dayName = days[x.getUTCDay()];
  const monName = months[x.getUTCMonth()];
  const yyyy = x.getUTCFullYear();

  return `${dayName}, ${dd} ${monName} ${yyyy} ${hh}:${mm}:${ss} +0300`;
}

function stripTags(html: string): string {
  return (html || "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function buildCategory(post: any): string {
  return [post.dzen_category, post.dzen_format, post.dzen_index, post.dzen_comments]
    .filter(Boolean)
    .join(";");
}

function figure(src: string, caption?: string): string {
  if (!src) return "";
  const cap = caption ? `<figcaption>${escapeXml(caption)}</figcaption>` : "";
  return `<figure><img src="${escapeXml(src)}" />${cap}</figure>`;
}

function blocksToDzenHtmlServer(blocks: any[], opts?: { coverImageUrl?: string; title?: string }): string {
  const safe = Array.isArray(blocks) ? blocks : [];
  let out: string[] = [];

  const hasH1 = safe.some((b: any) => b?.type === "heading" && b?.level === 1 && String(b?.text || "").trim().length > 0);
  if (!hasH1 && opts?.title) out.push(`<h1>${escapeXml(opts.title)}</h1>`);

  if (opts?.coverImageUrl) out.push(figure(opts.coverImageUrl));

  for (const b of safe) {
    if (!b || typeof b !== "object") continue;
    switch (b.type) {
      case "heading": {
        const lvl = Math.min(4, Math.max(1, Number(b.level || 2)));
        const text = String(b.text || "").trim();
        if (!text) break;
        out.push(`<h${lvl}>${escapeXml(text)}</h${lvl}>`);
        break;
      }
      case "paragraph": {
        out.push(sanitizeHtml(String(b.html || "")));
        break;
      }
      case "list": {
        const ordered = !!b.ordered;
        const items = Array.isArray(b.items) ? b.items.map((x: any) => String(x || "").trim()).filter(Boolean) : [];
        if (items.length === 0) break;
        const tag = ordered ? "ol" : "ul";
        out.push(`<${tag}>${items.map((i: string) => `<li>${escapeXml(i)}</li>`).join("")}</${tag}>`);
        break;
      }
      case "quote": {
        const t = String(b.text || "").trim();
        if (!t) break;
        out.push(`<blockquote>${escapeXml(t)}</blockquote>`);
        break;
      }
      case "image": {
        out.push(figure(String(b.src || ""), String(b.caption || "") || undefined));
        break;
      }
      case "gallery": {
        const imgs = Array.isArray(b.images) ? b.images : [];
        for (const img of imgs) {
          out.push(figure(String(img?.src || ""), String(img?.caption || "") || undefined));
        }
        break;
      }
      default:
        break;
    }
  }

  return sanitizeHtml(out.join("\n"));
}

function buildContentEncoded(post: any): string {
  const title = String(post.title || "");
  const cover = post.cover_image_url ? String(post.cover_image_url) : undefined;

  let body = "";
  if (Array.isArray(post.content_blocks) && post.content_blocks.length > 0) {
    body = blocksToDzenHtmlServer(post.content_blocks, { coverImageUrl: cover, title });
  } else {
    body = sanitizeHtml(post.content_html || "");
    if (cover) body = `${figure(cover)}\n` + body;
  }

  return body;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString();

    const { data: posts, error } = await supabase
      .from("portfolio_posts")
      .select("*")
      .eq("is_active", true)
      .gte("published_at", threeDaysAgo)
      .order("published_at", { ascending: false })
      .limit(500);

    if (error) {
      return new Response(`Database error: ${error.message}`, {
        status: 500,
        headers: { "Content-Type": "text/plain; charset=utf-8", ...corsHeaders },
      });
    }

    const eligible = (posts || []).filter((p: any) => {
      if (!p.cover_image_url) return false;
      const mime = mimeFromUrl(p.cover_image_url);
      if (!mime) return false;
      const content = buildContentEncoded(p);
      const textLen = stripTags(content).length;
      return textLen >= 300;
    });

    const items = eligible.map((p: any) => {
      const link = `${SITE}/portfolio/${encodeURIComponent(p.slug)}`;
      const category = buildCategory(p);
      const content = buildContentEncoded(p);
      const mime = mimeFromUrl(p.cover_image_url)!;

      return `    <item>
      <title>${escapeXml(p.title)}</title>
      <link>${escapeXml(link)}</link>
      <guid isPermaLink="false">${escapeXml(p.guid)}</guid>
      <pubDate>${toRfc822MSK(p.published_at)}</pubDate>
      ${category ? `<category>${escapeXml(category)}</category>` : ""}
      <enclosure url="${escapeXml(p.cover_image_url)}" type="${mime}" length="0" />
      ${p.author ? `<dc:creator>${escapeXml(p.author)}</dc:creator>` : ""}
      <content:encoded><![CDATA[${content}]]></content:encoded>
    </item>`;
    });

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:media="http://search.yahoo.com/mrss/"
  xmlns:dc="http://purl.org/dc/elements/1.1/"
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:georss="http://www.georss.org/georss">
  <channel>
    <title>${escapeXml(FEED_TITLE)}</title>
    <link>${SITE}</link>
    <description>Портфолио работ SUNMAXKZN — детейлинг, оклейка, тюнинг в Казани</description>
    <language>ru</language>
    <atom:link href="${escapeXml(FEED_URL)}" rel="self" type="application/rss+xml" />
${items.join("\n")}
  </channel>
</rss>`;

    return new Response(xml, {
      status: 200,
      headers: {
        "Content-Type": "application/rss+xml; charset=utf-8",
        "Cache-Control": "public, max-age=300",
        ...corsHeaders,
      },
    });
  } catch (e) {
    return new Response(`Internal error: ${(e as Error).message}`, {
      status: 500,
      headers: { "Content-Type": "text/plain; charset=utf-8", ...corsHeaders },
    });
  }
});
