import type { Metadata } from "next";
import type { SiteContentData } from "@/types/content";

export function appendPath(baseUrl: string | undefined, path: string): string | undefined {
  if (!baseUrl) {
    return undefined;
  }

  try {
    const url = new URL(baseUrl);
    url.pathname = path;
    url.search = "";
    url.hash = "";
    return url.toString();
  } catch {
    return undefined;
  }
}

export function buildSectionMetadata(
  content: SiteContentData,
  options: {
    path: string;
    title: string;
    description: string;
  },
): Metadata {
  const canonical = appendPath(content.seo.canonicalUrl, options.path);

  return {
    title: `${content.seo.title} | ${options.title}`,
    description: options.description,
    alternates: canonical ? { canonical } : undefined,
    openGraph: {
      title: `${content.seo.title} | ${options.title}`,
      description: options.description,
      url: canonical,
      images: content.seo.ogImage ? [{ url: content.seo.ogImage }] : undefined,
    },
    twitter: {
      card: content.seo.twitterCard ?? "summary_large_image",
      title: `${content.seo.title} | ${options.title}`,
      description: options.description,
      images: content.seo.ogImage ? [content.seo.ogImage] : undefined,
    },
  };
}
