/*
  Warnings:

  - A unique constraint covering the columns `[clerkId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_locationId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "clerkId" TEXT,
ALTER COLUMN "locationId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_clerkId_key" ON "User"("clerkId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;
