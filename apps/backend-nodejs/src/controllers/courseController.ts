import { Request, Response } from 'express';
// ✅ Correct import: TypeScript should resolve this to CourseModel.ts
import * as CourseModel from '../models/CourseModel';

// =========================================================
// PUBLIC ROUTES (Used by the Student/Course View)
// =========================================================

/**
 * GET /api/v1/courses
 * Retrieves a list of all courses.
 */
export const getCourses = async (req: Request, res: Response) => {
    try {
        const courses = await CourseModel.getAllCourses();
        res.status(200).json(courses);
    } catch (error: any) {
        console.error("API Error fetching courses:", error.message);
        res.status(500).json({ message: 'Could not retrieve course list.' });
    }
};

/**
 * GET /api/v1/courses/lessons/:lessonId
 * Retrieves detailed content for a specific lesson.
 */
export const getLessonDetails = async (req: Request, res: Response) => {
    try {
        const { lessonId } = req.params;
        const lesson = await CourseModel.getLessonContent(lessonId);

        if (!lesson) {
            return res.status(404).json({ message: "Lesson not found" });
        }

        res.status(200).json(lesson);
    } catch (error: any) {
        console.error(`API Error fetching lesson ${req.params.lessonId}:`, error.message);
        res.status(500).json({ message: 'Could not retrieve lesson details.' });
    }
};

// =========================================================
// ✅ ADMIN FUNCTIONS (Used by the Admin Portal to Write Data)
// =========================================================

/**
 * POST /api/v1/courses
 * Creates a new course and its curriculum.
 */
export const createCourse = async (req: Request, res: Response) => {
    try {
        const courseData = req.body;
        
        console.log("📝 Creating Course:", courseData.title);
        // Debugging log to confirm curriculum is received
        console.log("📦 Modules Count:", courseData.modules ? courseData.modules.length : 0); 

        if (!courseData.title) {
            return res.status(400).json({ message: 'Course Title is required.' });
        }

        const newId = await CourseModel.createCourse(courseData);

        res.status(201).json({
            status: 'success',
            message: 'Course created successfully',
            courseId: newId
        });

    } catch (error: any) {
        // This catch block handles the Firebase Authentication/Permission errors
        console.error("API Error creating course:", error.message);
        res.status(500).json({ message: 'Failed to create course.' });
    }
};

/**
 * PUT /api/v1/courses/:courseId
 * Updates an existing course's metadata.
 */
export const updateCourse = async (req: Request, res: Response) => {
    try {
        const { courseId } = req.params;
        const updates = req.body;
        await CourseModel.updateCourse(courseId, updates);
        res.status(200).json({ message: 'Course updated successfully' });
    } catch (error: any) {
        console.error(`API Error updating course ${req.params.courseId}:`, error.message);
        res.status(500).json({ message: 'Failed to update course.' });
    }
};

/**
 * DELETE /api/v1/courses/:courseId
 * Deletes a course.
 */
export const deleteCourse = async (req: Request, res: Response) => {
    try {
        const { courseId } = req.params;
        await CourseModel.deleteCourse(courseId);
        res.status(200).json({ message: 'Course deleted successfully' });
    } catch (error: any) {
        console.error(`API Error deleting course ${req.params.courseId}:`, error.message);
        res.status(500).json({ message: 'Failed to delete course.' });
    }
};