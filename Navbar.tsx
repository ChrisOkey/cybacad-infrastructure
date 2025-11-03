// components/Navbar.tsx
export default function Navbar() {
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <a href="/" className="text-2xl font-bold text-blue-700">Cybacad</a>
      <ul className="flex space-x-6 text-gray-700 font-medium">
        <li><a href="/courses" className="hover:text-blue-600">Courses</a></li>
        <li><a href="/labs" className="hover:text-blue-600">Labs</a></li>
        <li><a href="/blog" className="hover:text-blue-600">Blog</a></li>
        <li><a href="/login" className="text-blue-700 font-semibold">Login</a></li>
      </ul>
    </nav>
  );
}
