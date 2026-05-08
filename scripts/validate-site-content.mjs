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
        isString(item.sectionId),
    )
  ) {
    errors.push("Invalid `data.navigation`.");
  }

  if (
    !isObject(data.featureFlags) ||
    !isBoolean(data.featureFlags.showTestimonials) ||
    !isBoolean(data.featureFlags.showFaq)
  ) {
    errors.push("Invalid `data.featureFlags`.");
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
