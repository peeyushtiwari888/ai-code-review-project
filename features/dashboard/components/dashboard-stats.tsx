import { Folder, GitPullRequest, Sparkle, WarningCircle } from "@phosphor-icons/react/dist/ssr";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type Stat = {
  title: string;
  value: number;
  description: string;
  icon: React.ElementType;
  colorClass: string;
};

type DashboardStatsProps = {
  reposCount: number;
  prCount: number;
  reviewsCount: number;
};

export function DashboardStats({ reposCount, prCount, reviewsCount }: DashboardStatsProps) {
  const stats: Stat[] = [
    {
      title: "Connected Repositories",
      value: reposCount,
      description: "Codebases currently synced",
      icon: Folder,
      colorClass: "text-ai-cyan",
    },
    {
      title: "Tracked Pull Requests",
      value: prCount,
      description: "Total PRs monitored",
      icon: GitPullRequest,
      colorClass: "text-foreground",
    },
    {
      title: "AI Reviews Completed",
      value: reviewsCount,
      description: "Context-aware reviews posted",
      icon: Sparkle,
      colorClass: "text-ai-cyan",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {stats.map((stat, index) => (
        <Card key={index} className="group bg-card/40 backdrop-blur-xl border border-border/50 hover:border-ai-cyan/30 hover:shadow-[0_0_20px_-5px_rgba(var(--color-ai-cyan),0.15)] transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
              {stat.title}
            </CardTitle>
            <div className={cn("flex h-9 w-9 items-center justify-center rounded-lg border border-border/50 shadow-sm transition-colors group-hover:bg-ai-cyan/10 group-hover:border-ai-cyan/30", stat.colorClass === "text-ai-cyan" ? "bg-ai-cyan/5 text-ai-cyan" : "bg-muted/30 text-foreground")}>
              <stat.icon className="h-4 w-4" weight="duotone" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold tracking-tight">{stat.value}</div>
            <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
