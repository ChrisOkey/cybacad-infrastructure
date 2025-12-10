"use client";

import React from "react";
import Link from "next/link";
import { useCourseOutline } from "@/hooks/useCourseOutline";
import { Loader2, Shield, PlayCircle, BookOpen, Terminal, ArrowLeft } from "lucide-react";

export default function CourseDashboard({ params }: { params: { courseId: string } }) {
  const { course, modules, loading } = useCourseOutline(params.courseId);

  // --- LOADING STATE ---
  if (loading) {
    return (
      <div className="h-screen bg-gray-950 flex flex-col items-center justify-center text-teal-500 gap-4">
        <Loader2 className="w-10 h-10 animate-spin" />
        <span className="text-sm font-mono animate-pulse">LOADING COURSE DATA...</span>
      </div>
    );
  }

  // --- NOT FOUND STATE ---
  if (!course) {
    return (
      <div className="h-screen bg-gray-950 flex flex-col items-center justify-center text-gray-400 gap-4">
        <Terminal className="w-12 h-12 text-gray-600" />
        <h2 className="text-xl font-bold">Course Not Found</h2>
        <p className="text-sm">We couldn't find course ID: <span className="font-mono text-teal-500">{params.courseId}</span></p>
        <Link href="/" className="mt-4 px-4 py-2 bg-gray-800 rounded hover:bg-gray-700 transition-colors flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Return to Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans pb-20">
      
      {/* HEADER HERO */}
      {/* ✅ FIX: Added pt-32 (padding-top) to prevent Navbar overlap */}
      <div className="bg-linear-to-r from-gray-900 to-gray-800 border-b border-gray-800 p-10 pt-32 relative overflow-hidden">
        
        {/* Background Pattern */}
        <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#2dd4bf 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-start gap-8">
            
            {/* Course Icon */}
            <div className="p-6 bg-teal-500/10 rounded-2xl border border-teal-500/20 shadow-2xl shadow-teal-900/20 backdrop-blur-sm">
              <Shield className="w-16 h-16 text-teal-400" />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-teal-500/10 text-teal-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-teal-500/20">
                  Interactive Course
                </span>
                <span className="text-gray-500 text-sm font-mono">ID: {course.id}</span>
              </div>
              
              <h1 className="text-4xl font-bold text-white mb-4 leading-tight">{course.title}</h1>
              <p className="text-gray-400 text-lg leading-relaxed max-w-2xl">{course.description}</p>
              
              <div className="mt-8 flex flex-wrap gap-4">
                {/* Primary CTA */}
                <button className="px-8 py-3 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-lg transition-all shadow-lg shadow-teal-900/20 flex items-center gap-2">
                  <PlayCircle className="w-5 h-5" /> Continue Learning
                </button>
                {/* Status Badge */}
                <div className="px-6 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-300 font-medium flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></div>
                  In Progress
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MODULE LIST */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h2 className="text-xl font-bold text-gray-200 mb-8 flex items-center gap-3">
          <div className="p-2 bg-gray-800 rounded-lg">
            <BookOpen className="w-5 h-5 text-teal-500" />
          </div>
          Course Modules
        </h2>

        <div className="space-y-6">
          {modules.map((module) => (
            <div key={module.id} className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden hover:border-gray-700 transition-colors">
              
              {/* Module Header */}
              <div className="p-5 bg-gray-800/30 border-b border-gray-800/50 flex justify-between items-center">
                <div>
                  <span className="text-xs font-bold text-teal-500 uppercase tracking-widest mb-1 block">Module {module.order}</span>
                  <h3 className="text-lg font-bold text-white">{module.title}</h3>
                </div>
                <div className="h-8 w-8 rounded-full border-2 border-gray-700 flex items-center justify-center">
                  <span className="text-xs text-gray-500 font-bold">{module.order}</span>
                </div>
              </div>

              {/* Lesson Links */}
              <div className="p-2">
                {/* Dynamic Link Logic based on Course ID */}
                <Link 
                  href={
                    course.id === 'CYBER-101' 
                      ? `/learn/${course.id}/${module.id}/lesson_1_2`
                      : `/learn/${course.id}/${module.id}/lesson_2_1`
                  }
                  className="block p-4 rounded-lg hover:bg-gray-800 transition-all flex items-center gap-4 group"
                >
                  <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center group-hover:bg-teal-500/20 transition-colors">
                     <PlayCircle className="w-5 h-5 text-gray-500 group-hover:text-teal-400 transition-colors" />
                  </div>
                  
                  <div className="flex-1">
                    <span className="text-gray-200 font-medium group-hover:text-white block mb-1">
                      {course.id === 'CYBER-101' ? "SQL Injection Fundamentals" : "Analyzing Traffic with Python"}
                    </span>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                       <span className="flex items-center gap-1"><Terminal className="w-3 h-3" /> Lab</span>
                       <span>•</span>
                       <span>15 min</span>
                    </div>
                  </div>

                  <div className="px-3 py-1 rounded text-xs font-medium bg-gray-800 text-gray-400 border border-gray-700 group-hover:border-teal-500/30 group-hover:text-teal-400">
                    Start
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}