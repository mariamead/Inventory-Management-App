import { useEffect, useState } from "react";
import type { InventoryItem } from "../Inventory/inventoryData";
import {
	fetchLowStockItems,
	updateLowStockItem,
	deleteLowStockItem
} from "../apis/lowStockRepo";

export function useLowStock() {
	const [items, setItems] = useState<InventoryItem[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	const loadItems = () => {
	try {
    	setLoading(true);
    	const data = fetchLowStockItems();
    	setItems(data);
    	setError(null);
    } catch (error) {
    	setError("Failed to load low stock items.");
    } finally {
    	setLoading(false);
	}
};

	useEffect(() => {
		loadItems();
	}, []);

	const updateQuantity = async (
    	item: InventoryItem,
    	newQuantity: number
	) => {
    try {
     	await updateLowStockItem({
        	...item,
        	quantity: newQuantity
    });
    	loadItems();
    } catch (error) {
    	setError("Failed to update item.");
    }
  };

	const removeItem = async (id: string) => {
    	try {
      		await deleteLowStockItem(id);
      		loadItems();
    } catch (error) {
    	setError("Failed to delete item.");
    }
};

return {
    items,
    error,
    loading,
    updateQuantity,
    removeItem
  };
}
