import type {InventoryStock } from "../types/inventoryStock";

type InventoryStocksResponseJSON = { message: String, data: InventoryStock[] };
type InventoryStockResponseJSON = { message: String, data: InventoryStock};

// Base url for backend
// Vite provides this value from the .env file rather than dotenv package
const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api/v1`;
const INVENTORY_ENDPOINT = "/inventory";
const INVENTORY_PUBLIC_ENDPOINT = "/inventory/public";

/**
 * A function to fetch all data from API
 * @returns - All data found in InventoryStock[]
 */
export async function fetchAllInventoryStock(sessionToken: string | null): Promise<InventoryStock[]> {
    const ENDPOINT = sessionToken
        ? INVENTORY_ENDPOINT
        : INVENTORY_PUBLIC_ENDPOINT;

    const inventoryResponse: Response = await fetch(
        `${BASE_URL}${ENDPOINT}`, 
        sessionToken? {
            headers: {
                Authorization: `Bearer ${sessionToken}`,
            }
        }: undefined
    );
    if(!inventoryResponse.ok) {
        throw new Error("Failed to fetch Inventory Stock.")
    }

    const json: InventoryStocksResponseJSON = await inventoryResponse.json();
    console.log(json)
    return json.data;
    
};



/**
 * Function to add a new stock item to a inventory list
 * @param newStock - The new item being added to the inventory list
 * @returns - The new stock item added
 */
export async function addStockInventory(
    newStock: InventoryStock,
    sessionToken: string
): Promise<InventoryStock>{
    const newInventoryResponse = await fetch(
        `${BASE_URL}${INVENTORY_ENDPOINT}`,
        {
            method: "POST",
            body: JSON.stringify({...newStock}),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${sessionToken}`
            }
        }
    )

    const json: InventoryStockResponseJSON = await newInventoryResponse.json();
    return json.data;
    
};


