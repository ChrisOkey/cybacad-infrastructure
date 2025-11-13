import { useState, useEffect } from "react";
import { fetchData } from "@/utils/fetchData";

export interface Course {
  id: string;
  title: string;
  instructor: string;
  progress?: number;
}

export const useCourseData = (url: string) => {
  const [data, setData] = useState<Course[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchData(url)
      .then((courses) => setData(courses))
      .catch((err) => {
        const message = err.message.includes("Failed to fetch")
          ? "Backend connection failed. Is the Node.js server running on port 5000?"
          : err.message;
        setError(new Error(message));
      })
      .finally(() => setLoading(false));
  }, [url]);

  return { data, loading, error };
};
