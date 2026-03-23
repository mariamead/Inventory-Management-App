import { dataInventory, type InventoryItem } from "../Inventory/inventoryData";

let items: InventoryItem[] = [...dataInventory];

export const inventoryRepository = {
  getAll(): InventoryItem[] {
    return [...items];
  },

  getById(id: string): InventoryItem | undefined {
    return items.find(item => item.id === id);
  },

  update(id: string, updatedItem: InventoryItem): void {
    const index = items.findIndex(item => item.id === id);
    if (index !== -1) {
      items[index] = updatedItem;
    }
  },

  delete(id: string): void {
    items = items.filter(item => item.id !== id);
  },

  add(newItem: InventoryItem): void {
    items.push(newItem);
  }
};