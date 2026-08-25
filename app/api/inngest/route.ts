import { inngest } from "@/features/inngest/client";
import { reviewPullRequest } from "@/features/reviews/server/review-pr-function";
import { serve } from "inngest/next";
import { processTask } from "./function";
import { syncRepoCodebaseFunction, unsyncRepoCodebaseFunction } from "@/features/repo-sync/server/repo-sync-function";

export const dynamic = "force-dynamic";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [processTask,reviewPullRequest,syncRepoCodebaseFunction,unsyncRepoCodebaseFunction],
});