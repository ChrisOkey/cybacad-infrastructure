// apps/backend-nodejs/src/routes/aiRoutes.js
import express from 'express';
import { getAICoachHint } from '../controllers/aiController.js';

const router = express.Router();

/**
 * POST /api/v1/ai/coach
 * Endpoint hit by the frontend when a user requests a hint.
 */
router.post('/coach', getAICoachHint);

export default router;
