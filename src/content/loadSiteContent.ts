import fallbackContent from "@/content/site-content.json";
import type { SiteContentData, SiteContentFile } from "@/types/content";
import { getSiteContentValidationErrors, isSiteContentFile } from "@/content/validateSiteContent";

export interface SiteContentLoadResult {
  data: SiteContentData;
  source: "local" | "remote";
  version: string;
  lastUpdated: string;
  warning?: string;
}

const contentUrl =
  process.env.PORTFOLIO_CONTENT_URL ??
  process.env.NEXT_PUBLIC_PORTFOLIO_CONTENT_URL;

const localFallback = fallbackContent as SiteContentFile;

export async function loadSiteContent(): Promise<SiteContentLoadResult> {
  if (!contentUrl) {
    return {
      data: localFallback.data,
      source: "local",
      version: localFallback.version,
      lastUpdated: localFallback.lastUpdated,
    };
  }

  try {
    const response = await fetch(contentUrl, {
      next: { revalidate: 120 },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch content: ${response.status}`);
    }

    const remoteContent = await response.json();

    if (!isSiteContentFile(remoteContent)) {
      const validationErrors = getSiteContentValidationErrors(remoteContent);
      throw new Error(
        `Remote content shape is invalid. ${validationErrors.join(" ")}`,
      );
    }

    return {
      data: remoteContent.data,
      source: "remote",
      version: remoteContent.version,
      lastUpdated: remoteContent.lastUpdated,
    };
  } catch (error) {
    const fallbackReason =
      error instanceof Error
        ? error.message
        : "Unknown remote content fetch error.";

    console.error("Using fallback local content.", error);
    return {
      data: localFallback.data,
      source: "local",
      version: localFallback.version,
      lastUpdated: localFallback.lastUpdated,
      warning: `Remote content fetch failed. Using local fallback. Reason: ${fallbackReason}`,
    };
  }
}

export async function loadSiteContentData(): Promise<SiteContentData> {
  const result = await loadSiteContent();
  return result.data;
}
