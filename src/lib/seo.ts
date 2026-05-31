import { SITE_URL } from "@/lib/site";

/** Build absolute canonical URL (trailing slash, matches next.config trailingSlash) */
export function canonicalUrl(path = "/"): string {
  if (!path || path === "/") return `${SITE_URL}/`;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized.endsWith("/") ? normalized : `${normalized}/`}`;
}

const META_PAD =
  " Unofficial English RSP editing hub—copy AI photo prompts safely with no template file downloads.";

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
  return {
    title,
    description: metaDescription(description),
    alternates: { canonical: canonicalUrl(path) },
    openGraph: {
      title,
      description: metaDescription(description),
      url: canonicalUrl(path),
    },
  };
}
