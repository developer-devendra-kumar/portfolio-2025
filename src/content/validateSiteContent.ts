import type { SiteContentData, SiteContentFile } from "@/types/content";

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isString(value: unknown): value is string {
  return typeof value === "string";
}

function isBoolean(value: unknown): value is boolean {
  return typeof value === "boolean";
}

function isArray(value: unknown): value is unknown[] {
  return Array.isArray(value);
}

function hasKeys(
  value: Record<string, unknown>,
  keys: readonly string[],
): boolean {
  return keys.every((key) => key in value);
}

export function getSiteContentValidationErrors(value: unknown): string[] {
  const errors: string[] = [];

  if (!isObject(value)) {
    return ["Root content must be an object."];
  }

  if (!isString(value.version)) {
    errors.push("`version` must be a string.");
  }

  if (!isString(value.lastUpdated)) {
    errors.push("`lastUpdated` must be a string.");
  }

  if (!isObject(value.data)) {
    errors.push("`data` must be an object.");
    return errors;
  }

  const data = value.data;
  const requiredTopKeys = [
    "seo",
    "navigation",
    "hero",
    "about",
    "journey",
    "experience",
    "services",
    "caseStudies",
    "testimonials",
    "process",
    "certifications",
    "training",
    "contact",
    "socialLinks",
    "faq",
    "featureFlags",
  ] as const;

  if (!hasKeys(data, requiredTopKeys)) {
    errors.push("`data` is missing one or more required top-level sections.");
  }

  if (!isObject(data.seo) || !isString(data.seo.title) || !isString(data.seo.description)) {
    errors.push("`data.seo` must contain string `title` and `description`.");
  }
  if (isObject(data.seo)) {
    if (
      "canonicalUrl" in data.seo &&
      data.seo.canonicalUrl !== undefined &&
      !isString(data.seo.canonicalUrl)
    ) {
      errors.push("`data.seo.canonicalUrl` must be a string when provided.");
    }
    if (
      "ogImage" in data.seo &&
      data.seo.ogImage !== undefined &&
      !isString(data.seo.ogImage)
    ) {
      errors.push("`data.seo.ogImage` must be a string when provided.");
    }
    if (
      "twitterCard" in data.seo &&
      data.seo.twitterCard !== undefined &&
      !isString(data.seo.twitterCard)
    ) {
      errors.push("`data.seo.twitterCard` must be a string when provided.");
    }
  }

  if (
    !isArray(data.navigation) ||
    !data.navigation.every(
      (item) =>
        isObject(item) &&
        isString(item.label) &&
        isString(item.sectionId),
    )
  ) {
    errors.push("`data.navigation` must be an array of `{ label, sectionId }`.");
  }

  if (
    !isObject(data.hero) ||
    !isString(data.hero.sectionId) ||
    !isString(data.hero.name) ||
    !isArray(data.hero.summary)
  ) {
    errors.push("`data.hero` has invalid required fields.");
  }

  if (
    !isObject(data.featureFlags) ||
    !isBoolean(data.featureFlags.showTestimonials) ||
    !isBoolean(data.featureFlags.showFaq)
  ) {
    errors.push("`data.featureFlags` must include boolean flags.");
  }

  if (
    !isObject(data.contact) ||
    !isString(data.contact.sectionId) ||
    !isString(data.contact.title) ||
    !isString(data.contact.email)
  ) {
    errors.push("`data.contact` has invalid required fields.");
  }

  return errors;
}

export function isSiteContentFile(value: unknown): value is SiteContentFile {
  return getSiteContentValidationErrors(value).length === 0;
}

export function isSiteContentData(value: unknown): value is SiteContentData {
  return (
    isObject(value) &&
    hasKeys(value, [
      "seo",
      "navigation",
      "hero",
      "about",
      "journey",
      "experience",
      "services",
      "caseStudies",
      "testimonials",
      "process",
      "certifications",
      "training",
      "contact",
      "socialLinks",
      "faq",
      "featureFlags",
    ])
  );
}
