import React from "react";
import SectionTitle from "./UI/SectionTitle";
import type { FaqContent } from "@/types/content";

interface FaqProps {
  content: FaqContent;
}

const Faq: React.FC<FaqProps> = ({ content }) => {
  return (
    <section className="max-w-5xl mx-auto px-6 py-16" data-reveal-section>
      <SectionTitle title={content.title} sectionId={content.sectionId} />
      <div className="space-y-4">
        {content.items.map((item) => (
          <article
            key={item.question}
            className="rounded-xl p-5 bg-white dark:bg-slate-800 shadow-sm will-change-transform"
            data-reveal-item
            data-hover-lift
          >
            <h3 className="text-base font-semibold text-text-light dark:text-text-dark">{item.question}</h3>
            <p className="mt-2 text-sm text-secondary-text-light dark:text-secondary-text-dark">{item.answer}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Faq;
