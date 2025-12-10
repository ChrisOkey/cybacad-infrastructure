import { useState, useEffect } from "react";
import { doc, getDoc, collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
// Import types from your shared package
import { Course, Module } from "@cybacad/shared-types";

// We extend Module to ensure 'id' is explicitly handled
interface ModuleWithId extends Module {
  id: string;
}

export function useCourseOutline(courseId: string) {
  const [course, setCourse] = useState<Course | null>(null);
  const [modules, setModules] = useState<ModuleWithId[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      if (!courseId) return;
      setLoading(true);

      try {
        // 1. Fetch Course Details
        const courseSnap = await getDoc(doc(db, "courses", courseId));
        
        if (courseSnap.exists()) {
          setCourse({ id: courseSnap.id, ...courseSnap.data() } as Course);
        } else {
          console.error("Course document not found");
        }

        // 2. Fetch Modules (Ordered by 'order')
        const modulesRef = collection(db, "courses", courseId, "modules");
        const q = query(modulesRef, orderBy("order", "asc"));
        const modulesSnap = await getDocs(q);

        const modulesList = modulesSnap.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as ModuleWithId[];

        setModules(modulesList);

      } catch (err) {
        console.error("Error fetching course outline:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [courseId]);

  return { course, modules, loading };
}