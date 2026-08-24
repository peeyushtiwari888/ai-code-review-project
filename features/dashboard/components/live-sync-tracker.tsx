"use client";

import { useEffect, useState } from "react";
import { getActiveSyncs } from "@/features/dashboard/actions/sync";
import { ArrowClockwise, Database } from "@phosphor-icons/react/dist/ssr";

type SyncItem = {
  id: string;
  repoFullName: string;
  status: string;
  chunkCount: number;
};

export function LiveSyncTracker({ initialSyncs }: { initialSyncs: SyncItem[] }) {
  const [syncs, setSyncs] = useState<SyncItem[]>(initialSyncs);

  useEffect(() => {
    if (syncs.length === 0) return;

    const interval = setInterval(async () => {
      try {
        const active = await getActiveSyncs();
        setSyncs(active);
      } catch (error) {
        console.error("Failed to poll sync status", error);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [syncs.length]);

  if (syncs.length === 0) return null;

  return (
    <div className="flex flex-col gap-4 mb-8">
      {syncs.map((sync) => (
        <div 
          key={sync.id} 
          className="relative overflow-hidden rounded-xl border border-ai-cyan/30 bg-card p-5 shadow-[0_0_20px_-5px_rgba(var(--color-ai-cyan),0.15)] animate-in fade-in slide-in-from-bottom-2"
        >
          {/* Animated background gradient */}
          <div className="absolute top-0 left-0 h-1 w-full bg-muted/30 overflow-hidden">
             <div 
               className="h-full bg-ai-cyan rounded-r-full transition-all duration-1000 ease-in-out" 
               style={{ 
                 width: sync.status === 'syncing' ? '65%' : '15%',
                 animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
               }} 
             />
          </div>

          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ai-cyan/10 border border-ai-cyan/20 shadow-[0_0_10px_-2px_rgba(var(--color-ai-cyan),0.3)]">
               <ArrowClockwise className="h-5 w-5 text-ai-cyan animate-spin" />
            </div>
            
            <div className="flex flex-col flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-foreground">{sync.repoFullName}</span>
                <span className="text-[10px] font-mono text-ai-cyan font-bold px-2 py-0.5 rounded bg-ai-cyan/10 tracking-wider">
                  {sync.status === 'pending' ? 'PREPARING' : 'VECTORIZING'}
                </span>
              </div>
              <p className="text-sm text-muted-foreground flex items-center gap-2">
                {sync.status === 'pending' ? (
                  <>Reading repository files...</>
                ) : (
                  <>
                    <Database className="h-3.5 w-3.5 text-ai-cyan/70" weight="duotone" />
                    Processing {sync.chunkCount || 0} chunks of code context
                  </>
                )}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
