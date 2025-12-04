import type { Express } from 'express';

// ✅ Import all route modules (explicit .js extensions required for NodeNext ESM)
import aiRoutes from './aiRoutes.js';
import authRoutes from './authRoutes.js';
import courseRoutes from './courseRoutes.js';
import hintRoutes from './hintRoutes.js';
import hintsRoutes from './hints.js';

/**
 * Registers all application routes with the Express app.
 * Each route module must export a default Express Router.
 *
 * @param app Express application instance
 */
export default function registerRoutes(app: Express): void {
  // AI-related endpoints
  app.use('/ai', aiRoutes);

  // Authentication endpoints
  app.use('/auth', authRoutes);

  // Course catalog and lessons
  app.use('/courses', courseRoutes);

    // Hints endpoints (two variants)
    // Hints endpoints (two variants)
    app.use('/hints', hintRoutes);
    app.use('/hints-alt', hintsRoutes);
  }
