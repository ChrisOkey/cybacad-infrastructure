import { Router } from 'express';
import * as admin from 'firebase-admin';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

// Explicitly define the router type
const router: Router = Router();

// ❌ REMOVED from here to prevent "No App" error
// const db = admin.firestore(); 

// ==========================================
// 1. INITIALIZE GEMINI (2.5 Pro)
// ==========================================
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
// Using the stable 2.5 Pro model
const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });

// ==========================================
// 2. THE PROMPT
// ==========================================
const generateCoursePrompt = (topic: string) => `
You are a Cyber Security Course Architect.
Create a structured interactive coding course about: "${topic}".

IMPORTANT: You must output ONLY valid JSON. No markdown, no text explanations.
The JSON must strictly follow this structure:

{
  "id": "generate-a-kebab-case-slug-based-on-topic",
  "title": "Course Title",
  "description": "Short description",
  "instructor": "AI Sentinel",
  "thumbnail": "https://placehold.co/600x400/000000/00FF00?text=Cyber+Security",
  "modules": [
    {
      "title": "Module 1: Fundamentals",
      "order": 1,
      "lessons": [
        {
          "id": "lesson_1",
          "title": "Lesson Title",
          "videoUrl": "https://www.youtube.com/watch?v=_jKylhJtPmI",
          "content": "# Python Code for the Lab\\n# Write a script that demonstrates the concept...",
          "timeline": [
            {
              "triggerTime": 5,
              "action": "UPDATE_CODE",
              "payload": "# Solution code..."
            }
          ]
        }
      ]
    }
  ]
}

Create 1 Module with 1 Lesson.
The 'content' field must be valid Python code.
`;

// ==========================================
// 3. THE ROUTE
// ==========================================
router.post('/generate', async (req, res) => {
  try {
    // 🟢 FIX: Connect to DB here, INSIDE the route
    // This ensures Firebase is fully initialized before we try to use it
    const db = admin.firestore();
    
    const { topic } = req.body;
    
    if (!topic) {
       return res.status(400).json({ error: "Topic is required" });
    }

    console.log(`🤖 Generating Course for: "${topic}"...`);

    const result = await model.generateContent(generateCoursePrompt(topic));
    const response = await result.response;
    let text = response.text();

    // Clean Markdown
    text = text.replace(/```json/g, "").replace(/```/g, "").trim();

    let courseData;
    try {
      courseData = JSON.parse(text);
    } catch (e) {
      console.error("JSON Parse Error. AI Output:", text);
      return res.status(500).json({ error: "AI returned invalid JSON." });
    }

    // Save to Firestore
    if (courseData && courseData.id) {
        console.log(`💾 Saving to Firestore: courses/${courseData.id}`);
        await db.collection('courses').doc(courseData.id).set(courseData);
        
        res.json({ 
            success: true, 
            message: "Course Generated & Saved!",
            courseId: courseData.id,
            data: courseData 
        });
    } else {
        res.status(500).json({ error: "Generated data was missing ID" });
    }

  } catch (error: any) {
    console.error("❌ AI Route Error:", error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
});

export default router;