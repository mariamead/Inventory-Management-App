import { Request, Response, NextFunction } from "express";
import type { FrontendInventoryStock } from "@shared/types/frontend-InventoryStock";
import { successResponse } from "../models/responseModel";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import * as lowStockService from "../services/lowStockService";
import { getAuth } from "@clerk/express";


// typescript was yelling at me so I created this to convert the id param to a string.
const getParamId = (id: string | string[] | undefined): string => {
    if (!id) {
        throw new Error("ID parameter is required.");
    }

    return Array.isArray(id) ? id[0] : id;
};

/**
 * Get all low stock items
 */
export const getAllLowStockItems = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { userId } = getAuth(req);

        if (!userId) {
            throw new Error("Unauthorized");
        }
        
        const items: FrontendInventoryStock[] =
            await lowStockService.getAllLowStockItems(userId);

        res.status(HTTP_STATUS.OK).json(
            successResponse(items, "Low stock items retrieved successfully.")
        );
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Get one low stock item by id
 */
export const getLowStockItemById = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const id = getParamId(req.params.id);

        const item: FrontendInventoryStock =
            await lowStockService.getLowStockItemById(id);

        res.status(HTTP_STATUS.OK).json(
            successResponse(item, "Low stock item retrieved successfully.")
        );
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Update a low stock item
 */
export const updateLowStockItem = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const id = getParamId(req.params.id);
        const { quantity, lowStockThreshold } = req.body;

        const updatedItem: FrontendInventoryStock =
            await lowStockService.updateLowStockItem(id, {
                quantity: Number(quantity),
                lowStockThreshold: Number(lowStockThreshold)
            });

        res.status(HTTP_STATUS.OK).json(
            successResponse(updatedItem, "Low stock item updated successfully.")
        );
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Delete a low stock item
 */
export const deleteLowStockItem = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const id = getParamId(req.params.id);

        await lowStockService.deleteLowStockItem(id);

        res.status(HTTP_STATUS.OK).json(
            successResponse(null, "Low stock item deleted successfully.")
        );
    } catch (error: unknown) {
        next(error);
    }
};