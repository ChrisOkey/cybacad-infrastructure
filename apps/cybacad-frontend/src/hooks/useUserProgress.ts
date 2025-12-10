import { useState, useEffect } from "react";
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";

export function useUserProgress() {
  const { user } = useAuth();
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch Progress on Load
  useEffect(() => {
    async function fetchProgress() {
      if (!user) {
        setCompletedLessons([]);
        setLoading(false);
        return;
      }

      try {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const data = userSnap.data();
          setCompletedLessons(data.completedLessons || []);
        } else {
          // Create user doc if it doesn't exist (First login)
          await setDoc(userRef, { 
            email: user.email,
            completedLessons: [],
            joinedAt: new Date().toISOString()
          });
        }
      } catch (error) {
        console.error("Error fetching progress:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProgress();
  }, [user]);

  // 2. Function to Mark Lesson as Complete
  const markLessonComplete = async (lessonId: string) => {
    if (!user) return;

    // Optimistic UI Update (Update state immediately for speed)
    setCompletedLessons((prev) => [...prev, lessonId]);

    try {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        completedLessons: arrayUnion(lessonId)
      });
    } catch (error) {
      console.error("Failed to save progress:", error);
    }
  };

  // 3. Helper to check specific lesson
  const isLessonCompleted = (lessonId: string) => completedLessons.includes(lessonId);

  return { completedLessons, markLessonComplete, isLessonCompleted, loading };
}