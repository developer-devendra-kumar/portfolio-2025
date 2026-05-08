import React from 'react'
import type { ExperienceContent } from '@/types/content';
import SectionTitle from './UI/SectionTitle';

interface ExperienceProps {
  content: ExperienceContent;
}

const Experience: React.FC<ExperienceProps> = ({ content }) => {
  return (
    <section className="max-w-5xl mx-auto px-6 py-16" data-reveal-section>
      <SectionTitle title={content.title} sectionId={content.sectionId} />
      <div className="grid md:grid-cols-2 gap-6">
        {content.items.map((item) => (
          <article
            key={`${item.company}-${item.role}`}
            className="rounded-2xl p-5 bg-white dark:bg-slate-800 shadow-sm will-change-transform"
            data-reveal-item
            data-hover-lift
          >
            <p className="text-sm text-secondary-text-light dark:text-secondary-text-dark">{item.period}</p>
            <h3 className="text-xl font-semibold text-text-light dark:text-text-dark">{item.role}</h3>
            <p className="text-base text-text-light dark:text-text-dark">{item.company}</p>
            <ul className="mt-3 space-y-2">
              {item.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="text-sm text-secondary-text-light dark:text-secondary-text-dark"
                >
                  {highlight}
                </li>
              ))}
            </ul>
            <div className="mt-4 flex flex-wrap gap-2">
              {item.stack.map((tech) => (
                <span
                  key={tech}
                  className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Experience
