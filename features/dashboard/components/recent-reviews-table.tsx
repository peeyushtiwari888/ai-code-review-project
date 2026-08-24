import { CheckCircle, CircleNotch, XCircle } from "@phosphor-icons/react/dist/ssr";
import { formatDistanceToNow } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export type RecentReview = {
  id: string;
  repoFullName: string;
  prNumber: number;
  title: string;
  status: string;
  updatedAt: Date;
};

type RecentReviewsTableProps = {
  reviews: RecentReview[];
};

export function RecentReviewsTable({ reviews }: RecentReviewsTableProps) {
  if (reviews.length === 0) {
    return (
      <div className="flex h-32 items-center justify-center rounded-xl border border-dashed border-border/50 text-sm text-muted-foreground">
        No recent reviews found.
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border/50 overflow-hidden bg-card/40 backdrop-blur-sm shadow-sm transition-all hover:shadow-[0_0_30px_-10px_rgba(var(--color-ai-cyan),0.1)] hover:border-border/80 flex flex-col h-full">
      <div className="p-4 md:p-5 border-b border-border/50 flex items-center justify-between">
        <h3 className="text-base font-semibold tracking-tight">Recent AI Reviews</h3>
      </div>
      <Table className="flex-1">
        <TableHeader className="bg-muted/30">
          <TableRow className="hover:bg-transparent border-border/50">
            <TableHead>Pull Request</TableHead>
            <TableHead>Repository</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Last Updated</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reviews.map((review) => (
            <TableRow key={review.id} className="group hover:bg-ai-cyan/5 border-border/50 transition-all duration-300">
              <TableCell className="font-medium">
                <a 
                  href={`https://github.com/${review.repoFullName}/pull/${review.prNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col gap-0.5 outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                >
                  <span className="truncate max-w-[200px] sm:max-w-[300px] font-semibold text-foreground group-hover:text-ai-cyan transition-colors hover:underline">
                    {review.title}
                  </span>
                  <span className="text-xs text-muted-foreground font-mono group-hover:text-ai-cyan/70 transition-colors">
                    #{review.prNumber}
                  </span>
                </a>
              </TableCell>
              <TableCell className="text-muted-foreground">
                <code className="px-1.5 py-0.5 rounded-md bg-indigo-500/10 text-xs font-mono text-indigo-400 border border-indigo-500/20 group-hover:bg-indigo-500/20 transition-colors">
                  {review.repoFullName}
                </code>
              </TableCell>
              <TableCell>
                {review.status === "reviewed" ? (
                  <Badge variant="outline" className="bg-transparent text-success border-success/30 flex w-fit items-center gap-1.5 px-2 py-0.5 shadow-none rounded-md">
                    <div className="h-1.5 w-1.5 rounded-full bg-success" />
                    Completed
                  </Badge>
                ) : review.status === "processing" ? (
                  <Badge variant="outline" className="bg-transparent text-ai-cyan border-ai-cyan/30 flex w-fit items-center gap-1.5 px-2 py-0.5 shadow-none rounded-md">
                    <CircleNotch weight="bold" className="h-3 w-3 animate-spin" />
                    Processing
                  </Badge>
                ) : review.status === "failed" ? (
                  <Badge variant="outline" className="bg-transparent text-destructive border-destructive/30 flex w-fit items-center gap-1.5 px-2 py-0.5 shadow-none rounded-md">
                    <div className="h-1.5 w-1.5 rounded-full bg-destructive" />
                    Failed
                  </Badge>
                ) : (
                  <Badge variant="outline" className="bg-transparent text-muted-foreground border-border flex w-fit items-center gap-1.5 px-2 py-0.5 shadow-none rounded-md">
                    <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground/50" />
                    Pending
                  </Badge>
                )}
              </TableCell>
              <TableCell className="text-right text-xs text-muted-foreground">
                {formatDistanceToNow(review.updatedAt, { addSuffix: true })}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
