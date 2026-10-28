import { useEffect } from "react";

export const SITE_URL = "https://brados.pl";

const setTag = (selector: string, attr: string, value: string, create: () => HTMLElement) => {
  let el = document.head.querySelector<HTMLElement>(selector);
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
};

const meta = (key: "name" | "property", id: string, content: string) =>
  setTag(`meta[${key}="${id}"]`, "content", content, () => {
    const m = document.createElement("meta");
    m.setAttribute(key, id);
    return m;
  });

export function usePageMeta({
  title,
  description,
  path,
  noindex = false,
  breadcrumb,
}: {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
  breadcrumb?: string;
}) {
  useEffect(() => {
    const url = SITE_URL + path;
    document.title = title;
    meta("name", "description", description);
    meta("property", "og:title", title);
    meta("property", "og:description", description);
    meta("property", "og:url", url);
    meta("name", "twitter:title", title);
    meta("name", "twitter:description", description);
    meta("name", "twitter:url", url);
    meta("name", "robots", noindex ? "noindex" : "index, follow");
    meta("name", "googlebot", noindex ? "noindex" : "index, follow");
    setTag('link[rel="canonical"]', "href", url, () => {
      const l = document.createElement("link");
      l.rel = "canonical";
      return l;
    });
    document.getElementById("ns-breadcrumb")?.remove();
    if (breadcrumb) {
      const el = document.createElement("script");
      el.type = "application/ld+json";
      el.id = "ns-breadcrumb";
      el.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Brados", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: breadcrumb, item: url },
        ],
      });
      document.head.appendChild(el);
    }
  }, [title, description, path, noindex, breadcrumb]);
}
