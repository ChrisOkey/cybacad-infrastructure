"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, CheckCircle, Circle, PlayCircle, Loader2, AlertCircle } from "lucide-react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

// Define the shape of our data
type Lesson = {
  id: string;
  title: string;
  duration: string;
  completed?: boolean;
};

type Module = {
  title: string;
  lessons: Lesson[];
};

type CourseData = {
  id: string;
  title: string;
  modules: Module[];
};

export default function ClassroomLayout({ children }: { children: React.ReactNode }) {
  const params = useParams();
  const courseId = params?.courseId as string;

  const [course, setCourse] = useState<CourseData | null>(null);
  const [loading, setLoading] = useState(true);

  // --- FETCH COURSE DATA ---
  useEffect(() => {
    async function fetchCourse() {
      if (!courseId) return;

      try {
        const docRef = doc(db, "courses", courseId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          // Ensure we have a valid structure, even if empty
          setCourse({
            id: docSnap.id,
            title: data.title || "Untitled Course",
            modules: data.modules || [] // Default to empty array if no modules
          });
        } else {
          console.error("Course not found");
        }
      } catch (error) {
        console.error("Error fetching course:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCourse();
  }, [courseId]);

  return (
    <div className="flex h-screen bg-slate-950 text-white overflow-hidden">
      
      {/* LEFT SIDEBAR */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col z-20 hidden md:flex">
        
        {/* Header: Back to Dashboard */}
        <div className="h-16 flex items-center px-4 border-b border-slate-800 shrink-0">
          <Link href="/dashboard" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-medium">
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </Link>
        </div>

        {/* LOADING STATE */}
        {loading ? (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-500 gap-2">
            <Loader2 className="w-6 h-6 animate-spin" />
            <span className="text-xs">Loading Syllabus...</span>
          </div>
        ) : !course ? (
           <div className="p-6 text-center text-slate-500">
             <AlertCircle className="w-8 h-8 mx-auto mb-2 text-red-400" />
             <p className="text-sm">Course not found.</p>
           </div>
        ) : (
          <>
            {/* Course Title */}
            <div className="p-6 border-b border-slate-800 shrink-0">
              <h2 className="font-bold text-lg leading-tight mb-2 line-clamp-2">{course.title}</h2>
              {/* Progress Bar (Mocked for now) */}
              <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 w-[10%]"></div>
              </div>
              <p className="text-[10px] text-slate-500 mt-2 font-mono">10% Completed</p>
            </div>

            {/* Syllabus List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-slate-700">
              {course.modules.length === 0 ? (
                <div className="text-center text-slate-500 text-xs py-10">
                  No modules added yet.
                </div>
              ) : (
                course.modules.map((module, i) => (
                  <div key={i}>
                    <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 px-2 truncate">
                      {module.title}
                    </h3>
                    <div className="space-y-1">
                      {module.lessons.map((lesson, j) => (
                        <button 
                          key={`${i}-${j}`}
                          className="w-full flex items-center gap-3 px-3 py-2 text-left rounded-lg hover:bg-slate-800 transition-colors group"
                        >
                          {lesson.completed ? (
                            <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                          ) : (
                            <Circle className="w-4 h-4 text-slate-600 group-hover:text-blue-400 shrink-0" />
                          )}
                          <div className="flex-1 min-w-0">
                            <div className={`text-sm font-medium truncate ${lesson.completed ? "text-slate-400" : "text-white"}`}>
                              {lesson.title}
                            </div>
                            <div className="text-[10px] text-slate-500 flex items-center gap-1">
                              <PlayCircle className="w-3 h-3" /> {lesson.duration || "5:00"}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </aside>

      {/* RIGHT AREA: The Lesson Content */}
      <main className="flex-1 flex flex-col relative min-w-0">
        {children}
      </main>

    </div>
  );
}