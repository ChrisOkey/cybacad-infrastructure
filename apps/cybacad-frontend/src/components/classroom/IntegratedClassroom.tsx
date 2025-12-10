"use client";

import React, { useState, useRef, useEffect } from "react";
import { Loader2, Play, Pause, Lightbulb, CheckCircle, FileCode, Terminal } from "lucide-react";

// ✅ Import our custom Hook (The Backend Bridge)
import { useLessonData } from "@/hooks/useLessonData";

// ✅ Import UI Engines
import VideoWindow from "./VideoWindow";
import CodeWindow from "./CodeWindow";

// --- TYPES ---
interface TimelineEvent {
  triggerTime: number;
  action: string;
  payload: any;
}

interface ClassroomProps {
  courseId: string;
  moduleId: string;
  lessonId: string;
}

export default function IntegratedClassroom({ courseId, moduleId, lessonId }: ClassroomProps) {
  
  // 1. FETCH REAL DATA FROM FIRESTORE
  const { lesson, loading, error } = useLessonData(courseId, moduleId, lessonId);

  // 2. STATE MANAGEMENT
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentCode, setCurrentCode] = useState(""); 
  const [isLocked, setIsLocked] = useState(true); // Default: Locked while AI teaches
  const [activeTab, setActiveTab] = useState<'guide' | 'transcript'>('guide');

  // Track processed events so we don't fire the same event twice
  const processedEvents = useRef(new Set<number>());

  // 3. INITIALIZATION EFFECT
  // When the lesson data finally loads from the database, set the initial code
  useEffect(() => {
    if (lesson) {
      setCurrentCode(lesson.initialCode);
      // Reset state for new lessons
      setIsLocked(true); 
      processedEvents.current.clear(); 
    }
  }, [lesson]);

  // 4. THE SYNC ENGINE (The Brain)
  const handleTimeUpdate = (seconds: number) => {
    if (!lesson) return;

    const currentSecond = Math.floor(seconds);
    const event = lesson.timeline.find((e: TimelineEvent) => e.triggerTime === currentSecond);

    // If an event exists at this second AND we haven't processed it yet...
    if (event && !processedEvents.current.has(currentSecond)) {
      console.log("⚡ Event Triggered:", event.action);

      if (event.action === "UPDATE_CODE") {
        setCurrentCode(event.payload);
      } 
      else if (event.action === "PAUSE_CHALLENGE") {
        setIsPlaying(false); // Stop Video
        setIsLocked(false);  // Unlock Editor for user
        // Optional: Trigger a sound or toast notification here
      }

      processedEvents.current.add(currentSecond);
    }
  };

  // --- LOADING STATES ---
  if (loading) {
    return (
      <div className="h-screen w-full bg-gray-950 flex flex-col items-center justify-center text-teal-500">
        <Loader2 className="w-10 h-10 animate-spin mb-4" />
        <p className="text-sm font-mono animate-pulse">ESTABLISHING SECURE CONNECTION...</p>
      </div>
    );
  }

  if (error || !lesson) {
    return (
      <div className="h-screen w-full bg-gray-950 flex flex-col items-center justify-center text-red-500">
        <Terminal className="w-12 h-12 mb-4 opacity-50" />
        <h2 className="text-xl font-bold">Connection Failed</h2>
        <p className="text-sm text-gray-400 mt-2">Could not load lesson data. ({error})</p>
      </div>
    );
  }

  // --- RENDER UI ---
  return (
    <div className="h-screen w-full bg-gray-950 text-white font-sans flex flex-col overflow-hidden">
      
      {/* --- HEADER TOOLBAR --- */}
      <header className="flex items-center justify-between h-16 bg-gray-900 border-b border-gray-800 px-6 shrink-0 z-20">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-teal-500/20 flex items-center justify-center text-teal-400 font-bold border border-teal-500/30">
            {lesson.id.split('_').pop()} 
          </div>
          <div>
            <h1 className="text-sm font-bold text-gray-100">{lesson.title || "Loading..."}</h1>
            <p className="text-xs text-gray-400 font-mono">{moduleId} // {courseId}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
           {/* Status Indicator */}
          <div className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-2 border transition-all duration-300 ${
            isLocked 
              ? "bg-blue-900/20 border-blue-800 text-blue-400" 
              : "bg-green-900/20 border-green-800 text-green-400 shadow-[0_0_10px_rgba(74,222,128,0.2)]"
          }`}>
            {isLocked ? (
              <><Loader2 className="w-3 h-3 animate-spin" /> AI Tutor Control</>
            ) : (
              <><CheckCircle className="w-3 h-3" /> Interactive Mode</>
            )}
          </div>

          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-md text-sm font-medium transition-all shadow-lg shadow-teal-900/20 border border-teal-500/50"
          >
            {isPlaying ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
            {isPlaying ? "Pause Lesson" : "Resume Lesson"}
          </button>
        </div>
      </header>

      {/* --- MAIN CONTENT (Split View) --- */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* LEFT PANEL: Video & Guide (40% Width) */}
        <div className="w-[40%] flex flex-col border-r border-gray-800 bg-gray-900/50">
          
          {/* Video Player Area */}
          <div className="w-full bg-black border-b border-gray-800 relative group shadow-2xl">
            {/* The wrapper handles the Aspect Ratio internally now */}
            <VideoWindow 
              url={lesson.videoUrl}
              isPlaying={isPlaying}
              onProgressReport={handleTimeUpdate}
            />
          </div>

          {/* Tabs for Guide/Transcript */}
          <div className="flex border-b border-gray-800 bg-gray-900">
            <button 
              onClick={() => setActiveTab('guide')}
              className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors ${
                activeTab === 'guide' ? 'border-teal-500 text-teal-400 bg-teal-900/10' : 'border-transparent text-gray-500 hover:text-gray-300'
              }`}
            >
              Lesson Guide
            </button>
            <button 
              onClick={() => setActiveTab('transcript')}
              className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors ${
                activeTab === 'transcript' ? 'border-teal-500 text-teal-400 bg-teal-900/10' : 'border-transparent text-gray-500 hover:text-gray-300'
              }`}
            >
              Transcript
            </button>
          </div>

          {/* Scrollable Content Area */}
          <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
            {activeTab === 'guide' ? (
              <div className="space-y-6 animate-in fade-in duration-500">
                <div className="p-4 rounded-lg bg-teal-950/30 border border-teal-900/50 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-teal-500"></div>
                  <h3 className="text-teal-400 font-semibold mb-2 flex items-center gap-2">
                    <Lightbulb className="w-4 h-4" /> Current Objective
                  </h3>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    Watch the AI demonstrate how to import the <code>hashlib</code> library. 
                    When the video pauses, you will be tasked with hashing a password manually.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-bold text-gray-200 mb-2 text-sm uppercase tracking-wide">Key Concepts</h3>
                  <ul className="space-y-3 text-sm text-gray-400">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0"></span>
                      <span><strong>SHA-256:</strong> A standard secure hashing algorithm used in modern web apps.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0"></span>
                      <span><strong>Salting:</strong> Adding random data to passwords before hashing to prevent Rainbow Table attacks.</span>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="text-sm text-gray-400 leading-relaxed space-y-4 font-mono">
                <p><span className="text-teal-600 font-bold">[00:00]</span> System Initialization...</p>
                <p><span className="text-teal-600 font-bold">[00:05]</span> Importing standard security libraries.</p>
                <p><span className="text-teal-600 font-bold">[00:15]</span> <span className="text-yellow-500">INTERACTIVE CHALLENGE INITIATED.</span></p>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT PANEL: Code Editor (60% Width) */}
        <div className="w-[60%] flex flex-col bg-[#1e1e1e] relative border-l border-gray-800">
          
          {/* Editor Tab Bar */}
          <div className="h-9 bg-[#252526] flex items-center px-0">
             <div className="bg-[#1e1e1e] text-gray-200 text-xs px-4 h-full flex items-center border-t-2 border-teal-500">
                <FileCode className="w-3 h-3 mr-2 text-blue-400" />
                main.py
             </div>
             <div className="flex-1 bg-[#2d2d2d] h-full"></div>
          </div>
          
          {/* The Actual Editor */}
          <div className="flex-1 relative">
             <CodeWindow 
               code={currentCode} 
               isLocked={isLocked}
               onUserType={(val: string | undefined) => setCurrentCode(val || "")}
             />
             
             {/* Visual Overlay when Locked */}
             {isLocked && (
               <div className="absolute top-4 right-6 pointer-events-none z-10">
                 <span className="bg-blue-900/80 text-blue-300 border border-blue-500/30 px-3 py-1.5 rounded text-xs font-mono shadow-xl backdrop-blur-sm flex items-center gap-2">
                   <Loader2 className="w-3 h-3 animate-spin" />
                   INSTRUCTOR CONTROL
                 </span>
               </div>
             )}
          </div>
        </div>

      </div>
    </div>
  );
}