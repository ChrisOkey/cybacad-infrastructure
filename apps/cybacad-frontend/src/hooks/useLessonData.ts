import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../lib/firebase"; // Ensure this points to your frontend firebase config
import { Lesson } from "@cybacad/shared-types"; // ✅ Using your shared types

export function useLessonData(courseId: string, moduleId: string, lessonId: string) {
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchLesson() {
      // Guard clause: Don't fetch if IDs are missing
      if (!courseId || !moduleId || !lessonId) return;

      try {
        setLoading(true);
        setError(null);

        // Path: courses -> [id] -> modules -> [id] -> lessons -> [id]
        const lessonRef = doc(db, "courses", courseId, "modules", moduleId, "lessons", lessonId);
        const docSnap = await getDoc(lessonRef);

        if (docSnap.exists()) {
          // Force cast the data to our Lesson type
          const data = docSnap.data();
          setLesson({ id: docSnap.id, ...data } as Lesson);
        } else {
          setError("Lesson not found in database.");
        }
      } catch (err: any) {
        console.error("Error fetching lesson:", err);
        setError(err.message || "Failed to load lesson data");
      } finally {
        setLoading(false);
      }
    }

    fetchLesson();
  }, [courseId, moduleId, lessonId]);

  return { lesson, loading, error };
}