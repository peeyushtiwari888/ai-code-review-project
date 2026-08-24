import * as React from "react";
import { cn } from "@/lib/utils";
import { Bot, FileCode2, GitPullRequest, GitMerge, ShieldAlert, Activity, CheckCircle2, ChevronRight, Zap, Code, ShieldCheck, Sparkles } from "lucide-react";

export function FeaturesSection() {
  return (
    <section id="features" className="relative flex min-h-screen w-full flex-col items-center justify-center py-24 px-4 overflow-hidden bg-background">
      
      {/* Background ambient glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(ellipse_at_top_right,var(--color-ai-glow)_0%,transparent_60%)] pointer-events-none opacity-40 dark:opacity-20" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_bottom_left,var(--color-ai-glow)_0%,transparent_60%)] pointer-events-none opacity-40 dark:opacity-20" />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-16">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center text-xs font-mono font-semibold tracking-wider text-ai-accent dark:text-ai-cyan uppercase">
            <Zap className="mr-2 h-4 w-4" />
            BUILT FOR BETTER CODE
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Everything you need to ship with confidence.</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            A seamless combination of GitHub automation, deep repository context, and intelligent AI analysis designed to dramatically improve your code quality.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[320px]">
          
          {/* Featured Card 1: Context-Aware AI (Spans 2 columns on large screens) */}
          <div className="group relative col-span-1 md:col-span-2 rounded-2xl border border-border bg-card shadow-sm hover:shadow-md hover:border-ai-cyan/50 transition-all duration-300 overflow-hidden flex flex-col justify-between">
            <div className="p-8 pb-0">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-lg border border-border bg-background shadow-sm text-foreground">
                  <Bot className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold">AI that understands your codebase.</h3>
              </div>
              <p className="text-muted-foreground max-w-xl text-sm leading-relaxed">
                Your review isn&apos;t limited to the lines changed in a pull request. Relevant repository context helps the AI understand how your changes fit into the larger system.
              </p>
            </div>
            
            <div className="relative h-40 w-full mt-8 bg-muted/30 border-t border-border overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(var(--color-border),0.5)_1px,transparent_1px),linear-gradient(to_bottom,rgba(var(--color-border),0.5)_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:linear-gradient(to_bottom,white,transparent)]" />
              
              <div className="flex items-center gap-4 lg:gap-8 z-10 transition-transform duration-500 group-hover:scale-105">
                <div className="flex flex-col items-center gap-2 p-3 rounded-xl border border-border bg-background shadow-sm">
                  <FileCode2 className="h-6 w-6 text-muted-foreground" />
                  <span className="text-xs font-mono">PR Diff</span>
                </div>
                <div className="text-ai-cyan font-bold text-xl">+</div>
                <div className="flex flex-col items-center gap-2 p-3 rounded-xl border border-border bg-background shadow-sm relative group-hover:border-ai-cyan/50 transition-colors">
                  <div className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full border border-ai-cyan bg-background shadow-sm text-[10px] font-bold text-foreground">3</div>
                  <Database className="h-6 w-6 text-ai-cyan" />
                  <span className="text-xs font-mono">Context Files</span>
                </div>
                <div className="h-8 w-8 text-muted-foreground flex items-center justify-center">
                  <ChevronRight className="h-6 w-6" />
                </div>
                <div className="flex flex-col items-center gap-2 p-4 rounded-xl border border-ai-border bg-ai-subtle-background/50 shadow-sm text-ai-accent dark:text-ai-cyan">
                  <Sparkles className="h-5 w-5" />
                  <span className="text-xs font-bold whitespace-nowrap">Context-Aware Review</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Security Analysis */}
          <div className="group relative col-span-1 rounded-2xl border border-border bg-card shadow-sm hover:shadow-md hover:border-border/80 transition-all duration-300 overflow-hidden flex flex-col">
            <div className="p-8 pb-0">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-lg border border-border bg-background shadow-sm text-foreground">
                  <ShieldAlert className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold">Catch security issues.</h3>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Surface potentially risky patterns and security-related issues before they make it into production.
              </p>
            </div>
            <div className="mt-auto p-6 flex justify-center">
              <div className="w-full max-w-[240px] rounded-lg border border-border bg-background shadow-sm p-4 transition-transform duration-300 group-hover:-translate-y-1">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Security</span>
                  <span className="text-[10px] font-mono font-bold text-success border border-border bg-card px-1.5 py-0.5 rounded">92/100</span>
                </div>
                <div className="h-1 w-full bg-muted rounded-full overflow-hidden mb-4">
                  <div className="h-full bg-success w-[92%] rounded-full" />
                </div>
                <div className="flex flex-col gap-2 text-xs">
                  <div className="flex items-center gap-2 text-success"><CheckCircle2 className="h-3 w-3" /> Input validation</div>
                  <div className="flex items-center gap-2 text-warning"><ShieldAlert className="h-3 w-3" /> Token exposure risk</div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Automated Reviews */}
          <div className="group relative col-span-1 rounded-2xl border border-border bg-card shadow-sm hover:shadow-md hover:border-border/80 transition-all duration-300 overflow-hidden flex flex-col">
            <div className="p-8 pb-0">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-lg border border-border bg-background shadow-sm text-foreground">
                  <GitPullRequest className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold">Automated reviews.</h3>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                GitHub webhooks trigger the review pipeline automatically whenever a pull request is opened or updated.
              </p>
            </div>
            <div className="mt-auto p-6 flex justify-center items-center h-full min-h-[140px]">
              <div className="flex items-center gap-3 transition-transform duration-300 group-hover:scale-105">
                <div className="flex items-center justify-center h-12 w-12 rounded-full border border-border bg-background shadow-sm text-foreground">
                  <GitPullRequest className="h-5 w-5" />
                </div>
                <div className="w-8 h-[2px] bg-gradient-to-r from-border to-ai-cyan group-hover:w-12 transition-all duration-300" />
                <div className="flex items-center justify-center h-12 w-12 rounded-full border border-ai-cyan/50 bg-ai-subtle-background/50 shadow-sm text-ai-cyan">
                  <Bot className="h-5 w-5" />
                </div>
              </div>
            </div>
          </div>

          {/* Card 4: Actionable Suggestions */}
          <div className="group relative col-span-1 rounded-2xl border border-border bg-card shadow-sm hover:shadow-md hover:border-border/80 transition-all duration-300 overflow-hidden flex flex-col">
            <div className="p-8 pb-0">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-lg border border-border bg-background shadow-sm text-foreground">
                  <Code className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold">Don&apos;t just find problems. Fix them.</h3>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Every finding explains what is wrong, why it matters, and how it can be improved with code snippets.
              </p>
            </div>
            <div className="mt-auto p-6 flex justify-center">
              <div className="w-full rounded-lg border border-border bg-background shadow-sm overflow-hidden transition-transform duration-300 group-hover:-translate-y-1">
                <div className="bg-destructive/5 px-3 py-2 border-b border-border flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-destructive" />
                  <span className="text-xs font-bold text-destructive">Problem identified</span>
                </div>
                <div className="p-3 bg-muted/20">
                  <div className="text-[10px] font-mono text-muted-foreground mb-1">Suggested Fix:</div>
                  <div className="text-xs font-mono bg-success/10 text-success p-1.5 rounded border border-success/20">
                    + const safeValue = sanitize(input);
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 5: GitHub Native */}
          <div className="group relative col-span-1 md:col-span-2 lg:col-span-1 rounded-2xl border border-border bg-card shadow-sm hover:shadow-md hover:border-border/80 transition-all duration-300 overflow-hidden flex flex-col">
            <div className="p-8 pb-0">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-lg border border-border bg-background shadow-sm text-foreground">
                  <GitMerge className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold">Stay in your workflow.</h3>
              </div>
              <p className="text-muted-foreground text-sm">
                Reviews are posted directly as comments on your existing GitHub pull request workflow. No context switching.
              </p>
            </div>
            <div className="mt-auto p-6 flex justify-center">
              <div className="w-full max-w-[260px] rounded-lg border border-border bg-background shadow-sm p-4 transition-transform duration-300 group-hover:-translate-y-1 flex flex-col gap-3">
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-ai-accent text-ai-accent-foreground flex items-center justify-center shrink-0">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="flex flex-col gap-1 w-full">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="flex items-center justify-center h-5 w-5 rounded bg-ai-cyan/20 text-ai-cyan text-[10px] font-bold">R</span>
                      <span className="text-xs font-bold">RepoReview</span>
                      <span className="text-[10px] text-muted-foreground">just now</span>
                    </div>
                    <div className="h-2 w-3/4 bg-muted rounded" />
                    <div className="h-2 w-1/2 bg-muted rounded" />
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

// Minimal missing icon wrapper to prevent errors if lucide doesn't have it
function Database(props: any) {
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
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5V19A9 3 0 0 0 21 19V5" />
      <path d="M3 12A9 3 0 0 0 21 12" />
    </svg>
  );
}
