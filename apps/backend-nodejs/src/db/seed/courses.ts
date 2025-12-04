// apps/backend-nodejs/src/db/seed/courses.ts
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  connectFirestoreEmulator,
  collection,
  setDoc,
  doc,
} from "firebase/firestore";

const firebaseConfig = {
  projectId: process.env.FIREBASE_PROJECT_ID || "cybacad-demo",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
connectFirestoreEmulator(db, "localhost", 8080);

// Seed data with nested modules and lessons
const courses = [
  {
    id: "course-ts-101",
    title: "Introduction to TypeScript",
    description: "Learn the basics of TypeScript, a typed superset of JavaScript.",
    instructor: "Christopher",
    progress: 0,
    modules: [
      {
        id: "module-ts-1",
        title: "Getting Started",
        lessons: [
          { id: "lesson-ts-1", title: "What is TypeScript?", duration: 10 },
          { id: "lesson-ts-2", title: "Setting up the Environment", duration: 15 },
        ],
      },
      {
        id: "module-ts-2",
        title: "Core Concepts",
        lessons: [
          { id: "lesson-ts-3", title: "Types & Interfaces", duration: 20 },
          { id: "lesson-ts-4", title: "Generics", duration: 25 },
        ],
      },
    ],
  },
  {
    id: "course-react-201",
    title: "React for Beginners",
    description: "Build interactive UIs with React and understand component-driven development.",
    instructor: "Jane Doe",
    progress: 0,
    modules: [
      {
        id: "module-react-1",
        title: "React Basics",
        lessons: [
          { id: "lesson-react-1", title: "JSX & Components", duration: 15 },
          { id: "lesson-react-2", title: "Props & State", duration: 20 },
        ],
      },
      {
        id: "module-react-2",
        title: "Building Apps",
        lessons: [
          { id: "lesson-react-3", title: "Hooks Overview", duration: 25 },
          { id: "lesson-react-4", title: "Routing with React Router", duration: 30 },
        ],
      },
    ],
  },
  {
    id: "course-devops-301",
    title: "DevOps Foundations",
    description: "Understand CI/CD, cloud deployments, and infrastructure as code.",
    instructor: "John Smith",
    progress: 0,
    modules: [
      {
        id: "module-devops-1",
        title: "CI/CD Basics",
        lessons: [
          { id: "lesson-devops-1", title: "Continuous Integration", duration: 20 },
          { id: "lesson-devops-2", title: "Continuous Deployment", duration: 25 },
        ],
      },
      {
        id: "module-devops-2",
        title: "Infrastructure as Code",
        lessons: [
          { id: "lesson-devops-3", title: "Terraform Basics", duration: 30 },
          { id: "lesson-devops-4", title: "AWS CloudFormation", duration: 35 },
        ],
      },
    ],
  },
];

async function seedCourses() {
  for (const course of courses) {
    // Seed course document
    await setDoc(doc(collection(db, "courses"), course.id), {
      id: course.id,
      title: course.title,
      description: course.description,
      instructor: course.instructor,
      progress: course.progress,
    });

    // Seed modules
    for (const module of course.modules) {
      await setDoc(
        doc(collection(db, `courses/${course.id}/modules`), module.id),
        { id: module.id, title: module.title }
      );

      // Seed lessons
      for (const lesson of module.lessons) {
        await setDoc(
          doc(collection(db, `courses/${course.id}/modules/${module.id}/lessons`), lesson.id),
          lesson
        );
      }
    }

    console.log(`✅ Seeded course: ${course.title} with modules & lessons`);
  }
}

seedCourses()
  .then(() => {
    console.log("🎉 All courses, modules, and lessons seeded into Firestore emulator");
    process.exit(0);
  })
  .catch((err) => {
    console.error("❌ Failed to seed:", err);
    process.exit(1);
  });
