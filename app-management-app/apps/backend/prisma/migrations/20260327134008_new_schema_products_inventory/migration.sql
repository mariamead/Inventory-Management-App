/*
  Warnings:

  - You are about to drop the column `category` on the `Inventory` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Inventory` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Inventory` table. All the data in the column will be lost.
  - You are about to drop the column `manufacturer` on the `Inventory` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Inventory` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Inventory` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Inventory` table. All the data in the column will be lost.
  - You are about to drop the `LowStockAlert` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[productId,locationId]` on the table `Inventory` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Location` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `productId` to the `Inventory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `threshold` to the `Inventory` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Category" AS ENUM ('FOOD', 'ELECTRONICS', 'HEALTH', 'BEAUTY');

-- CreateEnum
CREATE TYPE "Manufacturer" AS ENUM ('LG', 'SAMSUNG', 'LOGITEC', 'HP', 'SONY', 'PANASONIC', 'BAYER', 'JOHNSON_AND_JOHNSON', 'ORGANIKA', 'PROCTER_AND_GAMBLE', 'LOREAL', 'KRAFT', 'MAPLE_LEAF', 'MCCAIN', 'PC', 'DOLE', 'DEL_MONTE');

-- DropForeignKey
ALTER TABLE "LowStockAlert" DROP CONSTRAINT "LowStockAlert_inventoryId_fkey";

-- AlterTable
ALTER TABLE "Inventory" DROP COLUMN "category",
DROP COLUMN "createdAt",
DROP COLUMN "description",
DROP COLUMN "manufacturer",
DROP COLUMN "name",
DROP COLUMN "price",
DROP COLUMN "updatedAt",
ADD COLUMN     "productId" INTEGER NOT NULL,
ADD COLUMN     "threshold" INTEGER NOT NULL;

-- DropTable
DROP TABLE "LowStockAlert";

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" "Category" NOT NULL,
    "manufacturer" "Manufacturer" NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_name_manufacturer_key" ON "Product"("name", "manufacturer");

-- CreateIndex
CREATE UNIQUE INDEX "Inventory_productId_locationId_key" ON "Inventory"("productId", "locationId");

-- CreateIndex
CREATE UNIQUE INDEX "Location_name_key" ON "Location"("name");

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
