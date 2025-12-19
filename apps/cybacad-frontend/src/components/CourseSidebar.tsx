import React from "react";
import { Icon } from "./Icon";
import Link from "next/link"; // We need this to make lessons clickable

// Define the shape of the data coming from the DB
interface Lesson {
  id: string;
  title: string;
}

interface Module {
  title: string;
  lessons: Lesson[];
}

interface CourseSidebarProps {
  isOpen: boolean;
  toggle: () => void;
  // ✅ NEW: Accept dynamic modules data
  modules?: Module[]; 
  currentLessonId?: string;
  courseId?: string;
}

export const CourseSidebar = ({
  isOpen,
  toggle,
  modules = [], // Default to empty array if missing
  currentLessonId,
  courseId
}: CourseSidebarProps) => (
  <aside 
    className={`transition-all duration-300 overflow-y-auto bg-gray-800 border-r border-gray-700/50 flex-shrink-0 flex flex-col ${
      isOpen ? "w-72" : "w-16"
    }`}
  >
    {/* Toggle Button */}
    <div 
      className="p-4 cursor-pointer border-b border-gray-700/50 hover:bg-gray-700/50 transition-colors flex items-center justify-center" 
      onClick={toggle}
    >
      <Icon 
        name={isOpen ? "ChevronLeft" : "ChevronRight"} 
        className="w-6 h-6 text-teal-400" 
      />
    </div>

    {/* Content Area */}
    {isOpen && (
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        
        {/* Header */}
        <div className="flex items-center space-x-2 text-white/90 pb-2 border-b border-gray-700">
          <Icon name="BookOpen" className="w-5 h-5 text-teal-400" />
          <h3 className="font-bold text-lg tracking-wide">Curriculum</h3>
        </div>

        {/* 🚨 DYNAMIC RENDERING STARTS HERE */}
        <div className="space-y-6">
          {modules.length > 0 ? (
            modules.map((module, moduleIndex) => (
              <div key={moduleIndex} className="space-y-2">
                {/* Module Title */}
                <h4 className="text-xs uppercase tracking-wider text-gray-500 font-bold px-1">
                  Module {moduleIndex + 1}: {module.title}
                </h4>

                {/* Lessons List */}
                <ul className="space-y-1">
                  {module.lessons && module.lessons.map((lesson) => {
                    const isActive = lesson.id === currentLessonId;
                    return (
                      <li key={lesson.id}>
                        <Link 
                          href={`/learn/${courseId}/lesson/${lesson.id}`}
                          className={`flex items-center w-full p-2 rounded-lg text-sm transition-all group ${
                            isActive 
                              ? "bg-teal-500/10 text-teal-300 border border-teal-500/20" 
                              : "text-gray-400 hover:bg-gray-700/50 hover:text-white"
                          }`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full mr-3 ${
                            isActive ? "bg-teal-400" : "bg-gray-600 group-hover:bg-gray-400"
                          }`} />
                          <span className="truncate">{lesson.title}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))
          ) : (
            <div className="text-sm text-gray-500 italic p-2">
              No modules found for this course.
            </div>
          )}
        </div>
      </div>
    )}
  </aside>
);