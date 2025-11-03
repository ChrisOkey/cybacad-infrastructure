import express from 'express';
// We use * import because the controller exports the middleware AND controller functions
import * as authController from '../controllers/authController.js'; 

const router = express.Router();

// POST /api/v1/auth/signup
router.post('/signup', authController.signup);

// POST /api/v1/auth/login
router.post('/login', authController.login);

// GET /api/v1/auth/profile - Protected route to test middleware
router.get('/profile', authController.protect, authController.getProfile); 

export default router; // <-- CRITICAL FIX: The required default export

    
