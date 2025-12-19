"use client"; // 👈 THIS IS REQUIRED FOR INTERACTIVITY

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { 
  ArrowLeft, 
  CheckCircle, 
  PlayCircle, 
  Terminal, 
  ChevronRight, 
  Loader2,
  Menu
} from "lucide-react";

// Define the shape of our Course Data
interface Lesson {
  id: string;
  title: string;
  videoUrl?: string;
  content?: string; // This is the Python code/lab content
}

interface Module {
  title: string;
  lessons: Lesson[];
}

interface Course {
  id: string;
  title: string;
  modules: Module[];
}

export default function CoursePlayerPage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.courseId as string;

  // State
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeModuleIndex, setActiveModuleIndex] = useState(0);
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // 1. Fetch the Course Data
  useEffect(() => {
    async function fetchCourse() {
      try {
        const res = await fetch(`http://localhost:5000/api/v1/courses/${courseId}`);
        if (!res.ok) throw new Error("Course not found");
        const data = await res.json();
        setCourse(data);
      } catch (error) {
        console.error("Failed to load course:", error);
      } finally {
        setLoading(false);
      }
    }
    if (courseId) fetchCourse();
  }, [courseId]);

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 animate-spin text-teal-500" />
          <p>Loading Mission Data...</p>
        </div>
      </div>
    );
  }

  // Error State
  if (!course) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Mission Not Found</h1>
          <Link href="/" className="text-teal-400 hover:underline">Return to Base</Link>
        </div>
      </div>
    );
  }

  // Get Current Active Data
  const currentModule = course.modules[activeModuleIndex];
  const currentLesson = currentModule?.lessons[activeLessonIndex];

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col md:flex-row font-sans overflow-hidden">
      
      {/* 1. SIDEBAR (Lesson List) */}
      <aside 
        className={`fixed md:relative z-20 h-full bg-gray-900 border-r border-gray-800 w-80 transition-transform duration-300
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:hidden'}
        `}
      >
        <div className="p-4 border-b border-gray-800 flex items-center justify-between">
          <Link href="/" className="flex items-center text-gray-400 hover:text-white text-sm">
            <ArrowLeft className="w-4 h-4 mr-1" /> Exit
          </Link>
          <span className="font-bold text-teal-500 text-xs tracking-widest uppercase">Curriculum</span>
        </div>

        <div className="overflow-y-auto h-[calc(100vh-60px)]">
          {course.modules.map((module, mIndex) => (
            <div key={mIndex} className="mb-2">
              <div className="px-4 py-3 bg-gray-800/50 font-bold text-sm text-gray-300">
                {module.title}
              </div>
              <div>
                {module.lessons.map((lesson, lIndex) => {
                  const isActive = mIndex === activeModuleIndex && lIndex === activeLessonIndex;
                  return (
                    <button
                      key={lIndex}
                      onClick={() => {
                        setActiveModuleIndex(mIndex);
                        setActiveLessonIndex(lIndex);
                        // On mobile, close sidebar after selection
                        if (window.innerWidth < 768) setSidebarOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 text-sm flex items-start gap-3 transition-colors border-l-2
                        ${isActive 
                          ? "bg-teal-500/10 border-teal-500 text-white" 
                          : "border-transparent text-gray-500 hover:text-gray-300 hover:bg-gray-800"
                        }
                      `}
                    >
                      {isActive ? <PlayCircle className="w-4 h-4 mt-0.5 shrink-0 text-teal-400" /> : <CheckCircle className="w-4 h-4 mt-0.5 shrink-0" />}
                      <span>{lesson.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        
        {/* Mobile Header */}
        <header className="md:hidden h-14 bg-gray-900 border-b border-gray-800 flex items-center px-4">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="mr-4">
            <Menu className="w-6 h-6 text-white" />
          </button>
          <span className="font-bold truncate">{currentLesson?.title}</span>
        </header>

        <div className="flex-1 overflow-y-auto p-6 md:p-10">
          <div className="max-w-4xl mx-auto">
            
            {/* Video Player Mockup */}
            <div className="aspect-video bg-black rounded-xl overflow-hidden border border-gray-800 shadow-2xl mb-8 relative group">
              {currentLesson?.videoUrl ? (
                 <iframe 
                   src={currentLesson.videoUrl.replace("watch?v=", "embed/")} 
                   className="w-full h-full" 
                   allowFullScreen
                 />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                   <p className="text-gray-500">No Video Signal</p>
                </div>
              )}
            </div>

            {/* Lesson Title & Content */}
            <h1 className="text-3xl font-bold mb-6">{currentLesson?.title}</h1>
            
            {/* Code Lab / Content Area */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
              <div className="bg-gray-800 px-4 py-2 flex items-center justify-between border-b border-gray-700">
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <Terminal className="w-4 h-4" />
                  <span>Lab Terminal</span>
                </div>
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
              </div>
              <div className="p-6 overflow-x-auto">
                <pre className="font-mono text-sm text-teal-300 whitespace-pre-wrap">
                  {currentLesson?.content || "# No code content provided for this lesson."}
                </pre>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="mt-10 flex justify-end">
               <button 
                 className="bg-teal-600 hover:bg-teal-500 text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2 transition-all"
                 onClick={() => {
                    // Simple logic to go to next lesson (if available)
                    const nextLessonIdx = activeLessonIndex + 1;
                    if (course.modules[activeModuleIndex].lessons[nextLessonIdx]) {
                       setActiveLessonIndex(nextLessonIdx);
                    } else if (course.modules[activeModuleIndex + 1]) {
                       setActiveModuleIndex(activeModuleIndex + 1);
                       setActiveLessonIndex(0);
                    } else {
                       alert("Course Completed! 🎉");
                       router.push('/dashboard');
                    }
                 }}
               >
                 Next Mission <ChevronRight className="w-4 h-4" />
               </button>
            </div>

          </div>
        </div>
      </main>

    </div>
  );
}