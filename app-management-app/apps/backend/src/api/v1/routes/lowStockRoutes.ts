import { Router } from "express";
import { validateRequest } from "../middleware/validate";
import {
    getAllLowStockItems,
    getLowStockItemById,
    updateLowStockItem,
    deleteLowStockItem
} from "../controllers/lowStockController";
import {
    lowStockIdSchema,
    lowStockPutSchema
} from "../validation/lowStockValidation";
import { findOrCreateUser } from "../middleware/findOrCreateUser";
import { requireAuth } from "@clerk/express";


const router = Router();

router.get("/",requireAuth(), findOrCreateUser, getAllLowStockItems);
router.get("/:id", requireAuth(), findOrCreateUser, validateRequest(lowStockIdSchema), getLowStockItemById);
router.put("/:id", requireAuth(), findOrCreateUser, validateRequest(lowStockPutSchema), updateLowStockItem);
router.delete("/:id", requireAuth(), findOrCreateUser, validateRequest(lowStockIdSchema), deleteLowStockItem);

export default router;