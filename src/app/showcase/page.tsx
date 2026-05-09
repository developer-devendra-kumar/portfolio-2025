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
import SectionPageShell from "@/components/SectionPageShell";
import Services from "@/components/Services";
import SocialLinks from "@/components/SocialLinks";
import Testimonials from "@/components/Testimonials";
import Training from "@/components/Training";
import WorkProcess from "@/components/WorkProcess";
import { loadSiteContent, loadSiteContentData } from "@/content/loadSiteContent";
import { buildSectionMetadata } from "@/content/seo";

export async function generateMetadata(): Promise<Metadata> {
  const content = await loadSiteContentData();
  return buildSectionMetadata(content, {
    path: "/showcase",
    title: "Showcase",
    description: content.seo.description,
  });
}

export default async function ShowcasePage() {
  const result = await loadSiteContent();
  const content = result.data;
  const flags = content.featureFlags;

  return (
    <SectionPageShell warning={result.warning}>
      {flags.showHero && <IntroSection content={content.hero} />}
      {flags.showAbout && <About content={content.about} />}
      {flags.showJourney && <MyJourney content={content.journey} />}
      {flags.showExperience && <Experience content={content.experience} />}
      {flags.showServices && <Services content={content.services} />}
      {flags.showCaseStudies && <CaseStudies content={content.caseStudies} />}
      {flags.showProjects && <Projects content={content.projects} mode="preview" />}
      {flags.showProcess && <WorkProcess content={content.process} />}
      {flags.showTestimonials && <Testimonials content={content.testimonials} />}
      {flags.showCertifications && (
        <Certificates content={content.certifications} />
      )}
      {flags.showTraining && <Training content={content.training} />}
      {flags.showSocialLinks && <SocialLinks content={content.socialLinks} />}
      {flags.showContact && <Contact content={content.contact} />}
      {flags.showFaq && <Faq content={content.faq} />}
    </SectionPageShell>
  );
}
