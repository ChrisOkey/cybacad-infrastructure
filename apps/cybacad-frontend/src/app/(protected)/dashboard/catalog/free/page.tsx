import React from "react";
import CourseCatalog from "@/components/CourseCatalog";

export default function FreeCoursesPage() {
  return (
    <div className="max-w-6xl mx-auto text-white">
      <div className="mb-8">
         <h1 className="text-3xl font-bold mb-2">Free Community Courses</h1>
         <p className="text-slate-400">Start your journey with these foundational modules. No credit card required.</p>
      </div>
      <CourseCatalog type="free" />
    </div>
  );
}