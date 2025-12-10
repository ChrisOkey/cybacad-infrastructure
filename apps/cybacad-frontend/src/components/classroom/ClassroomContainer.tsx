import React, { useState, useRef } from 'react';
import VideoWindow from './VideoWindow';
import CodeWindow from './CodeWindow';
import { mockLesson } from './lessonMockData'; // Import our fake data

const ClassroomContainer = () => {
  // 1. STATE MANAGEMENT
  const [isPlaying, setIsPlaying] = useState(false); // Is video playing?
  const [currentCode, setCurrentCode] = useState(mockLesson.initialCode); // What's in the editor?
  const [isLocked, setIsLocked] = useState(true); // Can user type?
  
  // Track processed events so we don't fire them twice
  const processedEvents = useRef(new Set()); 

  // 2. THE SYNC ENGINE (The Logic)
  const handleTimeUpdate = (seconds) => {
    // Round to nearest integer for simple matching
    const currentSecond = Math.floor(seconds);

    // Check if there is an event at this second
    const event = mockLesson.timeline.find(e => e.triggerTime === currentSecond);

    if (event && !processedEvents.current.has(currentSecond)) {
      console.log("Triggering Event:", event.action);
      
      // Execute the Logic
      if (event.action === "UPDATE_CODE") {
        setCurrentCode(event.payload);
      } 
      else if (event.action === "PAUSE_CHALLENGE") {
        setIsPlaying(false); // Stop Video
        setIsLocked(false);  // Unlock Editor
        alert("Teacher: " + event.payload); // Simple alert for now
      }

      // Mark as processed so it doesn't fire again in the same second
      processedEvents.current.add(currentSecond);
    }
  };

  return (
    <div style={{ display: 'flex', gap: '20px', padding: '20px', background: '#000', color: '#fff' }}>
      
      {/* LEFT COLUMN: VIDEO */}
      <div style={{ flex: 1 }}>
        <h2>📺 Module 1: Python Basics</h2>
        <VideoWindow 
          url={mockLesson.videoUrl}
          isPlaying={isPlaying}
          onProgressReport={handleTimeUpdate}
        />
        <button onClick={() => setIsPlaying(!isPlaying)} style={{ marginTop: '10px', padding: '10px' }}>
          {isPlaying ? "Pause Video" : "Play Video"}
        </button>
      </div>

      {/* RIGHT COLUMN: EDITOR */}
      <div style={{ flex: 1 }}>
        <h2>💻 Lab Environment</h2>
        <CodeWindow 
          code={currentCode}
          isLocked={isLocked}
          onUserType={(val) => setCurrentCode(val)}
        />
      </div>

    </div>
  );
};

export default ClassroomContainer;