"use client";

import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// ✅ ALWAYS USE PRODUCTION CONFIG
// We deleted devConfig to stop the confusion. 
// This forces the app to talk to the real Cloud Database.
const firebaseConfig = {
  apiKey: "AIzaSyDvcJeu4TYGowmsWxfKEYYLy17z0FznB-E",
  authDomain: "cybuniapp.firebaseapp.com",
  projectId: "cybuniapp",
  storageBucket: "cybuniapp.firebasestorage.app",
  messagingSenderId: "723722860122",
  appId: "1:723722860122:web:449981cdeab17d55c68a63",
  measurementId: "G-BSRHXQ2HTG"
};

// 2. INITIALIZE
// Singleton pattern to prevent "App already exists" errors
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// 3. LOGGING
// This will confirm in your browser console that we are live
if (process.env.NODE_ENV === 'development') {
    console.log("🔥 Firebase initialized: CONNECTED TO PRODUCTION CLOUD DB");
}

export { app, auth, db };