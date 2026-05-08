'use client';

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useReducedMotion from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export default function SiteMotionEnhancer() {
  const prefersReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (prefersReducedMotion) {
        return;
      }

      const cleanups: Array<() => void> = [];
      const sections = gsap.utils.toArray<HTMLElement>("[data-reveal-section]");

      sections.forEach((section) => {
        const sectionTitle = section.querySelector<HTMLElement>(".section-title");
        const items = section.querySelectorAll<HTMLElement>("[data-reveal-item]");

        const timeline = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: {
            trigger: section,
            start: "top 78%",
            once: true,
          },
        });

        if (sectionTitle) {
          timeline.from(sectionTitle, {
            y: 26,
            autoAlpha: 0,
            duration: 0.6,
            clearProps: "transform,opacity,visibility",
          });
        }

        if (items.length) {
          timeline.from(
            items,
            {
              y: 34,
              autoAlpha: 0,
              scale: 0.985,
              duration: 0.64,
              stagger: 0.08,
              clearProps: "transform,opacity,visibility",
            },
            sectionTitle ? "-=0.28" : 0,
          );
        }
      });

      const hoverCards = gsap.utils.toArray<HTMLElement>("[data-hover-lift]");
      hoverCards.forEach((card) => {
        const onEnter = () => {
          gsap.to(card, {
            y: -8,
            scale: 1.01,
            duration: 0.28,
            ease: "power2.out",
            boxShadow: "0 24px 45px rgba(15, 23, 42, 0.18)",
            overwrite: "auto",
          });
        };
        const onLeave = () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            duration: 0.35,
            ease: "power3.out",
            clearProps: "boxShadow",
            overwrite: "auto",
          });
        };

        card.addEventListener("mouseenter", onEnter);
        card.addEventListener("mouseleave", onLeave);
        cleanups.push(() => {
          card.removeEventListener("mouseenter", onEnter);
          card.removeEventListener("mouseleave", onLeave);
        });
      });

      const magneticLinks = gsap.utils.toArray<HTMLElement>("[data-magnetic-link]");
      magneticLinks.forEach((link) => {
        const xTo = gsap.quickTo(link, "x", { duration: 0.28, ease: "power2.out" });
        const yTo = gsap.quickTo(link, "y", { duration: 0.28, ease: "power2.out" });

        const onMove = (event: MouseEvent) => {
          const bounds = link.getBoundingClientRect();
          const offsetX = event.clientX - (bounds.left + bounds.width / 2);
          const offsetY = event.clientY - (bounds.top + bounds.height / 2);
          xTo(offsetX * 0.16);
          yTo(offsetY * 0.18);
        };

        const onLeave = () => {
          xTo(0);
          yTo(0);
        };

        link.addEventListener("mousemove", onMove);
        link.addEventListener("mouseleave", onLeave);
        cleanups.push(() => {
          link.removeEventListener("mousemove", onMove);
          link.removeEventListener("mouseleave", onLeave);
        });
      });

      return () => {
        cleanups.forEach((cleanup) => cleanup());
      };
    },
    { dependencies: [prefersReducedMotion], revertOnUpdate: true },
  );

  return null;
}
