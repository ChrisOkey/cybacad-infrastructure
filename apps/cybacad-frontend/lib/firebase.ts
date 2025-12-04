"use client";

import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

// 1. Emulator-friendly config
const firebaseConfig = {
  apiKey: "fake-api-key",
  authDomain: "localhost",
  projectId: "cybacad-dev",
  storageBucket: "cybacad-dev.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc",
};

// 2. Initialize
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// 3. Connect to Emulators (Development Only)
if (process.env.NODE_ENV === "development") {
  if (!(auth as any).emulatorConfig) {
    connectAuthEmulator(auth, "http://127.0.0.1:9099");
  }
  if (!(db as any)._settingsFrozen) {
    connectFirestoreEmulator(db, "127.0.0.1", 8080);
  }
}

export { app, auth, db };