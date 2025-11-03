export default function HomePage() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-gradient-to-br from-blue-500 to-purple-600 text-white">
      <h1 className="text-4xl sm:text-5xl font-bold mb-4">
        Welcome to Cybacad
      </h1>
      <p className="text-lg max-w-xl mb-6">
        World-class online cybersecurity and AI training for individuals and corporates.
      </p>
      <a
        href="/courses"
        className="inline-block bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-gray-100 transition"
      >
        Explore Courses
      </a>
    </section>
  );
}

