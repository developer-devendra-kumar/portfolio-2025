import fs from "node:fs";
import path from "node:path";

const targetPath =
  process.argv[2] ??
  path.resolve(process.cwd(), "src/content/site-content.json");

function isObject(value) {
  return typeof value === "object" && value !== null;
}

function isString(value) {
  return typeof value === "string";
}

function isBoolean(value) {
  return typeof value === "boolean";
}

function isArray(value) {
  return Array.isArray(value);
}

function isThemeColorSet(value) {
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

function isThemeMode(value) {
  return (
    isObject(value) &&
    isObject(value.gradient) &&
    isString(value.gradient.from) &&
    isString(value.gradient.via) &&
    isString(value.gradient.to) &&
    isThemeColorSet(value.colors)
  );
}

function validateContent(content) {
  const errors = [];

  if (!isObject(content)) {
    return ["Root JSON must be an object."];
  }

  if (!isString(content.version)) {
    errors.push("Missing or invalid `version`.");
  }

  if (!isString(content.lastUpdated)) {
    errors.push("Missing or invalid `lastUpdated`.");
  }

  if (!isObject(content.data)) {
    errors.push("Missing or invalid `data` object.");
    return errors;
  }

  const data = content.data;

  const topKeys = [
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
  ];

  for (const key of topKeys) {
    if (!(key in data)) {
      errors.push(`Missing data section: ${key}`);
    }
  }

  if (
    !isObject(data.seo) ||
    !isString(data.seo.title) ||
    !isString(data.seo.description)
  ) {
    errors.push("Invalid `data.seo`.");
  }

  if (
    !isObject(data.theme) ||
    !isString(data.theme.fontPreset) ||
    !["space-grotesk", "sora", "outfit"].includes(data.theme.fontPreset) ||
    !isThemeMode(data.theme.light) ||
    !isThemeMode(data.theme.dark)
  ) {
    errors.push("Invalid `data.theme`.");
  }

  if (isObject(data.seo)) {
    if ("canonicalUrl" in data.seo && data.seo.canonicalUrl !== undefined && !isString(data.seo.canonicalUrl)) {
      errors.push("Invalid `data.seo.canonicalUrl`.");
    }
    if ("ogImage" in data.seo && data.seo.ogImage !== undefined && !isString(data.seo.ogImage)) {
      errors.push("Invalid `data.seo.ogImage`.");
    }
    if ("twitterCard" in data.seo && data.seo.twitterCard !== undefined && !isString(data.seo.twitterCard)) {
      errors.push("Invalid `data.seo.twitterCard`.");
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
    errors.push("Invalid `data.navigation`.");
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
    errors.push("Invalid `data.home`.");
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
        !data.hero.roleTitles.every((item) => isString(item))))
  ) {
    errors.push("Invalid `data.hero`.");
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
    errors.push("Invalid `data.featureFlags`.");
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
    errors.push("Invalid `data.projects`.");
  } else {
    if (data.projects.previewCount < 1) {
      errors.push("`data.projects.previewCount` must be at least 1.");
    }
    if (data.projects.items.length < 3) {
      errors.push("`data.projects.items` must contain at least 3 projects.");
    }

    const hasInvalidItem = data.projects.items.some(
      (project) =>
        !isObject(project) ||
        !isString(project.id) ||
        !isString(project.title) ||
        !isString(project.summary) ||
        !isArray(project.stack) ||
        !project.stack.every((tech) => isString(tech)),
    );

    if (hasInvalidItem) {
      errors.push("Invalid project item in `data.projects.items`.");
    }
  }

  if (
    !isObject(data.contact) ||
    !isString(data.contact.sectionId) ||
    !isString(data.contact.title) ||
    !isString(data.contact.email)
  ) {
    errors.push("Invalid `data.contact`.");
  }

  return errors;
}

try {
  const raw = fs.readFileSync(targetPath, "utf-8");
  const parsed = JSON.parse(raw);

  const errors = validateContent(parsed);
  if (errors.length > 0) {
    console.error("Content validation failed:");
    for (const error of errors) {
      console.error(`- ${error}`);
    }
    process.exit(1);
  }

  console.log(`Content validation passed: ${targetPath}`);
} catch (error) {
  console.error("Unable to validate site content.");
  if (error instanceof Error) {
    console.error(error.message);
  } else {
    console.error(String(error));
  }
  process.exit(1);
}
