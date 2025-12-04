// src/server.js (ESM-compatible)

// CRITICAL FIX: Forces dotenv to load environment variables before all other code
import 'dotenv/config'; 

import fs from 'fs';
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth'; 

// --- Configuration Checks ---
// Define variables based on environment or set defaults for use in the try block
const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_FILE;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Check if the essential Gemini key is present
if (!GEMINI_API_KEY) {
  console.error("❌ CRITICAL ERROR: GEMINI_API_KEY environment variable is not set.");
  process.exit(1);
}


// --- Firebase Initialization (Consolidated into server.js) ---
try {
  // CRITICAL FIX: The check for FIREBASE_SERVICE_ACCOUNT_FILE is inside the try block
  if (!serviceAccountPath) {
    throw new Error("FIREBASE_SERVICE_ACCOUNT_FILE environment variable is not set.");
  }
  
  // FIX: Only initialize if NO default app exists (prevents crash from --watch)
  if (!getApps().length) {
    // 1. Resolve the path relative to the current working directory
    const resolvedPath = path.resolve(process.cwd(), serviceAccountPath);
    
    // 2. Read and parse the Service Account JSON key
    const fileContent = fs.readFileSync(resolvedPath, 'utf8');
    const serviceAccount = JSON.parse(fileContent);

    // 3. Initialize Firebase Admin SDK
    initializeApp({
      credential: cert(serviceAccount),
    });
    
    console.log("✅ Firebase Admin SDK initialized successfully.");
  }
  
  // Export clients via global scope (simplest for a small monorepo structure)
  global.db = getFirestore();
  global.auth = getAuth();

} catch (err) {
  console.error("❌ Failed to initialize Firebase Admin SDK. Check .env and file path:");
  console.error(`   ERROR: ${err.message}`);
  process.exit(1);
}


// --- API Setup ---
// These files must exist in src/routes/
import aiRoutes from './routes/aiRoutes.js';
import courseRoutes from './routes/courseRoutes.js';
import authRoutes from './routes/authRoutes.js'; // <-- CRITICAL: Ensure this file exists

const app = express();
const PORT = process.env.PORT || 5000;

// --- Middleware ---
app.use(bodyParser.json());

// 2. CORS Middleware
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        return res.status(200).json({});
    }
    next();
});


// --- API Routes ---
app.use('/api/v1/ai', aiRoutes);
app.use('/api/v1/courses', courseRoutes);
app.use('/api/v1/auth', authRoutes); // <-- CRITICAL: Auth routes are registered here

// --- Root Endpoint for health check ---
app.get('/', (req, res) => {
  res.status(200).send('🚀 CybAcademy Backend API is running!');
});


app.listen(PORT, () => {
  console.log(`✅ Server listening on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});