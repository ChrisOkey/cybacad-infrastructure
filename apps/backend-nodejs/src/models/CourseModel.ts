// ✅ FIX 1: Import from local file without extension
import { db } from '../config/firebase'; 

const COURSES_COLLECTION = 'courses';

// Define the shape of a Course
interface CourseData {
    id?: string;
    title: string;
    description?: string;
    difficulty?: string;
    modules?: any[];
    createdAt?: string;
    [key: string]: any; 
}

/**
 * Fetch all courses
 */
export const getAllCourses = async () => {
    const snapshot = await db.collection(COURSES_COLLECTION).get();
    // Explicitly type 'doc' as any to silence the error
    return snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }));
};

export const getCourseById = async (courseId: string) => {
    const doc = await db.collection(COURSES_COLLECTION).doc(courseId).get();
    if (!doc.exists) return null;
    return { id: doc.id, ...doc.data() };
};

export const getLessonContent = async (lessonId: string) => {
    return {
        id: lessonId,
        title: "Lesson Content",
        markdown: "# Lesson Content Loaded\nThis is data from the database.",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" 
    };
};

// --- ADMIN FUNCTIONS ---

export const createCourse = async (courseData: CourseData) => {
    const courseRef = courseData.id 
        ? db.collection(COURSES_COLLECTION).doc(courseData.id) 
        : db.collection(COURSES_COLLECTION).doc();
    
    // 🔍 SANITIZATION FIX START 🔍
    // We map over the modules to ensure no 'undefined' values exist.
    // If we send 'undefined' to Firestore, it will often crash or drop the data.
    const sanitizedModules = Array.isArray(courseData.modules) 
        ? courseData.modules.map(mod => ({
            title: mod.title || "Untitled Module",
            lessons: Array.isArray(mod.lessons) 
                ? mod.lessons.map((less: any) => ({
                    id: less.id || Date.now().toString(),
                    title: less.title || "Untitled Lesson",
                    description: less.description || "",
                    duration: less.duration || "10:00",
                    completed: false
                })) 
                : []
        })) 
        : [];
    // 🔍 SANITIZATION FIX END 🔍

    const dataToSave = {
        title: courseData.title,
        description: courseData.description || "No description",
        difficulty: courseData.difficulty || "Beginner",
        modules: sanitizedModules, // ✅ Save the clean version
        totalModules: sanitizedModules.length,
        createdAt: new Date().toISOString(),
        enrolledCount: 0,
        id: courseRef.id
    };

    // Use set with merge: true for safety
    await courseRef.set(dataToSave, { merge: true });
    return courseRef.id;
};

export const updateCourse = async (courseId: string, updates: Partial<CourseData>) => {
    const courseRef = db.collection(COURSES_COLLECTION).doc(courseId);
    await courseRef.update({
        ...updates,
        updatedAt: new Date().toISOString()
    });
};

export const deleteCourse = async (courseId: string) => {
    await db.collection(COURSES_COLLECTION).doc(courseId).delete();
};