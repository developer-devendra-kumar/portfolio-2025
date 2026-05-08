import React from "react";
import SectionTitle from "./UI/SectionTitle";
import type { TestimonialsContent } from "@/types/content";

interface TestimonialsProps {
  content: TestimonialsContent;
}

const Testimonials: React.FC<TestimonialsProps> = ({ content }) => {
  return (
    <section className="max-w-5xl mx-auto px-6 py-16" data-reveal-section>
      <SectionTitle title={content.title} sectionId={content.sectionId} />
      <div className="grid md:grid-cols-2 gap-4">
        {content.items.map((testimonial, index) => (
          <blockquote
            key={`${testimonial.author}-${index + 1}`}
            className="rounded-2xl p-5 bg-white dark:bg-slate-800 shadow-sm will-change-transform"
            data-reveal-item
            data-hover-lift
          >
            <p className="text-base italic text-text-light dark:text-text-dark">&ldquo;{testimonial.quote}&rdquo;</p>
            <footer className="mt-4">
              <p className="text-sm font-semibold text-text-light dark:text-text-dark">{testimonial.author}</p>
              <p className="text-sm text-secondary-text-light dark:text-secondary-text-dark">
                {testimonial.role}, {testimonial.company}
              </p>
            </footer>
          </blockquote>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
