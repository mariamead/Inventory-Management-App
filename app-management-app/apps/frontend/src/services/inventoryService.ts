import type { InventoryItem } from '../Inventory/inventoryData';


type ValidationResult = {
    isValid: boolean;
    errors: string[];
};

export const inventoryService = {
    validateItem(
    item: Omit<InventoryItem, "id">
    ): ValidationResult {
    const errors: string[] = [];

    if (!item.name || item.name.length < 3) {
      errors.push("Name must be at least 3 characters.");
    }

    if (!item.category || item.category.length < 3) {
      errors.push("Category must be at least 3 characters.");
    }

    if (item.quantity <= 0) {
      errors.push("Quantity must be greater than 0.");
    }

    if (item.price <= 0) {
      errors.push("Price must be greater than 0.");
    }

    if (item.lowStockThreshold <= 0) {
      errors.push("Low stock threshold must be greater than 0.");
    }

    return {
      isValid: errors.length === 0,
      errors
    };
 },


    addItem(
        inventory: InventoryItem[], 
        newItem: Omit<InventoryItem, "id">
        ): InventoryItem[] {
        const newId = String(inventory.length + 1);

        return [
            ...inventory,
            {
                ...newItem,
                id: newId
            }
        ];
    },

    updateQuantity(
        inventory: InventoryItem[], 
        id: string, 
        newQuantity: number
    ): InventoryItem[] {
        return inventory.map(item =>
            item.id === id ? { ...item, quantity: newQuantity } : item
        );
    },

    removeItem(
        inventory: InventoryItem[], 
        id: string
    ): InventoryItem[] {
        return inventory.filter(item => item.id !== id);


    },

    getLowStockItems(
        inventory: InventoryItem[]
    ): InventoryItem[] {
        return inventory.filter(
            item => item.quantity <= item.lowStockThreshold
        );
    
    }
};