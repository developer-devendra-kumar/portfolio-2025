'use client';

import Image from "next/image";
import React, { useRef } from "react";
import devPhoto from "../assets/images/cartoon-dev.png";
import SectionTitle from "./UI/SectionTitle";
import Paragraph from "./UI/Paragraph";
import type { AboutContent } from "@/types/content";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import useReducedMotion from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

interface AboutProps {
  content: AboutContent;
}

const About: React.FC<AboutProps> = ({ content }) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (prefersReducedMotion) {
        return;
      }

      const section = sectionRef.current;
      if (!section) {
        return;
      }

      const title = section.querySelector(".about-title");
      const photo = section.querySelector(".about-photo");
      const paragraphs = section.querySelectorAll(".about-paragraph");
      const cards = section.querySelectorAll(".about-skill-card");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          once: true,
        },
      });

      tl.from(title, {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
      })
        .from(
          photo,
          {
            x: -40,
            opacity: 0,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.2",
        )
        .from(
          paragraphs,
          {
            y: 20,
            opacity: 0,
            stagger: 0.15,
            duration: 0.5,
            ease: "power2.out",
          },
          "-=0.2",
        )
        .from(
          cards,
          {
            y: 30,
            opacity: 0,
            stagger: 0.08,
            duration: 0.45,
            ease: "power2.out",
          },
          "-=0.1",
        );

      if (photo) {
        gsap.to(photo, {
          y: -8,
          duration: 2.8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    },
    { scope: sectionRef, dependencies: [prefersReducedMotion] },
  );

  return (
    <section
      ref={sectionRef}
      className="max-w-5xl mx-auto px-6 py-12"
      id={content.sectionId}
    >
      <div className="about-title">
        <SectionTitle title={content.title} accentId="aboutMe" />
      </div>

      <div className="grid md:grid-cols-2 gap-10 items-center mb-8">
        <div className="flex justify-center">
          <Image
            src={devPhoto}
            className="about-photo w-60 h-auto rounded-2xl shadow-lg border-4 border-blue-500/30"
            alt="Devendra"
          />
        </div>

        <div>
          {content.paragraphs.map((paragraph, index) => (
            <Paragraph
              key={`${content.sectionId}-paragraph-${index + 1}`}
              id={`aboutMeText${index + 1}`}
              className="about-paragraph"
              text={paragraph}
            />
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {content.skills.map((skill) => (
          <div
            key={skill.title}
            className="about-skill-card p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md will-change-transform"
            data-hover-lift
          >
            <h3 className="font-semibold text-text-light dark:text-text-dark">{skill.title}</h3>
            <p className="text-sm text-text-light dark:text-text-dark">{skill.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default About;
