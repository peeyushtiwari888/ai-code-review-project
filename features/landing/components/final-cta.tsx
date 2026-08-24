import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// Custom GitHub SVG for reliability
function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export function FinalCta() {
  return (
    <section className="relative flex flex-col items-center justify-center py-24 px-4 w-full bg-background overflow-hidden border-t border-border/50">
      
      {/* Decorative Ambient Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_center,var(--color-ai-glow)_0%,transparent_60%)] pointer-events-none opacity-40 dark:opacity-20 animate-pulse-slow" />
      
      {/* Node connections visualization in background */}
      <div className="absolute inset-0 pointer-events-none opacity-20 dark:opacity-10 flex flex-col items-center justify-center">
        <svg width="100%" height="100%" className="absolute inset-0">
          <path d="M 50% 0 L 50% 100%" stroke="currentColor" strokeDasharray="4 8" strokeWidth="1" className="animate-[dash_30s_linear_infinite]" />
          <path d="M 0 50% L 100% 50%" stroke="currentColor" strokeDasharray="4 8" strokeWidth="1" className="animate-[dash_30s_linear_infinite]" />
        </svg>
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center text-center p-8 md:p-16 rounded-3xl border border-border/50 bg-card/50 backdrop-blur-xl shadow-xl hover:border-ai-cyan/30 transition-colors duration-500">
        
        <div className="inline-flex items-center text-xs font-mono font-semibold tracking-wider text-ai-accent dark:text-ai-cyan uppercase mb-6">
          Ready to ship better code?
        </div>

        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
          Let AI review your <br className="hidden md:block" /> next pull request.
        </h2>

        <p className="mx-auto max-w-[600px] text-lg text-muted-foreground sm:text-xl mb-10">
          Connect your GitHub repository and let RepoReview see beyond the diff.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <Link href="/dashboard" className="w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto h-12 px-8 rounded-xl bg-foreground text-background hover:bg-foreground/90 shadow-sm group transition-all">
              <GithubIcon className="mr-2 h-5 w-5" />
              Connect GitHub
            </Button>
          </Link>
          <Link href="#pricing" className="w-full sm:w-auto">
            <Button size="lg" variant="outline" className="w-full sm:w-auto h-12 px-8 rounded-xl text-foreground hover:bg-muted/50 transition-all">
              View Pricing
            </Button>
          </Link>
        </div>

        {/* Trust Microcopy */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-8 text-sm text-muted-foreground/80 font-medium">
          <span className="flex items-center gap-1.5">
            <div className="h-1.5 w-1.5 rounded-full bg-ai-cyan" />
            GitHub integration
          </span>
          <span className="flex items-center gap-1.5">
            <div className="h-1.5 w-1.5 rounded-full bg-ai-cyan" />
            Context-aware reviews
          </span>
          <span className="flex items-center gap-1.5">
            <div className="h-1.5 w-1.5 rounded-full bg-ai-cyan" />
            Free plan available
          </span>
        </div>

      </div>
    </section>
  );
}
