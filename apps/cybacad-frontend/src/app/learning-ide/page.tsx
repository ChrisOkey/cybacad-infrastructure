"use client";

import React, { useState, useEffect, useRef } from "react";
// ✅ Import Hook (ensure this file exists!)
import { useCourseData, Course } from "@/hooks/useCourseData"; 
// ✅ Import UI Components from your Package
import { CodeEditor } from "@cybacad/ui"; 
// ✅ Import Icons
import { Loader2, Play, Lightbulb, AlertTriangle } from "lucide-react"; 

export default function LearningIDE() {
  // Fetch data (or fallback to mock)
  const { data: courses, loading, error } = useCourseData("http://localhost:5000/api/v1/courses");
  const [activeCourse, setActiveCourse] = useState<Course | null>(null);
  
  // AI Hint State
  const [aiHint, setAiHint] = useState<{ loading: boolean; hint: string | null; error: string | null }>({
    loading: false,
    hint: null,
    error: null,
  });
  
  // Layout State
  const [instructionsHeight, setInstructionsHeight] = useState(40);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (courses && courses.length > 0 && !activeCourse) {
      setActiveCourse(courses[0]);
    }
  }, [courses, activeCourse]);

  const handleAICoachRequest = async () => {
    setAiHint({ loading: true, hint: null, error: null });
    
    // Simulate AI delay for demo purposes
    setTimeout(() => {
        setAiHint({ 
            loading: false, 
            hint: "Try wrapping the user input in the `escape()` function before returning it.", 
            error: null 
        });
    }, 1500);
  };

  // Resizer Logic
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (containerRef.current) {
      const containerHeight = containerRef.current.offsetHeight;
      const newHeightPx = e.clientY - containerRef.current.offsetTop;
      const newHeightPercent = (newHeightPx / containerHeight) * 100;
      
      // Limit resizing between 20% and 80%
      if (newHeightPercent > 20 && newHeightPercent < 80) {
        setInstructionsHeight(newHeightPercent);
      }
    }
  };

  const handleMouseUp = () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  // Loading State
  if (loading) return (
    <div className="h-screen w-full bg-gray-950 flex items-center justify-center text-teal-400">
      <Loader2 className="animate-spin w-8 h-8 mr-3" /> Loading Lab Environment...
    </div>
  );

  // Error State
  if (error && !courses) return (
    <div className="h-screen w-full bg-gray-950 flex items-center justify-center text-red-400">
      <AlertTriangle className="w-8 h-8 mr-3" /> Failed to load lab data.
    </div>
  );

  const mainHeight = `${instructionsHeight}%`;
  const labHeight = `${100 - instructionsHeight}%`;

  // Define files for the CodeEditor
  const labFiles = {
    "/main.py": {
      code: `def render_html(user_input):
    # TODO: Sanitize this input to prevent XSS!
    return f"<div>{user_input}</div>"

# Vulnerable input simulation
print(render_html("<script>alert('Hacked!')</script>"))`,
      active: true
    }
  };

  return (
    <div className="h-[calc(100vh-64px)] w-full bg-gray-900 text-white font-sans flex flex-col">
      {/* Header Toolbar */}
      <header className="flex items-center justify-between h-14 bg-gray-900 border-b border-gray-800 px-4 shrink-0">
        <div className="flex items-center space-x-4">
          <span className="text-lg font-bold text-teal-400">🛡️ XSS Prevention Lab</span>
        </div>
        <div className="flex items-center space-x-4">
          <button 
            onClick={handleAICoachRequest}
            className="flex items-center px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 rounded text-sm font-medium transition-colors"
          >
            {aiHint.loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Lightbulb className="w-4 h-4 mr-2" />}
            {aiHint.loading ? "Analyzing..." : "Get AI Hint"}
          </button>
          <button className="flex items-center px-3 py-1.5 bg-green-600 hover:bg-green-500 rounded text-sm font-medium transition-colors">
            <Play className="w-4 h-4 mr-2" /> Run Code
          </button>
        </div>
      </header>

      {/* Main Content Split */}
      {/* ✅ CHANGED: flex-grow -> grow */}
      <div ref={containerRef} className="flex flex-col grow overflow-hidden relative">
        
        {/* Top: Instructions & Hints */}
        <div style={{ height: mainHeight }} className="overflow-y-auto bg-gray-900 p-6 border-b border-gray-800">
            <h2 className="text-xl font-bold mb-4 text-white">Task Instructions</h2>
            <p className="text-gray-300 mb-4 leading-relaxed">
                The code below takes user input and renders it directly to HTML. This creates a 
                <strong> Cross-Site Scripting (XSS)</strong> vulnerability. 
                Your task is to modify the code to sanitize the input.
            </p>

            {/* AI Hint Box */}
            {(aiHint.hint || aiHint.error) && (
                <div className={`p-4 rounded-lg border ${aiHint.error ? "bg-red-900/20 border-red-800" : "bg-teal-900/20 border-teal-800"}`}>
                    <div className="flex items-center gap-2 mb-1">
                        {aiHint.error ? <AlertTriangle className="w-4 h-4 text-red-400" /> : <Lightbulb className="w-4 h-4 text-teal-400" />}
                        <span className={`font-semibold ${aiHint.error ? "text-red-400" : "text-teal-400"}`}>
                            {aiHint.error ? "Error" : "AI Coach"}
                        </span>
                    </div>
                    <p className="text-sm text-gray-300">{aiHint.error || aiHint.hint}</p>
                </div>
            )}
        </div>

        {/* Resizer Handle */}
        <div
          className="w-full h-1 bg-gray-800 hover:bg-teal-500 cursor-row-resize transition-colors shrink-0 z-10"
          onMouseDown={handleMouseDown}
        />

        {/* Bottom: Code Editor */}
        <div style={{ height: labHeight }} className="flex flex-col overflow-hidden bg-gray-950">
            {/* Pass the files to your new Sandpack Component */}
            <CodeEditor files={labFiles} mainComponent="/main.py" showExplorer={false} />
        </div>
      </div>
    </div>
  );
}