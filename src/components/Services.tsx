import React from "react";
import SectionTitle from "./UI/SectionTitle";
import type { ServicesContent } from "@/types/content";

interface ServicesProps {
  content: ServicesContent;
}

const Services: React.FC<ServicesProps> = ({ content }) => {
  return (
    <section className="max-w-6xl mx-auto px-6 py-16" data-reveal-section>
      <SectionTitle title={content.title} sectionId={content.sectionId} />
      <div className="grid md:grid-cols-3 gap-4">
        {content.items.map((service) => (
          <article
            key={service.title}
            className="rounded-2xl p-5 bg-white dark:bg-slate-800 shadow-sm will-change-transform"
            data-reveal-item
            data-hover-lift
          >
            <h3 className="text-lg font-semibold text-text-light dark:text-text-dark">{service.title}</h3>
            <p className="mt-2 text-sm text-secondary-text-light dark:text-secondary-text-dark">
              {service.description}
            </p>
            <ul className="mt-4 space-y-1">
              {service.outcomes.map((outcome) => (
                <li key={outcome} className="text-sm text-text-light dark:text-text-dark">
                  {outcome}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Services;
