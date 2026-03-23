import type { Validation } from "../hooks/useFormInput";
import type { InventoryStock } from "../types/inventoryStock";
import { addStockInventory } from "../repositories/inventoryListRepo";
import { stockData } from "../apis/stockData";

export const validateName = (value: string | number): Validation => {
    const name = String(value); // convert to string
    if (name.length < 3) {
        return { isValid: false, error: "Name of item must be at least 3 characters." };
    }
    return { isValid: true, error: "" };
}

export const validateDescription = (value: string | number): Validation => {
    const description = String(value);
    if (description.length < 5) {
        return { isValid: false, error: "Description must be greater than 5 characters." };
    }
    return { isValid: true, error: "" };
}

export const validateLocation = (value: string | number): Validation => {
    const location = String(value);
    if (!location) {
        return { isValid: false, error: "Must have a location."};
    }
    return { isValid: true, error: "" };
}

export const validateManufacturer = (value: string | number): Validation => {
    const manufacturer = String(value);
    if (!manufacturer) {
        return { isValid: false, error: "Manufacturer cannot be blank." };
    }
    return { isValid: true, error: "" };
}

export const validateCategory = (value: string | number): Validation => {
    const category = String(value);
    if (category.length < 3) {
        return { isValid: false, error: "Category must be at least 3 characters." };
    }
    return { isValid: true, error: "" };
}

export const validateQuantity = (value: string | number): Validation => {
    const quantity = Number(value);
    if (isNaN(quantity) || quantity <= 0) {
        return { isValid: false, error: "Quantity must be greater than 0" };
    }
    return { isValid: true, error: "" };
}

export const validatePrice = (value: string | number): Validation => {
    const price = Number(value);
    if (isNaN(price) || price <= 0) {
        return { isValid: false, error: "Price must be greater than 0" };
    }
    return { isValid: true, error: "" };
}

/**
 * Function to validate the stock item that will be added
 * @param newStockItem -The new item that will be validated
 * @returns - null if all valid
 */
export function validateStock(
    newStockItem: InventoryStock
): string | null {
    const { name, description, location, manufacturer, category, quantity, price } = newStockItem

    const nameCheck = validateName(name);
    if (!nameCheck.isValid) {
        return nameCheck.error ?? "Invalid Name";
    }

    const descriptionCheck = validateDescription(description);
    if (!descriptionCheck.isValid) {
        return descriptionCheck.error ?? "Invalid Description";
    }

    const locationCheck = validateLocation(location);
    if (!locationCheck.isValid) {
        return locationCheck.error ?? "Invalid Location";
    }

    const manufacturerCheck = validateManufacturer(manufacturer);
    if (!manufacturerCheck.isValid) {
        return manufacturerCheck.error ?? "Invalid Manufacturer";
    }

    const categoryCheck = validateCategory(category);
    if (!categoryCheck.isValid) {
        return categoryCheck.error ?? "Invalid Category";
    }

    const quantityCheck = validateQuantity(quantity);
    if (!quantityCheck.isValid) {
        return quantityCheck.error ?? "Invalid Quantity";
    }

    const priceCheck = validatePrice(price);
    if (!priceCheck.isValid) {
        return priceCheck.error ?? "Invalid Price";
    }

    return null;
    
}

export async function addInventoryStock(
    stockItem: Omit<InventoryStock, "id">
): Promise<InventoryStock | string> {
    const stockItemWithId: InventoryStock = {
        ...stockItem,
        id: String(stockData.length + 1) // simple sequential ID
    };
    const error = validateStock(stockItemWithId);

    if(error) {
        return error;
    }

    const createdStockItem = await addStockInventory(stockItemWithId);
    return createdStockItem;
}