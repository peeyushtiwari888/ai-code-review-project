"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { useEffect, useMemo, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { githubReposInfiniteQuery } from "@/features/github/lib/repos-query";
import { DashboardRepo } from "../lib/types";
import { statusBadge } from "../lib/status-style";
import { LockIcon, LockKeyOpenIcon, StarIcon } from "@phosphor-icons/react";
import SyncRepoButton from "@/features/repo-sync/components/sync-repo-button";

type Filter = "all" | "public" | "private";

export function RepoList() {
    const [filter, setFilter] = useState<Filter>("all");
    const [search, setSearch] = useState("");
    const loadMoreRef = useRef<HTMLDivElement>(null);

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isPending,
        isError,
    } = useInfiniteQuery(githubReposInfiniteQuery)

    const loading = isPending && !data;

    const repos = useMemo(() => {
        if (!data) {
            return [];
        }

        const loaded = data.pages.flatMap((page) => page.repos);
        return [...loaded].sort(
            (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
    }, [data]);

    const totalCount = data?.pages[0]?.totalCount ?? 0;

    const counts = {
        all: totalCount,
        public: repos.filter((repo) => repo.visibility === "public").length,
        private: repos.filter((repo) => repo.visibility === "private").length,
      };

    const visibleRepos = useMemo(() => {
        const query = search.toLowerCase();
    
        return repos.filter((repo) => {
          if (filter !== "all" && repo.visibility !== filter) {
            return false;
          }
    
          if (query && !repo.fullName.toLowerCase().includes(query)) {
            return false;
          }
    
          return true;
        });
      }, [repos, filter, search]);


      useEffect(() => {
        const element = loadMoreRef.current;
    
        if (!element || !hasNextPage || isFetchingNextPage) {
          return;
        }
    
        const observer = new IntersectionObserver(
          (entries) => {
            if (entries[0]?.isIntersecting) {
              fetchNextPage();
            }
          },
          { rootMargin: "200px" }
        );
    
        observer.observe(element);
        return () => observer.disconnect();
      }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

      let footer: string | null = null;

      if (isFetchingNextPage) {
        footer = "Loading more repositories…";
      } else if (hasNextPage) {
        footer = `Showing ${repos.length} of ${totalCount}`;
      } else if (repos.length > 0) {
        footer = `All ${repos.length} repositories loaded`;
      }
    
      let rows;
    
      if (loading) {
        rows = (
          <TableRow>
            <TableCell colSpan={7} className="text-center text-muted-foreground">
              Loading repositories…
            </TableCell>
          </TableRow>
        );
      } else if (isError) {
        rows = (
          <TableRow>
            <TableCell colSpan={7} className="text-center text-muted-foreground">
              Failed to load repositories.
            </TableCell>
          </TableRow>
        );
      } else if (visibleRepos.length === 0) {
        rows = (
          <TableRow>
            <TableCell colSpan={7} className="text-center text-muted-foreground">
              No repositories found.
            </TableCell>
          </TableRow>
        );
      } else {
        rows = visibleRepos.map((repo) => <RepoRow key={repo.id} repo={repo} />);
      }

      return (
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Tabs
            value={filter}
            onValueChange={(value) => setFilter(value as Filter)}
            className="w-full sm:w-auto"
          >
            <TabsList className="bg-muted/50 p-1 border border-border/50">
              <TabsTrigger value="all" className="data-[state=active]:bg-ai-cyan/10 data-[state=active]:text-ai-cyan data-[state=active]:shadow-none transition-all rounded-md">All ({counts.all})</TabsTrigger>
              <TabsTrigger value="public" className="data-[state=active]:bg-ai-cyan/10 data-[state=active]:text-ai-cyan data-[state=active]:shadow-none transition-all rounded-md">Public ({counts.public})</TabsTrigger>
              <TabsTrigger value="private" className="data-[state=active]:bg-ai-cyan/10 data-[state=active]:text-ai-cyan data-[state=active]:shadow-none transition-all rounded-md">Private ({counts.private})</TabsTrigger>
            </TabsList>
          </Tabs>
          <Input
            placeholder="Search repositories…"
            className="max-w-xs bg-muted/30 border-border/50 focus-visible:ring-ai-cyan/50 focus-visible:border-ai-cyan transition-all"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
  
        <div className="rounded-xl border border-border/50 overflow-hidden bg-card/50 backdrop-blur-sm shadow-sm transition-all hover:shadow-[0_0_30px_-10px_rgba(var(--color-ai-cyan),0.2)] hover:border-border/80">
          <Table>
            <TableHeader className="bg-muted/30">
                <TableRow>
                  <TableHead>Repository</TableHead>
                  <TableHead>Visibility</TableHead>
                  <TableHead>Branch</TableHead>
                  <TableHead>Language</TableHead>
                  <TableHead className="text-right">Stars</TableHead>
                  <TableHead className="text-right">Updated</TableHead>
                  <TableHead className="text-right">Codebase</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>{rows}</TableBody>
            </Table>
          </div>
    
          <div ref={loadMoreRef} className="py-2 text-center text-sm text-muted-foreground">
            {footer}
          </div>
        </div>
      );
    
}


function RepoRow({ repo }: { repo: DashboardRepo }) {
    const tone = repo.visibility === "public" ? "info" : "warning";
  
    return (
      <TableRow className="group hover:bg-ai-cyan/5 border-border/50 transition-all duration-300 hover:shadow-[inset_2px_0_0_0_rgba(var(--color-ai-cyan),1)]">
        <TableCell>
          <div className="flex flex-col gap-0.5">
            <span className="font-semibold text-foreground group-hover:text-ai-cyan transition-colors">{repo.name}</span>
            <span className="text-xs text-muted-foreground font-mono">{repo.fullName}</span>
          </div>
        </TableCell>
        <TableCell>
          <span className={statusBadge(tone, `gap-1.5 px-2 py-0.5 shadow-none rounded-md border transition-colors ${repo.visibility === 'private' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' : 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'}`)}>
            {repo.visibility === "private" ? (
              <LockIcon className="size-3 text-amber-500/80" />
            ) : (
              <LockKeyOpenIcon  className="size-3 text-emerald-500/80" />
            )}
            <span className="font-medium">{repo.visibility}</span>
          </span>
        </TableCell>
        <TableCell>
          <code className="px-1.5 py-0.5 rounded-md bg-indigo-500/10 text-xs font-mono text-indigo-400 border border-indigo-500/20 transition-colors group-hover:bg-indigo-500/20">{repo.defaultBranch}</code>
        </TableCell>
        <TableCell>
           <span className="flex items-center gap-2 text-zinc-300 text-sm transition-colors group-hover:text-white">
              {repo.language && (
                 <span className="w-1.5 h-1.5 rounded-full bg-ai-cyan shadow-[0_0_8px_rgba(var(--color-ai-cyan),0.6)]" />
              )}
              {repo.language ?? "—"}
           </span>
        </TableCell>
        <TableCell className="text-right">
          <span className="inline-flex items-center justify-end gap-1.5 text-zinc-300 font-medium text-sm transition-colors group-hover:text-white">
            <StarIcon className="size-3.5 text-yellow-500 fill-yellow-500/20" />
            {repo.stars}
          </span>
        </TableCell>
        <TableCell className="text-right text-xs text-muted-foreground group-hover:text-zinc-400 transition-colors">
          {formatDistanceToNow(new Date(repo.updatedAt), { addSuffix: true })}
        </TableCell>
        <TableCell className="text-right">
          <SyncRepoButton
            repoFullName={repo.fullName}
            branch={repo.defaultBranch || "main"}
            syncStatus={repo.syncStatus ?? null}
          />
        </TableCell>
      </TableRow>
    );
  }