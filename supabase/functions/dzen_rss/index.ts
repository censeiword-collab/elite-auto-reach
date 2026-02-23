import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const SITE = "https://sunmax-kzn.ru";
const FEED_TITLE = "SUNMAXKZN — Портфолио";
const FEED_URL = `${SITE}/feed/dzen.xml`;

// ── Allowed HTML tags for content:encoded ──
const ALLOWED = new Set([
  "p","a","b","i","u","s","h1","h2","h3","h4",
  "blockquote","ul","ol","li","figure","img","figcaption",
  "video","source","br",
]);
const ALLOWED_ATTRS: Record<string, Set<string>> = {
  a: new Set(["href"]),
  img: new Set(["src","alt","width","height"]),
  source: new Set(["src","type"]),
  video: new Set(["controls","autoplay","muted","loop","poster"]),
};

// ── Simple server-side HTML sanitiser (no DOM, regex-based) ──
function sanitizeHtml(html: string): string {
  if (!html) return "";
  // Remove script / style / iframe blocks
  let out = html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<iframe[\s\S]*?<\/iframe>/gi, "");

  // Remove on* event attributes
  out = out.replace(/\s+on\w+\s*=\s*"[^"]*"/gi, "");
  out = out.replace(/\s+on\w+\s*=\s*'[^']*'/gi, "");

  // Strip disallowed tags but keep inner text
  out = out.replace(/<\/?([a-z][a-z0-9]*)\b[^>]*\/?>/gi, (match, tag) => {
    const t = tag.toLowerCase();
    if (!ALLOWED.has(t)) return "";
    // For allowed tags, strip disallowed attributes
    if (match.startsWith("</")) return match; // closing tag OK
    const allowedSet = ALLOWED_ATTRS[t];
    if (!allowedSet) {
      // tag allowed but no attrs permitted – strip all attrs
      return match.replace(/\s+[a-z][a-z0-9-]*\s*=\s*("[^"]*"|'[^']*')/gi, "");
    }
    return match.replace(
      /\s+([a-z][a-z0-9-]*)\s*=\s*("[^"]*"|'[^']*')/gi,
      (attrMatch, name) => (allowedSet.has(name.toLowerCase()) ? attrMatch : ""),
    );
  });

  // Strip UTM params from URLs
  out = out.replace(
    /href="([^"]*)"/gi,
    (_, url: string) => {
      try {
        const u = new URL(url);
        [...u.searchParams.keys()].forEach((k) => {
          if (k.startsWith("utm_")) u.searchParams.delete(k);
        });
        return `href="${u.toString()}"`;
      } catch {
        return `href="${url}"`;
      }
    },
  );

  return out.trim();
}

// ── Helpers ──
function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function toRfc822(date: string): string {
  const d = new Date(date);
  return d.toUTCString().replace("GMT", "+0000");
}

function mimeFromUrl(url: string): string {
  const lower = url.toLowerCase();
  if (lower.endsWith(".png")) return "image/png";
  if (lower.endsWith(".gif")) return "image/gif";
  return "image/jpeg";
}

function buildCategory(post: any): string {
  return [post.dzen_category, post.dzen_format, post.dzen_index, post.dzen_comments]
    .filter(Boolean)
    .join(";");
}

function buildContentEncoded(post: any): string {
  let body = sanitizeHtml(post.content_html || "");

  // Prepend cover as first figure
  if (post.cover_image_url) {
    body = `<figure><img src="${escapeXml(post.cover_image_url)}" /></figure>\n` + body;
  }

  // Append gallery images
  if (post.gallery_images && post.gallery_images.length > 0) {
    for (const url of post.gallery_images) {
      body += `\n<figure><img src="${escapeXml(url)}" /></figure>`;
    }
  }

  return body;
}

// ── Main handler ──
Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

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

    // Filter: must have cover image and ≥300 chars body
    const eligible = (posts || []).filter((p: any) => {
      if (!p.cover_image_url) return false;
      const text = (p.content_html || "").replace(/<[^>]*>/g, "");
      return text.length >= 300;
    });

    const items = eligible.map((p: any) => {
      const link = `${SITE}/portfolio/${encodeURIComponent(p.slug)}`;
      const category = buildCategory(p);
      const content = buildContentEncoded(p);
      const mime = mimeFromUrl(p.cover_image_url);

      return `    <item>
      <title>${escapeXml(p.title)}</title>
      <link>${escapeXml(link)}</link>
      <guid isPermaLink="false">${escapeXml(p.guid)}</guid>
      <pubDate>${toRfc822(p.published_at)}</pubDate>
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
