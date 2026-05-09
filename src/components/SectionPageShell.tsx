import React from "react";
import SiteMotionEnhancer from "@/components/SiteMotionEnhancer";

interface SectionPageShellProps {
  warning?: string;
  children: React.ReactNode;
}

const sectionStyle = "min-h-screen min-w-screen app-bg";

export default function SectionPageShell({
  warning,
  children,
}: SectionPageShellProps) {
  return (
    <main className={sectionStyle}>
      <SiteMotionEnhancer />
      {warning && (
        <div className="max-w-6xl mx-auto px-6 pt-4">
          <div className="rounded-lg border border-amber-300 bg-amber-50 text-amber-900 dark:bg-amber-950/50 dark:border-amber-700 dark:text-amber-200 px-4 py-3 text-sm">
            {warning}
          </div>
        </div>
      )}
      <div className="max-w-6xl text-center md:text-left space-y-6 mx-auto">
        {children}
      </div>
    </main>
  );
}
