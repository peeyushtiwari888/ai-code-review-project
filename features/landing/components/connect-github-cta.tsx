"use client";

import React, { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2 } from "lucide-react";
import { connectGithubOnboarding } from "@/features/github/actions";
import { cn } from "@/lib/utils";

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

interface ConnectGithubCtaProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  size?: "default" | "sm" | "lg" | "icon";
  variant?: "default" | "outline" | "ghost" | "secondary" | "destructive" | "link";
  iconSize?: "sm" | "md";
}

export function ConnectGithubCta({ className, size = "default", variant = "default", onClick, iconSize = "sm", children, ...props }: ConnectGithubCtaProps) {
  const [isPending, startTransition] = useTransition();

  const handleConnect = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);
    startTransition(async () => {
      await connectGithubOnboarding();
    });
  };

  const iconClass = iconSize === "md" ? "h-5 w-5" : "h-4 w-4";
  const arrowClass = iconSize === "md" ? "h-4 w-4" : "h-3.5 w-3.5";

  return (
    <Button 
      size={size} 
      variant={variant}
      className={cn("group relative overflow-hidden transition-all", className)} 
      onClick={handleConnect}
      disabled={isPending || props.disabled}
      {...props}
    >
      {isPending ? (
        <Loader2 className={cn("mr-2 animate-spin", iconClass)} />
      ) : (
        <GithubIcon className={cn("mr-2", iconClass)} />
      )}
      
      {isPending ? "Connecting..." : children || "Connect GitHub"}
      
      {!isPending && (
        <ArrowRight className={cn("ml-2 opacity-70 group-hover:translate-x-1 transition-transform", arrowClass)} />
      )}
    </Button>
  );
}
