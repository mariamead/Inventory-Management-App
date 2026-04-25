import type { Validation } from "../hooks/useFormInput";
import { Category, Manufacturer, type InventoryStock} from "../types/inventoryStock";
import { addStockInventory } from "../apis/inventoryListRepo";


export const validateName = (value: string | undefined): Validation => {
    const name = String(value); // convert to string
    if (name.length < 3) {
        return { isValid: false, error: "Name of item must be at least 3 characters." };
    }
    return { isValid: true, error: "" };
}

export const validateDescription = (value: string | undefined): Validation => {
    const description = String(value);
    if (description.length < 5) {
        return { isValid: false, error: "Description must be greater than 5 characters." };
    }
    return { isValid: true, error: "" };
}

export const validateLocation = (value: string | undefined): Validation => {
    const location = String(value);
    if (!location) {
        return { isValid: false, error: "Must have a location."};
    }
    return { isValid: true, error: "" };
}

export const validateManufacturer = (value: string | undefined): Validation => {
    if (!value || !Object.values(Manufacturer).includes(value as Manufacturer)) {
        return { isValid: false, error: "A valid manufacturer must be selected." };
    }
    return { isValid: true, error: "" };
}

export const validateCategory = (value: string | undefined): Validation => {
    if(!value || !Object.values(Category).includes(value as Category)) {
        return { isValid: false, error: "A valid category must be selected." };
    }
    return { isValid: true, error: "" };
}

export const validateQuantity = (value: string | undefined): Validation => {
    const quantity = Number(value);
    if (isNaN(quantity) || quantity <= 0) {
        return { isValid: false, error: "Quantity must be greater than 0" };
    }
    return { isValid: true, error: "" };
}

export const validatePrice = (value: string | undefined): Validation => {
    const price = Number(value);
    if (isNaN(price) || price <= 0) {
        return { isValid: false, error: "Price must be greater than 0" };
    }
    return { isValid: true, error: "" };
}

export const validateLowStockThreshold = (value: string | undefined): Validation => {
    const lowStockThreshold = Number(value);
    if(isNaN(lowStockThreshold) || lowStockThreshold <= 3) {
        return { isValid: false, error: "Low stock threshold must be 3 or greater."};
    }
    return { isValid: true, error: ""};
}

/**
 * Function to validate the stock item that will be added
 * @param newStockItem -The new item that will be validated
 * @returns - null if all valid
 */
export function validateStock(
    newStockItem: InventoryStock
): string | null {
    const { 
        name, 
        description, 
        location, 
        manufacturer, 
        category, 
        quantity, 
        price, 
        lowStockThreshold } = newStockItem

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

    const quantityCheck = validateQuantity(String(quantity));
    if (!quantityCheck.isValid) {
        return quantityCheck.error ?? "Invalid Quantity";
    }

    const priceCheck = validatePrice(String(price));
    if (!priceCheck.isValid) {
        return priceCheck.error ?? "Invalid Price";
    }

    const lowStockThresholdCheck = validateLowStockThreshold(String(lowStockThreshold));
    if(!lowStockThresholdCheck.isValid) {
        return lowStockThresholdCheck.error ?? "Invalid low stock threshold";
    }

    return null;
    
}

export async function addInventoryStock(
    stockItem: Omit<InventoryStock, "id">,
    sessionToken: string
): Promise<InventoryStock | string> {
    const stockItemWithId: InventoryStock = {
        ...stockItem,
    };
    const error = validateStock(stockItemWithId);

    if(error) {
        return error;
    }

    const createdStockItem = await addStockInventory(stockItemWithId, sessionToken);
    return createdStockItem;
}