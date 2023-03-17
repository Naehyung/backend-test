import PrismaProvider from '../prisma-provider';
import { VENUE_DATA } from './data/venue.data';

const prisma = PrismaProvider.getConnection();

async function createVenueSeedData() {
  VENUE_DATA.forEach(async (venue) => {
    await prisma.venue.create({
      data: venue,
    });
  });
}

export default createVenueSeedData;
