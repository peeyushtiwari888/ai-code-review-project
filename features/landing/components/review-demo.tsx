"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { 
  AlertCircle, 
  AlertTriangle, 
  Lightbulb, 
  FileCode2, 
  GitPullRequest,
  CheckCircle2,
  Database,
  ChevronRight,
  MessageSquare
} from "lucide-react";

// Mock Data
const findings = [
  {
    id: "f1",
    severity: "critical",
    title: "Authentication token exposure",
    line: 2,
    description: "This value may become accessible outside the intended authentication boundary. The authorization token is read directly without Bearer validation.",
    suggestion: "const token = req.headers.authorization?.split('Bearer ')[1];",
    icon: AlertCircle,
    colorClass: "text-destructive",
    bgClass: "bg-destructive/10 border-destructive/20",
  },
  {
    id: "f2",
    severity: "warning",
    title: "Missing error handling",
    line: 3,
    description: "validateToken could throw if the token is malformed. Wrap in a try/catch block.",
    suggestion: "try { \n  const user = validateToken(token); \n} catch (e) { ... }",
    icon: AlertTriangle,
    colorClass: "text-warning",
    bgClass: "bg-warning/10 border-warning/20",
  },
  {
    id: "f3",
    severity: "suggestion",
    title: "Type annotation recommended",
    line: 1,
    description: "Add explicit type annotations for the request object to improve maintainability.",
    suggestion: "const token: string | undefined = ...",
    icon: Lightbulb,
    colorClass: "text-info",
    bgClass: "bg-info/10 border-info/20",
  }
];

export function ReviewDemo() {
  const [activeTab, setActiveTab] = React.useState<"overview" | "files" | "review">("review");
  const [activeFindingId, setActiveFindingId] = React.useState<string>(findings[0].id);
  const [isAnalyzing, setIsAnalyzing] = React.useState(true);
  const [progress, setProgress] = React.useState(0);

  // Auto-play the loading animation on mount
  React.useEffect(() => {
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 1;
      setProgress(currentProgress);
      if (currentProgress >= 3) {
        clearInterval(interval);
        setTimeout(() => setIsAnalyzing(false), 500);
      }
    }, 800);
    return () => clearInterval(interval);
  }, []);

  const activeFinding = findings.find(f => f.id === activeFindingId);

  return (
    <div className="w-full rounded-2xl border border-border bg-card shadow-2xl overflow-hidden flex flex-col font-sans">
      
      {/* Top Header */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-border bg-muted/30">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center h-8 w-8 rounded bg-foreground text-background">
            <GitPullRequest className="h-4 w-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm sm:text-base text-foreground">Add authentication middleware</span>
              <span className="text-muted-foreground text-sm font-mono hidden sm:inline-block">#142</span>
            </div>
            <div className="text-xs text-muted-foreground flex items-center gap-2 mt-0.5">
              <span className="flex items-center justify-center h-4 w-4 rounded-full bg-ai-cyan/20 text-ai-cyan text-[10px] font-bold border border-ai-cyan/30">R</span>
              <span className="font-semibold text-foreground">RepoReview</span>
              <span className="px-1.5 py-0.5 rounded-md bg-muted text-[10px] font-mono">bot</span>
            </div>
          </div>
        </div>

        {/* Dynamic Score Indicator */}
        {!isAnalyzing && (
          <div className="hidden sm:flex items-center gap-3 animate-in fade-in slide-in-from-right-4 duration-700">
            <div className="flex flex-col items-end">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Score</span>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-bold text-foreground">87</span>
                <span className="text-xs text-muted-foreground">/100</span>
              </div>
            </div>
            <div className="h-10 w-10 rounded-full border-4 border-muted flex items-center justify-center relative">
              <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="46" fill="transparent" stroke="currentColor" strokeWidth="8" className="text-success" strokeDasharray="289" strokeDashoffset="37" />
              </svg>
            </div>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 px-4 border-b border-border bg-card overflow-x-auto no-scrollbar">
        {(["overview", "files", "review"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "px-4 py-3 text-sm font-medium transition-colors relative whitespace-nowrap outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 rounded-sm",
              activeTab === tab ? "text-foreground" : "text-muted-foreground hover:text-foreground/80"
            )}
          >
            {tab === "overview" && "Overview"}
            {tab === "files" && "Files Changed (4)"}
            {tab === "review" && (
              <span className="flex items-center gap-2">
                AI Review
                {!isAnalyzing && <span className="bg-destructive/10 text-destructive text-[10px] px-1.5 py-0.5 rounded-full font-bold">1</span>}
              </span>
            )}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-ai-accent" />
            )}
          </button>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col md:flex-row min-h-[400px] bg-background relative">
        
        {/* Loading Overlay */}
        {isAnalyzing && activeTab === "review" && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm">
            <div className="flex flex-col gap-4 max-w-sm w-full p-6 rounded-xl border border-border bg-card shadow-lg">
              <div className="flex items-center gap-3 font-semibold text-foreground">
                <div className="h-4 w-4 rounded-full border-2 border-ai-accent border-r-transparent animate-spin" />
                Analyzing pull request...
              </div>
              <div className="flex flex-col gap-2 text-sm text-muted-foreground font-mono mt-2">
                <div className={cn("flex items-center gap-2 transition-opacity", progress >= 1 ? "opacity-100" : "opacity-40")}>
                  {progress >= 1 ? <CheckCircle2 className="h-3.5 w-3.5 text-success" /> : <div className="h-3.5 w-3.5" />}
                  Reading changed files
                </div>
                <div className={cn("flex items-center gap-2 transition-opacity", progress >= 2 ? "opacity-100" : "opacity-40")}>
                  {progress >= 2 ? <CheckCircle2 className="h-3.5 w-3.5 text-success" /> : <div className="h-3.5 w-3.5" />}
                  Retrieving codebase context
                </div>
                <div className={cn("flex items-center gap-2 transition-opacity", progress >= 3 ? "opacity-100" : "opacity-40")}>
                  {progress >= 3 ? <CheckCircle2 className="h-3.5 w-3.5 text-success" /> : <div className="h-3.5 w-3.5" />}
                  Generating review insights
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content: Review (The main interactive piece) */}
        {activeTab === "review" && (
          <>
            {/* Left Column: Code Diff */}
            <div className="flex-1 border-b md:border-b-0 md:border-r border-border flex flex-col overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-2 bg-muted/20 border-b border-border">
                <FileCode2 className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs font-mono text-muted-foreground">src/middleware/auth.ts</span>
              </div>
              <div className="flex-1 overflow-x-auto bg-zinc-950 dark:bg-[#0d1117] text-zinc-300 p-4 font-mono text-[13px] leading-relaxed select-text">
                <div className="flex">
                  <div className="flex flex-col text-zinc-600 select-none text-right pr-4 border-r border-zinc-800">
                    <span>1</span>
                    <span>2</span>
                    <span>3</span>
                    <span>4</span>
                  </div>
                  <div className="flex flex-col pl-4 w-full">
                    {/* Line 1 */}
                    <div className={cn("flex items-center gap-4 transition-colors", activeFinding?.line === 1 && "bg-info/10 text-info")}>
                      <span className="w-4 text-zinc-500">-</span>
                      <span><span className="text-zinc-500">const</span> user = getUser(req)</span>
                    </div>
                    {/* Line 2 */}
                    <div className={cn("flex items-center gap-4 transition-colors relative", activeFinding?.line === 2 && "bg-destructive/20 text-destructive-foreground")}>
                      <span className="w-4 text-success">+</span>
                      <span><span className="text-zinc-500">const</span> token = req.headers.authorization</span>
                      {activeFinding?.line === 2 && (
                        <div className="absolute right-2 top-1/2 -translate-y-1/2">
                          <AlertCircle className="h-4 w-4 text-destructive animate-pulse" />
                        </div>
                      )}
                    </div>
                    {/* Line 3 */}
                    <div className={cn("flex items-center gap-4 transition-colors", activeFinding?.line === 3 && "bg-warning/20 text-warning-foreground")}>
                      <span className="w-4 text-success">+</span>
                      <span><span className="text-zinc-500">const</span> user = validateToken(token)</span>
                    </div>
                    {/* Line 4 */}
                    <div className="flex items-center gap-4">
                      <span className="w-4"> </span>
                      <span><span className="text-zinc-500">return</span> next()</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Findings Panel */}
            <div className="w-full md:w-[380px] flex flex-col bg-card shrink-0">
              <div className="px-4 py-3 border-b border-border bg-muted/10 font-semibold text-sm flex items-center justify-between">
                Review Findings
                <div className="flex gap-2">
                  <span className="flex items-center gap-1 text-[10px] font-bold text-destructive bg-destructive/10 px-1.5 py-0.5 rounded"><AlertCircle className="h-3 w-3"/> 1</span>
                  <span className="flex items-center gap-1 text-[10px] font-bold text-warning bg-warning/10 px-1.5 py-0.5 rounded"><AlertTriangle className="h-3 w-3"/> 1</span>
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto">
                <div className="flex flex-col">
                  {findings.map((finding) => {
                    const Icon = finding.icon;
                    const isActive = activeFindingId === finding.id;
                    
                    return (
                      <button
                        key={finding.id}
                        onClick={() => setActiveFindingId(finding.id)}
                        className={cn(
                          "flex flex-col gap-2 p-4 border-b border-border text-left transition-colors outline-none focus-visible:bg-muted",
                          isActive ? "bg-muted/50" : "hover:bg-muted/30"
                        )}
                      >
                        <div className="flex items-start gap-3">
                          <Icon className={cn("h-4 w-4 mt-0.5 shrink-0", finding.colorClass)} />
                          <div className="flex flex-col gap-1">
                            <span className="text-sm font-semibold text-foreground">{finding.title}</span>
                            <span className="text-xs text-muted-foreground line-clamp-1">{finding.description}</span>
                          </div>
                        </div>

                        {/* Expanded details when active */}
                        {isActive && (
                          <div className="mt-3 ml-7 flex flex-col gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
                            <div className="flex flex-col gap-1">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Why it matters</span>
                              <p className="text-xs text-foreground leading-relaxed">{finding.description}</p>
                            </div>
                            <div className="flex flex-col gap-1">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Suggested Fix</span>
                              <div className="bg-zinc-950 dark:bg-[#0d1117] text-success border border-success/20 p-2 rounded text-[11px] font-mono overflow-x-auto">
                                {finding.suggestion}
                              </div>
                            </div>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </>
        )}

        {/* Tab Content: Overview (Simplified) */}
        {activeTab === "overview" && (
          <div className="flex-1 p-8 flex flex-col items-center justify-center text-center gap-6 animate-in fade-in duration-500">
            
            {/* Context Flow Visual */}
            <div className="flex items-center gap-4 sm:gap-8 max-w-lg w-full mb-8">
              <div className="flex-1 flex flex-col items-center gap-2">
                <div className="h-12 w-12 rounded-xl border border-border bg-card shadow-sm flex items-center justify-center">
                  <FileCode2 className="h-6 w-6 text-muted-foreground" />
                </div>
                <span className="text-xs font-semibold">PR Diff</span>
              </div>
              <div className="text-muted-foreground font-mono">+</div>
              <div className="flex-1 flex flex-col items-center gap-2">
                <div className="h-12 w-12 rounded-xl border border-ai-accent/30 bg-ai-subtle-background shadow-sm flex items-center justify-center relative">
                  <Database className="h-6 w-6 text-ai-accent" />
                  <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-ai-accent animate-ping" />
                </div>
                <span className="text-xs font-semibold text-ai-accent">Repo Context</span>
              </div>
              <div className="text-muted-foreground flex items-center justify-center">
                <ChevronRight className="h-5 w-5" />
              </div>
              <div className="flex-1 flex flex-col items-center gap-2">
                <div className="h-12 w-12 rounded-xl border-2 border-foreground bg-foreground text-background shadow-sm flex items-center justify-center">
                  <MessageSquare className="h-6 w-6" />
                </div>
                <span className="text-xs font-semibold">AI Review</span>
              </div>
            </div>

            <h3 className="text-xl font-bold">Analysis Complete</h3>
            <p className="text-sm text-muted-foreground max-w-md">
              The AI has reviewed your pull request alongside relevant context from <code className="bg-muted px-1 py-0.5 rounded text-foreground">auth-config.ts</code> and <code className="bg-muted px-1 py-0.5 rounded text-foreground">user-service.ts</code>.
            </p>
            <div className="flex gap-4 mt-4">
              <button onClick={() => setActiveTab("review")} className="px-4 py-2 rounded-lg bg-foreground text-background text-sm font-medium hover:bg-foreground/90 transition-colors">
                View Findings
              </button>
            </div>
          </div>
        )}

        {/* Tab Content: Files (Simplified) */}
        {activeTab === "files" && (
          <div className="flex-1 p-6 animate-in fade-in duration-500">
            <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">Changed Files</h3>
            <div className="flex flex-col gap-2 max-w-md">
              {["src/middleware/auth.ts", "src/services/user-service.ts", "src/api/routes.ts"].map((file, i) => (
                <div key={file} className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/30 cursor-pointer transition-colors">
                  <div className="flex items-center gap-3">
                    <FileCode2 className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-mono">{file}</span>
                  </div>
                  {i === 0 && <span className="text-[10px] font-bold text-destructive bg-destructive/10 px-1.5 py-0.5 rounded">1 Critical</span>}
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
