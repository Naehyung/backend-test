import PrismaProvider from './prisma-provider';
import createUserSeedData from './seed/create-user.seed';
import createVenueSeedData from './seed/create-venue.seed';

const prisma = PrismaProvider.getConnection();

async function main() {
  await Promise.all([createUserSeedData(), createVenueSeedData()]);
}
main();
