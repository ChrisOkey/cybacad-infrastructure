import express, { Router, Request, Response } from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';

const router: Router = express.Router();

// --- 1. COURSE GENERATOR (Admin) ---
router.post('/generate-course', async (req: Request, res: Response) => {
  const { topic } = req.body;
  if (!topic) return res.status(400).json({ error: "Topic is required" });

  try {
    const apiKey = process.env.GEMINI_API_KEY;

    // 🚨 MOCK MODE CHECK: If no key or placeholder, switch to Mock Mode
    if (!apiKey || apiKey.includes("Paste_Your_New_Key")) {
      console.log("⚠️ No valid API Key. Using MOCK AI response.");
      return res.json({ outline: getMockCourse(topic) });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    // Attempt to use Pro model, fall back to mock if it fails
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
      Create a structured cyber security course outline for: "${topic}".
      Format the response exactly like this template (Markdown):
      # Course Title
      > A catchy 1-sentence description.
      ## Module 1: [Title]
      * Lesson 1.1: [Title] - [Brief Description]
      * Lesson 1.2: [Title] - [Brief Description]
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return res.json({ outline: response.text() });

  } catch (error: any) {
    console.error("Real AI failed, switching to MOCK mode:", error.message);
    
    // ✅ FALLBACK: Return dummy data so the app doesn't crash
    return res.json({ outline: getMockCourse(topic) });
  }
});

// --- 2. AI COACH (Student) ---
router.post('/get-hint', async (req: Request, res: Response) => {
  const { userCode, userError, lessonTitle } = req.body;

  if (!userCode || !lessonTitle) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  // MOCK MODE FOR AI COACH TOO
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey.includes("Paste_Your_New_Key")) {
      return res.json({ hint: "Mock Hint: Check your SQL syntax near the 'WHERE' clause. (AI Disabled)" });
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
        You are an expert Cybersecurity Coach. 
        The student is working on: "${lessonTitle}". 
        Provide a brief hint. Do NOT give the solution.
        Code: ${userCode}
        Error: ${userError || "N/A"}
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    return res.json({ hint: response.text() });

  } catch (error: any) {
    console.error("AI Coach Error:", error);
    // Fallback Mock Hint
    return res.json({ hint: "Mock Hint: Ensure you are sanitizing inputs. (Real AI Failed)" });
  }
});

// --- HELPER: The Fake AI Generator ---
function getMockCourse(topic: string) {
  return `
# ${topic} (Mock Generated)
> This is a placeholder course because the AI Key is invalid.

## Module 1: Introduction to ${topic}
* Lesson 1.1: Basics of ${topic} - Understanding the core concepts.
* Lesson 1.2: Environment Setup - Installing necessary tools.

## Module 2: Advanced Techniques
* Lesson 2.1: Attack Vectors - Identifying common vulnerabilities.
* Lesson 2.2: Mitigation Strategies - Securing the system.
  `;
}

export default router;