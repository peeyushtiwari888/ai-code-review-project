import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface RepoReviewBrandProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  hideTextOnMobile?: boolean;
  href?: string;
}

export function RepoReviewBrand({ 
  className, 
  size = 'md', 
  hideTextOnMobile, 
  href 
}: RepoReviewBrandProps) {
  const iconSizes = {
    sm: 20,
    md: 24,
    lg: 28,
    xl: 36,
  };
  
  const textSizes = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
    xl: "text-2xl"
  };

  const iconSize = iconSizes[size];

  const content = (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="relative shrink-0 flex items-center justify-center">
        <Image
          src="/branding/reporeview-logo.png.jpeg"
          alt="RepoReview"
          width={iconSize}
          height={iconSize}
          className="object-contain invert mix-blend-multiply dark:invert-0 dark:mix-blend-screen"
          priority
        />
      </div>
      <span className={cn(
        "font-sans font-semibold tracking-tight group-data-[collapsible=icon]:hidden truncate leading-tight",
        hideTextOnMobile && "hidden sm:block",
        textSizes[size]
      )}>
        <span className="text-foreground">Repo</span>
        <span className="text-foreground/70">Review</span>
      </span>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="outline-none hover:opacity-90 transition-opacity">
        {content}
      </Link>
    );
  }

  return content;
}
