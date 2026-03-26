import type { FrontendInventoryStock }from "@shared/types/frontend-InventoryStock";
import prisma from "../../../generated/prisma/client";
import { stockData } from "../../../data/stockData";

/**
 * A function to return all items in stockData
 * @returns -All items in stock data
 */
export const getAllInventoryStock = async(): Promise<FrontendInventoryStock[]> => {
    // nested read
    const allStockData = await prisma.inventory.findMany({
        include: {
            product: true,
            location: true
        }
    });

    return;

};

/**
 * - Function to create a new Inventory item for stock data.
 * @param itemData - The data required to created a new inventory item
 * @returns - the new item created
 */
export const createStockItem = async (
    itemData: FrontendInventoryStock
): Promise<FrontendInventoryStock> => {
    try {
        const newItem = await prisma.inventory.create({
            
    } catch (error: unknown) {
        throw error;
    }
};