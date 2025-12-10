"use client";

import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

// 1. PRODUCTION CONFIG (From your src/lib/firebase.ts)
// These keys connect to your REAL Google Cloud project (cybuniapp)
const prodConfig = {
  apiKey: "AIzaSyDvcJeu4TYGowmsWxfKEYYLy17z0FznB-E",
  authDomain: "cybuniapp.firebaseapp.com",
  projectId: "cybuniapp",
  storageBucket: "cybuniapp.firebasestorage.app",
  messagingSenderId: "723722860122",
  appId: "1:723722860122:web:449981cdeab17d55c68a63",
  measurementId: "G-BSRHXQ2HTG"
};
// 2. DEV CONFIG (From your lib/firebase.ts)
// These keys connect to your LOCAL Emulator (cybacad-dev)
const devConfig = {
  apiKey: "AIzaSyBj8Tgi75TP8z0RjKbBxt834HetyZ9EFl4",
  authDomain: "127.0.0.1",
  projectId: "cybacad-dev", // ✅ This matches your Backend Seed Script
  storageBucket: "cybacad-dev.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc",
};

// 3. SMART SWITCH
// If we are developing locally, use devConfig. Otherwise, use prodConfig.
const firebaseConfig = process.env.NODE_ENV === "development" ? devConfig : prodConfig;
// 4. INITIALIZ
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
// 5. CONNECT TO EMULATORS (Only in Dev)
if (process.env.NODE_ENV === "development") {
  // Ensure we don't connect twice (Next.js hot reload safety)
  if (!(auth as any).emulatorConfig) {
    connectAuthEmulator(auth, "http://127.0.0.1:9099");
  }
  if (!(db as any)._settingsFrozen) {
    console.log(`🔧 Connecting to Emulator: ${firebaseConfig.projectId}`);
    connectFirestoreEmulator(db, "127.0.0.1", 8080);
  }
}
export { app, auth, db };