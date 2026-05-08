'use client';
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import Lottie from "lottie-react";
import devAnimation from "../assets/lottieFiles/dev2.json";
import type { HeroContent } from "@/types/content";
import useReducedMotion from "@/hooks/useReducedMotion";
import { trackEvent } from "@/utils/analytics";

interface IntroSectionProps {
    content: HeroContent;
}

export default function IntroSection({ content }: IntroSectionProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const prefersReducedMotion = useReducedMotion();

    useEffect(() => {
        if (prefersReducedMotion) {
            return;
        }

        const ctx = gsap.context(() => {
            const introLines = gsap.utils.toArray<HTMLElement>(".hero-line");
            const metrics = gsap.utils.toArray<HTMLElement>(".hero-metric");
            const ctas = gsap.utils.toArray<HTMLElement>(".hero-cta");
            const lottieShell = containerRef.current?.querySelector<HTMLElement>(".hero-lottie-shell");
            const lottieRings = containerRef.current?.querySelectorAll<HTMLElement>(".hero-lottie-ring");
            const scrollHint = containerRef.current?.querySelector<HTMLElement>(".hero-scroll-hint");

            const introTimeline = gsap.timeline({
                defaults: { ease: "power3.out" },
            });

            introTimeline
                .from(introLines, {
                    y: 42,
                    autoAlpha: 0,
                    duration: 0.9,
                    stagger: 0.14,
                })
                .from(
                    metrics,
                    {
                        y: 28,
                        autoAlpha: 0,
                        scale: 0.96,
                        duration: 0.56,
                        stagger: 0.08,
                    },
                    "-=0.48",
                )
                .from(
                    ctas,
                    {
                        y: 22,
                        autoAlpha: 0,
                        duration: 0.54,
                        stagger: 0.1,
                    },
                    "-=0.34",
                );

            if (lottieShell) {
                introTimeline.from(
                    lottieShell,
                    {
                        x: 36,
                        autoAlpha: 0,
                        scale: 0.9,
                        duration: 0.9,
                    },
                    "-=0.74",
                );
            }

            if (scrollHint) {
                introTimeline.from(
                    scrollHint,
                    {
                        y: 16,
                        autoAlpha: 0,
                        duration: 0.52,
                    },
                    "-=0.3",
                );
            }

            if (lottieShell) {
                gsap.to(lottieShell, {
                    y: -10,
                    rotate: 1.5,
                    duration: 3.2,
                    ease: "sine.inOut",
                    repeat: -1,
                    yoyo: true,
                });
            }

            if (lottieRings?.length) {
                lottieRings.forEach((ring, index) => {
                    gsap.to(ring, {
                        rotate: index % 2 === 0 ? 360 : -360,
                        duration: index % 2 === 0 ? 16 : 24,
                        ease: "none",
                        repeat: -1,
                    });
                });
            }

        }, containerRef);

        return () => {
            ctx.revert();
        };
    }, [prefersReducedMotion]);

    return (
        <>
            <div
                id={content.sectionId}
                ref={containerRef}
                className="w-full min-h-[calc(100vh-70px)] grid grid-cols-1 lg:grid-cols-2 gap-4 items-center justify-center px-6 md:px-8"
            >
                <div className="">
                    {/* Greeting */}
                    <p className="hero-line text-lg text-secondary-text-light dark:text-secondary-text-dark">
                        {content.greeting}
                    </p>

                    {/* Name */}
                    <h1 className="hero-line text-5xl md:text-6xl font-bold text-text-light dark:text-text-dark mb-3">
                        {content.name}
                    </h1>

                    {/* Title */}
                    <h2 className="hero-line text-2xl md:text-3xl font-semibold text-text-light dark:text-text-dark mb-3">
                        {content.role}
                    </h2>

                    {/* About */}
                    {content.summary.map((line) => (
                        <p
                            key={line}
                            className="hero-line mt-4 text-lg text-text-light dark:text-text-dark leading-relaxed"
                        >
                            {line}
                        </p>
                    ))}

                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {content.metrics.map((metric) => (
                            <div
                                key={metric.label}
                                className="hero-metric rounded-xl p-3 bg-white/80 dark:bg-slate-800/70 shadow-sm"
                            >
                                <p className="text-sm text-secondary-text-light dark:text-secondary-text-dark">{metric.label}</p>
                                <p className="text-base font-semibold text-text-light dark:text-text-dark">{metric.value}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 flex flex-wrap gap-3">
                        {content.ctas.map((cta) => (
                            <a
                                key={cta.label}
                                href={cta.href}
                                aria-label={cta.label}
                                data-magnetic-link
                                onClick={() =>
                                    trackEvent("cta_click", {
                                        section: "hero",
                                        cta_label: cta.label,
                                        cta_href: cta.href,
                                    })
                                }
                                className={`hero-cta px-5 py-3 rounded-lg font-semibold transition-all will-change-transform ${cta.variant === "primary"
                                    ? "bg-blue-600 text-white hover:bg-blue-700"
                                    : "border border-blue-600 text-blue-700 dark:text-blue-300 dark:border-blue-300 hover:bg-blue-50 dark:hover:bg-slate-800"
                                    }`}
                            >
                                {cta.label}
                            </a>
                        ))}
                    </div>
                </div>
                <div className="relative mt-10 md:mt-0 flex items-center justify-center">
                    <div className="hero-lottie-ring absolute inset-10 rounded-full border border-blue-500/30 dark:border-blue-300/20" />
                    <div className="hero-lottie-ring absolute inset-4 rounded-full border border-amber-500/30 dark:border-amber-300/20" />
                    <div className="hero-lottie-shell relative w-[22rem] h-[22rem] rounded-full bg-white/55 dark:bg-slate-900/55 backdrop-blur-sm border border-white/40 dark:border-slate-700/60 shadow-[0_20px_50px_rgba(15,23,42,0.24)] flex items-center justify-center">
                        <Lottie autoplay loop animationData={devAnimation} className="w-[19rem] h-[19rem]" />
                    </div>
                </div>
                <div className="hero-scroll-hint lg:col-span-2 mt-2">
                    <h2 className="text-center text-3xl text-secondary-text-light dark:text-secondary-text-dark flex items-center justify-center gap-3">
                        {content.scrollHint}
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-mouse animate-bounce" viewBox="0 0 16 16">
                            <path d="M8 3a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 3m4 8a4 4 0 0 1-8 0V5a4 4 0 1 1 8 0zM8 0a5 5 0 0 0-5 5v6a5 5 0 0 0 10 0V5a5 5 0 0 0-5-5" />
                        </svg>
                    </h2>
                </div>
            </div>
        </>
    );
}
