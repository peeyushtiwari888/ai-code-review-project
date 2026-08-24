import * as React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FaqSection() {
  const faqs = [
    {
      question: "How does AI code review work?",
      answer: (
        <>
          RepoReview receives the pull request event, retrieves relevant repository context through the <span className="font-mono text-[13px] bg-muted/50 px-1 py-0.5 rounded border border-border/50">RAG</span> pipeline, and uses that context to analyze the changes before generating the review.
        </>
      )
    },
    {
      question: "Does RepoReview understand my entire repository?",
      answer: (
        <>
          Yes. Our background jobs (powered by <span className="font-mono text-[13px] bg-muted/50 px-1 py-0.5 rounded border border-border/50">Inngest</span>) listen to repository webhook events to maintain an up-to-date vector database in <span className="font-mono text-[13px] bg-muted/50 px-1 py-0.5 rounded border border-border/50">Pinecone</span>. This ensures the AI always has the latest architectural context before reviewing new changes.
        </>
      )
    },
    {
      question: "How does GitHub integration work?",
      answer: (
        <>
          Simply install the <span className="font-mono text-[13px] bg-muted/50 px-1 py-0.5 rounded border border-border/50">GitHub App</span> from your dashboard. Once installed, it securely listens for pull request events and synchronizes the repositories you explicitly grant access to.
        </>
      )
    },
    {
      question: "When does a review run?",
      answer: (
        <>
          Reviews are triggered securely via GitHub webhooks. The review pipeline starts automatically whenever a <span className="font-mono text-[13px] bg-muted/50 px-1 py-0.5 rounded border border-border/50">Pull Request</span> is opened, synchronized, or reopened.
        </>
      )
    },
    {
      question: "Where does the review appear?",
      answer: (
        <>
          The generated analysis is posted directly as a comment on your GitHub pull request, providing inline feedback and actionable suggestions right where your team works.
        </>
      )
    },
    {
      question: "Can AI replace human code review?",
      answer: (
        <>
          No. AI reviews are designed to assist developers by catching potential bugs, security issues, and providing additional context quickly. Human review remains crucial for evaluating architectural decisions and business logic.
        </>
      )
    },
    {
      question: "What access does GitHub integration require?",
      answer: (
        <>
          Our GitHub App strictly requires read access to your code to build the context vectors, and read/write access to pull requests so we can post the automated review comments. We only use these permissions to operate the review pipeline.
        </>
      )
    },
    {
      question: "How does billing work?",
      answer: (
        <>
          We offer a generous free tier for individual developers with up to 5 AI reviews per month. Upgrading to the Pro plan provides unlimited reviews, securely handled via our <span className="font-mono text-[13px] bg-muted/50 px-1 py-0.5 rounded border border-border/50">Razorpay</span> integration.
        </>
      )
    }
  ];

  return (
    <section id="faq" className="relative flex flex-col items-center justify-center py-24 px-4 sm:px-6 lg:px-8 w-full bg-background border-t border-border/30">
      
      {/* Decorative Subtle Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left_center,rgba(var(--color-ai-cyan),0.02)_0%,transparent_60%)] pointer-events-none" />

      <div className="relative z-10 mx-auto w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        {/* Left Side: Header & Decorative Flow */}
        <div className="flex flex-col items-start text-left gap-6 lg:col-span-5 lg:sticky lg:top-32">
          
          <div className="flex flex-col gap-4">
            <span className="inline-flex items-center text-[13px] font-semibold tracking-widest text-muted-foreground uppercase">
              FAQ
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tighter text-foreground leading-[1.1]">
              Clarity before<br />every merge.
            </h2>
            <p className="text-lg text-muted-foreground max-w-[320px] leading-relaxed mt-2">
              How RepoReview fits into your existing GitHub workflow.
            </p>
          </div>

          {/* Decorative Technical Detail (Accessible hidden) */}
          <div className="mt-8 flex flex-col gap-3 text-[13px] font-medium text-muted-foreground/60 border-l-[1.5px] border-border/50 pl-6 relative" aria-hidden="true">
            <div className="absolute -left-[4.5px] top-1.5 h-[7px] w-[7px] rounded-full bg-ai-cyan" />
            <div className="absolute -left-[4px] top-[calc(50%-3px)] h-[6px] w-[6px] rounded-full bg-ai-cyan/60" />
            <div className="absolute -left-[3.5px] bottom-1.5 h-[5px] w-[5px] rounded-full bg-ai-cyan/30" />
            
            <span className="flex items-center">
              Repository context
            </span>
            <span className="text-[11px] opacity-40 py-1 flex items-center gap-2">
              <span className="h-[1px] w-4 bg-muted-foreground/30" />
              Vector Space
            </span>
            <span className="flex items-center">
              Pull request analysis
            </span>
            <span className="text-[11px] opacity-40 py-1 flex items-center gap-2">
              <span className="h-[1px] w-4 bg-muted-foreground/30" />
              LLM Generation
            </span>
            <span className="flex items-center">
              Actionable review
            </span>
          </div>

        </div>

        {/* Right Side: Accordion */}
        <div className="flex flex-col gap-2 lg:col-span-7 w-full">
          <Accordion className="w-full border-0 gap-3 flex flex-col">
            {faqs.map((item, index) => (
              <AccordionItem 
                key={index} 
                value={`faq-${index}`} 
                className="group border border-transparent border-b-border/40 hover:border-border/60 transition-colors data-open:border-ai-cyan/20 data-open:bg-card/40 data-open:shadow-sm data-open:rounded-xl px-2 lg:px-4"
              >
                <AccordionTrigger className="text-left font-semibold text-[15px] sm:text-base text-foreground/80 hover:text-foreground hover:no-underline group-data-open:text-foreground py-4 lg:py-5 outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-[14.5px] leading-relaxed pt-0 pb-6 pr-6">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

      </div>
    </section>
  );
}
