import express from 'express';
// Import all controller functions (getCourses, getLessonDetails, etc.)
import * as courseController from '../controllers/courseController.js';

const router = express.Router();

/**
 * GET /api/v1/courses
 * Fetches the list of all courses (for the main catalog or sidebar).
 */
router.get('/', courseController.getCourses);

/**
 * GET /api/v1/lessons/:lessonId
 * Fetches the specific content for a lesson.
 */
router.get('/lessons/:lessonId', courseController.getLessonDetails);

// ✅ CRITICAL: Default export so index.ts can import it
export default router;
