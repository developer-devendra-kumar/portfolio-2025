import type { Metadata } from "next";
import About from "@/components/About";
import CaseStudies from "@/components/CaseStudies";
import Certificates from "@/components/Certificates";
import Contact from "@/components/Contact";
import Experience from "@/components/Experience";
import Faq from "@/components/Faq";
import Header from "@/components/Header";
import IntroSection from "@/components/Intro2";
import MyJourney from "@/components/MyJourney";
import Services from "@/components/Services";
import SiteMotionEnhancer from "@/components/SiteMotionEnhancer";
import SocialLinks from "@/components/SocialLinks";
import Testimonials from "@/components/Testimonials";
import Training from "@/components/Training";
import WorkProcess from "@/components/WorkProcess";
import { loadSiteContent, loadSiteContentData } from "@/content/loadSiteContent";

const sectionStyle = "min-h-screen min-w-screen app-bg";

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

  return (
    <>
      <Header navigation={content.navigation} />
      <main className={sectionStyle}>
        <SiteMotionEnhancer />
        {result.warning && (
          <div className="max-w-5xl mx-auto px-6 pt-4">
            <div className="rounded-lg border border-amber-300 bg-amber-50 text-amber-900 dark:bg-amber-950/50 dark:border-amber-700 dark:text-amber-200 px-4 py-3 text-sm">
              {result.warning}
            </div>
          </div>
        )}
        <div className="max-w-5xl text-center md:text-left space-y-6 mx-auto">
          <IntroSection content={content.hero} />
          <About content={content.about} />
          <MyJourney content={content.journey} />
          <Experience content={content.experience} />
          <Services content={content.services} />
          <CaseStudies content={content.caseStudies} />
          <WorkProcess content={content.process} />
          {content.featureFlags.showTestimonials && (
            <Testimonials content={content.testimonials} />
          )}
          <Certificates content={content.certifications} />
          <Training content={content.training} />
          <SocialLinks content={content.socialLinks} />
          <Contact content={content.contact} />
          {content.featureFlags.showFaq && <Faq content={content.faq} />}
        </div>
      </main>
    </>
  );
}
