'use client';
import React, { useEffect, useMemo, useRef, useState } from "react";
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
    const roleTextRef = useRef<HTMLSpanElement>(null);
    const prefersReducedMotion = useReducedMotion();
    const roleTitles = useMemo(() => {
        const configuredTitles =
            content.roleTitles?.map((title) => title.trim()).filter(Boolean) ?? [];

        if (configuredTitles.length > 0) {
            return configuredTitles;
        }

        return [content.role];
    }, [content.role, content.roleTitles]);
    const [currentRoleIndex, setCurrentRoleIndex] = useState(0);

    useEffect(() => {
        setCurrentRoleIndex(0);
    }, [roleTitles]);

    useEffect(() => {
        if (prefersReducedMotion || roleTitles.length <= 1) {
            return;
        }

        const roleNode = roleTextRef.current;
        const intervalId = window.setInterval(() => {
            const animatedNode = roleTextRef.current;

            if (!animatedNode) {
                setCurrentRoleIndex((prev) => (prev + 1) % roleTitles.length);
                return;
            }

            gsap.to(animatedNode, {
                y: -14,
                rotateX: 72,
                autoAlpha: 0,
                duration: 0.24,
                ease: "power2.in",
                onComplete: () => {
                    setCurrentRoleIndex((prev) => (prev + 1) % roleTitles.length);
                },
            });
        }, 2400);

        return () => {
            window.clearInterval(intervalId);
            if (roleNode) {
                gsap.killTweensOf(roleNode);
            }
        };
    }, [prefersReducedMotion, roleTitles.length]);

    useEffect(() => {
        if (prefersReducedMotion) {
            return;
        }

        const roleNode = roleTextRef.current;
        if (!roleNode) {
            return;
        }

        gsap.fromTo(
            roleNode,
            {
                y: 16,
                rotateX: -72,
                autoAlpha: 0,
            },
            {
                y: 0,
                rotateX: 0,
                autoAlpha: 1,
                duration: 0.36,
                ease: "power3.out",
                overwrite: "auto",
            },
        );
    }, [currentRoleIndex, prefersReducedMotion]);

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
                className="max-w-6xl mx-auto w-full min-h-[calc(100vh-74px)] grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-12 items-center px-6 py-12 md:py-16"
            >
                <div>
                    <p className="hero-line text-sm md:text-base uppercase tracking-[0.14em] text-secondary-text-light dark:text-secondary-text-dark">
                        {content.greeting}
                    </p>

                    <h1 className="hero-line mt-2 text-4xl sm:text-5xl lg:text-6xl font-bold text-text-light dark:text-text-dark leading-tight">
                        {content.name}
                    </h1>

                    <h2 className="hero-line mt-2 text-xl md:text-2xl font-semibold text-blue-700 dark:text-blue-300">
                        <span className="inline-flex min-h-[1.5em] items-center [perspective:1000px]">
                            <span
                                ref={roleTextRef}
                                className="block will-change-transform [transform-style:preserve-3d]"
                            >
                                {roleTitles[currentRoleIndex]}
                            </span>
                        </span>
                    </h2>

                    <div className="mt-5 space-y-3 max-w-2xl">
                        {content.summary.map((line) => (
                            <p
                                key={line}
                                className="hero-line text-base md:text-lg text-text-light dark:text-text-dark leading-relaxed"
                            >
                                {line}
                            </p>
                        ))}
                    </div>

                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl">
                        {content.metrics.map((metric) => (
                            <div
                                key={metric.label}
                                className="hero-metric rounded-xl p-3 bg-white/85 dark:bg-slate-800/70 border border-blue-100 dark:border-slate-700 shadow-sm"
                            >
                                <p className="text-xs uppercase tracking-wide text-secondary-text-light dark:text-secondary-text-dark">
                                    {metric.label}
                                </p>
                                <p className="text-base font-semibold text-text-light dark:text-text-dark mt-1">
                                    {metric.value}
                                </p>
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
                                className={`hero-cta px-5 py-2.5 rounded-lg font-semibold transition-all will-change-transform ${cta.variant === "primary"
                                    ? "bg-blue-600 text-white hover:bg-blue-700"
                                    : "border border-blue-600 text-blue-700 dark:text-blue-300 dark:border-blue-300 hover:bg-blue-50 dark:hover:bg-slate-800"
                                    }`}
                            >
                                {cta.label}
                            </a>
                        ))}
                    </div>
                </div>
                <div className="relative mt-4 lg:mt-0 flex items-center justify-center">
                    <div className="hero-lottie-ring absolute w-[15rem] h-[15rem] sm:w-[18rem] sm:h-[18rem] lg:w-[21rem] lg:h-[21rem] rounded-full border border-blue-500/30 dark:border-blue-300/20" />
                    <div className="hero-lottie-ring absolute w-[16.5rem] h-[16.5rem] sm:w-[19.5rem] sm:h-[19.5rem] lg:w-[22.5rem] lg:h-[22.5rem] rounded-full border border-amber-500/30 dark:border-amber-300/20" />
                    <div className="hero-lottie-shell relative w-[14rem] h-[14rem] sm:w-[17rem] sm:h-[17rem] lg:w-[20rem] lg:h-[20rem] rounded-full bg-white/55 dark:bg-slate-900/55 backdrop-blur-sm border border-white/40 dark:border-slate-700/60 shadow-[0_20px_50px_rgba(15,23,42,0.24)] flex items-center justify-center">
                        <Lottie autoplay loop animationData={devAnimation} className="w-[11.5rem] h-[11.5rem] sm:w-[14rem] sm:h-[14rem] lg:w-[16.5rem] lg:h-[16.5rem]" />
                    </div>
                </div>
                {content.scrollHint && (
                    <div className="hero-scroll-hint lg:col-span-2 mt-2">
                        <p className="text-center text-sm md:text-base text-secondary-text-light dark:text-secondary-text-dark flex items-center justify-center gap-2">
                            {content.scrollHint}
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-mouse animate-bounce" viewBox="0 0 16 16">
                                <path d="M8 3a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 3m4 8a4 4 0 0 1-8 0V5a4 4 0 1 1 8 0zM8 0a5 5 0 0 0-5 5v6a5 5 0 0 0 10 0V5a5 5 0 0 0-5-5" />
                            </svg>
                        </p>
                    </div>
                )}
            </div>
        </>
    );
}
