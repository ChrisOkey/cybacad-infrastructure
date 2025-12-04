import "dotenv/config";
import fs from "fs";
import path from "path";
import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";

const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_FILE;

if (!serviceAccountPath) {
  throw new Error("FIREBASE_SERVICE_ACCOUNT_FILE is not set in .env");
}

const resolvedPath = path.resolve(process.cwd(), serviceAccountPath);
if (!fs.existsSync(resolvedPath)) {
  throw new Error(`Service account file not found at: ${resolvedPath}`);
}

if (!getApps().length) {
  const fileContent = fs.readFileSync(resolvedPath, "utf8");
  const serviceAccount = JSON.parse(fileContent);

  initializeApp({ credential: cert(serviceAccount) });
  console.log("✅ Firebase Admin SDK initialized");
}

export const db = getFirestore();
export const auth = getAuth();
