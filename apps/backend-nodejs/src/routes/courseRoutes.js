import express from 'express';
// We use * import here because the controller exports named functions (getCourses, getLessonDetails)
import * as courseController from '../controllers/courseController.js'; 

const router = express.Router();

// 1. GET /api/v1/courses
// Fetches the list of all courses (for the main catalog or sidebar).
router.get('/', courseController.getCourses);

// 2. GET /api/v1/lessons/:lessonId
// Fetches the specific content for a lesson.
router.get('/lessons/:lessonId', courseController.getLessonDetails);

export default router; // <-- CRITICAL FIX: The required default export
