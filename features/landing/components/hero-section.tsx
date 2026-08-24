import * as React from "react";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowDown, Check } from "lucide-react";
import { ConnectGithubCta } from "./connect-github-cta";
import { HeroPreview } from "@/features/landing/components/hero-preview";

// Custom GitHub SVG
function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export function HeroSection() {
  return (
    <section className="relative flex min-h-[calc(100vh-3.5rem)] w-full items-center justify-center pt-20 pb-16 px-4 overflow-hidden bg-background">
      
      {/* Subtle Premium Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--color-ai-glow)_0%,transparent_50%)] pointer-events-none opacity-40 dark:opacity-20" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(var(--color-foreground),0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(var(--color-foreground),0.03)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black,transparent)] pointer-events-none" />

      <div className="relative z-10 mx-auto w-full max-w-7xl grid grid-cols-1 xl:grid-cols-[1fr_1.1fr] gap-12 lg:gap-8 items-center">
        
        {/* Left Column: Messaging & CTAs */}
        <div className="flex flex-col items-center xl:items-start text-center xl:text-left gap-6">
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter mb-6 text-foreground leading-[1.15] animate-in fade-in slide-in-from-bottom-8 duration-1000">
            AI code review that <br className="hidden sm:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-ai-cyan to-blue-500">
              understands your repository.
            </span>
          </h1>

          <p className="mx-auto max-w-[700px] text-lg text-muted-foreground sm:text-xl mb-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-150 fill-mode-both">
            Review pull requests with repository-wide context instead of analyzing only changed lines.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mt-2 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300 fill-mode-both">
            <ConnectGithubCta 
              size="lg" 
              iconSize="md"
              className="w-full sm:w-auto h-12 px-6 text-base bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm hover:shadow-[0_0_20px_-5px_rgba(var(--color-ai-accent),0.4)]" 
            />
            <Link href="#how-it-works" className={buttonVariants({ variant: "outline", size: "lg", className: "w-full sm:w-auto h-12 px-6 text-base group bg-background/50 backdrop-blur-sm border-border hover:bg-muted/50" })}>
              See how it works
              <ArrowDown className="ml-2 h-4 w-4 opacity-70 group-hover:translate-y-1 transition-transform" />
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center xl:justify-start gap-x-6 gap-y-2 mt-6 text-sm font-medium text-muted-foreground w-full">
            <div className="flex items-center gap-1.5">
              <Check className="h-4 w-4 text-ai-cyan" />
              GitHub Integration
            </div>
            <div className="flex items-center gap-1.5">
              <Check className="h-4 w-4 text-ai-cyan" />
              Repository Context
            </div>
            <div className="flex items-center gap-1.5">
              <Check className="h-4 w-4 text-ai-cyan" />
              AI-Powered Reviews
            </div>
          </div>

        </div>

        {/* Right Column: Interactive Preview */}
        <div className="w-full flex justify-center xl:justify-end relative mt-8 xl:mt-0">
          <HeroPreview />
        </div>

      </div>
    </section>
  );
}
