'use client';
import React, { useEffect, useRef } from "react";
// import dynamic from "next/dynamic";
// import { Player } from "@lottiefiles/react-lottie-player";
import gsap from "gsap";

// const LottiePlayer = dynamic(
//     () => import("@lottiefiles/react-lottie-player").then((mod) => mod.Player),
//     { ssr: false }
// );
import Lottie from "lottie-react";

// Import JSON animations (download from Lottiefiles)
import devAnimation from "../assets/lottieFiles/dev2.json"; // main developer animation
// import reactLogo from "../assets/lottieFiles/react.json";
// import nodeLogo from "../assets/lottieFiles/node.json";
// import angularLogo from "../assets/lottieFiles/angular.json";

export default function HeroSection() {
    const iconsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Floating icons animation
        if (iconsRef.current) {
            gsap.to(iconsRef.current.querySelectorAll(".icon"), {
                y: -20,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                duration: 2,
                stagger: 0.3,
            });
        }
    }, []);

    return (
        <section className="min-h-screen flex flex-col md:flex-row items-center justify-between dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-black text-white px-8">
            {/* LEFT: Intro Text */}
            <div className="max-w-xl text-center md:text-left space-y-6">
                <h1 className="text-5xl md:text-6xl font-bold">
                    Hi, I’m <span className="text-blue-400">Devendra Kumar</span>
                </h1>
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-300">
                    Frontend-Focused Full Stack Developer
                </h2>
                <p className="text-gray-400 leading-relaxed">
                    With <span className="text-white font-semibold">7+ years of experience</span> building enterprise-grade
                    applications in finance, fitness, and event management. Skilled in{" "}
                    <span className="text-blue-400 font-semibold">React, Angular, Node.js, Express</span>, and performance-focused UI
                    architecture. Experienced with API integration, real-time apps, and team leadership.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                    <a
                        href="#projects"
                        className="px-6 py-3 rounded-lg bg-blue-500 hover:bg-blue-600 transition font-medium"
                    >
                        View My Work
                    </a>
                    <a
                        href="#contact"
                        className="px-6 py-3 rounded-lg border border-gray-500 hover:bg-gray-800 transition font-medium"
                    >
                        Contact Me
                    </a>
                </div>
            </div>

            {/* RIGHT: Animation + Floating Icons */}
            <div className="relative mt-10 md:mt-0 w-full md:w-1/2 flex items-center justify-center">
                {/* Main Developer Animation */}
                <Lottie autoplay loop animationData={devAnimation} className="w-90 h-90" />

                {/* Floating Tech Icons */}
                {/* <div ref={iconsRef}>
                    <div className="icon absolute top-10 left-10 w-16">
                        <Lottie autoplay loop animationData={reactLogo} />
                    </div>
                    <div className="icon absolute bottom-16 left-1/4 w-14">
                        <Lottie autoplay loop animationData={nodeLogo} />
                    </div>
                    <div className="icon absolute top-20 right-16 w-14">
                        <Lottie autoplay loop animationData={angularLogo} />
                    </div>
                </div> */}
            </div>
        </section>
    );
}
