export default function CoursesPage() {
  const courses = [
    {
      title: "Cybersecurity Fundamentals",
      description: "Learn the core principles of digital security, threat modeling, and risk management.",
    },
    {
      title: "AI for Beginners",
      description: "Understand how artificial intelligence works and how it's transforming industries.",
    },
    {
      title: "Ethical Hacking",
      description: "Explore penetration testing, vulnerability scanning, and ethical hacking techniques.",
    },
  ];

  return (
    <main className="min-h-screen px-4 py-12 bg-gray-50">
      <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
        Our Courses
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {courses.map((course, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold text-blue-600 mb-2">
              {course.title}
            </h2>
            <p className="text-gray-700">{course.description}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
