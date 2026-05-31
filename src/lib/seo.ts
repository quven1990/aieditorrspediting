import { SITE_URL } from "@/lib/site";

/** Build absolute canonical URL (trailing slash, matches next.config trailingSlash) */
export function canonicalUrl(path = "/"): string {
  if (!path || path === "/") return `${SITE_URL}/`;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized.endsWith("/") ? normalized : `${normalized}/`}`;
}

const META_PAD =
  " Unofficial English RSP editing hub—copy AI photo prompts safely with no template file downloads.";

const TITLE_PAD = " — RSP AI Photo Prompt Guides";

/** Target 40–60 characters for meta titles */
export function metaTitle(primary: string): string {
  let text = primary.replace(/\s+/g, " ").trim();
  if (text.length >= 40 && text.length <= 60) return text;
  if (text.length < 40) {
    const combined = `${text}${TITLE_PAD}`;
    if (combined.length <= 60) return combined;
    return combined.slice(0, 60).trimEnd();
  }
  if (text.length > 60) {
    return `${text.slice(0, 57).trimEnd()}...`;
  }
  return text;
}

/** Target 140–160 characters for meta descriptions */
export function metaDescription(primary: string): string {
  let text = primary.replace(/\s+/g, " ").trim();
  if (text.length < 140) {
    text = `${text}${META_PAD}`;
  }
  if (text.length < 140) {
    text = `${text} Guides for ai editor rsp editing, portraits, and mobile creators.`;
  }
  if (text.length > 160) {
    return `${text.slice(0, 157).trimEnd()}...`;
  }
  return text;
}

export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}) {
  const seoTitle = metaTitle(title);
  const seoDescription = metaDescription(description);

  return {
    title: seoTitle,
    description: seoDescription,
    alternates: { canonical: canonicalUrl(path) },
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: canonicalUrl(path),
    },
  };
}
