import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth'; 
import { readFileSync } from 'fs'; 
import path from 'path'; 

// --- Configuration Checks ---
if (!process.env.FIREBASE_SERVICE_ACCOUNT_FILE) {
    console.error("❌ CRITICAL ERROR: FIREBASE_SERVICE_ACCOUNT_FILE environment variable is not set.");
    process.exit(1); 
}

let serviceAccount;
try {
    // 1. Get the simple filename from the environment variable.
    const filename = process.env.FIREBASE_SERVICE_ACCOUNT_FILE;
    
    // 2. Resolve the ABSOLUTE path based on the current working directory.
    // This is the most reliable way to find the file in a monorepo.
    const absolutePath = path.resolve(process.cwd(), filename); 
    
    // 3. Read the content of the file AT THAT PATH.
    const fileContent = readFileSync(absolutePath, 'utf8'); // <-- Reads the JSON content
    
    // 4. Parse the JSON content.
    serviceAccount = JSON.parse(fileContent); // <-- Success!
    
} catch (e) {
    console.error("❌ CRITICAL ERROR: Failed to load or parse Firebase Service Account file.");
    console.error(`   Check if the JSON file exists at the root of the backend-nodejs folder.`);
    console.error(`   Details: ${e.message}`);
    process.exit(1);
}

// Initialize Firebase Admin SDK
const app = initializeApp({
    credential: cert(serviceAccount)
});

// Export the Firestore client and Auth client as NAMED EXPORTS
export const db = getFirestore(app); 
export const auth = getAuth(app);    

console.log("✅ Firebase Admin SDK initialized successfully.")