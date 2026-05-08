export interface ContentEnvelope<T> {
  version: string;
  lastUpdated: string;
  data: T;
}

export interface NavigationItem {
  label: string;
  sectionId: string;
}

export interface HeroMetric {
  label: string;
  value: string;
}

export interface HeroCta {
  label: string;
  href: string;
  variant: "primary" | "secondary";
}

export interface HeroContent {
  sectionId: string;
  greeting: string;
  name: string;
  role: string;
  summary: string[];
  metrics: HeroMetric[];
  ctas: HeroCta[];
  scrollHint: string;
}

export interface SkillCard {
  title: string;
  description: string;
}

export interface AboutContent {
  sectionId: string;
  title: string;
  paragraphs: string[];
  skills: SkillCard[];
}

export interface JourneyMilestone {
  year: string;
  info: string;
  pathPosition: number;
}

export interface JourneyContent {
  sectionId: string;
  title: string;
  svgPath: string;
  milestones: JourneyMilestone[];
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  highlights: string[];
  stack: string[];
}

export interface ExperienceContent {
  sectionId: string;
  title: string;
  items: ExperienceItem[];
}

export interface ServiceItem {
  title: string;
  description: string;
  outcomes: string[];
}

export interface ServicesContent {
  sectionId: string;
  title: string;
  items: ServiceItem[];
}

export interface CaseStudy {
  title: string;
  client: string;
  domain: string;
  problem: string;
  approach: string;
  result: string;
  stack: string[];
}

export interface CaseStudiesContent {
  sectionId: string;
  title: string;
  items: CaseStudy[];
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
}

export interface TestimonialsContent {
  sectionId: string;
  title: string;
  items: Testimonial[];
}

export interface ProcessStep {
  title: string;
  description: string;
}

export interface ProcessContent {
  sectionId: string;
  title: string;
  steps: ProcessStep[];
}

export interface CertificationItem {
  title: string;
  issuer: string;
  year: string;
  credentialUrl?: string;
}

export interface CertificationsContent {
  sectionId: string;
  title: string;
  items: CertificationItem[];
}

export interface TrainingItem {
  title: string;
  provider: string;
  focus: string;
}

export interface TrainingContent {
  sectionId: string;
  title: string;
  items: TrainingItem[];
}

export interface ContactCta {
  label: string;
  href: string;
}

export interface ContactContent {
  sectionId: string;
  title: string;
  headline: string;
  intro: string;
  email: string;
  location: string;
  availability: string;
  responseTime: string;
  primaryCta: ContactCta;
  secondaryCta: ContactCta;
}

export interface SocialLink {
  label: string;
  href: string;
}

export interface SocialLinksContent {
  sectionId: string;
  title: string;
  links: SocialLink[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqContent {
  sectionId: string;
  title: string;
  items: FaqItem[];
}

export interface SeoContent {
  title: string;
  description: string;
  canonicalUrl?: string;
  ogImage?: string;
  twitterCard?: "summary" | "summary_large_image";
}

export interface FeatureFlagsContent {
  showTestimonials: boolean;
  showFaq: boolean;
}

export interface SiteContentData {
  seo: SeoContent;
  navigation: NavigationItem[];
  hero: HeroContent;
  about: AboutContent;
  journey: JourneyContent;
  experience: ExperienceContent;
  services: ServicesContent;
  caseStudies: CaseStudiesContent;
  testimonials: TestimonialsContent;
  process: ProcessContent;
  certifications: CertificationsContent;
  training: TrainingContent;
  contact: ContactContent;
  socialLinks: SocialLinksContent;
  faq: FaqContent;
  featureFlags: FeatureFlagsContent;
}

export type SiteContentFile = ContentEnvelope<SiteContentData>;
