import { PrismaClient } from './src/generated/prisma/client';

const prisma = new PrismaClient();

async function main() {
  const location = await prisma.location.create({
    data: {
      name: "Test Warehouse",
      address: "123 Main St",
      city: "Toronto",
      province: "ON",
    },
  });

  const user = await prisma.user.create({
    data: {
      name: "John Doe",
      email: "john@example.com",
      phone: "555-1234",
      address: "456 Oak Ave",
      locationId: location.id,
    },
  });

  console.log("Created user:", user);
  await prisma.$disconnect();
}

main();