// apps/backend-nodejs/src/config/initSecrets.ts
import { initializeApp, applicationDefault } from 'firebase-admin/app';
import { getFirestore as adminGetFirestore } from 'firebase-admin/firestore';
import { getAuth as adminGetAuth } from 'firebase-admin/auth';

let initialized = false;

function init() {
  if (!initialized) {
    initializeApp({ credential: applicationDefault() });
    initialized = true;
  }
}

export async function getFirestore() {
  init();
  return adminGetFirestore();
}

export async function getAuth() {
  init();
  return adminGetAuth();
}
