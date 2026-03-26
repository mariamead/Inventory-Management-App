import { Request, Response, NextFunction } from "express";
import { successResponse, errorResponse } from "../models/responseModel";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import * as inventoryListService from "../services/inventoryListService";
import type { FrontendInventoryStock } from "@shared/types/frontend-InventoryStock";

export const getAllInventoryStock = async(
    _req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const stockData: FrontendInventoryStock[] = await inventoryListService.getAllInventoryStock();
        res.status(HTTP_STATUS.OK).json(
            successResponse(stockData, "Stock Items retrieved successfully.")
        );
    } catch (error: unknown) {
        next(error);
    }
};


export const createStockItem = async(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { 
            name, description, location, manufacturer, category, quantity, price, lowStockThreshold
        } = req.body;

        if(!name || ! description || !location || !manufacturer || 
            !category || !quantity || !price || !lowStockThreshold) {
            res.status(HTTP_STATUS.BAD_REQUEST).json(
                errorResponse("Missing required Inventory fields.")
            );
        } else {
            const newItem = await inventoryListService.createStockItem({
                name,
                description,
                location,
                manufacturer,
                category,
                quantity,
                price,
                lowStockThreshold
            });
            res.status(HTTP_STATUS.CREATED).json(
                successResponse(newItem, "New Item created successfully.")
            );
        }
    } catch (error: unknown) {
        next(error);
    }
}
 