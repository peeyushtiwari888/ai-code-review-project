"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RepoReviewBrand } from "@/components/brand/reporeview-brand";
import { Menu, X, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { ConnectGithubCta } from "./connect-github-cta";

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

const navigation = [
  { name: "Product", href: "#product-showcase" },
  { name: "How It Works", href: "#how-it-works" },
  { name: "Features", href: "#features" },
  { name: "Pricing", href: "#pricing" },
];

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const pathname = usePathname();

  // Handle scroll effect
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle smooth scrolling for hash links
  const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#") && pathname === "/") {
      e.preventDefault();
      const targetId = href.substring(1);
      const elem = document.getElementById(targetId);
      if (elem) {
        elem.scrollIntoView({ behavior: "smooth" });
        setIsMobileMenuOpen(false);
      }
    } else if (href.startsWith("#")) {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 w-full transition-all duration-300 border-b",
        isScrolled
          ? "border-border/40 bg-background/60 backdrop-blur-xl shadow-sm supports-[backdrop-filter]:bg-background/60"
          : "bg-transparent border-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <RepoReviewBrand href="/" size="lg" hideTextOnMobile={false} />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={(e) => handleScrollToSection(e, item.href)}
              className="text-sm font-medium text-muted-foreground transition-all duration-200 px-3 py-1.5 rounded-full hover:bg-muted/80 hover:text-foreground"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="hidden md:flex items-center gap-4">
          <ModeToggle />
          <div className="flex items-center gap-3">
            <Link href="/sign-in" className={buttonVariants({ variant: "ghost", className: "text-sm font-medium" })}>
              Sign In
            </Link>
            <ConnectGithubCta className="h-9 bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-[0_0_15px_-3px_rgba(var(--color-ai-accent),0.4)]" />
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-4 md:hidden">
          <ModeToggle />
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-expanded={isMobileMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            {isMobileMenuOpen ? (
              <X className="size-5" aria-hidden="true" />
            ) : (
              <Menu className="size-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-b border-border bg-background shadow-lg">
          <div className="space-y-1 px-4 pb-4 pt-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={(e) => handleScrollToSection(e, item.href)}
                className="block rounded-md px-3 py-2 text-base font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                {item.name}
              </Link>
            ))}
            <div className="mt-4 flex flex-col gap-2 border-t border-border pt-4">
              <Link href="/sign-in" onClick={() => setIsMobileMenuOpen(false)} className={buttonVariants({ variant: "outline", className: "w-full justify-center" })}>
                Sign In
              </Link>
              <ConnectGithubCta  
                className="w-full justify-center bg-primary text-primary-foreground hover:bg-primary/90" 
                onClick={() => setIsMobileMenuOpen(false)} 
              />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
