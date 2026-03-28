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

const router = Router();

router.get("/", getAllLowStockItems);
router.get("/:id", validateRequest(lowStockIdSchema), getLowStockItemById);
router.put("/:id", validateRequest(lowStockPutSchema), updateLowStockItem);
router.delete("/:id", validateRequest(lowStockIdSchema), deleteLowStockItem);

export default router;