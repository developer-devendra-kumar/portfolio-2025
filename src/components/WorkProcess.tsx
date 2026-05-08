import React from "react";
import SectionTitle from "./UI/SectionTitle";
import type { ProcessContent } from "@/types/content";

interface WorkProcessProps {
  content: ProcessContent;
}

const WorkProcess: React.FC<WorkProcessProps> = ({ content }) => {
  return (
    <section className="max-w-5xl mx-auto px-6 py-16" data-reveal-section>
      <SectionTitle title={content.title} sectionId={content.sectionId} />
      <div className="grid md:grid-cols-4 gap-4">
        {content.steps.map((step, index) => (
          <article
            key={step.title}
            className="rounded-xl p-4 bg-white dark:bg-slate-800 shadow-sm border border-blue-100 dark:border-slate-700 will-change-transform"
            data-reveal-item
            data-hover-lift
          >
            <p className="text-xs uppercase tracking-wide text-blue-700 dark:text-blue-300">
              Step {index + 1}
            </p>
            <h3 className="mt-2 text-base font-semibold text-text-light dark:text-text-dark">{step.title}</h3>
            <p className="mt-2 text-sm text-secondary-text-light dark:text-secondary-text-dark">
              {step.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default WorkProcess;
