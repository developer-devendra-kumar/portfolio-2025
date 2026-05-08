import React from 'react'
import type { TrainingContent } from '@/types/content';
import SectionTitle from './UI/SectionTitle';

interface TrainingProps {
  content: TrainingContent;
}

const Training: React.FC<TrainingProps> = ({ content }) => {
  return (
    <section className="max-w-5xl mx-auto px-6 py-16" data-reveal-section>
      <SectionTitle title={content.title} sectionId={content.sectionId} />
      <div className="grid md:grid-cols-2 gap-4">
        {content.items.map((training) => (
          <article
            key={`${training.title}-${training.provider}`}
            className="rounded-xl p-5 bg-white dark:bg-slate-800 shadow-sm will-change-transform"
            data-reveal-item
            data-hover-lift
          >
            <h3 className="text-base font-semibold text-text-light dark:text-text-dark">{training.title}</h3>
            <p className="text-sm text-secondary-text-light dark:text-secondary-text-dark">{training.provider}</p>
            <p className="mt-2 text-sm text-text-light dark:text-text-dark">{training.focus}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Training
