import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { seedLocation, seedProduct } from "./seedLocationProduct"; 
import { seedInventory } from "./seedInventory";
import { seedProfile } from "./seedProfile";


const prisma = new PrismaClient();

async function main() {
    console.log("Start Seeding....");
    // seed 1 Location
    await seedLocation(prisma);

    // seed 2 Product
    await seedProduct(prisma);

    // seed 3 Users
    await seedProfile(prisma);

    // seed 4 Inventory
    await seedInventory(prisma);

    console.log("Seeding Complete....");
};


main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });