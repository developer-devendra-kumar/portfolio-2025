'use client';

import React, { useRef } from "react";
import SectionTitle from "./UI/SectionTitle";
import MyJourneyCard from "./UI/MyJourneyCard";
import type { JourneyContent } from "@/types/content";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import useReducedMotion from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

interface MyJourneyProps {
  content: JourneyContent;
}

const MyJourney: React.FC<MyJourneyProps> = ({ content }) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const lineRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (prefersReducedMotion) {
        return;
      }

      const section = sectionRef.current;
      const track = trackRef.current;
      const line = lineRef.current;
      if (!section || !track || !line) {
        return;
      }

      gsap.set(line, { scaleY: 0, transformOrigin: "top center" });

      const cards = gsap.utils.toArray<HTMLElement>(".journey-card");
      const growLineToCard = (card: HTMLElement) => {
        const trackRect = track.getBoundingClientRect();
        const cardRect = card.getBoundingClientRect();
        const cardCenter = cardRect.top + cardRect.height / 2 - trackRect.top;
        const extraReach = 10;
        const targetProgress = gsap.utils.clamp(
          0,
          1,
          (cardCenter + extraReach) / trackRect.height,
        );

        gsap.to(line, {
          scaleY: targetProgress,
          duration: 0.22,
          ease: "power2.out",
          overwrite: "auto",
        });
      };

      ScrollTrigger.create({
        trigger: section,
        start: "top 88%",
        onLeaveBack: () => {
          gsap.to(line, {
            scaleY: 0,
            duration: 0.18,
            ease: "power2.out",
            overwrite: "auto",
          });
        },
      });

      cards.forEach((card, index) => {
        ScrollTrigger.create({
          trigger: card,
          start: "top 86%",
          onEnter: () => growLineToCard(card),
          onEnterBack: () => growLineToCard(card),
        });

        gsap.from(card, {
          x: index % 2 === 0 ? -54 : 54,
          y: 26,
          rotate: index % 2 === 0 ? -1.5 : 1.5,
          autoAlpha: 0,
          duration: 0.7,
          ease: "power3.out",
          clearProps: "transform,opacity,visibility",
          scrollTrigger: {
            trigger: card,
            start: "top 84%",
            once: true,
          },
        });
      });

      gsap.from(section.querySelectorAll(".journey-dot"), {
        scale: 0.2,
        autoAlpha: 0,
        duration: 0.45,
        ease: "back.out(1.7)",
        stagger: 0.08,
        scrollTrigger: {
          trigger: section,
          start: "top 74%",
          once: true,
        },
      });
    },
    { scope: sectionRef, dependencies: [prefersReducedMotion] },
  );

  return (
    <section
      ref={sectionRef}
      className="max-w-6xl mx-auto px-6 py-12"
      id={content.sectionId}
    >
      <SectionTitle title={content.title} />

      <div ref={trackRef} className="relative">
        <div
          ref={lineRef}
          className="absolute left-4 sm:left-1/2 sm:-translate-x-1/2 top-0 bottom-0 w-1 bg-blue-300 dark:bg-blue-700 rounded-full"
        />

        <div className="space-y-6">
          {content.milestones.map((milestone, index) => (
            <article
              key={`${milestone.year}-${index + 1}`}
              className={`journey-card relative rounded-xl p-4 bg-white dark:bg-slate-800 shadow-sm border border-blue-100 dark:border-slate-700 ml-10 sm:ml-0 sm:w-[48%] ${
                index % 2 === 0 ? "sm:mr-auto" : "sm:ml-auto"
              }`}
            >
              <div
                className={`journey-dot absolute -left-7 sm:top-1/2 sm:-translate-y-1/2 w-3 h-3 rounded-full bg-blue-600 ${
                  index % 2 === 0
                    ? "sm:left-auto sm:right-[-18px]"
                    : "sm:left-[-18px] sm:right-auto"
                }`}
              />
              <MyJourneyCard title={milestone.year} info={milestone.info} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MyJourney;
