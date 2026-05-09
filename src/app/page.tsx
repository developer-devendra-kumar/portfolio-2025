import type { Metadata } from "next";
import About from "@/components/About";
import CaseStudies from "@/components/CaseStudies";
import Certificates from "@/components/Certificates";
import Contact from "@/components/Contact";
import Experience from "@/components/Experience";
import Faq from "@/components/Faq";
import IntroSection from "@/components/Intro2";
import MyJourney from "@/components/MyJourney";
import Projects from "@/components/Projects";
import Services from "@/components/Services";
import SiteMotionEnhancer from "@/components/SiteMotionEnhancer";
import SocialLinks from "@/components/SocialLinks";
import Testimonials from "@/components/Testimonials";
import Training from "@/components/Training";
import WorkProcess from "@/components/WorkProcess";
import { loadSiteContent, loadSiteContentData } from "@/content/loadSiteContent";

const defaultSectionOrder = [
  "about",
  "journey",
  "experience",
  "services",
  "case-studies",
  "projects",
  "process",
  "testimonials",
  "certifications",
  "training",
  "social-links",
  "contact",
  "faq",
];

export async function generateMetadata(): Promise<Metadata> {
  const content = await loadSiteContentData();

  return {
    title: content.seo.title,
    description: content.seo.description,
    alternates: content.seo.canonicalUrl
      ? { canonical: content.seo.canonicalUrl }
      : undefined,
    openGraph: {
      title: content.seo.title,
      description: content.seo.description,
      url: content.seo.canonicalUrl,
      images: content.seo.ogImage ? [{ url: content.seo.ogImage }] : undefined,
    },
    twitter: {
      card: content.seo.twitterCard ?? "summary_large_image",
      title: content.seo.title,
      description: content.seo.description,
      images: content.seo.ogImage ? [content.seo.ogImage] : undefined,
    },
  };
}

export default async function Home() {
  const result = await loadSiteContent();
  const content = result.data;
  const flags = content.featureFlags;
  const home = content.home;
  const sectionOrder =
    home.sectionOrder.length > 0 ? home.sectionOrder : defaultSectionOrder;

  const seen = new Set<string>();
  const orderedSections = sectionOrder
    .map((sectionId) => sectionId.trim())
    .filter((sectionId) => sectionId.length > 0)
    .filter((sectionId) => {
      if (seen.has(sectionId)) {
        return false;
      }
      seen.add(sectionId);
      return true;
    })
    .map((sectionId) => {
      switch (sectionId) {
        case "about":
          return flags.showAbout ? <About key={sectionId} content={content.about} /> : null;
        case "journey":
          return flags.showJourney ? <MyJourney key={sectionId} content={content.journey} /> : null;
        case "experience":
          return flags.showExperience ? <Experience key={sectionId} content={content.experience} /> : null;
        case "services":
          return flags.showServices ? <Services key={sectionId} content={content.services} /> : null;
        case "case-studies":
          return flags.showCaseStudies ? (
            <CaseStudies key={sectionId} content={content.caseStudies} />
          ) : null;
        case "projects":
          return flags.showProjects ? <Projects key={sectionId} content={content.projects} mode="preview" /> : null;
        case "process":
          return flags.showProcess ? <WorkProcess key={sectionId} content={content.process} /> : null;
        case "testimonials":
          return flags.showTestimonials ? (
            <Testimonials key={sectionId} content={content.testimonials} />
          ) : null;
        case "certifications":
          return flags.showCertifications ? (
            <Certificates key={sectionId} content={content.certifications} />
          ) : null;
        case "training":
          return flags.showTraining ? <Training key={sectionId} content={content.training} /> : null;
        case "social-links":
          return flags.showSocialLinks ? <SocialLinks key={sectionId} content={content.socialLinks} /> : null;
        case "contact":
          return flags.showContact ? <Contact key={sectionId} content={content.contact} /> : null;
        case "faq":
          return flags.showFaq ? <Faq key={sectionId} content={content.faq} /> : null;
        default:
          return null;
      }
    });

  return (
    <main className="min-h-screen app-bg overflow-hidden">
      <SiteMotionEnhancer />
      <div className="landing-orb landing-orb-one" />
      <div className="landing-orb landing-orb-two" />
      <div className="landing-grid-pattern" />

      {result.warning && (
        <div className="max-w-6xl mx-auto px-6 pt-5 relative z-20">
          <div className="rounded-lg border border-amber-300 bg-amber-50 text-amber-900 dark:bg-amber-950/50 dark:border-amber-700 dark:text-amber-200 px-4 py-3 text-sm">
            {result.warning}
          </div>
        </div>
      )}

      {/* <section
        id={home.sectionId}
        className="relative z-10 max-w-6xl mx-auto px-6 pt-12 md:pt-16 pb-8"
        data-reveal-section
      >
        <div className="landing-intro-chip" data-reveal-item>
          <span>{home.badge}</span>
          <span className="landing-pulse-dot" />
          <span>Individual Developer Positioning</span>
        </div>

        <h1 className="landing-headline mt-6" data-reveal-item>
          {home.headline}
        </h1>
        <p className="landing-description mt-4" data-reveal-item>
          {home.subheadline}
        </p>

        <div className="mt-7 flex flex-wrap gap-2" data-reveal-item>
          {home.highlightPills.map((pill) => (
            <span
              key={pill}
              className="rounded-full border border-blue-200 dark:border-slate-600 bg-white/75 dark:bg-slate-900/70 px-3 py-1 text-sm text-slate-700 dark:text-slate-200"
            >
              {pill}
            </span>
          ))}
        </div>

        <h2 className="mt-9 text-xl font-semibold text-text-light dark:text-text-dark" data-reveal-item>
          {home.quickLinksTitle}
        </h2>

        <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-4" data-reveal-item>
          {home.quickLinks.map((link) => (
            isInternalRoute(link.href) ? (
              <Link
                key={`${link.label}-${link.href}`}
                href={link.href}
                className="rounded-xl border border-blue-100 dark:border-slate-700 bg-white/80 dark:bg-slate-900/70 px-4 py-4 hover:-translate-y-1 transition-all duration-300"
              >
                <p className="text-base font-semibold text-text-light dark:text-text-dark">
                  {link.label}
                </p>
                <p className="mt-1 text-sm text-secondary-text-light dark:text-secondary-text-dark">
                  {link.hint}
                </p>
              </Link>
            ) : (
              <a
                key={`${link.label}-${link.href}`}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border border-blue-100 dark:border-slate-700 bg-white/80 dark:bg-slate-900/70 px-4 py-4 hover:-translate-y-1 transition-all duration-300"
              >
                <p className="text-base font-semibold text-text-light dark:text-text-dark">
                  {link.label}
                </p>
                <p className="mt-1 text-sm text-secondary-text-light dark:text-secondary-text-dark">
                  {link.hint}
                </p>
              </a>
            )
          ))}
        </div>
      </section> */}

      {flags.showHero && <IntroSection content={content.hero} />}
      {orderedSections}
    </main>
  );
}
