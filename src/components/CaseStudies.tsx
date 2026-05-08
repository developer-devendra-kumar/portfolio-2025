'use client';

import React from "react";
import SectionTitle from "./UI/SectionTitle";
import type { CaseStudiesContent } from "@/types/content";
import { trackEvent } from "@/utils/analytics";

interface CaseStudiesProps {
  content: CaseStudiesContent;
}

const CaseStudies: React.FC<CaseStudiesProps> = ({ content }) => {
  return (
    <section className="max-w-5xl mx-auto px-6 py-16" data-reveal-section>
      <SectionTitle title={content.title} sectionId={content.sectionId} />
      <div className="space-y-5">
        {content.items.map((study) => (
          <article
            key={study.title}
            className="rounded-2xl p-6 bg-white dark:bg-slate-800 shadow-sm will-change-transform"
            data-reveal-item
            data-hover-lift
          >
            <div className="flex flex-wrap justify-between gap-2">
              <h3 className="text-xl font-semibold text-text-light dark:text-text-dark">{study.title}</h3>
              <span className="text-sm text-secondary-text-light dark:text-secondary-text-dark">
                {study.domain}
              </span>
            </div>
            <p className="text-sm mt-1 text-secondary-text-light dark:text-secondary-text-dark">
              {study.client}
            </p>
            <div className="mt-4 space-y-2">
              <p className="text-sm text-text-light dark:text-text-dark">
                <strong>Problem:</strong> {study.problem}
              </p>
              <p className="text-sm text-text-light dark:text-text-dark">
                <strong>Approach:</strong> {study.approach}
              </p>
              <p className="text-sm text-text-light dark:text-text-dark">
                <strong>Result:</strong> {study.result}
              </p>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {study.stack.map((tech) => (
                <span
                  key={tech}
                  className="text-xs px-2 py-1 rounded bg-amber-100 text-amber-900 dark:bg-amber-800/30 dark:text-amber-200"
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="mt-5">
              <a
                href="#contact"
                className="text-sm font-semibold text-blue-700 dark:text-blue-300 hover:underline"
                data-magnetic-link
                onClick={() =>
                  trackEvent("cta_click", {
                    section: "case_studies",
                    cta_label: "Start Similar Project",
                    case_study: study.title,
                    cta_href: "#contact",
                  })
                }
              >
                Start a Similar Project
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default CaseStudies;
