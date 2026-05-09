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

function isThemeColorSet(value: unknown): value is Record<string, unknown> {
  return (
    isObject(value) &&
    isString(value.background) &&
    isString(value.foreground) &&
    isString(value.cardBackground) &&
    isString(value.primary) &&
    isString(value.accent) &&
    isString(value.text) &&
    isString(value.secondaryText)
  );
}

function isThemeMode(value: unknown): value is Record<string, unknown> {
  return (
    isObject(value) &&
    isObject(value.gradient) &&
    isString(value.gradient.from) &&
    isString(value.gradient.via) &&
    isString(value.gradient.to) &&
    isThemeColorSet(value.colors)
  );
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
    "theme",
    "navigation",
    "home",
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
    "projects",
    "featureFlags",
  ] as const;

  if (!hasKeys(data, requiredTopKeys)) {
    errors.push("`data` is missing one or more required top-level sections.");
  }

  if (!isObject(data.seo) || !isString(data.seo.title) || !isString(data.seo.description)) {
    errors.push("`data.seo` must contain string `title` and `description`.");
  }

  if (
    !isObject(data.theme) ||
    !isString(data.theme.fontPreset) ||
    !["space-grotesk", "sora", "outfit"].includes(data.theme.fontPreset) ||
    !isThemeMode(data.theme.light) ||
    !isThemeMode(data.theme.dark)
  ) {
    errors.push("`data.theme` has invalid required fields.");
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
        isString(item.sectionId) &&
        (!("href" in item) || item.href === undefined || isString(item.href)),
    )
  ) {
    errors.push("`data.navigation` must be an array of `{ label, sectionId, href? }`.");
  }

  if (
    !isObject(data.home) ||
    !isString(data.home.sectionId) ||
    !isString(data.home.badge) ||
    !isString(data.home.headline) ||
    !isString(data.home.subheadline) ||
    !isArray(data.home.highlightPills) ||
    !data.home.highlightPills.every((item) => isString(item)) ||
    !isArray(data.home.sectionOrder) ||
    !data.home.sectionOrder.every((item) => isString(item)) ||
    !isString(data.home.quickLinksTitle) ||
    !isArray(data.home.quickLinks) ||
    !data.home.quickLinks.every(
      (item) =>
        isObject(item) &&
        isString(item.label) &&
        isString(item.href) &&
        isString(item.hint),
    )
  ) {
    errors.push("`data.home` has invalid required fields.");
  }

  if (
    !isObject(data.hero) ||
    !isString(data.hero.sectionId) ||
    !isString(data.hero.role) ||
    !isString(data.hero.name) ||
    !isArray(data.hero.summary) ||
    ("roleTitles" in data.hero &&
      data.hero.roleTitles !== undefined &&
      (!isArray(data.hero.roleTitles) ||
        data.hero.roleTitles.length === 0 ||
        !data.hero.roleTitles.every((title) => isString(title))))
  ) {
    errors.push("`data.hero` has invalid required fields.");
  }

  if (
    !isObject(data.featureFlags) ||
    !isBoolean(data.featureFlags.showHero) ||
    !isBoolean(data.featureFlags.showAbout) ||
    !isBoolean(data.featureFlags.showJourney) ||
    !isBoolean(data.featureFlags.showExperience) ||
    !isBoolean(data.featureFlags.showServices) ||
    !isBoolean(data.featureFlags.showCaseStudies) ||
    !isBoolean(data.featureFlags.showProjects) ||
    !isBoolean(data.featureFlags.showProcess) ||
    !isBoolean(data.featureFlags.showTestimonials) ||
    !isBoolean(data.featureFlags.showCertifications) ||
    !isBoolean(data.featureFlags.showTraining) ||
    !isBoolean(data.featureFlags.showSocialLinks) ||
    !isBoolean(data.featureFlags.showContact) ||
    !isBoolean(data.featureFlags.showFaq)
  ) {
    errors.push("`data.featureFlags` must include boolean flags.");
  }

  if (
    !isObject(data.projects) ||
    !isString(data.projects.sectionId) ||
    !isString(data.projects.title) ||
    !isString(data.projects.intro) ||
    typeof data.projects.previewCount !== "number" ||
    !isString(data.projects.showAllLabel) ||
    !isString(data.projects.allProjectsPath) ||
    !isString(data.projects.inquiryCtaLabel) ||
    !isString(data.projects.inquiryHref) ||
    !isArray(data.projects.items)
  ) {
    errors.push("`data.projects` has invalid required fields.");
  } else {
    if (data.projects.previewCount < 1) {
      errors.push("`data.projects.previewCount` must be at least 1.");
    }
    if (data.projects.items.length < 3) {
      errors.push("`data.projects.items` must contain at least 3 projects.");
    }

    const invalidProject = data.projects.items.find(
      (project) =>
        !isObject(project) ||
        !isString(project.id) ||
        !isString(project.title) ||
        !isString(project.summary) ||
        !isArray(project.stack) ||
        !project.stack.every((item) => isString(item)),
    );

    if (invalidProject) {
      errors.push("Each `data.projects.items` entry must include `id`, `title`, `summary`, and string `stack[]`.");
    }
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
      "theme",
      "navigation",
      "home",
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
      "projects",
      "featureFlags",
    ])
  );
}
