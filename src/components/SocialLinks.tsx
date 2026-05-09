import React from 'react'
import type { SocialLinksContent } from '@/types/content';
import SectionTitle from './UI/SectionTitle';

interface SocialLinksProps {
  content: SocialLinksContent;
}

const SocialLinks: React.FC<SocialLinksProps> = ({ content }) => {
  return (
    <section className="max-w-6xl mx-auto px-6 py-16" data-reveal-section>
      <SectionTitle title={content.title} sectionId={content.sectionId} />
      <div className="flex flex-wrap gap-3">
        {content.links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 rounded-lg bg-white dark:bg-slate-800 text-text-light dark:text-text-dark shadow-sm hover:-translate-y-0.5 transition will-change-transform"
            data-reveal-item
            data-hover-lift
            data-magnetic-link
          >
            {link.label}
          </a>
        ))}
      </div>
    </section>
  )
}

export default SocialLinks
