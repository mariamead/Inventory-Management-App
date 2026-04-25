import type { FrontendInventoryStock } from "@shared/types/frontend-InventoryStock";
import  prisma  from "../../../../prisma/prismaClient";
import { AppError } from "../errors/errors";
import { HTTP_STATUS } from "../../../constants/httpConstants";

/**
 * Get all low stock items
 * @returns - list of low stock items
 */
export const getAllLowStockItems = async (
    clerkId: string | undefined
): Promise<FrontendInventoryStock[]> => {
    try {
        if (!clerkId) {
            throw new Error("Unauthorized");
        }

        const items = await prisma.inventory.findMany({
            include: {
                product: true,
                location: {
                    select: {
                        name: true
                    }
                }
            },
            orderBy: {
                id: "asc"
            }
        });
        
        return items
            .filter((item) => item.quantity <= item.threshold)
            .map((item) => ({
                id: item.id.toString(),
                name: item.product.name,
                description: item.product.description,
                location: item.location.name ?? "Unknown Location",
                manufacturer: item.product.manufacturer,
                category: item.product.category,
                quantity: item.quantity,
                price: item.product.price.toNumber(),
                lowStockThreshold: item.threshold
            }));
    } catch (error: unknown) {
        console.error("Error fetching low stock items:", error);
        throw new Error("Failed to fetch low stock items.");
    }
};

/**
 * Get one low stock item by id
 * @param id - inventory id
 * @returns - one low stock item with given id
 */
export const getLowStockItemById = async (
    id: string
): Promise<FrontendInventoryStock> => {
    try {
        const item = await prisma.inventory.findUnique({
            where: {
                id: parseInt(id)
            },
            include: {
                product: true,
                location: {
                    select: {
                        name: true
                    }
                }
            }
        });

        if (!item || item.quantity > item.threshold) {
            throw new AppError(
                `Low stock item with id ${id} not found.`,
                "LOW_STOCK_NOT_FOUND",
                HTTP_STATUS.NOT_FOUND
            );
        }

        return {
            id: item.id.toString(),
            name: item.product.name,
            description: item.product.description,
            location: item.location.name,
            manufacturer: item.product.manufacturer,
            category: item.product.category,
            quantity: item.quantity,
            price: item.product.price.toNumber(),
            lowStockThreshold: item.threshold
        };
    } catch (error: unknown) {
        if (error instanceof AppError) {
            throw error;
        }

        console.error("Error fetching low stock item by id:", error);
        throw new Error("Failed to fetch low stock item.");
    }
};

/**
 * Update a low stock item
 *
 * @param id - inventory id
 * @param data - updated inventory data
 * @returns - updated low stock item
 */
export const updateLowStockItem = async (
    id: string,
    data: Pick<FrontendInventoryStock, "quantity" | "lowStockThreshold">
): Promise<FrontendInventoryStock> => {
    try {
        const existingItem = await prisma.inventory.findUnique({
            where: {
                id: parseInt(id)
            },
            include: {
                product: true,
                location: {
                    select: {
                        name: true
                    }
                }
            }
        });

        if (!existingItem) {
            throw new AppError(
                `Low stock item with id ${id} not found.`,
                "LOW_STOCK_NOT_FOUND",
                HTTP_STATUS.NOT_FOUND
            );
        }

        const updatedItem = await prisma.inventory.update({
            where: {
                id: parseInt(id)
            },
            data: {
                quantity: data.quantity,
                threshold: data.lowStockThreshold
            },
            include: {
                product: true,
                location: {
                    select: {
                        name: true
                    }
                }
            }
        });

        return {
            id: updatedItem.id.toString(),
            name: updatedItem.product.name,
            description: updatedItem.product.description,
            location: updatedItem.location.name,
            manufacturer: updatedItem.product.manufacturer,
            category: updatedItem.product.category,
            quantity: updatedItem.quantity,
            price: updatedItem.product.price.toNumber(),
            lowStockThreshold: updatedItem.threshold
        };
    } catch (error: unknown) {
        if (error instanceof AppError) {
            throw error;
        }

        console.error("Error updating low stock item:", error);
        throw new Error("Failed to update low stock item.");
    }
};

/**
 * Delete a low stock item
 * @param id - inventory id
 */
export const deleteLowStockItem = async (id: string): Promise<void> => {
    try {
        const existingItem = await prisma.inventory.findUnique({
            where: {
                id: parseInt(id)
            }
        });

        if (!existingItem) {
            throw new AppError(
                `Low stock item with id ${id} not found.`,
                "LOW_STOCK_NOT_FOUND",
                HTTP_STATUS.NOT_FOUND
            );
        }

        await prisma.inventory.delete({
            where: {
                id: parseInt(id)
            }
        });
    } catch (error: unknown) {
        if (error instanceof AppError) {
            throw error;
        }

        console.error("Error deleting low stock item:", error);
        throw new Error("Failed to delete low stock item.");
    }
};