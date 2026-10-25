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
}: {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
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
  }, [title, description, path, noindex]);
}
