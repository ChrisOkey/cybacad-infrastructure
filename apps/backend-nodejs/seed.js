// apps/backend-nodejs/seed.js
const admin = require('firebase-admin');
const { getFirestore } = require('firebase-admin/firestore');

// 🔑 IMPORT YOUR EXISTING KEY FILE
// NOTE: Ensure your firebase-admin-key.js file is in this same directory
// and exports the service account credentials object.
try {
    const serviceAccount = require('./firebase-admin-key.json'); 

    // Initialize Firebase using the certificate object from your JS file
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount) 
      });
    }
} catch (error) {
    console.error("❌ CRITICAL ERROR: Could not load or initialize Firebase Admin.");
    console.error("Please ensure 'firebase-admin-key.js' is in this folder and is correctly formatted.");
    process.exit(1); // Exit if initialization fails
}


const db = getFirestore();

const seedData = async () => {
  console.log("🌱 Starting Database Seed...");

  // 1. Define the Course Data (Perfect Structure for Frontend)
  const courseData = {
    title: "Cyber Security 101: SQL Injection",
    description: "Learn the fundamentals of web security and defense against common attacks.",
    difficulty: "Beginner",
    instructor: "Seed Script",
    totalModules: 2,
    modules: [
      {
        id: "mod_1",
        title: "Introduction to SQL Injection",
        lessons: [
          {
            id: "less_1_1",
            title: "Welcome & Course Overview",
            videoUrl: "https://www.youtube.com/watch?v=tutorial_link_1", 
            content: "Welcome to the course! We cover why SQL injection is a critical vulnerability.",
            type: "video"
          },
          {
            id: "less_1_2",
            title: "The Vulnerable Code Lab",
            content: "Setup and analyze the code that is vulnerable to SQL injection.",
            type: "lab"
          }
        ]
      },
       {
        id: "mod_2",
        title: "Defense and Prevention",
        lessons: [
          {
            id: "less_2_1",
            title: "Parameterized Queries (The Fix)",
            videoUrl: "https://www.youtube.com/watch?v=tutorial_link_2",
            content: "Learn how to use prepared statements to prevent malicious input.",
            type: "video"
          },
          {
            id: "less_2_2",
            title: "Final Challenge",
            content: "Your final task is to fix a hidden bug in the login function.",
            type: "lab"
          }
        ]
      }
    ]
  };

  try {
    // 2. Write to Firestore
    const docRef = await db.collection('courses').add(courseData);
    console.log(`✅ Course Created Successfully!`);
    console.log(`🆔 ID: ${docRef.id}`);
    console.log(`-----------------------------------------------`);
    console.log(`👉 Go test this URL (Make sure your Frontend is running!):`);
    console.log(`http://localhost:3000/learn/${docRef.id}`);
  } catch (error) {
    console.error("❌ Error seeding data:", error);
  }
};

seedData();