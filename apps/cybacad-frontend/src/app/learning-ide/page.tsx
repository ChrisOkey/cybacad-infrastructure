"use client";

import React, { useState, useEffect, useRef } from "react";
import { useCourseData, Course } from "@/hooks/useCourseData";
import { fetchData } from "@/utils/fetchData";
import { Icon } from "@/components/Icon";
import { LessonContent } from "@/components/LessonContent";
import { CourseSidebar } from "@/components/CourseSidebar";
import { CodeEditor } from "@/components/CodeEditor";
import { TerminalOutput } from "@/components/TerminalOutput";

export default function LearningIDE() {
  const { data: courses, loading, error } = useCourseData("http://localhost:5000/api/v1/courses");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeCourse, setActiveCourse] = useState<Course | null>(null);
  const [aiHint, setAiHint] = useState<{ loading: boolean; hint: string | null; error: string | null }>({
    loading: false,
    hint: null,
    error: null,
  });
  const [instructionsHeight, setInstructionsHeight] = useState(40);

  const containerRef = useRef<HTMLDivElement>(null);
  const codeEditorRef = useRef<HTMLPreElement>(null);
  const mockLessonTitle = "2.1 Lab: Preventing XSS with Input Encoding";

  useEffect(() => {
    if (courses && courses.length > 0 && !activeCourse) {
      setActiveCourse(courses[0]);
    }
  }, [courses, activeCourse]);

  const handleAICoachRequest = async (lessonTitle: string) => {
    setAiHint({ loading: true, hint: null, error: null });

    const userCode = codeEditorRef.current?.innerText || "Code not found.";
    const userError = "NameError: name 'prit' is not defined";

    try {
      const result = await fetchData("http://localhost:5000/api/v1/ai/coach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userCode, userError, lessonTitle }),
      }) as { hint: string };

      if (result.hint) {
        setAiHint({ loading: false, hint: result.hint, error: null });
      } else {
        throw new Error("API processed request but did not return a hint property.");
      }
    } catch (err: any) {
      setAiHint({ loading: false, hint: null, error: err.message });
      console.error("AI Coach Request Failed:", err);
    }
  };

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

      if (newHeightPercent > 20 && newHeightPercent < 80) {
        setInstructionsHeight(newHeightPercent);
      }
    }
  };

  const handleMouseUp = () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  if (loading) return (
    <div className="h-screen w-full bg-gray-900 flex items-center justify-center text-teal-400 text-xl">
      <Icon name="Loader" className="animate-spin w-6 h-6 mr-3" />
      Loading Core Data...
    </div>
  );

  if (error) return (
    <div className="h-screen w-full bg-red-900/50 p-8 text-white text-lg font-mono">
      ❌ API ERROR: {error.message}. Ensure backend is running on port 5000.
    </div>
  );

  if (!activeCourse) return (
    <div className="h-screen w-full bg-gray-900 flex items-center justify-center text-gray-500">
      No active course data found.
    </div>
  );

  const mainHeight = `${instructionsHeight}%`;
  const labHeight = `${100 - instructionsHeight}%`;

  return (
    <div className="h-screen w-full bg-gray-900 text-white font-inter flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between h-14 bg-gray-800 border-b border-teal-600/50 px-4 flex-shrink-0">
        <div className="flex items-center space-x-4">
          <span className="text-xl font-bold text-teal-400">CybAcademy</span>
          <span className="text-sm text-gray-400 hidden sm:inline">| {activeCourse.title}</span>
        </div>
        <div className="flex items-center space-x-4">
          <button className="flex items-center px-4 py-1.5 bg-green-600 hover:bg-green-500 rounded-md text-white transition-colors shadow-md text-sm font-semibold">
            <Icon name="Play" className="w-4 h-4 mr-2" />
            Run Lab
          </button>
          {(aiHint.loading || aiHint.hint) && (
            <div className="text-sm font-semibold text-teal-400 flex items-center">
              {aiHint.loading ? <Icon name="Loader" className="animate-spin w-4 h-4 mr-2" /> : <Icon name="Lightbulb" className="w-4 h-4 mr-2" />}
              {aiHint.loading ? "AI Thinking..." : "Hint Ready"}
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <div ref={containerRef} className="flex flex-grow overflow-hidden relative">
        <CourseSidebar isOpen={isSidebarOpen} toggle={() => setIsSidebarOpen(!isSidebarOpen)} />

        <div className="flex-grow flex flex-col relative">
          {/* Instructions */}
          <div style={{ height: mainHeight }} className="overflow-y-auto bg-gray-800 relative flex flex-col">
            <LessonContent lessonTitle={mockLessonTitle} onAICoachRequest={handleAICoachRequest} />
            {(aiHint.hint || aiHint.error) && (
              <div className="p-4 mx-6 mb-6 rounded-lg shadow-lg transition-all duration-500 flex-shrink-0"
                style={{ backgroundColor: aiHint.error ? "#450a0a" : "#047878" }}
              >
                <p className={`text-sm font-semibold mb-2 flex items-center ${aiHint.error ? "text-red-300" : "text-teal-300"}`}>
                  {aiHint.error ? "Error" : "AI Coach Hint"}:
                  {aiHint.loading && <Icon name="Loader" className="animate-spin w-4 h-4 ml-3" />}
                </p>
                <p className={`text-sm whitespace-pre-wrap ${aiHint.error ? "text-red-200" : "text-gray-200"}`}>
                  {aiHint.error || aiHint.hint}
                </p>
              </div>
            )}
          </div>

          {/* Resizer */}
          <div
            className="w-full h-2 bg-gray-700 cursor-row-resize hover:bg-teal-600 transition-colors duration-150 flex-shrink-0 relative"
            onMouseDown={handleMouseDown}
          >
            <div className="h-1 w-8 bg-gray-500 rounded mx-auto mt-0.5"></div>
          </div>

          {/* Code + Terminal */}
          <div style={{ height: labHeight }} className="flex flex-col overflow-hidden bg-gray-900">
            <CodeEditor ref={codeEditorRef} />
            <TerminalOutput />
          </div>
        </div>
      </div>
    </div>
  );
}
