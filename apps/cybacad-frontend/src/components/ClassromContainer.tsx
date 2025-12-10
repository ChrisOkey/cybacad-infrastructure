import React, { useState, useRef } from 'react';
import VideoWindow from './VideoWindow';
import CodeWindow from './CodeWindow';
import { mockLesson } from './lessonMockData';

// Define the shape of our Event object for TypeScript
interface TimelineEvent {
  triggerTime: number;
  action: string;
  payload: any;
}

const ClassroomContainer = () => {
  // 1. STATE MANAGEMENT
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentCode, setCurrentCode] = useState(mockLesson.initialCode);
  const [isLocked, setIsLocked] = useState(true);
  
  // Track processed events so we don't fire them twice in the same second
  const processedEvents = useRef(new Set<number>()); 

  // 2. THE SYNC ENGINE
  // This function runs every ~0.5 seconds while video plays
  const handleTimeUpdate = (seconds: number) => {
    const currentSecond = Math.floor(seconds);

    // Find if there is an event scheduled for this exact second
    const event = mockLesson.timeline.find((e: TimelineEvent) => e.triggerTime === currentSecond);

    // If event exists AND we haven't run it yet...
    if (event && !processedEvents.current.has(currentSecond)) {
      console.log("Triggering Event:", event.action);
      
      if (event.action === "UPDATE_CODE") {
        setCurrentCode(event.payload);
      } 
      else if (event.action === "PAUSE_CHALLENGE") {
        setIsPlaying(false); // Stop Video
        setIsLocked(false);  // Unlock Editor for user
        alert("Teacher: " + event.payload); // Simple alert
      }

      // Mark this second as "done" so it doesn't fire again
      processedEvents.current.add(currentSecond);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-5 p-5 bg-black text-white min-h-[500px]">
      
      {/* LEFT COLUMN: VIDEO */}
      <div className="flex-1">
        <h2 className="text-xl font-bold mb-4 text-teal-400">📺 Module 1: Python Basics</h2>
        <VideoWindow 
          url={mockLesson.videoUrl}
          isPlaying={isPlaying}
          onProgressReport={handleTimeUpdate}
        />
        <button 
          onClick={() => setIsPlaying(!isPlaying)} 
          className="mt-3 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded text-white font-medium transition-colors"
        >
          {isPlaying ? "Pause Video" : "Play Video"}
        </button>
      </div>

      {/* RIGHT COLUMN: EDITOR */}
      <div className="flex-1">
        <h2 className="text-xl font-bold mb-4 text-teal-400">💻 Lab Environment</h2>
        <CodeWindow 
          code={currentCode}
          isLocked={isLocked}
          onUserType={(val: string | undefined) => setCurrentCode(val || "")}
        />
      </div>

    </div>
  );
};

export default ClassroomContainer;