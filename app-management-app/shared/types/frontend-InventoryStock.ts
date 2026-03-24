export type FrontendInventoryStock = {
    id?: string;
    name: string;
    description: string;
    location: string;
    manufacturer: string;
    category: string;
    quantity: number;
    price: number;
    lowStockThreshold: number;
}