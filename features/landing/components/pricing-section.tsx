import * as React from "react";
import Link from "next/link";
import { Check, CreditCard, Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PLAN_DETAILS } from "@/features/settings/lib/plan-details";
import { UpgradeButton } from "@/features/billing/components/upgrade-button";

export function PricingSection() {
  const freeFeatures = PLAN_DETAILS.free.features;
  const proFeatures = PLAN_DETAILS.pro.features;

  return (
    <section id="pricing" className="relative flex flex-col items-center justify-center py-24 px-4 w-full bg-background overflow-hidden border-t border-border/50">
      
      {/* Subtle Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_center,var(--color-ai-glow)_0%,transparent_70%)] pointer-events-none opacity-30 dark:opacity-20" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(var(--color-foreground),0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(var(--color-foreground),0.02)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black,transparent)] pointer-events-none" />

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col gap-12">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center gap-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center text-xs font-mono font-semibold tracking-wider text-ai-accent dark:text-ai-cyan uppercase">
            <CreditCard className="mr-2 h-4 w-4" />
            SIMPLE, TRANSPARENT PRICING
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Choose the plan that fits your workflow.</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Start reviewing your code for free and upgrade when your team needs unlimited capacity. No hidden fees.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mt-8 max-w-4xl mx-auto w-full items-start">
          
          {/* Free Plan Card */}
          <div className="relative flex flex-col p-8 rounded-3xl border border-border bg-card shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex flex-col gap-2 mb-6">
              <h3 className="text-2xl font-bold">{PLAN_DETAILS.free.label}</h3>
              <p className="text-sm text-muted-foreground">For exploring RepoReview.</p>
            </div>
            
            <div className="flex items-baseline gap-2 mb-8">
              <span className="text-5xl font-extrabold tracking-tight">$0</span>
              <span className="text-sm font-medium text-muted-foreground">/ forever</span>
            </div>

            <Link href="/dashboard" className="w-full mb-8">
              <Button size="lg" variant="outline" className="w-full text-foreground hover:bg-muted/50 rounded-xl h-12">
                Get Started
              </Button>
            </Link>

            <div className="flex flex-col gap-4">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">What&apos;s included</span>
              <ul className="flex flex-col gap-3">
                {freeFeatures.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-foreground">
                    <Check className="h-4 w-4 text-success shrink-0 mt-0.5" />
                    <span className="leading-tight">{feature}</span>
                  </li>
                ))}
                <li className="flex items-start gap-3 text-sm text-muted-foreground/60">
                  <Check className="h-4 w-4 text-muted-foreground/30 shrink-0 mt-0.5" />
                  <span className="leading-tight">Priority support</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Pro Plan Card (Emphasized) */}
          <div className="relative flex flex-col p-8 rounded-3xl border-2 border-ai-cyan bg-card shadow-lg hover:shadow-[0_0_30px_-10px_rgba(var(--color-ai-cyan),0.2)] transition-all duration-300 transform md:-translate-y-4">
            
            {/* Ambient inner glow for Pro card */}
            <div className="absolute inset-0 bg-gradient-to-br from-ai-cyan/10 via-transparent to-transparent opacity-50 rounded-3xl pointer-events-none" />
            
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <div className="inline-flex items-center gap-1.5 rounded bg-ai-cyan px-3 py-1 text-xs font-bold text-background shadow-sm uppercase tracking-wider">
                <Sparkles className="h-3.5 w-3.5" />
                Most Popular
              </div>
            </div>

            <div className="relative z-10 flex flex-col gap-2 mb-6 mt-2">
              <h3 className="text-2xl font-bold">{PLAN_DETAILS.pro.label}</h3>
              <p className="text-sm text-muted-foreground">For serious developers and teams.</p>
            </div>
            
            <div className="relative z-10 flex items-baseline gap-2 mb-8">
              <span className="text-5xl font-extrabold tracking-tight">$19</span>
              <span className="text-sm font-medium text-muted-foreground">/ month</span>
            </div>

            <div className="w-full mb-8 relative z-10">
              <UpgradeButton className="w-full bg-foreground text-background hover:bg-foreground/90 rounded-xl h-12 shadow-sm transition-all group">
                Upgrade to Pro
                <Zap className="ml-2 h-4 w-4 opacity-70 group-hover:scale-110 transition-transform text-ai-cyan inline-block" />
              </UpgradeButton>
            </div>

            <div className="relative z-10 flex flex-col gap-4">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Everything in Free, plus</span>
              <ul className="flex flex-col gap-3">
                {proFeatures.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-foreground">
                    <Check className="h-4 w-4 text-ai-cyan shrink-0 mt-0.5" />
                    <span className="leading-tight font-medium">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
