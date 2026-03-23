import type { InventoryStock } from "../types/inventoryStock";
import {stockData } from "../apis/stockData";

/**
 * A function to fetch all data from InventoryStock
 * @returns - All data found in InventoryStock[]
 */
export function fetchAllInventoryStock(): InventoryStock[] {
    return structuredClone(stockData);
}

/**
 * A function to fetch inventory by its ID
 * @param stockId - The ID of the stock item
 * @returns - The found stock ID by its ID
 */
export function getInventoryStockById(stockId: string): InventoryStock {
    const foundStock = stockData.find((item: InventoryStock) => item.id === stockId);

    if(!foundStock) {
        throw new Error(`Failed to fetch stock item with ${stockId}`);
    }

    return structuredClone(foundStock);
}


/**
 * Function to add a new stock item to a inventory list, only allowing data to be added if
 * the location, name and manufacturer are not already existing.
 * @param newStock - The new item being added to the inventory list
 * @returns - The new stock item added
 */
export async function addStockInventory(newStock: InventoryStock): Promise<InventoryStock>{
    // Checks to see if the item matches name, location and manufacturer.
    const exists = stockData.some((item: InventoryStock) => 
        item.name === newStock.name &&
        item.location === newStock.location && 
        item.manufacturer === newStock.manufacturer)

    if(exists) {
        throw new Error(
            `Item ${newStock.name} already exists in that ${newStock.location}.`
        );
    } 
    stockData.push(newStock);
    
    return structuredClone(newStock);
}