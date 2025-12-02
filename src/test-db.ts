import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const veiculos = await prisma.vehicle.findMany();
  console.log('Veículos no banco:', veiculos);
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
