import { useState, useEffect } from 'react';

function useSystemTheme() {
    const [systemTheme, setSystemTheme] = useState<'dark' | 'light' | null>(null);

    const toggleDarkClass = (isDark: boolean) => {
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }

    useEffect(() => {
        // Check for browser support of matchMedia
        if (!window.matchMedia) {
            console.warn("matchMedia not supported. System theme detection may not work.");
            return;
        }

        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        // Initial check
        setSystemTheme(mediaQuery.matches ? 'dark' : 'light');
        toggleDarkClass(mediaQuery.matches);
        // Listen for changes
        const handleChange = (e: MediaQueryListEvent) => {
            setSystemTheme(e.matches ? 'dark' : 'light');

            toggleDarkClass(e.matches);
        };

        mediaQuery.addEventListener('change', handleChange);

        // Cleanup listener on unmount
        return () => {
            mediaQuery.removeEventListener('change', handleChange);
        };
    }, []);

    return systemTheme;
}

export default useSystemTheme;