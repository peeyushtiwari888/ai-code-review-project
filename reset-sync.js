const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const result = await prisma.repoSync.deleteMany({
    where: {
      status: {
        in: ['pending', 'syncing', 'failed']
      }
    }
  });
  console.log(`Successfully deleted ${result.count} stuck sync records.`);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
