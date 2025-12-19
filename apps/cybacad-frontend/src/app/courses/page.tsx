"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link"; 
import { Loader2, AlertTriangle, BookOpen, ArrowRight, BarChart, Clock } from "lucide-react";

// Define the shape of the course data
interface Course {
  id: string;
  title: string;
  description: string;
  difficulty?: string;
  totalModules?: number;
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 1. Fetch Data Directly
  useEffect(() => {
    async function fetchCourses() {
      try {
        const res = await fetch("http://localhost:5000/api/v1/courses");
        if (!res.ok) throw new Error("Failed to fetch courses");
        const data = await res.json();
        setCourses(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load courses.");
      } finally {
        setLoading(false);
      }
    }
    fetchCourses();
  }, []);

  // 2. Loading State
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-slate-400 bg-slate-950">
        <Loader2 className="mr-2 h-6 w-6 animate-spin" /> Loading courses...
      </div>
    );
  }

  // 3. Error State
  if (error) {
    return (
      <div className="flex h-screen items-center justify-center text-red-400 bg-slate-950">
        <AlertTriangle className="mr-2 h-6 w-6" /> {error}
      </div>
    );
  }

  // 4. Render the List
  return (
    <div className="min-h-screen bg-slate-950 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-white">📚 Available Courses</h1>
          <span className="text-sm text-slate-400 bg-slate-900 border border-slate-800 px-3 py-1 rounded-full">
            {courses.length} Courses Found
          </span>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Link 
              key={course.id} 
              href={`/learn/${course.id}`} // ✅ Links to the Sidebar page!
              className="group block bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-teal-500/50 transition-all hover:shadow-lg hover:shadow-teal-900/10"
            >
              {/* Card Header (Thumbnail placeholder) */}
              <div className="h-40 bg-slate-950 flex items-center justify-center group-hover:bg-slate-900 transition-colors">
                 <div className="text-4xl group-hover:scale-110 transition-transform">🛡️</div>
              </div>

              {/* Card Body */}
              <div className="p-6">
                <div className="flex items-center gap-3 text-xs text-slate-500 mb-2">
                  <span className="flex items-center gap-1"><BarChart className="w-3 h-3" /> {course.difficulty || "Beginner"}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {course.totalModules || 0} Modules</span>
                </div>

                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-teal-400 transition-colors">
                  {course.title}
                </h3>
                
                <p className="text-sm text-slate-400 line-clamp-2 h-10 mb-4">
                  {course.description || "No description available."}
                </p>

                <div className="flex items-center text-sm font-bold text-teal-400 gap-1 group-hover:translate-x-1 transition-transform">
                   Start Learning <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}