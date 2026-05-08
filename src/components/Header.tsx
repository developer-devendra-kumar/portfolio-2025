'use client';

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import devLogoDark from "../assets/images/dev-logo-dark.svg";
import devLogoLight from "../assets/images/dev-logo-light.svg";
import type { NavigationItem } from "@/types/content";
import useReducedMotion from "@/hooks/useReducedMotion";
import { trackEvent } from "@/utils/analytics";

interface HeaderProps {
    navigation: NavigationItem[];
}

const ballStyle = {
    light:
        "bg-white w-[22px] h-[22px] absolute left-[2] top-[2] rounded-[50%] transition-transform",
    dark: "bg-black w-[22px] h-[22px] absolute left-[2] top-[2] rounded-[50%] transition-transform translate-x-6",
};

const headerStyle = "w-full sticky top-0 left-0 shadow-sm z-50";
const mobileMenuStyle =
    "hidden z-99 rounded-lg border-2 w-screen h-screen fixed top-0 left-0";

const Header: React.FC<HeaderProps> = ({ navigation }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const prefersReducedMotion = useReducedMotion();

    const menuRef = useRef<HTMLDivElement>(null);
    const hasMountedRef = useRef(false);

    const applyTheme = (isDark: boolean) => {
        if (isDark) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
        localStorage.setItem("theme", isDark ? "dark" : "light");
        setIsDarkMode(isDark);
    };

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const shouldUseDark = savedTheme ? savedTheme === "dark" : prefersDark;

        applyTheme(shouldUseDark);
    }, []);

    useEffect(() => {
        if (!menuRef.current) {
            return;
        }

        if (!hasMountedRef.current) {
            hasMountedRef.current = true;
            menuRef.current.style.display = "none";
            return;
        }

        if (prefersReducedMotion) {
            menuRef.current.style.display = isMobileMenuOpen ? "block" : "none";
            return;
        }

        if (isMobileMenuOpen) {
            gsap.fromTo(
                menuRef.current,
                {
                    y: -(window.innerHeight / 2),
                    scale: 0,
                    opacity: 0,
                    display: "none",
                },
                {
                    duration: 0.8,
                    scale: 1,
                    opacity: 1,
                    y: 0,
                    display: "block",
                    ease: "power3.out",
                },
            );
            return;
        }

        gsap.fromTo(
            menuRef.current,
            {
                scale: 1,
                opacity: 1,
                display: "block",
            },
            {
                duration: 0.8,
                y: -(window.innerHeight / 2),
                opacity: 0,
                scale: 0,
                ease: "power3.in",
                onComplete: () => {
                    if (menuRef.current) {
                        menuRef.current.style.display = "none";
                    }
                },
            },
        );
    }, [isMobileMenuOpen, prefersReducedMotion]);

    const darkModeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        applyTheme(event.target.checked);
    };

    const toggleMenuMobile = () => {
        setIsMobileMenuOpen((previous) => !previous);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <header className={`${headerStyle} ${isDarkMode ? "app-bg-dark" : "app-bg-light"}`}>
            <nav className="flex flex-wrap justify-between items-center px-4 py-2">
                <a href="#home" aria-label="Go to home section">
                    <Image
                        id="logo"
                        src={isDarkMode ? devLogoLight : devLogoDark}
                        alt="Devendra Kumar Logo"
                        width={50}
                        height={50}
                    />
                </a>

                <ul className="md:flex flex-wrap justify-end items-center gap-4 hidden">
                    {navigation.map((item) => (
                        <MenuItem
                            key={item.sectionId}
                            text={item.label}
                            linkId={item.sectionId}
                        />
                    ))}
                </ul>

                <div
                    ref={menuRef}
                    className={`${mobileMenuStyle} ${isDarkMode ? "app-bg-dark" : "app-bg-light"}`}
                >
                    <ul className="flex flex-wrap flex-col justify-center items-center gap-10 p-4 h-full">
                        {navigation.map((item) => (
                            <MenuItem
                                key={`mobile-${item.sectionId}`}
                                text={item.label}
                                linkId={item.sectionId}
                                onClick={closeMobileMenu}
                            />
                        ))}
                        <li>
                            <button
                                className="p-4 bg-primary-light dark:bg-primary-dark text-white rounded-full"
                                onClick={toggleMenuMobile}
                                aria-label="Close mobile menu"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="24px"
                                    viewBox="0 -960 960 960"
                                    width="24px"
                                    fill="#e3e3e3"
                                >
                                    <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                                </svg>
                            </button>
                        </li>
                    </ul>
                </div>

                <button
                    className="flex flex-wrap justify-center items-center md:hidden border rounded-bl-xl rounded-br-xl shadow-sm -translate-y-4 w-30"
                    onClick={toggleMenuMobile}
                    aria-label="Toggle mobile menu"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        className="size-9 text-text-light dark:text-text-dark"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill="currentColor"
                    >
                        <path d="M480-360 280-560h400L480-360Z" />
                    </svg>
                </button>

                <div>
                    <input
                        type="checkbox"
                        className="opacity-0 absolute"
                        id="checkbox"
                        checked={isDarkMode}
                        onChange={darkModeHandler}
                    />
                    <label
                        htmlFor="checkbox"
                        className="bg-blue-400 rounded-[50px] w-[50px] h-[26px] relative p-2 cursor-pointer flex justify-between items-center"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="24px"
                            viewBox="0 -960 960 960"
                            width="24px"
                            fill="#e3e3e3"
                        >
                            <path d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Zm0-80q88 0 158-48.5T740-375q-20 5-40 8t-40 3q-123 0-209.5-86.5T364-660q0-20 3-40t8-40q-78 32-126.5 102T200-480q0 116 82 198t198 82Zm-10-270Z" />
                        </svg>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="24px"
                            viewBox="0 -960 960 960"
                            width="24px"
                            fill="#e3e3e3"
                        >
                            <path d="M480-360q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Zm0 80q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280ZM200-440H40v-80h160v80Zm720 0H760v-80h160v80ZM440-760v-160h80v160h-80Zm0 720v-160h80v160h-80ZM256-650l-101-97 57-59 96 100-52 56Zm492 496-97-101 53-55 101 97-57 59Zm-98-550 97-101 59 57-100 96-56-52ZM154-212l101-97 55 53-97 101-59-57Zm326-268Z" />
                        </svg>
                        <span className={ballStyle[isDarkMode ? "dark" : "light"]}></span>
                    </label>
                </div>
            </nav>
        </header>
    );
};

export default Header;

interface MenuItemProps {
    text: string;
    linkId: string;
    onClick?: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ text, linkId, onClick }) => {
    return (
        <li>
            <a
                href={`#${linkId}`}
                className="text-xl font-semibold text-text-light dark:text-text-dark hover:text-primary-light focus:text-primary-light"
                onClick={() => {
                    trackEvent("navigation_click", {
                        label: text,
                        section: linkId,
                    });
                    onClick?.();
                }}
            >
                {text}
            </a>
        </li>
    );
};
