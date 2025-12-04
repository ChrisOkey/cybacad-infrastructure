import { db } from '../config/firebase.js'; // <-- Corrected: db is now a named export

/**
 * Converts a Firestore DocumentSnapshot into a clean JavaScript object,
 * including the document ID.
 * @param {object} doc - The Firestore DocumentSnapshot.
 * @returns {object} The structured data object.
 */
const docToData = (doc) => {
    if (!doc.exists) return null;
    return {
        id: doc.id,
        ...doc.data(),
    };
};

/**
 * Fetches all available courses from Firestore.
 * @returns {Promise<Array>} An array of course objects.
 */
export const getAllCourses = async () => { // <-- Uses export const for named export
    try {
        // Reference the 'courses' collection
        const coursesRef = db.collection('courses');
        
        // Fetch the entire collection
        const snapshot = await coursesRef.get();

        if (snapshot.empty) {
            return []; // Return an empty array if no courses are found
        }

        // Map the results to clean data objects
        const courses = snapshot.docs.map(doc => docToData(doc));
        return courses;

    } catch (error) {
        console.error("Firestore Error in getAllCourses:", error.message);
        // Throw an error to be caught by the controller
        throw new Error("Failed to retrieve course list from database.");
    }
};

/**
 * Fetches detailed content for a specific lesson.
 * @param {string} lessonId - The ID of the lesson to fetch.
 * @returns {Promise<object>} The detailed lesson object.
 */
export const getLessonContent = async (lessonId) => { // <-- Uses export const for named export
    try {
        if (!lessonId) {
            throw new Error("Lesson ID is required.");
        }

        // Reference the specific lesson document
        const lessonRef = db.collection('lessons').doc(lessonId);
        const doc = await lessonRef.get();

        if (!doc.exists) {
            // Throw a specific 404 error
            const error = new Error(`Lesson with ID ${lessonId} not found.`);
            error.statusCode = 404; 
            throw error;
        }

        return docToData(doc);

    } catch (error) {
        console.error(`Firestore Error in getLessonContent (${lessonId}):`, error.message);
        throw error;
    }
};

