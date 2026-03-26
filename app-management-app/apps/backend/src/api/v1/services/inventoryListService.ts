import type { FrontendInventoryStock }from "@shared/types/frontend-InventoryStock";
import { stockData } from "../../../data/stockData";

/**
 * A function to return all items in stockData
 * @returns -All items in stock data
 */
export const getAllInventoryStock = async(): Promise<FrontendInventoryStock[]> => {
    return structuredClone(stockData);
};

/**
 * - Function to create a new Inventory item for stock data.
 * @param itemData - The data required to created a new inventory item
 * @returns - the new item created
 */
export const createStockItem = async(
    itemData: FrontendInventoryStock
): Promise<FrontendInventoryStock> => {
    try{
        const newItem: FrontendInventoryStock = {
            id: (stockData.length + 1).toString(),
            ...itemData
        };

        stockData.push(newItem);
        return structuredClone(newItem);
    } catch (error: unknown) {
        throw error;
    }
};