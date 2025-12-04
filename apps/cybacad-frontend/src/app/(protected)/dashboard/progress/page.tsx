// ✅ Imports now resolve via the source path mapping we just added
import { CourseCard } from "@cybacad/ui";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Progress | Cybacad",
  description: "Track your learning milestones",
};

export default function ProgressPage() {
  const courses = [
    { 
      title: "Cyber Security Basics", 
      description: "Learn the fundamentals of securing systems.", 
      progress: 75 
    },
    { 
      title: "Network Defense", 
      description: "Protecting networks from unauthorized access.", 
      progress: 30 
    },
    { 
      title: "Ethical Hacking", 
      description: "Introduction to penetration testing tools.", 
      progress: 0 
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Your Progress</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course, index) => (
          <CourseCard
            key={index}
            title={course.title}
            description={course.description}
            progress={course.progress}
          />
        ))}
      </div>
    </div>
  );
}