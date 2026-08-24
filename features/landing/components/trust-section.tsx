import * as React from "react";
import { ShieldCheck, Lock, Activity, Database, CloudCog, Bot } from "lucide-react";

// Custom GitHub SVG
function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}
import { ArchitectureDiagram } from "@/features/landing/components/architecture-diagram";

export function TrustSection() {
  return (
    <section id="trust" className="relative flex flex-col items-center justify-center py-24 px-4 w-full bg-background border-t border-border/50">
      
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-16">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center gap-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center text-xs font-mono font-semibold tracking-wider text-ai-accent dark:text-ai-cyan uppercase">
            <ShieldCheck className="mr-2 h-4 w-4" />
            BUILT FOR DEVELOPERS
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Your code deserves a reviewer you can trust.</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            We utilize GitHub-native integrations, background processing queues, and context-aware RAG architecture to deliver reliable reviews without compromising your workflow.
          </p>
        </div>

        {/* Interactive Architecture Diagram */}
        <div className="w-full flex flex-col gap-4">
          <ArchitectureDiagram />
        </div>

        {/* Tech Stack Subtle Cards */}
        <div className="flex flex-wrap items-center justify-center gap-4 lg:gap-8 opacity-80">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-background text-sm font-medium text-muted-foreground grayscale hover:grayscale-0 transition-all">
            <GithubIcon className="h-4 w-4" /> GitHub App OAuth
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-background text-sm font-medium text-muted-foreground grayscale hover:grayscale-0 transition-all">
            <CloudCog className="h-4 w-4" /> Inngest Background Jobs
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-background text-sm font-medium text-muted-foreground grayscale hover:grayscale-0 transition-all">
            <Database className="h-4 w-4" /> Pinecone Vector DB
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-background text-sm font-medium text-muted-foreground grayscale hover:grayscale-0 transition-all">
            <Bot className="h-4 w-4" /> OpenRouter AI
          </div>
        </div>

        {/* Trust Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          
          <div className="flex flex-col gap-3 p-6 rounded-xl border border-border bg-card">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg border border-border bg-background shadow-sm text-foreground">
                <GithubIcon className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-foreground text-lg">Connect only what you need.</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mt-2">
              Authentication and repository access are handled exclusively through the official GitHub App integration. We only request the exact scopes required to read pull requests and post review comments.
            </p>
          </div>

          <div className="flex flex-col gap-3 p-6 rounded-xl border border-border bg-card">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg border border-border bg-background shadow-sm text-foreground">
                <CloudCog className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-foreground text-lg">Built for reliable processing.</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mt-2">
              Long-running tasks like repository syncing and deep AI code analysis are executed safely in the background via Inngest. This ensures the review pipeline never drops a pull request due to standard HTTP timeouts.
            </p>
          </div>

          <div className="flex flex-col gap-3 p-6 rounded-xl border border-border bg-card">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg border border-border bg-background shadow-sm text-foreground">
                <Database className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-foreground text-lg">Reviews with repository context.</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mt-2">
              Our Retrieval-Augmented Generation (RAG) architecture securely fetches only the codebase context necessary for the AI to understand the structural impact of your specific pull request diff.
            </p>
          </div>

          <div className="flex flex-col gap-3 p-6 rounded-xl border border-border bg-card">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg border border-border bg-background shadow-sm text-foreground">
                <Lock className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-foreground text-lg">Secure Server-Side Architecture.</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mt-2">
              All sensitive operations, webhooks, and third-party API integrations (GitHub, OpenRouter, Pinecone, Razorpay) are strictly processed server-side in our Next.js backend, keeping tokens and logic secure.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
