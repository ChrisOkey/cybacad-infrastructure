import type { Router } from 'express';

/**
 * Express router handling authentication routes:
 * - POST /api/v1/auth/signup
 * - POST /api/v1/auth/login
 * - GET  /api/v1/auth/profile (protected)
 */
declare const router: Router;

export default router;
