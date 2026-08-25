"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Database, FileCode2, Bot, GitPullRequest, ArrowRight, Webhook, CloudCog } from "lucide-react";

// Custom GitHub SVG
function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export function ArchitectureDiagram() {
  const [activeNode, setActiveNode] = React.useState<string | null>(null);

  const nodes = [
    {
      id: "github",
      label: "GitHub App",
      icon: GithubIcon,
      desc: "Secure OAuth connection for scoped repository access.",
      colorClass: "text-foreground bg-foreground/10 border-foreground/20",
      x: "10%",
      y: "50%"
    },
    {
      id: "webhook",
      label: "Webhook Event",
      icon: Webhook,
      desc: "Receives real-time PR open/update events.",
      colorClass: "text-muted-foreground bg-muted border-border",
      x: "30%",
      y: "50%"
    },
    {
      id: "inngest",
      label: "Background Job",
      icon: CloudCog,
      desc: "Inngest manages reliable async processing.",
      colorClass: "text-ai-accent bg-ai-accent/10 border-ai-accent/20",
      x: "50%",
      y: "20%"
    },
    {
      id: "pinecone",
      label: "Pinecone Vector DB",
      icon: Database,
      desc: "Retrieves relevant RAG context for the PR.",
      colorClass: "text-info bg-info/10 border-info/20",
      x: "50%",
      y: "80%"
    },
    {
      id: "openrouter",
      label: "OpenRouter AI",
      icon: Bot,
      desc: "Analyzes diff and context to generate review.",
      colorClass: "text-success bg-success/10 border-success/20",
      x: "70%",
      y: "50%"
    },
    {
      id: "review",
      label: "PR Comment",
      icon: GitPullRequest,
      desc: "Automated review posted directly on GitHub.",
      colorClass: "text-foreground bg-foreground/10 border-foreground/20",
      x: "90%",
      y: "50%"
    }
  ];

  return (
    <div className="w-full relative h-[600px] md:h-[400px] rounded-2xl border border-border bg-card shadow-xl overflow-hidden flex flex-col md:flex-row items-center justify-center p-8 bg-[radial-gradient(ellipse_at_center,rgba(var(--color-muted),0.5)_0%,transparent_100%)]">
      
      {/* Background Dot Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(var(--color-foreground),0.1)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      {/* Desktop Horizontal Layout */}
      <div className="hidden md:flex w-full h-full relative items-center justify-between z-10 max-w-4xl">
        
        {/* Animated Connection Lines (SVG) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ zIndex: -1 }}>
          <path d="M 10 50 L 30 50" stroke="currentColor" strokeOpacity="0.2" strokeWidth="2" strokeDasharray="4 4" vectorEffect="non-scaling-stroke" className="animate-[dash_20s_linear_infinite]" />
          <path d="M 30 50 C 40 50, 40 20, 50 20" stroke="currentColor" strokeOpacity="0.2" strokeWidth="2" strokeDasharray="4 4" vectorEffect="non-scaling-stroke" className="animate-[dash_20s_linear_infinite]" />
          <path d="M 30 50 C 40 50, 40 80, 50 80" stroke="currentColor" strokeOpacity="0.2" strokeWidth="2" strokeDasharray="4 4" vectorEffect="non-scaling-stroke" className="animate-[dash_20s_linear_infinite]" />
          <path d="M 50 20 C 60 20, 60 50, 70 50" stroke="currentColor" strokeOpacity="0.2" strokeWidth="2" strokeDasharray="4 4" vectorEffect="non-scaling-stroke" className="animate-[dash_20s_linear_infinite]" />
          <path d="M 50 80 C 60 80, 60 50, 70 50" stroke="currentColor" strokeOpacity="0.2" strokeWidth="2" strokeDasharray="4 4" vectorEffect="non-scaling-stroke" className="animate-[dash_20s_linear_infinite]" />
          <path d="M 70 50 L 90 50" stroke="currentColor" strokeOpacity="0.2" strokeWidth="2" strokeDasharray="4 4" vectorEffect="non-scaling-stroke" className="animate-[dash_20s_linear_infinite]" />
        </svg>

        {nodes.map((node) => (
          <div
            key={node.id}
            className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2 group"
            style={{ left: node.x, top: node.y }}
            onMouseEnter={() => setActiveNode(node.id)}
            onMouseLeave={() => setActiveNode(null)}
          >
            <div className={cn(
              "relative flex h-14 w-14 items-center justify-center rounded-2xl border bg-background shadow-sm transition-all duration-300 cursor-help",
              node.colorClass,
              activeNode === node.id ? "scale-110 shadow-md ring-2 ring-ring ring-offset-2 ring-offset-background" : "hover:scale-105"
            )}>
              <node.icon className="h-6 w-6" />
              {activeNode === node.id && (
                <div className="absolute top-full mt-3 w-48 rounded-lg bg-popover border border-border p-3 text-sm text-popover-foreground shadow-xl z-50 text-center animate-in fade-in zoom-in-95">
                  <span className="font-bold block mb-1">{node.label}</span>
                  <span className="text-xs text-muted-foreground">{node.desc}</span>
                </div>
              )}
            </div>
            <span className={cn(
              "text-xs font-semibold whitespace-nowrap transition-opacity",
              activeNode === node.id ? "opacity-100" : "opacity-70"
            )}>{node.label}</span>
          </div>
        ))}
      </div>

      {/* Mobile Vertical Layout */}
      <div className="flex md:hidden flex-col w-full h-full justify-between items-center z-10 py-4">
        {nodes.map((node, index) => (
          <React.Fragment key={node.id}>
            <div 
              className={cn(
                "flex items-center w-full gap-4 p-3 rounded-xl border bg-background shadow-sm",
                node.colorClass
              )}
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-background/50 border border-current/20">
                <node.icon className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-sm text-foreground">{node.label}</span>
                <span className="text-xs text-muted-foreground">{node.desc}</span>
              </div>
            </div>
            {index < nodes.length - 1 && (
              <div className="h-4 w-px bg-border my-1" />
            )}
          </React.Fragment>
        ))}
      </div>

    </div>
  );
}
