import { GoogleGenerativeAI } from '@google/generative-ai';


const MAX_RETRIES = 3;
// Explicitly pass the API key, ensuring it uses the value loaded by dotenv.
const ai = new GoogleGenerativeAI({ apiKey: process.env.GEMINI_API_KEY });
 

/**
 * Constructs a detailed, contextual prompt for the AI Coach.
 */
function constructPrompt(userCode, userError, lessonTitle) {
    const systemPrompt = `
        You are an expert Cybersecurity and Programming Coach. 
        Your role is to act as a mentor, guiding the student without ever giving them the direct solution. 
        The student is working on a hands-on lab titled: "${lessonTitle}". 
        Your response must be brief, encouraging, and focused on the core concept they are failing to implement.
        Do NOT use code blocks in your response. Do NOT explain the correct function or syntax.
        Instead, gently point them back to the necessary security principle or part of the lesson.
    `;

    const userQuery = `
        Here is the student's code:
        ---
        ${userCode}
        ---
        Here is the terminal output or error they received:
        ---
        ${userError}
        ---
        Based on the code and the error, provide a single, concise hint that focuses on the security principle they need to check.
    `;

    return systemPrompt + userQuery;
}

/**
 * Calls the Gemini API to get a tailored hint for the student.
 */
export const getAICoachHint = async (req, res) => {
    const { userCode, userError, lessonTitle } = req.body;

    if (!userCode || !lessonTitle) {
        return res.status(400).json({ error: "Missing required fields: userCode or lessonTitle." });
    }
    
    const fullPrompt = constructPrompt(userCode, userError || "No specific error, code is not producing the desired result.", lessonTitle);

    try {
        let response;
        for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
            try {
                response = await ai.models.generateContent({
                    model: 'gemini-2.5-flash-preview-09-2025',
                    contents: fullPrompt,
                });
                
                break;
            } catch (innerError) {
                if (attempt < MAX_RETRIES - 1) {
                    console.warn(`Attempt ${attempt + 1} failed, retrying...`, innerError.message);
                    await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
                } else {
                    throw innerError;
                }
            }
        }

        const hintText = response.text || "I'm sorry, I couldn't generate a hint right now. Please try again or consult the documentation.";
        
        res.status(200).json({ hint: hintText });
    } catch (error) {
        console.error("Gemini API Error:", error.message);
        res.status(500).json({ 
            error: "Failed to connect to the AI service.",
            details: error.message
        });
    }
};
