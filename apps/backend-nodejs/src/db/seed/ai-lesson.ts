import * as admin from 'firebase-admin';

// ==========================================
// 1. CONFIGURATION
// ==========================================

// Force the script to talk to the Local Emulator (127.0.0.1:8080)
// instead of the real Google Cloud.
process.env.FIRESTORE_EMULATOR_HOST = "127.0.0.1:8080";
process.env.GCLOUD_PROJECT = "cybacad-dev";

// Initialize Admin SDK (Singleton check to prevent errors)
if (!admin.apps.length) {
  admin.initializeApp({ projectId: "cybacad-dev" });
}

const db = admin.firestore();

// ==========================================
// 2. DATA DEFINITIONS
// ==========================================

// --- COURSE 1: WEB SECURITY (The Full Demo) ---
const course1Data = {
  title: "Web Security Fundamentals",
  description: "Learn how to hack and defend web applications. Master the OWASP Top 10.",
  instructor: "AI Sentinel",
  totalModules: 1,
  thumbnail: "https://placehold.co/600x400/0f172a/00bfa5?text=Web+Security" 
};

const module1Data = {
  title: "Module 1: Injection Attacks",
  description: "Understand SQLi, NoSQLi, and Command Injection.",
  order: 1
};

const lesson1Data = {
  id: "lesson_1_2",
  title: "SQL Injection Fundamentals",
  type: "interactive_lab",
  videoUrl: "https://www.youtube.com/watch?v=_jKylhJtPmI", 
  initialCode: `# SQL Injection Lab
# Target: Bypass the login screen
# ------------------------------------------------
username = input("Enter Username: ")
password = input("Enter Password: ")

query = f"SELECT * FROM users WHERE name = '{username}' AND pass = '{password}'"

print(f"Executing: {query}")
`,
  timeline: [
    {
      triggerTime: 5,
      action: "UPDATE_CODE",
      payload: `# SQL Injection Lab
# The vulnerability exists because we directly insert user input.
# Watch what happens if we use a specific payload...

username = "admin' OR '1'='1"
password = "any"

query = f"SELECT * FROM users WHERE name = '{username}' AND pass = '{password}'"
` 
    },
    {
      triggerTime: 12,
      action: "UPDATE_CODE",
      payload: `# SQL Injection Lab
# The resulting query becomes:
# SELECT * FROM users WHERE name = 'admin' OR '1'='1' AND ...
# Since 1=1 is ALWAYS TRUE, we get access.

print("--- SIMULATING DATABASE ---")
print("ACCESS GRANTED: Welcome, Administrator.")
`
    },
    {
      triggerTime: 18,
      action: "PAUSE_CHALLENGE",
      payload: "Now it's your turn. Modify the code to use a 'Parameterized Query' (secure method) instead of f-strings."
    }
  ]
};

// --- COURSE 2: NETWORK DEFENSE (For Routing Test) ---
const course2Data = {
  title: "Network Defense Essentials",
  description: "Master firewalls, IDS/IPS, and packet analysis with Wireshark.",
  instructor: "NetSec Pro",
  totalModules: 0, // Placeholder
  thumbnail: "https://placehold.co/600x400/1e293b/38bdf8?text=Network+Defense"
};

// ==========================================
// 3. EXECUTION FUNCTION
// ==========================================

async function seedDatabase() {
  console.log("🌱 Seeding Database to Emulator (127.0.0.1:8080)...");
  
  try {
    // --- 1. Seed Course 1 (Hierarchy) ---
    console.log("   > Writing Course: CYBER-101...");
    await db.collection('courses').doc('CYBER-101').set(course1Data, { merge: true });

    console.log("   > Writing Module: module_01...");
    await db.collection('courses').doc('CYBER-101')
            .collection('modules').doc('module_01')
            .set(module1Data, { merge: true });

    console.log("   > Writing Lesson: lesson_1_2...");
    await db.collection('courses').doc('CYBER-101')
            .collection('modules').doc('module_01')
            .collection('lessons').doc('lesson_1_2')
            .set(lesson1Data);

    // --- 2. Seed Course 2 (Top Level Only) ---
    console.log("   > Writing Course: CYBER-102...");
    await db.collection('courses').doc('CYBER-102').set(course2Data, { merge: true });
    
    console.log("✅ SUCCESS: Database Populated!");
  } catch (error) {
    console.error("❌ Error seeding:", error);
  }
}

// Run it
seedDatabase();