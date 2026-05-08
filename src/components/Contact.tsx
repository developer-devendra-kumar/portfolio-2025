'use client';

import React, { useState } from "react";
import type { ContactContent } from "@/types/content";
import SectionTitle from "./UI/SectionTitle";
import { trackEvent } from "@/utils/analytics";

interface ContactProps {
  content: ContactContent;
}

type SubmitStatus = "idle" | "submitting" | "success" | "error";

const initialFormState = {
  name: "",
  email: "",
  company: "",
  projectType: "",
  budget: "",
  timeline: "",
  message: "",
};

const Contact: React.FC<ContactProps> = ({ content }) => {
  const [formState, setFormState] = useState(initialFormState);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  const onFieldChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const submitInquiry = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitStatus("submitting");
    setSubmitMessage("");

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      });

      const result = (await response.json()) as {
        success: boolean;
        message?: string;
      };

      if (!response.ok || !result.success) {
        setSubmitStatus("error");
        setSubmitMessage(
          result.message ?? "Could not send inquiry. Please try again.",
        );
        trackEvent("inquiry_submit_failed", {
          section: "contact",
          status: response.status,
        });
        return;
      }

      setSubmitStatus("success");
      setSubmitMessage(result.message ?? "Inquiry submitted successfully.");
      setFormState(initialFormState);

      trackEvent("inquiry_submit_success", {
        section: "contact",
      });
    } catch {
      setSubmitStatus("error");
      setSubmitMessage("Unexpected error. Please try again.");
      trackEvent("inquiry_submit_failed", {
        section: "contact",
        status: 500,
      });
    }
  };

  return (
    <section className="max-w-5xl mx-auto px-6 py-16" data-reveal-section>
      <SectionTitle title={content.title} sectionId={content.sectionId} />
      <div
        className="rounded-2xl p-6 md:p-8 bg-white dark:bg-slate-800 shadow-sm will-change-transform"
        data-reveal-item
        data-hover-lift
      >
        <h3 className="text-2xl font-bold text-text-light dark:text-text-dark">
          {content.headline}
        </h3>
        <p className="mt-3 text-base text-secondary-text-light dark:text-secondary-text-dark">
          {content.intro}
        </p>

        <div className="mt-6 grid sm:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-secondary-text-light dark:text-secondary-text-dark">Email</p>
            <a
              href={`mailto:${content.email}`}
              className="text-base text-text-light dark:text-text-dark hover:underline"
              data-magnetic-link
              onClick={() =>
                trackEvent("cta_click", {
                  section: "contact",
                  cta_label: "email",
                  cta_href: `mailto:${content.email}`,
                })
              }
            >
              {content.email}
            </a>
          </div>
          <div>
            <p className="text-sm text-secondary-text-light dark:text-secondary-text-dark">Location</p>
            <p className="text-base text-text-light dark:text-text-dark">{content.location}</p>
          </div>
          <div>
            <p className="text-sm text-secondary-text-light dark:text-secondary-text-dark">Availability</p>
            <p className="text-base text-text-light dark:text-text-dark">{content.availability}</p>
          </div>
          <div>
            <p className="text-sm text-secondary-text-light dark:text-secondary-text-dark">Response Time</p>
            <p className="text-base text-text-light dark:text-text-dark">{content.responseTime}</p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={content.primaryCta.href}
            className="px-5 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition"
            aria-label={content.primaryCta.label}
            data-magnetic-link
            onClick={() =>
              trackEvent("cta_click", {
                section: "contact",
                cta_label: content.primaryCta.label,
                cta_href: content.primaryCta.href,
              })
            }
          >
            {content.primaryCta.label}
          </a>
          <a
            href={content.secondaryCta.href}
            target={content.secondaryCta.href.startsWith("http") ? "_blank" : undefined}
            rel={content.secondaryCta.href.startsWith("http") ? "noreferrer" : undefined}
            className="px-5 py-3 rounded-lg border border-blue-600 text-blue-700 dark:text-blue-300 dark:border-blue-300 hover:bg-blue-50 dark:hover:bg-slate-700 font-semibold transition"
            aria-label={content.secondaryCta.label}
            data-magnetic-link
            onClick={() =>
              trackEvent("cta_click", {
                section: "contact",
                cta_label: content.secondaryCta.label,
                cta_href: content.secondaryCta.href,
              })
            }
          >
            {content.secondaryCta.label}
          </a>
        </div>

        <form onSubmit={submitInquiry} className="mt-8 grid md:grid-cols-2 gap-4">
          <input
            name="name"
            type="text"
            required
            placeholder="Your name"
            value={formState.name}
            onChange={onFieldChange}
            aria-label="Your name"
            className="rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-3 py-2 text-text-light dark:text-text-dark"
          />
          <input
            name="email"
            type="email"
            required
            placeholder="Your email"
            value={formState.email}
            onChange={onFieldChange}
            aria-label="Your email"
            className="rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-3 py-2 text-text-light dark:text-text-dark"
          />
          <input
            name="company"
            type="text"
            placeholder="Company (optional)"
            value={formState.company}
            onChange={onFieldChange}
            aria-label="Company"
            className="rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-3 py-2 text-text-light dark:text-text-dark"
          />
          <input
            name="projectType"
            type="text"
            placeholder="Project type (optional)"
            value={formState.projectType}
            onChange={onFieldChange}
            aria-label="Project type"
            className="rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-3 py-2 text-text-light dark:text-text-dark"
          />
          <input
            name="budget"
            type="text"
            placeholder="Budget (optional)"
            value={formState.budget}
            onChange={onFieldChange}
            aria-label="Budget"
            className="rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-3 py-2 text-text-light dark:text-text-dark"
          />
          <input
            name="timeline"
            type="text"
            placeholder="Timeline (optional)"
            value={formState.timeline}
            onChange={onFieldChange}
            aria-label="Timeline"
            className="rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-3 py-2 text-text-light dark:text-text-dark"
          />
          <textarea
            name="message"
            required
            placeholder="Project details"
            value={formState.message}
            onChange={onFieldChange}
            aria-label="Project details"
            className="md:col-span-2 min-h-32 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-3 py-2 text-text-light dark:text-text-dark"
          />
          <div className="md:col-span-2 flex items-center gap-3">
            <button
              type="submit"
              disabled={submitStatus === "submitting"}
              className="px-5 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white font-semibold transition"
            >
              {submitStatus === "submitting" ? "Submitting..." : "Send Inquiry"}
            </button>
            {submitMessage && (
              <p
                className={`text-sm ${
                  submitStatus === "error"
                    ? "text-red-600 dark:text-red-300"
                    : "text-emerald-700 dark:text-emerald-300"
                }`}
              >
                {submitMessage}
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
