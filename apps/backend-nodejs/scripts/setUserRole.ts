/**
 * Firebase Admin script to assign RBAC roles via custom claims.
 * Run with: ts-node scripts/setUserRole.ts <uid> <role>
 */

import * as admin from "firebase-admin";

// Initialize Admin SDK (service account or application default credentials)
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    // Or use a service account JSON:
    // credential: admin.credential.cert(require("./serviceAccountKey.json")),
  });
}

async function setUserRole(uid: string, role: "admin" | "instructor" | "learner") {
  try {
    await admin.auth().setCustomUserClaims(uid, { role });
    console.log(`✅ Role '${role}' set for user ${uid}`);

    // Force token refresh: next time the user signs in, they’ll get updated claims
    const user = await admin.auth().getUser(uid);
    console.log(`User ${user.email} now has role: ${role}`);
  } catch (err) {
    console.error("❌ Failed to set role:", err);
  }
}

// CLI usage
const [uid, role] = process.argv.slice(2);
if (!uid || !role) {
  console.error("Usage: ts-node setUserRole.ts <uid> <role>");
  process.exit(1);
}

if (!["admin", "instructor", "learner"].includes(role)) {
  console.error("Role must be one of: admin, instructor, learner");
  process.exit(1);
}

setUserRole(uid, role as "admin" | "instructor" | "learner");
