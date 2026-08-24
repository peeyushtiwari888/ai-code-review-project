/**
 * Settings page body with Profile and Subscription tabs.
 *
 * Profile fields are read-only (sourced from GitHub). Subscription tab shows
 * plan details, usage, and upgrade/cancel actions via billing components.
 */

"use client";

import { format } from "date-fns";


import { UpgradeButton } from "@/features/billing/components/upgrade-button";

import type { UserSubscription } from "@/features/dashboard/lib/types";
import { PLAN_DETAILS } from "@/features/settings/lib/plan-details";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SettingsProfile } from "@/features/settings/types";
import { UsageSummary } from "@/features/billing/server/usage";
import { statusBadge } from "../lib/status-style";
import { CancelSubscriptionButton } from "@/features/billing/components/cancel-subscription-button";
import { getDisplayName, getInitials } from "@/features/auth/components/user-menu";

type SettingsContentProps = {
  profile: SettingsProfile;
  subscription: UserSubscription;
  usage: UsageSummary;
};

/**
 * Formats a renewal ISO date for display, or returns null when absent.
 *
 * @param renewsAt - Subscription renewal timestamp or null.
 * @returns Formatted date like "June 12, 2026", or null.
 */
function formatRenewalDate(renewsAt: string | null): string | null {
  if (!renewsAt) {
    return null;
  }

  return format(new Date(renewsAt), "MMMM d, yyyy");
}

/**
 * Maps subscription status enum to a lowercase label for the UI.
 *
 * @param status - `active`, `trialing`, or `canceled`.
 * @returns Display string for the status line.
 */
function getSubscriptionStatusLabel(status: UserSubscription["status"]): string {
  if (status === "active") {
    return "active";
  }

  if (status === "trialing") {
    return "trialing";
  }

  return "canceled";
}

/**
 * Profile tab — avatar, read-only name/email, member since date.
 *
 * @param profile - User profile from GitHub OAuth.
 * @returns Profile card content.
 */
function ProfileTab({ profile }: { profile: SettingsProfile }) {
  const displayName = getDisplayName(profile);
  const initials = getInitials(profile);
  const memberSince = format(new Date(profile.memberSince), "MMMM d, yyyy");

  return (
    <Card className="bg-card/40 backdrop-blur-sm border-border/50 shadow-sm transition-all hover:shadow-[0_0_30px_-10px_rgba(var(--color-ai-cyan),0.1)] hover:border-border/80">
      <CardHeader className="border-b border-border/50 pb-5">
        <CardTitle className="text-xl">Profile</CardTitle>
        <CardDescription>
          Account information from your GitHub sign-in.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8 pt-6">
        <div className="flex items-center gap-5 p-4 rounded-xl bg-muted/20 border border-border/30">
          <div className="relative">
            <div className="absolute inset-0 bg-ai-cyan/20 blur-xl rounded-full" />
            <Avatar size="lg" className="relative border-2 border-border/50 shadow-sm">
              {profile.image ? (
                <AvatarImage src={profile.image} alt={displayName} />
              ) : null}
              <AvatarFallback className="bg-muted text-muted-foreground">{initials}</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex flex-col gap-0.5">
            <p className="font-semibold text-lg leading-none">{displayName}</p>
            <p className="text-sm text-muted-foreground font-medium">{profile.email}</p>
            <p className="text-xs text-muted-foreground/70 mt-1">Member since <span className="text-foreground/80">{memberSince}</span></p>
          </div>
        </div>
        
        <div className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="name" className="text-sm font-medium text-foreground/80">Display name</Label>
            <Input id="name" defaultValue={profile.name} readOnly className="bg-muted/30 border-border/50 focus-visible:ring-ai-cyan/30 text-foreground" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email" className="text-sm font-medium text-foreground/80">Email</Label>
            <Input
              id="email"
              type="email"
              defaultValue={profile.email}
              readOnly
              className="bg-muted/30 border-border/50 focus-visible:ring-ai-cyan/30 text-foreground font-mono text-sm"
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-muted/10 border-t border-border/50 px-6 py-4">
        <p className="text-xs text-muted-foreground flex items-center gap-2">
          <span className="flex h-1.5 w-1.5 rounded-full bg-ai-cyan/50" />
          Profile details are managed by GitHub. Update them in your GitHub account settings.
        </p>
      </CardFooter>
    </Card>
  );
}

/**
 * Builds the monthly usage summary line for the subscription tab.
 *
 * @param usage - Review count used and optional monthly limit.
 * @returns Sentence describing current usage.
 */
function getUsageText(usage: UsageSummary): string {
  if (usage.limit === null) {
    return `${usage.used} reviews used this month (unlimited)`;
  }

  return `${usage.used} / ${usage.limit} reviews used this month`;
}

/**
 * Subscription tab — plan card, usage, feature list, billing actions.
 *
 * @param subscription - Current plan and billing status.
 * @param usage - Monthly AI review usage counts.
 * @returns Subscription management card.
 */
function SubscriptionTab({
  subscription,
  usage,
}: {
  subscription: UserSubscription;
  usage: UsageSummary;
}) {
  const planDetails = PLAN_DETAILS[subscription.plan];
  const renewalDate = formatRenewalDate(subscription.renewsAt);
  const statusLabel = getSubscriptionStatusLabel(subscription.status);

  const isActive = subscription.status === "active" || subscription.status === "trialing";

  // Visual styling reflects active vs inactive subscription
  let cardBorderClass = "border-border/50 bg-card/40 backdrop-blur-sm transition-all hover:shadow-[0_0_30px_-10px_rgba(var(--color-ai-cyan),0.1)] hover:border-border/80";
  let planTextClass = "text-foreground";
  let statusTextClass = "text-muted-foreground";
  let badgeTone: "success" | "neutral" | "warning" = "neutral";
  let highlightClass = "border-border/50 bg-muted/20";

  if (isActive) {
    cardBorderClass = "border-emerald-500/20 bg-card/40 backdrop-blur-sm transition-all hover:shadow-[0_0_30px_-10px_rgba(16,185,129,0.1)] hover:border-emerald-500/40";
    planTextClass = "text-emerald-700 dark:text-emerald-400 font-semibold";
    statusTextClass = "text-emerald-600 dark:text-emerald-500 font-medium";
    highlightClass = "border-emerald-500/30 bg-emerald-500/5 shadow-[inset_0_0_20px_rgba(16,185,129,0.05)]";
    badgeTone = "success";
  }

  if (subscription.status === "canceled") {
    badgeTone = "warning";
  }

  return (
    <Card className={cardBorderClass}>
      <CardHeader className="border-b border-border/50 pb-5">
        <CardTitle className="text-xl">Billing & Subscription</CardTitle>
        <CardDescription>
          Manage your plan and billing for RepoReview.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        <div
          className={cn(
            "flex flex-wrap items-center justify-between gap-4 rounded-xl border p-5 transition-all duration-300",
            highlightClass
          )}
        >
          <div>
            <p className={cn("font-medium", planTextClass)}>
              {planDetails.label} plan
            </p>
            <p className="text-xs text-muted-foreground">
              Status:{" "}
              <span className={statusTextClass}>{statusLabel}</span>
            </p>
            {renewalDate ? (
              <p className="text-xs text-muted-foreground">
                Renews {renewalDate}
              </p>
            ) : null}
          </div>
          <span className={cn(statusBadge(badgeTone), "px-3 py-1 text-xs shadow-sm")}>{planDetails.label}</span>
        </div>
        
        <div className="p-5 rounded-xl bg-muted/20 border border-border/30">
          <p className="text-sm font-medium text-foreground mb-1">Current Usage</p>
          <p className="text-xs text-muted-foreground">{getUsageText(usage)}</p>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-medium text-foreground">Plan Features</p>
          <ul className="space-y-2.5 text-sm text-muted-foreground">
            {planDetails.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2.5">
                <span className="text-ai-cyan mt-0.5 text-[10px]">✦</span>
                <span className="leading-snug">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
      <CardFooter className="flex flex-wrap gap-3 bg-muted/10 border-t border-border/50 px-6 py-4">
        {subscription.plan === "free" ? <UpgradeButton /> : null}
        {subscription.plan === "pro" ? (
          <CancelSubscriptionButton
            disabled={subscription.status === "canceled"}
          />
        ) : null}
      </CardFooter>
    </Card>
  );
}

/**
 * Settings page with tabbed Profile and Subscription sections.
 *
 * @param profile - User profile data from the server.
 * @param subscription - Billing subscription state.
 * @param usage - Monthly review usage summary.
 * @returns Tabbed settings UI below `DashboardHeader`.
 */
export function SettingsContent({
  profile,
  subscription,
  usage,
}: SettingsContentProps) {
  return (
    <div className="flex flex-1 flex-col p-4 lg:p-8">
      <Tabs defaultValue="profile" className="w-full max-w-3xl">
        <TabsList className="bg-muted/50 border border-border/50 p-1 mb-2">
          <TabsTrigger value="profile" className="rounded-md data-[state=active]:bg-background data-[state=active]:shadow-sm data-[state=active]:text-foreground text-muted-foreground px-6">Profile</TabsTrigger>
          <TabsTrigger value="subscription" className="rounded-md data-[state=active]:bg-background data-[state=active]:shadow-sm data-[state=active]:text-foreground text-muted-foreground px-6">Subscription</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-4 outline-none focus-visible:ring-0">
          <ProfileTab profile={profile} />
        </TabsContent>

        <TabsContent value="subscription" className="mt-4 outline-none focus-visible:ring-0">
          <SubscriptionTab subscription={subscription} usage={usage} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
