import React from "react";
import type { Metadata } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { QueryProvider } from "@/components/providers/query-provider";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const interHeading = Inter({
  subsets: ['latin'],
  variable: '--font-heading',
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RepoReview — AI Code Review with Repository Context",
  description: "RepoReview uses repository-wide context to help developers review pull requests with deeper AI-powered analysis.",
  openGraph: {
    title: "RepoReview — AI Code Review with Repository Context",
    description: "RepoReview uses repository-wide context to help developers review pull requests with deeper AI-powered analysis.",
    type: "website",
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("h-full", "antialiased", inter.variable, interHeading.variable, geistMono.variable, "font-sans")}
    >
      <body className="min-h-full flex flex-col">
        <QueryProvider>
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
        {children}
        </ThemeProvider>
        </QueryProvider>
        </body>
    </html>
  );
}
