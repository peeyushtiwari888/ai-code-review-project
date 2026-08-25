"use client";

import React from 'react'
import { useMutation , useQueryClient } from '@tanstack/react-query';
import { githubRepoKeys } from '@/features/github/lib/repos-query';
import { syncRepoCodebase } from '../actions/repo-sync';
import { Button } from '@/components/ui/button';
import { RepoSyncStatus } from '../types';
import { toast } from 'sonner';
import { unsyncRepoCodebase } from '../actions/repo-sync';
import { Trash2 } from 'lucide-react';



type SyncRepoButtonProps = {
    repoFullName: string;
    branch: string;
    syncStatus: RepoSyncStatus | null;
  };
  

  function isSyncing(status: RepoSyncStatus | null, mutationPending: boolean) {
    if (mutationPending) {
      return true;
    }
  
    return status === "pending" || status === "syncing";
  }

  
function getButtonLabel(status: RepoSyncStatus | null, mutationPending: boolean) {
    if (isSyncing(status, mutationPending)) {
      return "Syncing…";
    }
  
    if (status === "synced") {
      return "Re-sync";
    }
  
    return "Sync";
  }

const SyncRepoButton = ({repoFullName , branch , syncStatus}:SyncRepoButtonProps) => {
    const queryClient = useQueryClient();

    const syncRepo = useMutation({
        mutationFn:()=>syncRepoCodebase(repoFullName , branch),
        onSuccess:()=>{
            queryClient.invalidateQueries({ queryKey: githubRepoKeys.all });
            toast.success(`Repo ${repoFullName} synced successfully`);
        },
        onError:(error)=>{
            toast.error(`Failed to sync repo ${repoFullName}: ${error.message}`);
        }
    })

    const unsyncRepo = useMutation({
        mutationFn: () => unsyncRepoCodebase(repoFullName),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: githubRepoKeys.all });
            toast.success(`Repo ${repoFullName} disconnected`);
        },
        onError: (error) => {
            toast.error(`Failed to disconnect repo: ${error.message}`);
        }
    });

    const syncing = isSyncing(syncStatus, syncRepo.isPending);

    if (syncStatus === "synced") {
        return (
            <div className="flex items-center gap-2 justify-end">
                <Button
                    size="sm"
                    variant="outline"
                    disabled={syncing || unsyncRepo.isPending}
                    onClick={() => syncRepo.mutate()}
                >
                    {syncing ? "Syncing…" : "Re-sync"}
                </Button>
                <Button
                    size="icon"
                    variant="destructive"
                    className="h-8 w-8"
                    disabled={syncing || unsyncRepo.isPending}
                    onClick={() => unsyncRepo.mutate()}
                    title="Disconnect Repo"
                >
                    <Trash2 className="size-4" />
                </Button>
            </div>
        );
    }

  return (
     <Button
      size="sm"
      variant="outline"
      disabled={syncing || unsyncRepo.isPending}
      onClick={() => syncRepo.mutate()}
    >
      {getButtonLabel(syncStatus, syncRepo.isPending)}
    </Button>
  )
}

export default SyncRepoButton