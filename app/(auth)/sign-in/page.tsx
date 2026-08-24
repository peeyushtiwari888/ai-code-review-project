import React from 'react';
import type { Metadata } from 'next';
import { RepoReviewBrand } from "@/components/brand/reporeview-brand";
import { GithubSignInForm } from '@/features/auth/components/github-sign-in-form';

export const metadata: Metadata = {
  title: "Sign In | RepoReview",
  description: "Sign in to RepoReview with your GitHub account.",
};

type SignInPageProps = {
  searchParams: any;
};

const ProductVisualization = () => (
  <div className="relative z-10 w-full max-w-sm lg:max-w-md bg-[#08090b] border border-white/5 rounded-xl p-5 lg:p-6 shadow-2xl shadow-black/40 backdrop-blur-sm" aria-hidden="true">
    {/* PR Header */}
    <div className="flex items-center gap-3 border-b border-white/5 pb-4 mb-4 lg:mb-5">
      <div className="h-6 w-6 rounded bg-ai-cyan/10 border border-ai-cyan/20 flex items-center justify-center">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-ai-cyan">
          <circle cx="18" cy="18" r="3"></circle>
          <circle cx="6" cy="6" r="3"></circle>
          <path d="M13 6h3a2 2 0 0 1 2 2v7"></path>
          <line x1="6" y1="9" x2="6" y2="21"></line>
        </svg>
      </div>
      <div className="flex flex-col">
        <span className="text-[13px] font-mono text-zinc-300 font-medium leading-none">PR #142</span>
        <span className="text-[11px] text-zinc-500 font-mono mt-1.5 leading-none">feat/auth-service</span>
      </div>
    </div>
    
    {/* Context Flow */}
    <div className="flex flex-col gap-4 relative pl-5 border-l-[1.5px] border-white/10 ml-3 motion-safe:animate-in motion-safe:fade-in duration-1000">
      
      <div className="absolute -left-[4.5px] top-1.5 h-[7px] w-[7px] rounded-full bg-zinc-700" />
      <div className="absolute -left-[4.5px] top-[calc(50%-2px)] h-[7px] w-[7px] rounded-full bg-ai-cyan shadow-[0_0_8px_rgba(var(--color-ai-cyan),0.4)]" />
      <div className="absolute -left-[4.5px] bottom-1.5 h-[7px] w-[7px] rounded-full bg-zinc-700" />
      
      <div className="flex flex-col motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-top-2 duration-1000 delay-150 fill-mode-both">
        <span className="text-[13px] font-semibold text-zinc-200">Context retrieved</span>
        <div className="flex flex-col gap-1.5 mt-2.5">
          <span className="text-[12px] font-mono text-zinc-400 flex items-center gap-2">
            <span className="text-ai-cyan/80 text-[10px]">✓</span> auth.ts
          </span>
          <span className="text-[12px] font-mono text-zinc-400 flex items-center gap-2">
            <span className="text-ai-cyan/80 text-[10px]">✓</span> session.ts
          </span>
          <span className="text-[12px] font-mono text-zinc-400 flex items-center gap-2">
            <span className="text-ai-cyan/80 text-[10px]">✓</span> middleware.ts
          </span>
        </div>
      </div>

      <div className="flex flex-col mt-3 pt-5 border-t border-white/5 motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-top-2 duration-1000 delay-500 fill-mode-both">
        <span className="text-[13px] font-semibold text-white flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-500 motion-safe:animate-pulse" />
          AI Review
        </span>
        <div className="mt-3 bg-blue-500/10 border border-blue-500/20 rounded-md p-3">
          <span className="text-[12px] text-blue-200 font-medium">Potential issue detected</span>
          <div className="text-[11px] text-blue-400/80 font-mono mt-1">Severity: High</div>
        </div>
      </div>
    </div>
  </div>
);

const SignInPage = async (props: SignInPageProps) => {
  // Await searchParams for Next.js 15 compatibility, but fallback safely
  const searchParams = await props.searchParams;
  const callbackUrl = searchParams?.callbackUrl as string | undefined;
  const error = searchParams?.error as string | undefined;
  
  return (
    <div className="flex w-full min-h-screen bg-background">
      
      {/* LEFT SIDE - Brand & Product Visualization (Hidden on Mobile) */}
      <div className="hidden lg:flex w-1/2 flex-col justify-between bg-[#030303] border-r border-border p-12 relative overflow-hidden">
        
        {/* Subtle decorative gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(var(--color-ai-cyan),0.04)_0%,transparent_50%)] pointer-events-none" />

        <div className="relative z-10 flex flex-col gap-8">
          {/* Using dark class intentionally to force dark mode blending for the logo on this dark panel */}
          <div className="dark">
            <RepoReviewBrand size="lg" />
          </div>
          
          <div className="mt-8">
            <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-white leading-[1.1]">
              AI code review that understands<br />your entire repository.
            </h1>
            <p className="mt-5 text-zinc-400 max-w-md text-base leading-relaxed">
              Review pull requests with repository-wide context instead of analyzing only changed lines.
            </p>
          </div>
        </div>

        <div className="relative z-10 mt-16 mb-8">
          <ProductVisualization />
        </div>
        
        <div className="relative z-10 text-xs text-zinc-600 font-medium">
          © 2026 RepoReview
        </div>
      </div>

      {/* RIGHT SIDE - Sign In Form */}
      <div className="flex w-full lg:w-1/2 flex-col items-center justify-center p-6 sm:p-12 relative overflow-hidden">
        
        {/* Subtle Background Watermark */}
        <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none select-none opacity-[0.15] dark:opacity-20 overflow-hidden">
          <img 
            src="/branding/reporeview-logo.png.jpeg" 
            alt="" 
            className="w-full h-full object-cover scale-[1.5] blur-[3px] grayscale invert mix-blend-multiply dark:invert-0 dark:mix-blend-screen" 
          />
        </div>

        {/* Mobile Brand (Hidden on Desktop) */}
        <div className="relative z-10 lg:hidden mb-12 flex justify-center w-full">
          <RepoReviewBrand size="lg" />
        </div>

        <div className="relative z-10 w-full max-w-sm flex flex-col items-center text-center">
          
          <div className="flex flex-col gap-2 mb-8">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">Welcome back</h2>
            <p className="text-muted-foreground text-sm">Sign in to continue to RepoReview.</p>
          </div>

          {error && (
            <div className="mb-6 w-full p-3 rounded-md bg-destructive/10 text-destructive text-[13px] font-medium border border-destructive/20 text-center">
              Unable to sign in with GitHub. Please try again.
            </div>
          )}
          
          <div className="w-full mb-6">
             <GithubSignInForm callbackUrl={callbackUrl} />
          </div>
          
          <p className="text-[13px] text-muted-foreground/70 text-center max-w-[280px]">
            Secure GitHub authentication.<br />Your repositories remain completely private.
          </p>
          
        </div>

        {/* Mobile Product Visualization (Hidden on Desktop) */}
        <div className="relative z-10 lg:hidden mt-20 w-full max-w-sm flex justify-center pb-8">
          <ProductVisualization />
        </div>
        
        <div className="lg:hidden absolute bottom-4 text-[11px] text-muted-foreground/40 font-medium">
          © 2026 RepoReview
        </div>
      </div>

    </div>
  );
};

export default SignInPage;