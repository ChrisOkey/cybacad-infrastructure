import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Course } from "@cybacad/shared-types";

export function useAllCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCourses() {
      try {
        setLoading(true);
        // 1. Get reference to 'courses' collection
        const coursesRef = collection(db, "courses");
        
        // 2. Fetch all documents
        const snapshot = await getDocs(coursesRef);
        
        // 3. Map them to our Course type
        const coursesList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Course[];

        setCourses(coursesList);
      } catch (err) {
        console.error("Error fetching courses:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchCourses();
  }, []);

  return { courses, loading };
}