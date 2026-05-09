import type { Metadata } from "next";
import { loadSiteContent, loadSiteContentData } from "@/content/loadSiteContent";
import {
  getVisibleNavigation,
  withDedicatedPageHrefs,
} from "@/content/sectionVisibility";
import { buildSectionMetadata } from "@/content/seo";

interface LinkItem {
  label: string;
  href: string;
  hint: string;
  external?: boolean;
}

function isExternal(url: string): boolean {
  return /^https?:\/\//.test(url);
}

export async function generateMetadata(): Promise<Metadata> {
  const content = await loadSiteContentData();
  return buildSectionMetadata(content, {
    path: "/links",
    title: "All Links",
    description:
      "Fast-access directory to portfolio sections, projects, and contact channels.",
  });
}

export default async function LinksPage() {
  const result = await loadSiteContent();
  const content = result.data;
  const flags = content.featureFlags;

  const showcaseLinks = withDedicatedPageHrefs(getVisibleNavigation(content)).map((item) => ({
    label: item.label,
    href: item.href ?? "/",
    hint: "Dedicated page",
  }));

  const quickActions: LinkItem[] = [
    { label: "Minimal Home", href: "/", hint: "High-speed landing page" },
    { label: "Full Showcase", href: "/showcase", hint: "Complete portfolio experience" },
    ...(flags.showProjects
      ? [{ label: "Projects", href: "/projects", hint: "All project cards and inquiry CTAs" }]
      : []),
  ];

  const professionalLinks: LinkItem[] = [
    ...(flags.showSocialLinks
      ? content.socialLinks.links.map((item) => ({
          label: item.label,
          href: item.href,
          hint: "External profile",
          external: true,
        }))
      : []),
    ...(flags.showContact
      ? [
          {
            label: content.contact.primaryCta.label,
            href: content.contact.primaryCta.href,
            hint: "Primary contact action",
            external: isExternal(content.contact.primaryCta.href),
          },
          {
            label: content.contact.secondaryCta.label,
            href: content.contact.secondaryCta.href,
            hint: "Secondary contact action",
            external: isExternal(content.contact.secondaryCta.href),
          },
        ]
      : []),
  ];

  return (
    <main className="min-h-screen app-bg relative overflow-hidden">
      <div className="landing-orb landing-orb-three" />
      <div className="landing-grid-pattern" />

      {result.warning && (
        <div className="max-w-6xl mx-auto px-6 pt-5 relative z-20">
          <div className="rounded-lg border border-amber-300 bg-amber-50 text-amber-900 dark:bg-amber-950/50 dark:border-amber-700 dark:text-amber-200 px-4 py-3 text-sm">
            {result.warning}
          </div>
        </div>
      )}

      <section className="max-w-6xl mx-auto px-6 py-16 md:py-20 relative z-10">
        <h1 className="landing-headline">All Links</h1>
        <p className="landing-description mt-4 max-w-3xl">
          A single hub to explore the full portfolio, key work sections, projects, and direct contact
          options without loading the complete showcase upfront.
        </p>

        <div className="mt-10 grid lg:grid-cols-3 gap-6">
          <div className="links-panel links-panel-one">
            <h2 className="links-panel-title">Quick Actions</h2>
            <div className="space-y-3 mt-4">
              {quickActions.map((item) => (
                <a key={item.label} href={item.href} className="links-card">
                  <span className="links-card-title">{item.label}</span>
                  <span className="links-card-hint">{item.hint}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="links-panel links-panel-two">
            <h2 className="links-panel-title">Showcase Sections</h2>
            <div className="space-y-3 mt-4">
              {showcaseLinks.map((item) => (
                <a key={item.label} href={item.href} className="links-card">
                  <span className="links-card-title">{item.label}</span>
                  <span className="links-card-hint">{item.hint}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="links-panel links-panel-three">
            <h2 className="links-panel-title">Profiles & Contact</h2>
            <div className="space-y-3 mt-4">
              {professionalLinks.map((item) => (
                <a
                  key={`${item.label}-${item.href}`}
                  href={item.href}
                  className="links-card"
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noreferrer" : undefined}
                >
                  <span className="links-card-title">{item.label}</span>
                  <span className="links-card-hint">{item.hint}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
