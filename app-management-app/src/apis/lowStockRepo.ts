import type { InventoryItem } from "../Inventory/inventoryData";
import { lowStockData } from "./lowStockMockData"; 

let inventoryStore: InventoryItem[] = [...lowStockData];

// Fetch all low stock items
export function fetchLowStockItems(): InventoryItem[] {
	return inventoryStore.filter(
    	item => item.quantity <= item.lowStockThreshold
  	);
}

// Get single low stock item by id
export function getLowStockItemById(
	id: string
): InventoryItem {
  	const foundItem = inventoryStore.find(
    	item => item.id === id &&
         	item.quantity <= item.lowStockThreshold
  	);

	if (!foundItem) {
    	throw new Error(`Failed to fetch low stock item with the id of ${id}`);
  	}

	return foundItem;
}

// Update quantity of an item
export async function updateLowStockItem(
  	updatedItem: InventoryItem
): Promise<InventoryItem> {

	const index = inventoryStore.findIndex(
    	item => item.id === updatedItem.id
  	);

 	if (index === -1) {
    	throw new Error(`Failed to update item with the id of ${updatedItem.id}`);
  	}

	inventoryStore[index] = updatedItem;

  	return inventoryStore[index];
}

// Delete item entirely
export async function deleteLowStockItem(
	id: string
): Promise<void> {

	const exists = inventoryStore.some(
    	item => item.id === id
  	);

	if (!exists) {
    	throw new Error(`Failed to delete item with the id of ${id}`);
  	}

	inventoryStore = inventoryStore.filter(
    	item => item.id !== id
  	);
}
