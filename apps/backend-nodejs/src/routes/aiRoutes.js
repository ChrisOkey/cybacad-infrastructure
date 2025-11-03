import express from 'express';
import { getAICoachHint } from '../controllers/aiController.js';

const router = express.Router();

// POST /api/v1/ai/coach
// This endpoint is hit by the frontend when a user requests a hint.
router.post('/coach', getAICoachHint);

export default router; // <-- CRITICAL FIX: The required default export
