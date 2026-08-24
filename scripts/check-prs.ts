import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const prs = await prisma.pullRequest.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5
  });
  console.log("Recent PRs:");
  console.table(prs.map(p => ({
    id: p.id,
    repo: p.repoFullName,
    pr: p.prNumber,
    status: p.status,
    hasComment: !!p.reviewComment
  })));
}

main().catch(console.error).finally(() => prisma.$disconnect());
