import { PrismaClient } from "@prisma/client";
import { profileData } from "./profileSeedData";

export async function seedProfile(prisma: PrismaClient) {
  console.log("Seeding Profiles...");

  for (const profile of profileData) {
    const location = await prisma.location.findUnique({
      where: { id: profile.locationId }
    });

    if (!location) {
      throw new Error(`Location with id '${profile.locationId}' not found`);
    }

    await prisma.user.upsert({
      where: { email: profile.email },
      update: {
        name: profile.name,
        phone: profile.phone,
        address: profile.address,
        locationId: profile.locationId
      },
      create: {
        name: profile.name,
        email: profile.email,
        phone: profile.phone,
        address: profile.address,
        locationId: profile.locationId
      }
    });
  }
}