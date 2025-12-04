"use client";

import React from "react";
import { useCourseData } from "@/hooks/useCourseData";
import { CourseCard } from "@cybacad/ui";
import { Loader2, AlertTriangle } from "lucide-react";

export default function CoursesPage() {
  // Fetch data from backend (or fallback mock)
  const { data: courses, loading, error } = useCourseData("http://localhost:5000/api/v1/courses");

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center text-gray-500">
        <Loader2 className="mr-2 h-6 w-6 animate-spin" /> Loading courses...
      </div>
    );
  }

  if (error && !courses) {
    return (
      <div className="flex h-96 items-center justify-center text-red-500">
        <AlertTriangle className="mr-2 h-6 w-6" /> Failed to load courses.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">📚 Available Courses</h1>
        <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
          {courses?.length || 0} Courses
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses?.map((course, index) => (
          <CourseCard
            key={course.id || index}
            title={course.title}
            description={course.description || "No description available."}
            progress={course.progress || 0}
          />
        ))}
      </div>
    </div>
  );
}