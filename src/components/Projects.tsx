'use client';

import Link from "next/link";
import React from "react";
import SectionTitle from "./UI/SectionTitle";
import type { ProjectItem, ProjectsContent } from "@/types/content";
import { trackEvent } from "@/utils/analytics";

interface ProjectsProps {
  content: ProjectsContent;
  mode?: "preview" | "full";
}

const MAX_VISIBLE_STACK = 5;

function hasValue(value?: string): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isExternalLink(url: string): boolean {
  return /^https?:\/\//.test(url);
}

function ProjectCard({
  project,
  inquiryHref,
  inquiryCtaLabel,
}: {
  project: ProjectItem;
  inquiryHref: string;
  inquiryCtaLabel: string;
}) {
  const visibleStack = project.stack.slice(0, MAX_VISIBLE_STACK);
  const hiddenStackCount = Math.max(0, project.stack.length - visibleStack.length);

  return (
    <article
      className="h-full rounded-2xl p-5 bg-white dark:bg-slate-800 shadow-sm will-change-transform flex flex-col"
      data-reveal-item
      data-hover-lift
    >
      <div className="flex flex-1 flex-col">
        {hasValue(project.imageUrl) && (
          <div className="mb-4 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700">
            {/* Intentional: dynamic external image URLs come from content JSON. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.imageUrl}
              alt={`${project.title} project preview`}
              className="h-40 w-full object-cover"
              loading="lazy"
            />
          </div>
        )}

        <div className="flex flex-wrap gap-2 mb-3">
          {hasValue(project.domain) && (
            <span className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-200">
              {project.domain}
            </span>
          )}
          {hasValue(project.status) && (
            <span className="text-xs px-2 py-1 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200">
              {project.status}
            </span>
          )}
          {hasValue(project.duration) && (
            <span className="text-xs px-2 py-1 rounded bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200">
              {project.duration}
            </span>
          )}
        </div>

        <h3 className="text-xl font-semibold text-text-light dark:text-text-dark leading-snug">
          {project.title}
        </h3>

        {hasValue(project.client) && (
          <p className="mt-1 text-sm text-secondary-text-light dark:text-secondary-text-dark">
            {project.client}
          </p>
        )}

        <p className="mt-3 text-sm text-text-light dark:text-text-dark">
          {project.summary}
        </p>

        {hasValue(project.outcome) && (
          <p className="mt-3 text-sm text-secondary-text-light dark:text-secondary-text-dark">
            <strong>Impact:</strong> {project.outcome}
          </p>
        )}

        <div className="mt-4 flex flex-wrap gap-2">
          {visibleStack.map((tech) => (
            <span
              key={`${project.id}-${tech}`}
              className="text-xs px-2 py-1 rounded bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-100"
            >
              {tech}
            </span>
          ))}
          {hiddenStackCount > 0 && (
            <span className="text-xs px-2 py-1 rounded bg-slate-200 text-slate-700 dark:bg-slate-600 dark:text-slate-100">
              +{hiddenStackCount} more
            </span>
          )}
        </div>

        <div className="mt-auto pt-5 border-t border-slate-200 dark:border-slate-700 flex flex-wrap gap-3 items-center">
          <a
            href={inquiryHref}
            className="text-sm font-semibold text-blue-700 dark:text-blue-300 hover:underline"
            data-magnetic-link
            onClick={() =>
              trackEvent("project_inquiry_click", {
                project_id: project.id,
                project_title: project.title,
                cta_href: inquiryHref,
              })
            }
          >
            {inquiryCtaLabel}
          </a>

          {/* {hasValue(project.caseStudyUrl) && (
            <a
              href={project.caseStudyUrl}
              className="text-sm text-text-light dark:text-text-dark hover:underline"
              target={isExternalLink(project.caseStudyUrl) ? "_blank" : undefined}
              rel={isExternalLink(project.caseStudyUrl) ? "noreferrer" : undefined}
            >
              Case Study
            </a>
          )} */}

          {hasValue(project.liveUrl) && (
            <a
              href={project.liveUrl}
              className="text-sm text-text-light dark:text-text-dark hover:underline"
              target={isExternalLink(project.liveUrl) ? "_blank" : undefined}
              rel={isExternalLink(project.liveUrl) ? "noreferrer" : undefined}
            >
              Live Demo
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

const Projects: React.FC<ProjectsProps> = ({ content, mode = "preview" }) => {
  const previewCount = Math.max(1, Math.min(content.previewCount, content.items.length));
  const isPreview = mode === "preview";
  const projects = isPreview ? content.items.slice(0, previewCount) : content.items;
  const inquiryHref = hasValue(content.inquiryHref)
    ? content.inquiryHref
    : "/showcase#contact";
  const showAllCta =
    isPreview && hasValue(content.showAllLabel) && hasValue(content.allProjectsPath);

  return (
    <section className="max-w-6xl mx-auto px-6 py-16" data-reveal-section>
      <SectionTitle title={content.title} sectionId={content.sectionId} />

      <div className="flex justify-between items-center">

        <p className="mb-5 text-base text-secondary-text-light dark:text-secondary-text-dark">
          {content.intro}
        </p>

        {showAllCta && (
          <div className="mb-6 flex justify-end">
            <Link
              href={content.allProjectsPath}
              className="px-4 py-2 rounded-lg border border-blue-600 text-blue-700 dark:text-blue-300 dark:border-blue-300 text-sm font-semibold hover:bg-blue-50 dark:hover:bg-slate-700 transition"
              data-magnetic-link
              onClick={() =>
                trackEvent("show_all_projects_click", {
                  cta_href: content.allProjectsPath,
                })
              }
            >
              {content.showAllLabel}
            </Link>
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            inquiryHref={inquiryHref}
            inquiryCtaLabel={content.inquiryCtaLabel}
          />
        ))}
      </div>
    </section>
  );
};

export default Projects;
