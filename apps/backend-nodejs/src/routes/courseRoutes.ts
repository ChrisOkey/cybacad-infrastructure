import { Router } from 'express';
import * as admin from 'firebase-admin';

// Explicitly Type the Router
const router: Router = Router();

// ❌ REMOVED: const db = admin.firestore(); from here

// ==========================================
// 1. GET ALL COURSES (For Home Page)
// ==========================================
router.get('/', async (req, res) => {
  try {
    // 🟢 FIX: Connect to DB here, inside the function
    const db = admin.firestore(); 

    const snapshot = await db.collection('courses').get();
    
    if (snapshot.empty) {
      return res.json([]); 
    }

    const courses = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    res.json(courses);
  } catch (error) {
    console.error("❌ Error fetching all courses:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ==========================================
// 2. GET SINGLE COURSE (For Lesson Page)
// ==========================================
router.get('/:id', async (req, res) => {
  try {
    // 🟢 FIX: Connect to DB here too
    const db = admin.firestore();

    const courseId = req.params.id;
    const doc = await db.collection('courses').doc(courseId).get();

    if (!doc.exists) {
      return res.status(404).json({ error: "Course not found" });
    }

    res.json({ id: doc.id, ...doc.data() });
  } catch (error) {
    console.error("❌ Error fetching course:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;