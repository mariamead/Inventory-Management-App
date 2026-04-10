import { Router } from "express";
import { getProfile, updateProfile, getAllProfiles } from "../controllers/profileController";
import { findOrCreateUser } from "../middleware/findOrCreateUser";
import { requireAdmin } from "../middleware/requireAdmin";
import { requireAuth } from "@clerk/express";

const router: Router = Router();

router.get("/", requireAuth, findOrCreateUser, requireAdmin, getAllProfiles);
router.get("/:id", requireAuth, findOrCreateUser,getProfile);
router.put("/:id", requireAuth, updateProfile);

export default router;