import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Devendra Kumar - Portfolio",
  description: "Devendra Kumar - Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <div className="min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
