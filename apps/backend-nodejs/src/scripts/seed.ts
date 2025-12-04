import { SecretsManagerClient, GetSecretValueCommand } from "@aws-sdk/client-secrets-manager";
import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

// 🔐 Secure Firebase Admin SDK initialization
async function initFirebaseFromSecrets() {
  if (getApps().length) return;

  const SECRET_ID = "firebase-config";
  const AWS_REGION = "us-east-1";

  const client = new SecretsManagerClient({ region: AWS_REGION });
  const command = new GetSecretValueCommand({ SecretId: SECRET_ID });

  let secretString;
  try {
    const response = await client.send(command);
    if (!response.SecretString) throw new Error("SecretString is empty");
    secretString = response.SecretString;
  } catch (error) {
    if (error instanceof Error) {
      console.error("❌ AWS Secrets Manager Error:", error.message);
    } else {
      console.error("❌ AWS Secrets Manager Error:", String(error));
    }
    throw new Error("Failed to retrieve Firebase secret from AWS.");
  }

  let serviceAccount;
  try {
    serviceAccount = JSON.parse(secretString);
  } catch {
    throw new Error("Failed to parse Firebase Service Account JSON.");
  }

  initializeApp({ credential: cert(serviceAccount) });
  console.log("✅ Firebase Admin SDK initialized from AWS Secrets Manager.");
}

// 🚀 Seed course, modules, lessons, and Gemini prompts
export async function seedCourseAndContent() {
  console.log("🚀 Seeding course and content...");
  await initFirebaseFromSecrets();

  const db = getFirestore();

  // --- Seed Course ---
  const courseRef = db.collection("courses").doc();
  await courseRef.set({
    title: "Intro to React for Beginners",
    description:
      "Learn the fundamentals of React, JSX, components, and state management through hands-on labs.",
    level: "beginner",
    tags: ["react", "frontend", "javascript"],
    published: true,
    createdBy: "adminUid",
    thumbnailUrl: "https://example.com/react-thumbnail.png",
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  console.log("✅ Course created successfully! ID:", courseRef.id);

  // --- Seed Modules ---
  const modules = [
    {
      title: "Getting Started with React",
      description: "Set up your environment and create your first React app.",
      order: 1,
    },
    {
      title: "JSX and Rendering",
      description: "Learn how JSX works and how to render elements dynamically.",
      order: 2,
    },
    {
      title: "Components and Props",
      description: "Understand functional components and how to pass props.",
      order: 3,
    },
    {
      title: "State and Events",
      description: "Manage component state and handle user interactions.",
      order: 4,
    },
  ];

  const moduleRefs: string[] = [];
  const batch = db.batch();
  const modulesRef = courseRef.collection("modules");

  modules.forEach((mod) => {
    const modRef = modulesRef.doc();
    moduleRefs.push(modRef.id);
    batch.set(modRef, {
      ...mod,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  });

  await batch.commit();
  console.log("✅ Modules seeded successfully!");

  // --- Seed Lessons ---
  const lessonsByModule = {
    [moduleRefs[0]]: [
      {
        title: "Install Node and VS Code",
        content: "Walk through installing Node.js and setting up VS Code.",
        order: 1,
      },
      {
        title: "Create Your First React App",
        content: "Use Vite to scaffold a React project.",
        order: 2,
      },
    ],
    [moduleRefs[1]]: [
      {
        title: "JSX Syntax",
        content: "Learn how JSX compiles and how to embed expressions.",
        order: 1,
      },
    ],
    [moduleRefs[2]]: [
      {
        title: "Props in Functional Components",
        content: "Pass data between components using props.",
        order: 1,
      },
    ],
    [moduleRefs[3]]: [
      {
        title: "Using useState",
        content: "Manage local state with the useState hook.",
        order: 1,
      },
    ],
  };

  const lessonBatch = db.batch();
  for (const [moduleId, lessons] of Object.entries(lessonsByModule)) {
    const lessonsRef = courseRef.collection("modules").doc(moduleId).collection("lessons");
    lessons.forEach((lesson) => {
      const lessonRef = lessonsRef.doc();
      lessonBatch.set(lessonRef, {
        ...lesson,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    });
  }

  await lessonBatch.commit();
  console.log("✅ Lessons seeded successfully!");

  // --- Seed Gemini Prompt Templates ---
  const promptsRef = courseRef.collection("prompts");
  const prompts = [
    {
      type: "lesson_hint",
      template: "Explain the concept of {{lessonTitle}} in simple terms for a beginner.",
    },
    {
      type: "quiz_generator",
      template: "Generate 3 multiple-choice questions based on {{lessonContent}}.",
    },
  ];

  const promptBatch = db.batch();
  prompts.forEach((prompt) => {
    const promptRef = promptsRef.doc();
    promptBatch.set(promptRef, {
      ...prompt,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  });

  await promptBatch.commit();
  console.log("✅ Gemini prompt templates seeded!");
}

seedCourseAndContent().catch((err) => {
  console.error("❌ Seeding failed:", err);
});
