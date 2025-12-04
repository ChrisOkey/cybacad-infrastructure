import express from 'express';
// Import everything from the controller because it exports middleware AND handler functions
import * as authController from '../controllers/authController.js';

const router = express.Router();

/**
 * POST /api/v1/auth/signup
 * Handles user registration.
 */
router.post('/signup', authController.signup);

/**
 * POST /api/v1/auth/login
 * Handles user login and JWT issuance.
 */
router.post('/login', authController.login);

/**
 * GET /api/v1/auth/profile
 * Protected route to test middleware and fetch user profile.
 */
router.get('/profile', authController.protect, authController.getProfile);

// ✅ CRITICAL: Default export so index.ts can import it
export default router;
