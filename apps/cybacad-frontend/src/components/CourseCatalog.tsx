import React from "react";
import Link from "next/link";
import { ArrowRight, Clock, BarChart } from "lucide-react";

type Course = {
  id: string;
  title: string;
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  isPaid: boolean;
};

// Mock Database (In real app, this comes from API)
const ALL_COURSES: Course[] = [
  { id: "101", title: "Cyber Security 101", category: "Basics", level: "Beginner", duration: "2h", isPaid: false },
  { id: "102", title: "Linux for Hackers", category: "OS", level: "Intermediate", duration: "4h", isPaid: false },
  { id: "201", title: "Advanced Penetration Testing", category: "Red Team", level: "Advanced", duration: "12h", isPaid: true },
  { id: "202", title: "Network Defense Architect", category: "Blue Team", level: "Advanced", duration: "20h", isPaid: true },
  { id: "203", title: "Python for Security", category: "Coding", level: "Intermediate", duration: "6h", isPaid: true },
  { id: "103", title: "Open Source Intelligence", category: "Recon", level: "Beginner", duration: "3h", isPaid: false },
];

export default function CourseCatalog({ type }: { type: 'free' | 'paid' }) {
  // Filter courses based on the page type
  const courses = ALL_COURSES.filter(c => type === 'paid' ? c.isPaid : !c.isPaid);

  return (
    <div className="space-y-8">
      {/* Category Filter (Visual Only for now) */}
      <div className="flex gap-2">
        {["All Levels", "Beginner", "Intermediate", "Advanced"].map(cat => (
          <button key={cat} className="px-4 py-2 rounded-full bg-slate-900 border border-slate-800 text-sm text-slate-400 hover:text-white hover:border-blue-500 transition-all">
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map(course => (
          <div key={course.id} className="group bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-blue-500/50 transition-all shadow-lg hover:shadow-blue-900/10">
            {/* Thumbnail */}
            <div className="h-40 bg-slate-950 relative flex items-center justify-center group-hover:bg-slate-900 transition-colors">
              <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase absolute top-2 right-2 border ${
                  type === 'paid' 
                  ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' 
                  : 'bg-green-500/10 text-green-500 border-green-500/20'
              }`}>
                {type === 'paid' ? 'PRO' : 'FREE'}
              </span>
              <div className="text-4xl group-hover:scale-125 transition-transform duration-300">🛡️</div>
            </div>
            
            {/* Content */}
            <div className="p-6">
              <div className="flex items-center gap-3 text-xs text-slate-500 mb-2">
                <span className="flex items-center gap-1"><BarChart className="w-3 h-3" /> {course.level}</span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {course.duration}</span>
              </div>
              
              <h3 className="text-lg font-bold text-white mb-4 group-hover:text-blue-400 transition-colors line-clamp-1">
                {course.title}
              </h3>
              
              <Link href={`/learn/${course.id}`} className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-slate-800 text-white font-medium hover:bg-blue-600 transition-all group-hover:shadow-lg">
                Start Learning <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}