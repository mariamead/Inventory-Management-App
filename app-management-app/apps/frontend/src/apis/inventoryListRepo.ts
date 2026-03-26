import type { FrontendInventoryStock as InventoryStock } from "@shared/types/frontend-InventoryStock";

type InventoryStocksResponseJSON = { message: String, data: InventoryStock[] };
type InventoryStockResponseJSON = { message: String, data: InventoryStock};

// Base url for backend
// Vite provides this value from the .env file rather than dotenv package
const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api/v1`;
const INVENTORY_ENDPOINT = "/inventory";

/**
 * A function to fetch all data from API
 * @returns - All data found in InventoryStock[]
 */
export async function fetchAllInventoryStock(): Promise<InventoryStock[]> {
    const inventoryResponse: Response = await fetch(
        `${BASE_URL}${INVENTORY_ENDPOINT}`, {
            credentials: "include"
        }
    );
    if(!inventoryResponse.ok) {
        throw new Error("Failed to fetch Inventory Stock.")
    }

    const json: InventoryStocksResponseJSON = await inventoryResponse.json();
    return json.data;
};



/**
 * Function to add a new stock item to a inventory list
 * @param newStock - The new item being added to the inventory list
 * @returns - The new stock item added
 */
export async function addStockInventory(
    newStock: InventoryStock
): Promise<InventoryStock>{
    const newInventoryResponse = await fetch(
        `${BASE_URL}${INVENTORY_ENDPOINT}`,
        {
            method: "POST",
            body: JSON.stringify({...newStock}),
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include"
        }
    )

    const json: InventoryStockResponseJSON = await newInventoryResponse.json();
    return json.data;
    
};


