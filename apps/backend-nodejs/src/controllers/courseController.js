import * as CourseModel from '../models/CourseModel.js';

/**
 * GET /api/v1/courses
 * Fetches the list of all courses for the dashboard.
 */
export const getCourses = async (req, res) => {
    try {
        const courses = await CourseModel.getAllCourses();
        
        res.status(200).json({ 
            status: 'success', 
            data: courses 
        });

    } catch (error) {
        console.error("API Error fetching courses:", error.message);
        res.status(500).json({ 
            status: 'error', 
            message: 'Could not retrieve course list.' 
        });
    }
};

/**
 * GET /api/v1/lessons/:lessonId
 * Fetches detailed content for a single lesson.
 */
export const getLessonDetails = async (req, res) => {
    try {
        const lessonId = req.params.lessonId;
        const lesson = await CourseModel.getLessonContent(lessonId);

        res.status(200).json({ 
            status: 'success', 
            data: lesson 
        });

    } catch (error) {
        console.error(`API Error fetching lesson ${req.params.lessonId}:`, error.message);
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({ 
            status: 'error', 
            message: error.message || 'Could not retrieve lesson details.'
        });
    }
};

// =========================================================
// ✅ ADMIN FUNCTIONS (NEW)
// =========================================================

/**
 * POST /api/v1/courses
 * Creates a new course in the database.
 */
export const createCourse = async (req, res) => {
    try {
        const courseData = req.body;

        // Basic validation
        if (!courseData.title || !courseData.id) {
            return res.status(400).json({ status: 'error', message: 'Course ID and Title are required.' });
        }

        // Call Model to save to Firestore
        await CourseModel.createCourse(courseData);

        res.status(201).json({
            status: 'success',
            message: 'Course created successfully',
            data: { id: courseData.id }
        });

    } catch (error) {
        console.error("API Error creating course:", error.message);
        res.status(500).json({ status: 'error', message: 'Failed to create course.' });
    }
};

/**
 * PUT /api/v1/courses/:courseId
 * Updates an existing course.
 */
export const updateCourse = async (req, res) => {
    try {
        const { courseId } = req.params;
        const updates = req.body;

        await CourseModel.updateCourse(courseId, updates);

        res.status(200).json({
            status: 'success',
            message: 'Course updated successfully'
        });

    } catch (error) {
        console.error(`API Error updating course ${req.params.courseId}:`, error.message);
        res.status(500).json({ status: 'error', message: 'Failed to update course.' });
    }
};

/**
 * DELETE /api/v1/courses/:courseId
 * Deletes a course (and optionally its modules).
 */
export const deleteCourse = async (req, res) => {
    try {
        const { courseId } = req.params;

        await CourseModel.deleteCourse(courseId);

        res.status(200).json({
            status: 'success',
            message: 'Course deleted successfully'
        });

    } catch (error) {
        console.error(`API Error deleting course ${req.params.courseId}:`, error.message);
        res.status(500).json({ status: 'error', message: 'Failed to delete course.' });
    }
};