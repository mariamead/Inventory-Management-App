import { useState } from "react";
import type { InventoryItem } from "../Inventory/inventoryData";

/**
 * This is a custom hook that handles editing Quantity in an inventory list
 * by adding a number amount to quantity.
 * Handles local state updates and triggers external service methods for persistence.
 * 
 * @param initialInventory - This is the initial Inventory list
 * @param quantityServiceMethod - This is a service method to handle business logic to quantity.
 * @returns - {
 *  inventory: Is the stateful  data in the inventory list.
 *  setInventoryList: This sets the inventory list.
 *  updateQuantity: This is a function that updates the quantity in the inventory list object.
 *  lowStockItems: Filters for items that are in low stock or out of stock.
 *  removeItem: This removes the item from a list of low stock items if its above its threshold.
 * }
 */
export function useQuantityEditor(
    initialInventory: InventoryItem[],
    quantityServiceMethod:(id: string, newValue: number) => void
) {
    const [ inventory, setInventoryList ] = useState<InventoryItem[]>(initialInventory);
    
    //update the quantity of an item
    const updateQuantity = (id: string, newQuantity: number) => {
        setInventoryList(prev => 
            prev.map(item => item.id === id 
            ? { ...item, quantity: newQuantity }
            : item
            )
        );

        quantityServiceMethod(id, newQuantity);
    };
    
    //Remove inventory low stock item
    const removeItem = (id: string) => {
        setInventoryList(prev => prev.filter(item => item.id !== id));
    };

    // filter for it items are low stock or not 
    const lowStockItems = inventory.filter(
    item => item.quantity <= item.lowStockThreshold
    );

    return {
        inventory,
        setInventoryList,
        updateQuantity,
        lowStockItems,
        removeItem
    }

}