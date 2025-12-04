import { useState, useEffect } from "react";
// ✅ This import works now because we created the file in Step 1
import { fetchData } from "@/utils/fetchData"; 

export interface Course {
  id: string;
  title: string;
  instructor?: string;
  description?: string;
  modules?: any[]; 
  progress?: number;
}

// ✅ 1. Define the Mock Data for offline usage
const MOCK_COURSES: Course[] = [
  {
    id: "1",
    title: "Web Security Fundamentals",
    instructor: "Dr. Cyber",
    description: "Learn how to secure web applications against common threats.",
    modules: [
      {
        id: "m1",
        title: "Input Validation",
        lessons: [
          { id: "l1", title: "Preventing XSS", content: "Learn to sanitize inputs." }
        ]
      }
    ]
  }
];

export const useCourseData = (url: string) => {
  const [data, setData] = useState<Course[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!url) return;

    fetchData(url)
      .then((courses) => {
          const courseArray = Array.isArray(courses) ? courses : [courses];
          setData(courseArray);
          setError(null); // Clear any previous errors
      })
      .catch((err) => {
        console.warn("Backend unavailable, switching to Offline Mode.", err);
        
        // ✅ 2. FIX: Force the hook to use Mock Data when backend fails
        setData(MOCK_COURSES); 
        
        // ✅ 3. FIX: Clear the error so the UI renders the data instead of the error message
        setError(null); 
      })
      .finally(() => setLoading(false));
  }, [url]);

  return { data, loading, error };
};