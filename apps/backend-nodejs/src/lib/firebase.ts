// apps/backend-nodejs/src/lib/firebase.ts
import { initializeApp, getApps, applicationDefault } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

let firebaseAdmin: { db: FirebaseFirestore.Firestore } | null = null;

function initFirebaseAdmin() {
  const app =
    getApps().length > 0
      ? getApps()[0]
      : initializeApp({ credential: applicationDefault() });
  const db = getFirestore(app);
  return { db };
}

export function getFirebaseAdmin() {
  if (!firebaseAdmin) {
    firebaseAdmin = initFirebaseAdmin();
  }
  return firebaseAdmin;
}
