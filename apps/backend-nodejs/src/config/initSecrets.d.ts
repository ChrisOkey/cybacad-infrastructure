import type { Firestore } from 'firebase-admin/firestore';
import type { Auth } from 'firebase-admin/auth';

/**
 * Returns a Firestore instance from Firebase Admin SDK.
 * Ensures the app is initialized before returning.
 */
export function getFirestore(): Promise<Firestore>;

/**
 * Returns an Auth instance from Firebase Admin SDK.
 * Ensures the app is initialized before returning.
 */
export function getAuth(): Promise<Auth>;
