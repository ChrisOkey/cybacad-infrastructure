// Define the shape of our Lesson Data
export interface TimelineEvent {
  triggerTime: number;
  action: string;
  payload: any;
}

export interface LessonData {
  id: string;
  videoUrl: string;
  initialCode: string;
  timeline: TimelineEvent[];
}

// The Data Object
export const mockLesson: LessonData = {
  id: "101",
  videoUrl: "https://www.youtube.com/watch?v=Get7wqXYe38", // Placeholder Security Video
  initialCode: `# Python Security Lab
# Listen to the instructor...`,
  timeline: [
    {
      triggerTime: 5, // At 5 seconds
      action: "UPDATE_CODE",
      payload: `# Python Security Lab

import hashlib` 
    },
    {
      triggerTime: 10, // At 10 seconds
      action: "UPDATE_CODE",
      payload: `# Python Security Lab

import hashlib

password = 'secret'`
    },
    {
      triggerTime: 15, // At 15 seconds
      action: "PAUSE_CHALLENGE",
      payload: "Now create a variable called 'hash'!"
    }
  ]
};