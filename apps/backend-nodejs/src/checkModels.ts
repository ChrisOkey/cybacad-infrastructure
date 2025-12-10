// apps/backend-nodejs/src/checkModels.ts
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

async function listModels() {
  const apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey) {
    console.error("❌ API Key missing in .env");
    return;
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  
  try {
    console.log("🔍 Checking available models for your API key...");
    const model = genAI.getGenerativeModel({ model: "gemini-pro" }); // Dummy init to get client
    
    // There isn't a direct "listModels" helper in the simplified SDK, 
    // but we can try the most common model names to see which one works.
    
    const candidates = [
      "gemini-1.5-flash",
      "gemini-1.5-flash-latest",
      "gemini-1.5-pro",
      "gemini-1.0-pro",
      "gemini-pro"
    ];

    for (const modelName of candidates) {
      try {
        const testModel = genAI.getGenerativeModel({ model: modelName });
        // Try a tiny prompt to see if it replies (Testing availability)
        await testModel.generateContent("Hello"); 
        console.log(`✅ AVAILABLE: ${modelName}`);
      } catch (error: any) {
        if (error.message.includes("404") || error.message.includes("not found")) {
           console.log(`❌ NOT FOUND: ${modelName}`);
        } else {
           console.log(`⚠️ ERROR on ${modelName}: ${error.message.split('[')[0]}`);
        }
      }
    }

  } catch (error) {
    console.error("Fatal Error:", error);
  }
}

listModels();