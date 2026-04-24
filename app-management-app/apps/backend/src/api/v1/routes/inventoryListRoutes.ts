import express, { Router } from "express";
import { validateRequest } from "../middleware/validate";
import { inventoryListSchema } from "../validation/inventoryListValidation";
import * as inventoryListController from "../controllers/inventoryListController";
import { findOrCreateUser } from "../middleware/findOrCreateUser";


const router: Router = express.Router();


router.get(
    "/inventory/public",
    inventoryListController.getPublicInventoryStock
);

router.get(
    "/inventory",
    findOrCreateUser, 
    inventoryListController.getAllInventoryStock
);

router.post(
    "/inventory",
    findOrCreateUser, 
    validateRequest(inventoryListSchema),
    inventoryListController.createStockItem
);

export default router;