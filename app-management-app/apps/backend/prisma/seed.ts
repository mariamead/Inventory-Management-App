import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";
import { seedLocation, seedProduct } from "./seedLocationProduct"; 

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log("Start Seeding....");
    // seed 1 Location
    await seedLocation(prisma);

    // seed 2 Product
    await seedProduct(prisma);

    // seed 3 Users

    // seed 4 Inventory

    console.log("Seeding Complete....");
};


main()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  });