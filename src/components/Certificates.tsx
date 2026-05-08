import React from 'react'
import type { CertificationsContent } from '@/types/content';
import SectionTitle from './UI/SectionTitle';

interface CertificatesProps {
  content: CertificationsContent;
}

const Certificates: React.FC<CertificatesProps> = ({ content }) => {
  return (
    <section className="max-w-5xl mx-auto px-6 py-16" data-reveal-section>
      <SectionTitle title={content.title} sectionId={content.sectionId} />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {content.items.map((certificate) => (
          <article
            key={`${certificate.title}-${certificate.issuer}-${certificate.year}`}
            className="rounded-xl p-4 bg-white dark:bg-slate-800 shadow-sm will-change-transform"
            data-reveal-item
            data-hover-lift
          >
            <h3 className="text-base font-semibold text-text-light dark:text-text-dark">{certificate.title}</h3>
            <p className="text-sm text-secondary-text-light dark:text-secondary-text-dark">{certificate.issuer}</p>
            <p className="text-sm text-secondary-text-light dark:text-secondary-text-dark">{certificate.year}</p>
            {certificate.credentialUrl && certificate.credentialUrl !== "#" && (
              <a
                className="inline-block mt-3 text-sm text-blue-700 dark:text-blue-300 hover:underline"
                href={certificate.credentialUrl}
                target="_blank"
                rel="noreferrer"
                data-magnetic-link
              >
                View Credential
              </a>
            )}
          </article>
        ))}
      </div>
    </section>
  )
}

export default Certificates
