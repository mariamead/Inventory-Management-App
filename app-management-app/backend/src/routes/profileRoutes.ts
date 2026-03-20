import { Router } from 'express';
import { validateGetProfile, validateUpdateProfile } from '../middleware/validate';
import { profileController } from '../controllers/profileController';

const router = Router();

router.get('/api/profile', validateGetProfile, profileController.getProfile);

router.put('/api/profile', validateUpdateProfile, profileController.updateProfile);

export default router;