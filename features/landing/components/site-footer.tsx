import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { RepoReviewBrand } from "@/components/brand/reporeview-brand";
import { Button } from "@/components/ui/button";

export function SiteFooter() {
  return (
    <footer className="w-full border-t border-border/50 bg-background pt-16 pb-8 px-4 md:px-8">
      <div className="mx-auto w-full max-w-7xl">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Brand & Tagline */}
          <div className="col-span-1 md:col-span-2 flex flex-col items-start gap-4">
            <RepoReviewBrand href="/" size="lg" className="mb-2" />
            <p className="text-muted-foreground text-sm max-w-sm">
              Context-aware AI code reviews for GitHub. Catch bugs, enforce standards, and ship better code faster.
            </p>
            <Link href="/dashboard" className="mt-4">
              <Button variant="outline" size="sm" className="group rounded-full text-xs font-medium">
                Connect GitHub
                <ArrowRight className="ml-2 h-3 w-3 opacity-70 group-hover:translate-x-0.5 transition-transform" />
              </Button>
            </Link>
          </div>

          {/* Navigation Group: Product */}
          <div className="flex flex-col gap-4">
            <h4 className="font-semibold text-foreground text-sm uppercase tracking-wider">Product</h4>
            <ul className="flex flex-col gap-3">
              <li>
                <Link href="#features" className="text-sm text-muted-foreground hover:text-ai-cyan transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#how-it-works" className="text-sm text-muted-foreground hover:text-ai-cyan transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="text-sm text-muted-foreground hover:text-ai-cyan transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#faq" className="text-sm text-muted-foreground hover:text-ai-cyan transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Navigation Group: Account */}
          <div className="flex flex-col gap-4">
            <h4 className="font-semibold text-foreground text-sm uppercase tracking-wider">Account</h4>
            <ul className="flex flex-col gap-3">
              <li>
                <Link href="/sign-in" className="text-sm text-muted-foreground hover:text-ai-cyan transition-colors">
                  Sign In
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-ai-cyan transition-colors">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>
          
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-border/30">
          <div className="flex flex-col md:flex-row items-center gap-2 text-sm text-muted-foreground/60">
            <span>© {new Date().getFullYear()} RepoReview.</span>
            <span className="hidden md:inline">•</span>
            <span>Built for developers.</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground/60 hover:text-foreground transition-colors">
              GitHub
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
