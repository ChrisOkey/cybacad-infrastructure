"use client";

import React, { useState, useRef, useEffect } from 'react';
import VideoWindow from './VideoWindow';
import CodeWindow from './CodeWindow';
import dynamic from 'next/dynamic';

// 1. Define Data Types
interface TimelineEvent {
  triggerTime: number;
  action: string;
  payload: any;
}

interface LessonData {
  title: string;
  videoUrl: string;
  initialCode: string;
  timeline?: TimelineEvent[];
}

interface ClassroomProps {
  data: LessonData;
}

// 2. Component Definition
const ClassroomContainer = ({ data }: ClassroomProps) => {
  
  // STATE
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentCode, setCurrentCode] = useState(data.initialCode || "// No code provided");
  const [isLocked, setIsLocked] = useState(true);
  
  // Update code if data changes
  useEffect(() => {
    setCurrentCode(data.initialCode || "");
  }, [data]);

  // SYNC ENGINE
  const processedEvents = useRef(new Set<number>());

  const handleTimeUpdate = (seconds: number) => {
    if (!data.timeline) return;

    const currentSecond = Math.floor(seconds);
    const event = data.timeline.find((e: TimelineEvent) => e.triggerTime === currentSecond);

    if (event && !processedEvents.current.has(currentSecond)) {
      if (event.action === "UPDATE_CODE") {
        setCurrentCode(event.payload);
      } 
      else if (event.action === "PAUSE_CHALLENGE") {
        setIsPlaying(false);
        setIsLocked(false);
        alert("Teacher: " + event.payload);
      }
      processedEvents.current.add(currentSecond);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-5 p-5 bg-black text-white min-h-[500px]">
      
      {/* VIDEO SECTION */}
      <div className="flex-1">
        <h2 className="text-xl font-bold mb-4 text-teal-400">📺 {data.title}</h2>
        <VideoWindow 
          url={data.videoUrl}
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

      {/* CODE EDITOR SECTION */}
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