"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { GitPullRequest, Database, ShieldAlert, FileCode2, Code2, AlertTriangle, ArrowRight, CheckCircle2 } from "lucide-react";

export function HeroPreview() {
  const [stage, setStage] = React.useState<0 | 1 | 2>(0);
  
  React.useEffect(() => {
    // Stage 0: Initial PR
    const t1 = setTimeout(() => setStage(1), 1200);
    // Stage 1: Context added
    const t2 = setTimeout(() => setStage(2), 2800);
    
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <div className="relative w-full max-w-2xl mx-auto flex flex-col gap-4">
      
      {/* 1. Pull Request Stage */}
      <div className={cn(
        "rounded-xl border border-border bg-card shadow-sm overflow-hidden flex flex-col transition-all duration-500",
        stage >= 0 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      )}>
        <div className="flex items-center gap-3 px-4 py-3 bg-muted/40 border-b border-border">
          <GitPullRequest className="h-4 w-4 text-ai-cyan" />
          <span className="text-sm font-semibold">Pull Request #142</span>
          <span className="text-xs font-mono text-muted-foreground ml-auto">auth-service</span>
        </div>
        <div className="p-4 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-foreground">Add authentication middleware</span>
            <span className="text-[10px] text-muted-foreground">Files changed: 4</span>
          </div>
          <div className="rounded border border-border bg-background p-2 font-mono text-[11px] leading-relaxed flex flex-col">
            <span className="text-success bg-success/10 px-1 rounded-sm w-fit mb-0.5">+ export function validateUser(req: Request)</span>
            <span className="text-success bg-success/10 px-1 rounded-sm w-fit">+ export async function handleSession()</span>
          </div>
        </div>
      </div>

      {/* Connection 1 */}
      <div className={cn(
        "flex justify-center -my-2 relative z-10 transition-opacity duration-500",
        stage >= 1 ? "opacity-100" : "opacity-0"
      )}>
        <div className="h-8 w-[1px] bg-gradient-to-b from-border to-ai-accent" />
      </div>

      {/* 2. Repository Context Stage */}
      <div className={cn(
        "rounded-xl border border-ai-border bg-ai-subtle-background/30 shadow-sm overflow-hidden flex flex-col transition-all duration-500",
        stage >= 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      )}>
        <div className="flex items-center gap-3 px-4 py-3 border-b border-ai-border bg-ai-subtle-background/50">
          <Database className="h-4 w-4 text-ai-accent" />
          <span className="text-sm font-semibold">Repository Context</span>
          <div className="ml-auto flex items-center gap-1.5 text-[10px] text-ai-accent font-medium">
            <CheckCircle2 className="h-3 w-3" />
            Relevant context retrieved
          </div>
        </div>
        <div className="p-4 flex gap-2">
          <div className="flex flex-col gap-1.5 w-1/2">
            <div className="flex items-center gap-2 text-[11px] font-mono text-muted-foreground bg-background rounded border border-border px-2 py-1.5 shadow-sm">
              <FileCode2 className="h-3.5 w-3.5" /> auth.ts
            </div>
            <div className="flex items-center gap-2 text-[11px] font-mono text-muted-foreground bg-background rounded border border-border px-2 py-1.5 shadow-sm">
              <FileCode2 className="h-3.5 w-3.5" /> session.ts
            </div>
          </div>
          <div className="flex flex-col gap-1.5 w-1/2">
            <div className="flex items-center gap-2 text-[11px] font-mono text-muted-foreground bg-background rounded border border-border px-2 py-1.5 shadow-sm">
              <FileCode2 className="h-3.5 w-3.5" /> middleware.ts
            </div>
            <div className="flex items-center gap-2 text-[11px] font-mono text-muted-foreground bg-background rounded border border-border px-2 py-1.5 shadow-sm">
              <FileCode2 className="h-3.5 w-3.5" /> database.ts
            </div>
          </div>
        </div>
      </div>

      {/* Connection 2 */}
      <div className={cn(
        "flex justify-center -my-2 relative z-10 transition-opacity duration-500",
        stage >= 2 ? "opacity-100" : "opacity-0"
      )}>
        <div className="h-8 w-[1px] bg-gradient-to-b from-ai-accent to-destructive/50" />
      </div>

      {/* 3. AI Review Stage */}
      <div className={cn(
        "rounded-xl border border-destructive/20 bg-destructive/5 shadow-sm overflow-hidden flex flex-col transition-all duration-500 relative",
        stage >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      )}>
        {/* Glow effect for the final stage */}
        <div className="absolute top-0 right-0 p-3 opacity-20 pointer-events-none">
          <div className="w-16 h-16 bg-destructive rounded-full blur-2xl" />
        </div>

        <div className="flex items-center gap-3 px-4 py-3 border-b border-destructive/10 bg-destructive/10">
          <ShieldAlert className="h-4 w-4 text-destructive" />
          <span className="text-sm font-semibold text-destructive">AI REVIEW: Potential issue detected</span>
          <span className="ml-auto text-[10px] font-bold uppercase tracking-wider bg-destructive text-destructive-foreground px-2 py-0.5 rounded-sm">
            Severity High
          </span>
        </div>
        <div className="p-4">
          <p className="text-sm text-foreground/90 leading-relaxed max-w-[90%]">
            Session validation may allow an invalid token to reach the authorization layer. According to <code className="text-xs font-mono bg-background px-1 rounded border border-border">middleware.ts</code>, requests missing the strict Bearer prefix are silently passed through.
          </p>
        </div>
      </div>

    </div>
  );
}
