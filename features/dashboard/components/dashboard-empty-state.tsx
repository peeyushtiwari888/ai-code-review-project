import Link from "next/link";
import { GithubLogo, Plus } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/button";

export function DashboardEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] w-full p-8 text-center rounded-2xl border border-dashed border-border bg-card/10">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-ai-cyan/10 mb-6 relative">
        <div className="absolute inset-0 rounded-full border border-ai-cyan animate-ping opacity-20" />
        <GithubLogo className="h-10 w-10 text-ai-cyan" weight="duotone" />
      </div>
      
      <h3 className="text-2xl font-bold tracking-tight mb-2">Connect your first repository</h3>
      <p className="text-muted-foreground max-w-md mb-8">
        Connect a GitHub repository and let AI review pull requests with repository-wide context.
      </p>
      
      <Link href="/dashboard/github">
        <Button size="lg" className="rounded-xl shadow-sm transition-all bg-foreground text-background hover:bg-foreground/90">
          <Plus className="mr-2 h-4 w-4" />
          Connect GitHub
        </Button>
      </Link>
    </div>
  );
}
