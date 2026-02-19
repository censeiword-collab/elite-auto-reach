import { useEffect, useRef } from "react";

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string[];
  canonicalUrl?: string;
  ogImage?: string;
  jsonLd?: object | object[];
}

const COUNTER_ID = 106818205;

const SEOHead = ({ title, description, keywords, canonicalUrl, ogImage, jsonLd }: SEOHeadProps) => {
  const lastHitUrlRef = useRef<string | null>(null);

  useEffect(() => {
    document.title = title;

    const updateMeta = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? "property" : "name";
      let meta = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute(attr, name);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    updateMeta("description", description);
    if (keywords?.length) updateMeta("keywords", keywords.join(", "));

    updateMeta("og:title", title, true);
    updateMeta("og:description", description, true);
    updateMeta("og:type", "website", true);
    if (ogImage) updateMeta("og:image", ogImage, true);

    updateMeta("twitter:title", title);
    updateMeta("twitter:description", description);

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (canonicalUrl) {
      if (!canonical) {
        canonical = document.createElement("link");
        canonical.rel = "canonical";
        document.head.appendChild(canonical);
      }
      canonical.href = canonicalUrl;
    }

    // JSON-LD
    const ldScripts: HTMLScriptElement[] = [];
    if (jsonLd) {
      const items = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
      items.forEach((schema, idx) => {
        const s = document.createElement("script");
        s.type = "application/ld+json";
        s.setAttribute("data-seo-ld", String(idx));
        s.textContent = JSON.stringify(schema);
        document.head.appendChild(s);
        ldScripts.push(s);
      });
    }

    const t = window.setTimeout(() => {
      const w = window as any;
      if (typeof w.ym !== "function") return;
      const url = canonicalUrl || window.location.href;
      if (lastHitUrlRef.current === url) return;
      const referer = lastHitUrlRef.current || document.referrer;
      w.ym(COUNTER_ID, "hit", url, { title: document.title, referer });
      lastHitUrlRef.current = url;
    }, 0);

    return () => {
      window.clearTimeout(t);
      ldScripts.forEach((s) => s.remove());
    };
  }, [title, description, keywords, canonicalUrl, ogImage, jsonLd]);

  return null;
};

export default SEOHead;
