import type { FeatureFlagsContent, NavigationItem, SiteContentData } from "@/types/content";

const dedicatedPagePathBySectionId: Record<string, string> = {
  home: "/",
  links: "/links",
  about: "/about",
  journey: "/journey",
  experience: "/experience",
  services: "/services",
  "case-studies": "/case-studies",
  projects: "/projects",
  process: "/process",
  testimonials: "/testimonials",
  certifications: "/certifications",
  training: "/training",
  "social-links": "/social-links",
  contact: "/contact",
  faq: "/faq",
};

function getVisibilityMap(content: SiteContentData, flags: FeatureFlagsContent): Map<string, boolean> {
  return new Map<string, boolean>([
    [content.hero.sectionId, flags.showHero],
    [content.about.sectionId, flags.showAbout],
    [content.journey.sectionId, flags.showJourney],
    [content.experience.sectionId, flags.showExperience],
    [content.services.sectionId, flags.showServices],
    [content.caseStudies.sectionId, flags.showCaseStudies],
    [content.projects.sectionId, flags.showProjects],
    [content.process.sectionId, flags.showProcess],
    [content.testimonials.sectionId, flags.showTestimonials],
    [content.certifications.sectionId, flags.showCertifications],
    [content.training.sectionId, flags.showTraining],
    [content.socialLinks.sectionId, flags.showSocialLinks],
    [content.contact.sectionId, flags.showContact],
    [content.faq.sectionId, flags.showFaq],
  ]);
}

export function getVisibleNavigation(content: SiteContentData): NavigationItem[] {
  const visibility = getVisibilityMap(content, content.featureFlags);
  return content.navigation.filter((item) => visibility.get(item.sectionId) !== false);
}

export function withDedicatedPageHrefs(items: NavigationItem[]): NavigationItem[] {
  return items.map((item) => ({
    ...item,
    href:
      item.href ??
      dedicatedPagePathBySectionId[item.sectionId] ??
      `/showcase#${item.sectionId}`,
  }));
}
