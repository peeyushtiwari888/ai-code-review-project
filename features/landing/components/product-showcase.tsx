import * as React from "react";
import { ReviewDemo } from "@/features/landing/components/review-demo";
import { ShieldAlert, Zap, Layers, Bug, CheckCircle2 } from "lucide-react";

export function ProductShowcase() {
  return (
    <section className="relative flex flex-col items-center justify-center py-24 px-4 w-full bg-background border-t border-border/50">
      
      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col gap-12">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center gap-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center text-xs font-mono font-semibold tracking-wider text-ai-accent dark:text-ai-cyan uppercase">
            <CheckCircle2 className="mr-2 h-4 w-4" />
            INTELLIGENT CODE REVIEW
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">See what your AI reviewer sees.</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Go beyond line-by-line analysis. Your AI reviewer retrieves relevant context from your codebase to understand how every change fits into the bigger picture.
          </p>
        </div>

        {/* Main Interactive Demo */}
        <div className="w-full relative mt-4">
          <div className="absolute -inset-4 bg-[var(--color-ai-glow)] opacity-20 blur-2xl rounded-[3rem] -z-10 hidden md:block" />
          <ReviewDemo />
        </div>

        {/* Capability Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          
          <div className="group flex flex-col gap-3 p-6 rounded-xl border border-border bg-card hover:shadow-sm hover:border-ai-cyan/30 transition-all duration-300">
            <div className="p-2.5 rounded-lg bg-destructive/10 text-destructive w-fit group-hover:scale-110 transition-transform">
              <ShieldAlert className="h-5 w-5" />
            </div>
            <h3 className="font-semibold text-foreground">Security</h3>
            <p className="text-sm text-muted-foreground">Catch potential security problems and data leaks before merging.</p>
          </div>

          <div className="group flex flex-col gap-3 p-6 rounded-xl border border-border bg-card hover:shadow-sm hover:border-ai-cyan/30 transition-all duration-300">
            <div className="p-2.5 rounded-lg bg-warning/10 text-warning w-fit group-hover:scale-110 transition-transform">
              <Zap className="h-5 w-5" />
            </div>
            <h3 className="font-semibold text-foreground">Performance</h3>
            <p className="text-sm text-muted-foreground">Identify inefficient patterns and expensive database operations.</p>
          </div>

          <div className="group flex flex-col gap-3 p-6 rounded-xl border border-border bg-card hover:shadow-sm hover:border-ai-cyan/30 transition-all duration-300">
            <div className="p-2.5 rounded-lg bg-info/10 text-info w-fit group-hover:scale-110 transition-transform">
              <Layers className="h-5 w-5" />
            </div>
            <h3 className="font-semibold text-foreground">Code Quality</h3>
            <p className="text-sm text-muted-foreground">Improve maintainability with structural and readability suggestions.</p>
          </div>

          <div className="group flex flex-col gap-3 p-6 rounded-xl border border-border bg-card hover:shadow-sm hover:border-ai-cyan/30 transition-all duration-300">
            <div className="p-2.5 rounded-lg bg-success/10 text-success w-fit group-hover:scale-110 transition-transform">
              <Bug className="h-5 w-5" />
            </div>
            <h3 className="font-semibold text-foreground">Edge Cases</h3>
            <p className="text-sm text-muted-foreground">Spot unhandled exceptions and issues developers might overlook.</p>
          </div>

        </div>

      </div>
    </section>
  );
}
