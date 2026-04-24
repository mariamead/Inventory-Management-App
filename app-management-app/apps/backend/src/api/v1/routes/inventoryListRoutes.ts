import express, { Router } from "express";
import { validateRequest } from "../middleware/validate";
import { inventoryListSchema } from "../validation/inventoryListValidation";
import * as inventoryListController from "../controllers/inventoryListController";
import { findOrCreateUser } from "../middleware/findOrCreateUser";
import { requireAuth } from "@clerk/express";

const router: Router = express.Router();


router.get(
    "/inventory/public",
    inventoryListController.getPublicInventoryStock
);

router.get("/inventory", inventoryListController.getAllInventoryStock);

router.post(
    "/inventory",
    requireAuth,
    findOrCreateUser, 
    validateRequest(inventoryListSchema),
    inventoryListController.createStockItem
);

export default router;