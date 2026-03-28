import { PrismaClient } from "../src/generated/prisma/client";
import { inventorySeedData } from "./inventorySeedData";

export async function seedInventory(prisma: PrismaClient) {
  console.log("Seeding Inventory...");

  for (const item of inventorySeedData) {
    const product = await prisma.product.findFirst({
      where: { name: item.productName }
    });

    if (!product) {
      throw new Error(`Product '${item.productName}' not found`);
    }

    const location = await prisma.location.findFirst({
      where: { name: item.locationName }
    });

    if (!location) {
      throw new Error(`Location '${item.locationName}' not found`);
    }

    await prisma.inventory.upsert({
      where: {
        productId_locationId: {
          productId: product.id,
          locationId: location.id
        }
      },
      update: {
        quantity: item.quantity,
        threshold: item.threshold
      },
      create: {
        productId: product.id,
        locationId: location.id,
        quantity: item.quantity,
        threshold: item.threshold
      }
    });
  }
}