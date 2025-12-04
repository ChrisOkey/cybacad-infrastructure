import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDvcJeu4TYGowmsWxfKEYYLy17z0FznB-E",
  authDomain: "cybuniapp.firebaseapp.com",
  projectId: "cybuniapp",
  storageBucket: "cybuniapp.firebasestorage.app",
  messagingSenderId: "723722860122",
  appId: "1:723722860122:web:449981cdeab17d55c68a63",
  measurementId: "G-BSRHXQ2HTG"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ✅ Force production Firestore by clearing any emulator override
delete (globalThis as any).FIRESTORE_EMULATOR_HOST;

export { db };