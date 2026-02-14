import { useEffect, useRef } from "react";

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string[];
  canonicalUrl?: string;
  ogImage?: string;
}

const COUNTER_ID = 106818205;

const SEOHead = ({ title, description, keywords, canonicalUrl, ogImage }: SEOHeadProps) => {
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

    const t = window.setTimeout(() => {
      const w = window as any;
      if (typeof w.ym !== "function") return;
      const url = canonicalUrl || window.location.href;
      if (lastHitUrlRef.current === url) return;
      const referer = lastHitUrlRef.current || document.referrer;
      w.ym(COUNTER_ID, "hit", url, { title: document.title, referer });
      lastHitUrlRef.current = url;
    }, 0);

    return () => window.clearTimeout(t);
  }, [title, description, keywords, canonicalUrl, ogImage]);

  return null;
};

export default SEOHead;
