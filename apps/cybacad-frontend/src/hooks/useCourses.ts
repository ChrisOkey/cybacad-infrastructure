// src/hooks/useCourses.ts
"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase"; // assumes you have firebase.ts exporting db

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
      const snapshot = await getDocs(collection(db, "courses"));
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Course[];
      setCourses(data);
      setLoading(false);
    }
    fetchCourses();
  }, []);

  return { courses, loading };
}
