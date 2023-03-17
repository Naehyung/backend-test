import PrismaProvider from '../prisma-provider';
import { USER_DATA } from './data/user.data';

const prisma = PrismaProvider.getConnection();

async function createUserSeedData() {
  USER_DATA.forEach(async (user) => {
    await prisma.user.create({
      data: user,
    });
  });
}

export default createUserSeedData;
