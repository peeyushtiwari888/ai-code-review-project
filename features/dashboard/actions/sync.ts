"use server";

import { requireAuth } from "@/features/auth/actions";
import { getUserInstallationId } from "@/features/github/server/installation";
import { prisma } from "@/lib/db";

export async function getActiveSyncs() {
  const session = await requireAuth();
  const userId = session.user.id;
  const installationId = await getUserInstallationId(userId);

  if (!installationId) return [];

  return prisma.repoSync.findMany({
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
  });
}
