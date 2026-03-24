import { Router } from "express";
import { getProfile, updateProfile, getAllProfiles } from "../controllers/profileController";

const router: Router = Router();

router.get("/", getAllProfiles);
router.get("/:id", getProfile);
router.put("/:id", updateProfile);

export default router;