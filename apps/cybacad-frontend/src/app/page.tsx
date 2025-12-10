"use client";

import React from "react";
import Link from "next/link";
import { useAllCourses } from "@/hooks/useAllCourses";
import HeroSection from "@/components/home/HeroSection";
import PartnersSection from "@/components/home/PartnersSection";
import { Shield, ArrowRight, Terminal, Zap, Loader2 } from "lucide-react";

export default function HomePage() {
  const { courses, loading } = useAllCourses();

  return (
    <main className="min-h-screen bg-gray-950 text-white font-sans">
      
      {/* 1. HERO SECTION */}
      <HeroSection />

      {/* 2. PARTNERS SECTION */}
      <PartnersSection />

      {/* 3. COURSE CATALOG SECTION */}
      <div id="courses" className="max-w-7xl mx-auto py-24 px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 text-teal-400 font-bold text-sm uppercase tracking-wider mb-2">
              <Terminal className="w-4 h-4" />
              <span>Curriculum</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Featured Courses</h2>
            <p className="text-gray-400 mt-2 max-w-xl">
              Hand-picked interactive labs to take you from beginner to professional penetration tester.
            </p>
          </div>
          
          {/* ✅ LOGIC FIX: Scrolls to the list instead of a dead link */}
          <Link 
            href="#courses" 
            className="text-teal-400 font-bold flex items-center gap-2 hover:gap-3 transition-all text-sm bg-teal-500/10 px-4 py-2 rounded-full border border-teal-500/20 hover:bg-teal-500/20"
          >
            Browse All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Dynamic Content Area */}
        {loading ? (
          // SKELETON LOADING STATE
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-96 bg-gray-900/50 rounded-2xl border border-gray-800 animate-pulse flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-teal-500/50 animate-spin" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses && courses.length > 0 ? (
              // RENDER COURSES (The Logic that worked!)
              courses.map((course) => (
                <Link 
                  key={course.id} 
                  // ✅ LOGIC FIX: Dynamic Link based on ID
                  href={`/learn/${course.id}`} 
                  className="group bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden hover:border-teal-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-teal-900/10 hover:-translate-y-1 block"
                >
                  <div className="h-52 bg-gray-800 relative overflow-hidden">
                     {/* Thumbnail Gradient */}
                     <div className="absolute inset-0 bg-linear-to-tr from-gray-900 via-gray-800 to-teal-900/20 group-hover:scale-105 transition-transform duration-500" />
                     
                     {/* Icon Badge */}
                     <div className="absolute top-4 left-4 p-3 bg-black/60 backdrop-blur-md rounded-xl border border-gray-700 shadow-lg">
                        <Shield className="w-6 h-6 text-teal-400" />
                     </div>

                     {/* Difficulty Badge */}
                     <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/60 backdrop-blur rounded-full text-xs font-bold text-gray-300 border border-gray-700 flex items-center gap-1">
                        <Zap className="w-3 h-3 text-yellow-400" /> Beginner
                     </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-teal-400 transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-sm text-gray-400 line-clamp-2 leading-relaxed h-10">
                      {course.description}
                    </p>
                    
                    {/* Card Footer */}
                    <div className="mt-6 pt-4 border-t border-gray-800 flex justify-between items-center text-sm">
                      <div className="flex items-center gap-2 text-gray-500">
                         <div className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center text-[10px] text-white">AI</div>
                         <span>{course.instructor || "AI Tutor"}</span>
                      </div>
                      <span className="font-bold text-white flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        Start Lab <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              // EMPTY STATE
              <div className="col-span-full py-20 text-center bg-gray-900/30 rounded-2xl border border-dashed border-gray-800">
                <Terminal className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-300">No courses found</h3>
                <p className="text-gray-500 text-sm mt-2">
                  The database is currently empty. Run the seed script to populate content.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

    </main>
  );
}