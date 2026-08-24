"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Database, GitPullRequest, ShieldCheck, CheckCircle2, ChevronRight, Activity, FileCode2, Bot, CircleDashed } from "lucide-react";

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

const steps = [
  {
    id: "01",
    title: "Connect GitHub",
    description: "Install the GitHub App and give your AI reviewer access to the repositories you want to protect.",
    icon: GithubIcon,
  },
  {
    id: "02",
    title: "Understand Your Codebase",
    description: "Your repository is synced and indexed so the AI can retrieve relevant context when reviewing a change.",
    icon: Database,
  },
  {
    id: "03",
    title: "Review Every Pull Request",
    description: "When a pull request is opened or updated, the review pipeline automatically analyzes the changes.",
    icon: GitPullRequest,
  },
  {
    id: "04",
    title: "Ship Better Code",
    description: "Get clear findings, severity levels and actionable suggestions directly on your pull request.",
    icon: ShieldCheck,
  },
];

export function HowItWorks() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = React.useState(true);
  const autoPlayRef = React.useRef<NodeJS.Timeout | null>(null);

  React.useEffect(() => {
    if (!isAutoPlaying) {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
      return;
    }

    autoPlayRef.current = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 4000);

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isAutoPlaying]);

  const handleStepClick = (index: number) => {
    setActiveStep(index);
    setIsAutoPlaying(false);
  };

  return (
    <section 
      id="how-it-works" 
      className="relative flex min-h-screen w-full flex-col items-center justify-center py-24 px-4 overflow-hidden bg-background"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_center,var(--color-ai-glow)_0%,transparent_70%)] pointer-events-none opacity-40 dark:opacity-20" />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center gap-16">
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-4 max-w-3xl">
          <div className="inline-flex items-center text-xs font-mono font-semibold tracking-wider text-ai-accent dark:text-ai-cyan uppercase">
            <Activity className="mr-2 h-4 w-4" />
            HOW IT WORKS
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">From Pull Request to Intelligent Review.</h2>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
            Connect your GitHub repository once. Our AI builds context from your codebase and automatically reviews every pull request.
          </p>
        </div>

        {/* Content Area */}
        <div className="flex w-full flex-col lg:flex-row gap-12 lg:gap-24 items-center">
          
          {/* Left Side: Steps */}
          <div className="w-full lg:w-1/3 flex flex-col gap-4">
            {steps.map((step, index) => {
              const isActive = activeStep === index;
              return (
                <button
                  key={step.id}
                  onClick={() => handleStepClick(index)}
                  className={cn(
                    "group flex flex-col text-left border-l-[3px] py-3 pl-5 transition-all duration-300 rounded-r-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                    isActive
                      ? "border-ai-accent bg-ai-subtle-background/80 shadow-sm"
                      : "border-border hover:border-muted-foreground/30 hover:bg-muted/50"
                  )}
                  aria-pressed={isActive}
                >
                  <div className="flex items-center gap-3">
                    <span className={cn(
                      "font-mono text-xs font-bold transition-colors",
                      isActive ? "text-ai-accent dark:text-ai-cyan" : "text-muted-foreground group-hover:text-foreground"
                    )}>
                      {step.id}
                    </span>
                    <h3 className={cn(
                      "text-lg font-bold transition-colors",
                      isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                    )}>
                      {step.title}
                    </h3>
                  </div>
                  <p className={cn(
                    "mt-2 text-sm leading-relaxed transition-all duration-300",
                    isActive ? "text-muted-foreground h-auto opacity-100" : "h-0 opacity-0 overflow-hidden"
                  )}>
                    {step.description}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Right Side: Interactive Visual */}
          <div className="w-full lg:w-2/3 h-[450px] relative rounded-2xl border border-border bg-card/50 backdrop-blur-sm shadow-sm overflow-hidden flex items-center justify-center p-8">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(var(--color-border),0.2)_1px,transparent_1px),linear-gradient(to_bottom,rgba(var(--color-border),0.2)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
            
            <div className="relative w-full h-full flex flex-col items-center justify-center">
              {/* Step 01 Visual */}
              <div className={cn("absolute transition-all duration-700 w-full flex flex-col items-center", activeStep === 0 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none")}>
                <div className="flex flex-col items-center gap-6">
                  <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-foreground text-background shadow-md">
                    <GithubIcon className="h-8 w-8" />
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="h-12 w-[2px] bg-gradient-to-b from-foreground to-ai-cyan" />
                    <ChevronRight className="h-5 w-5 text-ai-cyan rotate-90" />
                  </div>
                  <div className="flex items-center gap-2 rounded-md border border-success/30 bg-success/10 px-4 py-2 text-success text-sm">
                    <CheckCircle2 className="h-4 w-4" />
                    <span className="font-semibold">GitHub Connected</span>
                  </div>
                </div>
              </div>

              {/* Step 02 Visual */}
              <div className={cn("absolute transition-all duration-700 w-full h-full flex flex-col items-center justify-center", activeStep === 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none")}>
                <div className="grid grid-cols-[1fr_auto_1fr] gap-6 w-full max-w-md items-center relative">
                  
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded border border-ai-border bg-ai-subtle-background px-3 py-1.5 text-[11px] font-mono font-semibold text-ai-accent dark:text-ai-cyan shadow-sm z-10 flex items-center gap-1.5">
                    <Database className="h-3 w-3" />
                    Vectorizing Codebase...
                  </div>

                  <div className="flex flex-col items-center gap-3 p-4 rounded-xl border border-border bg-card shadow-sm">
                    <FileCode2 className="h-6 w-6 text-muted-foreground" />
                    <span className="text-xs font-mono text-muted-foreground">PR Diff</span>
                  </div>
                  
                  <div className="flex justify-center text-ai-cyan font-bold text-xl">
                    +
                  </div>

                  <div className="flex flex-col items-center gap-3 p-4 rounded-xl border border-ai-border bg-ai-subtle-background/50 shadow-sm">
                    <Database className="h-6 w-6 text-ai-cyan" />
                    <span className="text-xs font-mono text-ai-cyan font-semibold text-center">Repo Context</span>
                  </div>

                </div>
                
                <div className="h-10 w-[2px] bg-gradient-to-b from-ai-cyan to-ai-accent my-4" />
                
                <div className="flex items-center gap-2 rounded-lg border border-ai-accent/30 bg-ai-accent/10 px-5 py-2.5">
                  <Bot className="h-4 w-4 text-ai-accent dark:text-ai-cyan" />
                  <span className="font-semibold text-sm text-ai-accent dark:text-ai-cyan">Intelligent Analysis</span>
                </div>
              </div>

              {/* Step 03 Visual */}
              <div className={cn("absolute transition-all duration-700 w-full flex flex-col items-center", activeStep === 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none")}>
                <div className="w-full max-w-[320px] rounded-lg border border-border bg-card shadow-sm flex flex-col overflow-hidden">
                  <div className="bg-muted px-3 py-2 border-b border-border flex items-center gap-2 text-xs">
                    <GitPullRequest className="h-3 w-3 text-ai-cyan" />
                    <span className="font-semibold text-muted-foreground">Pull Request #142</span>
                  </div>
                  <div className="p-6 flex flex-col items-center gap-4">
                    <CircleDashed className="h-8 w-8 text-ai-accent animate-spin duration-1000" />
                    <div className="flex flex-col items-center gap-1">
                      <span className="font-semibold text-sm">Reviewing Changes</span>
                      <span className="text-[10px] font-mono text-muted-foreground">Analyzing 4 files against repo context...</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 04 Visual */}
              <div className={cn("absolute transition-all duration-700 w-full flex flex-col items-center", activeStep === 3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none")}>
                <div className="w-full max-w-[360px] rounded-lg border border-border bg-card shadow-sm flex flex-col overflow-hidden">
                  <div className="bg-success/5 px-3 py-2 border-b border-border flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 text-success">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      <span className="font-bold">Review Complete</span>
                    </div>
                    <span className="font-mono font-bold text-muted-foreground">87/100</span>
                  </div>
                  <div className="p-4 flex flex-col gap-3">
                    <div className="grid grid-cols-3 gap-2">
                      <div className="flex flex-col items-center p-2 rounded bg-destructive/10 border border-destructive/20">
                        <span className="font-bold text-destructive text-sm">1</span>
                        <span className="text-[8px] uppercase font-bold text-destructive/70">Critical</span>
                      </div>
                      <div className="flex flex-col items-center p-2 rounded bg-warning/10 border border-warning/20">
                        <span className="font-bold text-warning text-sm">3</span>
                        <span className="text-[8px] uppercase font-bold text-warning/70">Warnings</span>
                      </div>
                      <div className="flex flex-col items-center p-2 rounded bg-info/10 border border-info/20">
                        <span className="font-bold text-info text-sm">7</span>
                        <span className="text-[8px] uppercase font-bold text-info/70">Suggestions</span>
                      </div>
                    </div>
                    
                    <div className="rounded border border-border p-2 bg-background flex flex-col gap-1.5 mt-2">
                      <span className="text-[10px] font-mono text-muted-foreground border-b border-border pb-1">auth.ts</span>
                      <div className="font-mono text-[9px] flex flex-col gap-0.5 pt-1">
                        <span className="text-success bg-success/10 px-1 py-0.5 rounded-sm">+ validateUser(token)</span>
                        <span className="text-destructive bg-destructive/10 px-1 py-0.5 rounded-sm line-through opacity-70">- getUserSession(req)</span>
                      </div>
                    </div>
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
