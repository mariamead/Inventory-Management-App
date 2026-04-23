import { $Enums } from "@prisma/client";

export type InventoryStock = {
    id?: string;
    name: string;
    description: string;
    location: string;
    manufacturer: $Enums.Manufacturer;
    category: $Enums.Category;
    quantity: number;
    price: number;
    lowStockThreshold: number;
}
