import express from 'express';
import { getProfile, updateProfile } from '../../controllers/profile.controller.js';
import { isAuthenticated } from '../../middlewares/auth.js'; // ✅ Import correctly

const router = express.Router();

router.route('/')
  .get(isAuthenticated, getProfile)
  .put(isAuthenticated, updateProfile);

export default router;
