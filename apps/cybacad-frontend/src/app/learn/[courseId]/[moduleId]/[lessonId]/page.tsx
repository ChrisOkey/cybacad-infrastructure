"use client";

import React from "react";
// Import the Classroom Engine
import IntegratedClassroom from "@/components/classroom/IntegratedClassroom";

interface PageProps {
  params: {
    courseId: string;
    moduleId: string;
    lessonId: string;
  };
}

export default function LessonPage({ params }: PageProps) {
  // 1. Get the IDs from the URL
  const { courseId, moduleId, lessonId } = params;

  // 2. Pass them to the Classroom Component
  return (
    <IntegratedClassroom 
      courseId={courseId} 
      moduleId={moduleId} 
      lessonId={lessonId} 
    />
  );
}