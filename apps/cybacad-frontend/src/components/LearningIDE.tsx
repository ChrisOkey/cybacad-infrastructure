"use client"; // Critical: Marks this component for client-side rendering

import React, { useState, useEffect, useRef } from 'react';

// --- TYPE DEFINITIONS ---
interface Course {
  id: string;
  title: string;
  instructor: string;
  progress?: number;
  [key: string]: any; 
}
interface CourseDataHook {
  data: Course[] | null;
  loading: boolean;
  error: Error | null;
}

// --- ICON COMPONENT (Inline SVGs) ---
// CRITICAL FIX: Changed JSX.Element to React.ReactNode to resolve TS namespace error
const Icon = ({ name, className = "" }: { name: string, className?: string }) => {
  const svgBaseProps = {
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className,
  };

  const iconMap: { [key: string]: React.ReactNode } = {
    'BookOpen': React.createElement('svg', svgBaseProps,
      React.createElement('path', { d: "M2 12s2 10 9 10 9-10 9-10" }),
      React.createElement('path', { d: "M22 12s-2-10-9-10-9 10-9 10" }),
      React.createElement('path', { d: "M12 2l-1 5-2 2-2-2-1-5" })
    ),
    'Code': React.createElement('svg', svgBaseProps,
      React.createElement('polyline', { points: "16 18 22 12 16 6" }),
      React.createElement('polyline', { points: "8 6 2 12 8 18" })
    ),
    'Terminal': React.createElement('svg', svgBaseProps,
      React.createElement('polyline', { points: "4 17 10 11 4 5" }),
      React.createElement('line', { x1: "12", y1: "19", x2: "20", y2: "19" })
    ),
    'Play': React.createElement('svg', svgBaseProps,
      React.createElement('polygon', { points: "5 3 19 12 5 21 5 3" })
    ),
    'ChevronRight': React.createElement('svg', svgBaseProps,
      React.createElement('polyline', { points: "9 18 15 12 9 6" })
    ),
    'ChevronLeft': React.createElement('svg', svgBaseProps,
      React.createElement('polyline', { points: "15 18 9 12 15 6" })
    ),
    'Loader': React.createElement('svg', svgBaseProps,
      React.createElement('path', { d: "M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83" })
    ),
    'Lightbulb': React.createElement('svg', svgBaseProps,
      React.createElement('path', { d: "M15 14c.2-1 .5-2 1-3 1-2.5 3.5-4 5.5-1-1.4 6.1-8.5 7.1-17 1.1-2.2 0-3.3-1.6-4.2-3.6.8-1 1.7-2 2.8-2.8.9-.7 1.8-1.4 2.9-2.1" }),
      React.createElement('path', { d: "M10 20c.3-1.2.9-2 2-2 1.1 0 1.8.8 2 2M12 22a2 2 0 0 0 2-2 2 2 0 0 0-4 0 2 2 0 0 0 2 2z" })
    )
  };
  return iconMap[name] || null;
};

// --- FETCH DATA UTILITY ---
const fetchData = async (url: string, options?: RequestInit) => {
    // Added 15s timeout to prevent hanging on network issues
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); 

    const response = await fetch(url, { ...options, mode: 'cors', signal: controller.signal });
    clearTimeout(timeoutId);

    const result = await response.json();
    if (!response.ok || result.status !== 'success') {
        throw new Error(result.message || `HTTP Error ${response.status}`);
    }
    return result.data;
};

// --- Custom Hook to Fetch Course Data (Connects to backend) ---
const useCourseData = (url: string): CourseDataHook => { 
  const [data, setData] = useState<Course[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const courses = await fetchData(url);
        setData(courses);
      } catch (err: any) {
        console.error("Fetch Error:", err);
        setError(new Error(err.message.includes('Failed to fetch') ? 'Backend connection failed. Is the Node.js server running on port 5000?' : err.message));
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, [url]);
  return { data, loading, error };
};

// --- Lesson Content Component ---
const LessonContent = ({ lessonTitle, onAICoachRequest }: { lessonTitle: string, onAICoachRequest: (title: string) => void }) => {
  return (
    <div className="p-6">
        <h2 className="text-2xl font-bold text-white mb-4 border-b border-gray-700 pb-2">
            {lessonTitle}
        </h2>
        <p className="text-gray-300 mb-4">
            This lab requires you to modify the code below to solve the challenge.
        </p>
        
        {/* Mock Video Placeholder */}
        <div className="aspect-video w-full max-w-xl bg-gray-950 rounded-lg flex items-center justify-center border border-gray-700/50 my-4">
            <Icon name="Play" className="w-8 h-8 text-teal-400/80"/>
            <p className="ml-3 text-gray-400">Lecture Video: XSS Prevention Techniques</p>
        </div>

        {/* AI Hint Button */}
        <button 
            className="w-full p-3 bg-gray-700 hover:bg-gray-600 rounded-md font-semibold text-teal-400/80 transition-colors mt-4 flex items-center justify-center"
            onClick={() => onAICoachRequest(lessonTitle)}
        >
            <Icon name="Lightbulb" className="w-4 h-4 mr-2" /> AI Coach Hint
        </button>
    </div>
  );
};


// --- Main Learning Component ---
const LearningIDE = () => {
  // --- STATE ---
  const { data: courses, loading, error } = useCourseData('http://localhost:5000/api/v1/courses');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeCourse, setActiveCourse] = useState<Course | null>(null);
  const [aiHint, setAiHint] = useState<{ loading: boolean; hint: string | null; error: string | null }>({ loading: false, hint: null, error: null });
  const [instructionsHeight, setInstructionsHeight] = useState(40); 
  
  // Refs
  const containerRef = useRef<HTMLDivElement>(null);
  // CRITICAL FIX: The ref is attached to the code content <pre> tag below
  const codeEditorRef = useRef<HTMLPreElement>(null); 
  const mockLessonTitle = "2.1 Lab: Preventing XSS with Input Encoding";

  // Set first course on load
  useEffect(() => {
    if (courses && courses.length > 0 && !activeCourse) {
        setActiveCourse(courses[0]); 
    }
  }, [courses, activeCourse]);

  // --- AI Coach Request Handler ---
  const handleAICoachRequest = async (lessonTitle: string) => {
    setAiHint({ loading: true, hint: null, error: null });
    
    // Simulate data payload
    const userCode = codeEditorRef.current ? codeEditorRef.current.innerText : 'Code not found.';
    const userError = "NameError: name 'prit' is not defined"; 
    
    try {
      const result = await fetchData('http://localhost:5000/api/v1/ai/coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userCode, userError, lessonTitle }),
      }) as { hint: string }; // Type casting the result

      if (result.hint) {
        // SUCCESS: Display the hint
        setAiHint({ loading: false, hint: result.hint, error: null });
      } else {
        throw new Error('API processed request but did not return a hint property.');
      }
    } catch (err: any) {
      // FAILURE: Display the specific network/API error
      setAiHint({ loading: false, hint: null, error: err.message });
      console.error("AI Coach Request Failed:", err);
    }
  };

  // --- Dynamic Resizer Logic (Vertical Split) ---
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (containerRef.current) {
      const containerHeight = containerRef.current.offsetHeight;
      const newInstructionsHeightPx = e.clientY - containerRef.current.offsetTop;
      const newInstructionsHeightPercent = (newInstructionsHeightPx / containerHeight) * 100;

      if (newInstructionsHeightPercent > 20 && newInstructionsHeightPercent < 80) {
        setInstructionsHeight(newInstructionsHeightPercent);
      }
    }
  };

  const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  // --- Error/Loading Rendering ---
  if (loading) return React.createElement("div", { className: "h-screen w-full bg-gray-900 flex items-center justify-center text-teal-400 text-xl" }, React.createElement(Icon, { name: "Loader", className: "animate-spin w-6 h-6 mr-3" }), "Loading Core Data...");
  if (error) return React.createElement("div", { className: "h-screen w-full bg-red-900/50 p-8 text-white text-lg font-mono" }, `❌ API ERROR: ${error.message}. Ensure backend is running on port 5000.`);
  if (!activeCourse) return React.createElement("div", { className: "h-screen w-full bg-gray-900 flex items-center justify-center text-gray-500" }, "No active course data found.");
  
  const mainContentHeight = `${instructionsHeight}%`;
  const labContentHeight = `${100 - instructionsHeight}%`;

  return (
    // Outer container takes up full screen height and uses flex-col
    <div className="h-screen w-full bg-gray-900 text-white font-inter flex flex-col">
      {/* --- 1. Header Bar --- */}
      <header className="flex items-center justify-between h-14 bg-gray-800 border-b border-teal-600/50 px-4 flex-shrink-0">
        <div className="flex items-center space-x-4">
          <span className="text-xl font-bold text-teal-400">CybAcademy</span>
          <span className="text-sm text-gray-400 hidden sm:inline">| {activeCourse.title}</span>
        </div>
        <div className="flex items-center space-x-4">
            {/* Run Code Button */}
            <button className="flex items-center px-4 py-1.5 bg-green-600 hover:bg-green-500 rounded-md text-white transition-colors shadow-md text-sm font-semibold">
                <Icon name="Play" className="w-4 h-4 mr-2" />
                Run Lab
            </button>
            {/* AI Hint Status Display */}
            {(aiHint.loading || aiHint.hint) && (
                <div className="text-sm font-semibold text-teal-400 flex items-center">
                    {aiHint.loading ? <Icon name="Loader" className="animate-spin w-4 h-4 mr-2" /> : <Icon name="Lightbulb" className="w-4 h-4 mr-2" />}
                    {aiHint.loading ? 'AI Thinking...' : 'Hint Ready'}
                </div>
            )}
        </div>
      </header>

      {/* --- 2. Main Content Area (Split Panes) --- */}
      {/* flex-grow ensures this container fills the remaining height */}
      <div ref={containerRef} className="flex flex-grow overflow-hidden relative">
        
        {/* Course Sidebar (Left Navigation) */}
        <aside className={`transition-all duration-300 overflow-y-auto bg-gray-800 border-r border-gray-700/50 flex-shrink-0 ${isSidebarOpen ? 'w-64' : 'w-12'}`}>
          <div className="p-2 cursor-pointer border-b border-gray-700/50" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <Icon name={isSidebarOpen ? 'ChevronLeft' : 'ChevronRight'} className="w-6 h-6 text-teal-400 mx-auto" />
          </div>
          {isSidebarOpen && (
            <div className="p-4 space-y-4">
              <h3 className="text-base font-semibold text-white flex items-center">
                <Icon name="BookOpen" className="w-4 h-4 mr-2 text-teal-400" />
                Modules
              </h3>
              <ul className="text-sm space-y-2">
                <li className="text-teal-300 font-semibold cursor-pointer">1. Security Fundamentals</li>
                <li className="text-gray-400 hover:text-gray-200 cursor-pointer">2. Advanced Python Exploits</li>
                <li className="text-gray-400 hover:text-gray-200 cursor-pointer">3. ML Model Hardening</li>
              </ul>
              <div className="mt-4 text-xs text-gray-500">Progress: 75% Complete</div>
            </div>
          )}
        </aside>

        {/* Vertical Splitter Container */}
        <div className="flex-grow flex flex-col relative">

            {/* A. Instructions/Content Panel (Top) */}
            <div style={{ height: mainContentHeight }} className="overflow-y-auto bg-gray-800 relative flex flex-col">
                
                {/* Instructions Content Wrapper */}
                <div className="flex-shrink-0">
                    <LessonContent 
                        lessonTitle={mockLessonTitle}
                        onAICoachRequest={handleAICoachRequest}
                    />
                </div>

                 {/* AI Hint Panel (Integrated into Instructions) */}
                {(aiHint.hint || aiHint.error) && (
                    <div className="p-4 mx-6 mb-6 rounded-lg shadow-lg transition-all duration-500 flex-shrink-0"
                        style={{ backgroundColor: aiHint.error ? '#450a0a' : '#047878' }} // Red for error, Teal for success
                    >
                        <p className={`text-sm font-semibold mb-2 flex items-center ${aiHint.error ? 'text-red-300' : 'text-teal-300'}`}>
                            {aiHint.error ? 'Error' : 'AI Coach Hint'}:
                            {aiHint.loading && <Icon name="Loader" className="animate-spin w-4 h-4 ml-3" />}
                        </p>
                        <p className={`text-sm whitespace-pre-wrap ${aiHint.error ? 'text-red-200' : 'text-gray-200'}`}>{aiHint.error || aiHint.hint}</p>
                    </div>
                )}
            </div>

            {/* Vertical Resizer Bar */}
            <div 
                className="w-full h-2 bg-gray-700 cursor-row-resize hover:bg-teal-600 transition-colors duration-150 flex-shrink-0 relative"
                onMouseDown={handleMouseDown}
            >
                <div className="h-1 w-8 bg-gray-500 rounded mx-auto mt-0.5"></div>
            </div>

            {/* B. Code Editor and Terminal Panel (Bottom) */}
            <div style={{ height: labContentHeight }} className="flex flex-col overflow-hidden bg-gray-900">
                
                {/* Code Editor Area */}
                <div className="flex-1 overflow-y-auto bg-gray-900 border-b border-gray-700/50">
                    <div className="p-4 text-sm font-mono text-gray-200 resize-y">
                        {/* Mock Code Editor Area */}
                        <pre ref={codeEditorRef}>
                            <span className="text-gray-500"># Current Lab Code (XSS Prevention)</span>
                            <span className="text-blue-400">def</span> <span className="text-yellow-400">render_html</span>(user_input):
                                <span className="text-gray-500"># TODO: Sanitize the user input here!</span>
                                html = `{/* Code content here */}`
                                <span className="text-blue-400">return</span> html
                        </pre>
                    </div>
                </div>

                {/* Terminal/Output Area */}
                <div className="h-32 bg-gray-950 p-3 flex-shrink-0 overflow-y-auto border-t border-teal-600/50">
                    <div className="flex justify-between items-center text-sm font-semibold border-b border-gray-700 pb-1 mb-2">
                        <span className="text-gray-400 flex items-center">
                           <Icon name="Terminal" className="w-4 h-4 mr-2"/> Lab Output
                        </span>
                        <span className="text-gray-500 text-xs">Status: FAILURE</span>
                    </div>
                    {/* Mock Output */}
                    <p className="text-sm font-mono text-teal-400">~$ python main_lab.py</p>
                    <p className="text-sm font-mono text-red-400">FAILURE: Lab test failed.</p>
                    <p className="text-sm font-mono text-gray-500">Reason: Input validation check failed on line 15.</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default LearningIDE;


