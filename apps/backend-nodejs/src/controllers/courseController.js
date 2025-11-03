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
