"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
// ✅ CHANGED: Use relative path to guarantee we hit the file we just created
import { db } from "../lib/firebase"; 

type Course = {
  id: string;
  title: string;
  description: string;
  progress: number;
};

export function useCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCourses() {
      console.log("🕵️‍♂️ useCourses: Starting fetch...");
      
      // 1. Check DB Connection
      if (!db) {
        console.error("❌ CRITICAL: 'db' is undefined. Check src/lib/firebase.ts");
        setLoading(false);
        return;
      }

      try {
        // 2. Query the 'courses' collection
        console.log("   - Querying collection: 'courses'...");
        const snapshot = await getDocs(collection(db, "courses"));
        
        console.log(`✅ Snapshot size: ${snapshot.size} documents found.`);

        if (snapshot.empty) {
            console.warn("⚠️ Collection is empty. Check: 1. Project ID match? 2. Collection name 'courses'?");
        }

        const data = snapshot.docs.map(doc => {
            const d = doc.data();
            console.log("   - Doc Found:", doc.id, d); // Print the actual data
            return { id: doc.id, ...d } as Course;
        });

        setCourses(data);
      } catch (error: any) {
        console.error("❌ Firestore Error:", error.message);
        // Common error: "Missing or insufficient permissions" -> Check Security Rules
      } finally {
        setLoading(false);
      }
    }

    fetchCourses();
  }, []);

  return { courses, loading };
}