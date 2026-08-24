import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { prisma } from '@/lib/db';
import { requireAuth } from '@/features/auth/actions';
import { getUserInstallationId } from '@/features/github/server/installation';
import { DashboardHeader } from '@/features/dashboard/components/dashboard-header';
import { DashboardEmptyState } from '@/features/dashboard/components/dashboard-empty-state';
import { DashboardStats } from '@/features/dashboard/components/dashboard-stats';
import { RecentReviewsTable } from '@/features/dashboard/components/recent-reviews-table';
import { RecentActivityFeed } from '@/features/dashboard/components/recent-activity-feed';
import { LiveSyncTracker } from '@/features/dashboard/components/live-sync-tracker';
import { Skeleton } from '@/components/ui/skeleton';

export const metadata = {
  title: 'Dashboard | RepoReview',
};

export default async function DashboardOverview() {
  const session = await requireAuth();
  const userId = session.user.id;

  const installationId = await getUserInstallationId(userId);

  if (!installationId) {
    return (
      <div className="flex flex-col min-h-[calc(100svh-3.5rem)]">
        <DashboardHeader 
          title="Dashboard" 
        />
        <div className="flex-1 p-4 lg:p-8 pt-6 flex flex-col">
          <DashboardEmptyState />
        </div>
      </div>
    );
  }

function DashboardSkeleton() {
  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-3">
        <Skeleton className="h-32 w-full rounded-xl" />
        <Skeleton className="h-32 w-full rounded-xl" />
        <Skeleton className="h-32 w-full rounded-xl" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Skeleton className="h-[400px] w-full rounded-xl" />
        </div>
        <div>
          <Skeleton className="h-[400px] w-full rounded-xl" />
        </div>
      </div>
    </div>
  );
}

async function DashboardData({ installationId }: { installationId: number }) {
  // Fetch metrics in parallel
  const [
    reposCount,
    prCount,
    reviewsCount,
    recentReviews,
    recentActivity,
    initialSyncs
  ] = await Promise.all([
    prisma.repoSync.count({ where: { installationId } }),
    prisma.pullRequest.count({ where: { installationId } }),
    prisma.pullRequest.count({ where: { installationId, status: "reviewed" } }),
    prisma.pullRequest.findMany({
      where: { installationId },
      orderBy: { updatedAt: 'desc' },
      take: 5,
      select: {
        id: true,
        repoFullName: true,
        prNumber: true,
        title: true,
        status: true,
        updatedAt: true,
      }
    }),
    prisma.repoSync.findMany({
      where: { installationId },
      orderBy: { updatedAt: 'desc' },
      take: 5,
      select: {
        id: true,
        repoFullName: true,
        status: true,
        updatedAt: true,
      }
    }),
    prisma.repoSync.findMany({
      where: { 
        installationId,
        status: { in: ["pending", "syncing"] }
      },
      select: {
        id: true,
        repoFullName: true,
        status: true,
        chunkCount: true,
        updatedAt: true,
      },
      orderBy: { updatedAt: 'desc' }
    })
  ]);

  return (
    <>
      <LiveSyncTracker initialSyncs={initialSyncs} />
      
      <DashboardStats 
        reposCount={reposCount} 
        prCount={prCount} 
        reviewsCount={reviewsCount} 
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 flex flex-col gap-4">
          <RecentReviewsTable reviews={recentReviews} />
        </div>
        
        <div className="flex flex-col gap-4">
          <RecentActivityFeed activities={recentActivity} />
        </div>
      </div>
    </>
  );
}

  return (
    <div className="flex flex-col min-h-full">
      <DashboardHeader 
        title="Dashboard" 
      />
      <div className="flex-1 space-y-8 p-4 lg:p-8 pt-6">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-mono font-semibold tracking-wider text-ai-cyan uppercase mb-1">
              OVERVIEW
            </div>
            <h2 className="text-3xl font-bold tracking-tight">Good morning, {session.user.name?.split(' ')[0] || "Welcome back"}</h2>
            <p className="text-muted-foreground mt-1">
              Monitor your repositories and AI-powered code reviews.
            </p>
          </div>
          <Link href="/dashboard/github">
            <Button className="bg-foreground text-background hover:bg-foreground/90 shadow-sm">
              <Plus className="mr-2 h-4 w-4" />
              Connect Repository
            </Button>
          </Link>
        </div>

        <React.Suspense fallback={<DashboardSkeleton />}>
          <DashboardData installationId={installationId} />
        </React.Suspense>

      </div>
    </div>
  );
}