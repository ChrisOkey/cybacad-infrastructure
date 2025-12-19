import admin from 'firebase-admin';
import dotenv from 'dotenv';
import { Firestore } from 'firebase-admin/firestore';
import { Auth } from 'firebase-admin/auth';

dotenv.config();

// Prevent multiple initializations
if (!admin.apps.length) {
  try {
    console.log("🔥 Initializing Firebase Admin for:", 'cybuniapp');
    
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
      projectId: 'cybuniapp' // Your Real Project ID
    });
  } catch (error: any) {
    console.error("❌ Firebase Admin Init Error:", error.message);
  }
}

// Export with explicit types
export const db: Firestore = admin.firestore();
export const auth: Auth = admin.auth();