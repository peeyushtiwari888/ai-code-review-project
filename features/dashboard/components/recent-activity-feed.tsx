import { formatDistanceToNow } from "date-fns";
import { Folder, ArrowClockwise, WarningCircle } from "@phosphor-icons/react/dist/ssr";

export type RecentSync = {
  id: string;
  repoFullName: string;
  status: string;
  updatedAt: Date;
};

type RecentActivityFeedProps = {
  activities: RecentSync[];
};

export function RecentActivityFeed({ activities }: RecentActivityFeedProps) {
  if (activities.length === 0) {
    return (
      <div className="flex h-32 items-center justify-center rounded-xl border border-dashed border-border/50 text-sm text-muted-foreground">
        No recent sync activity.
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border/50 bg-card/40 backdrop-blur-sm transition-all hover:shadow-[0_0_30px_-10px_rgba(var(--color-ai-cyan),0.1)] hover:border-border/80 flex flex-col h-full">
      <div className="p-4 md:p-5 border-b border-border/50">
        <h3 className="text-base font-semibold tracking-tight">Recent Sync Activity</h3>
      </div>
      <div className="flex flex-col flex-1 p-2 md:p-3 overflow-y-auto max-h-[350px]">
        {activities.map((activity) => (
          <div key={activity.id} className="group flex items-start gap-4 p-2 md:p-3 rounded-lg hover:bg-ai-cyan/5 transition-all duration-300">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted/30 border border-border/50 group-hover:border-ai-cyan/30 transition-colors">
              {activity.status === "synced" ? (
                <Folder className="h-4 w-4 text-muted-foreground group-hover:text-ai-cyan transition-colors" weight="duotone" />
              ) : activity.status === "failed" ? (
                <WarningCircle className="h-4 w-4 text-destructive" weight="duotone" />
              ) : (
                <ArrowClockwise className="h-4 w-4 text-ai-cyan animate-spin" />
              )}
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <p className="text-sm font-medium leading-none mb-1 text-foreground group-hover:text-ai-cyan transition-colors">
                {activity.status === "synced" 
                  ? "Repository synced" 
                  : activity.status === "failed" 
                  ? "Sync failed" 
                  : "Syncing repository"}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                <span className="font-mono">{activity.repoFullName}</span>
              </p>
            </div>
            <div className="ml-auto text-[11px] text-muted-foreground whitespace-nowrap pt-0.5 group-hover:text-foreground/70 transition-colors">
              {formatDistanceToNow(activity.updatedAt, { addSuffix: true })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
