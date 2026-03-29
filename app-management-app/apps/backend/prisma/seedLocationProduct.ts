import { PrismaClient } from "@prisma/client";
import { locationSeedData, productSeedData } from "./locationProductSeedData";


// Seed function for Location
export async function seedLocation(prisma: PrismaClient) {
  console.log("Seeding Locations...");
  for(const location of locationSeedData) {
    await prisma.location.upsert({
      where: { name: location.name },
      update: {},
      create: location,
    });
  }
};

//Seed function for Product
export async function seedProduct(prisma: PrismaClient) {
  console.log("Seeding Products....");
  for(const product of productSeedData) {
    await prisma.product.upsert({
      where: {
        name_manufacturer: {
          name: product.name,
          manufacturer: product.manufacturer,
        },
      },
      update: {},
      create: product,
    });
  }

  
};
