"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Icon } from "./Icon";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // Sync dark mode with <html> class
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 text-xl font-bold text-gray-900 dark:text-white">
          <Icon name="BookOpen" className="w-6 h-6 text-blue-600 dark:text-teal-400" />
          <span>Cybacad</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-6 text-sm font-medium">
          <Link href="/" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-teal-400">Home</Link>
          <Link href="/courses" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-teal-400">Courses</Link>
          <Link href="/about" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-teal-400">About</Link>
          <Link href="/contact" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-teal-400">Contact</Link>
          <Link href="/learning-ide" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-teal-400">IDE</Link>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          {/* Dark Mode Toggle */}
          <button
            onClick={() => setIsDark(!isDark)}
            className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-teal-400 transition"
            aria-label="Toggle dark mode"
          >
            <Icon name="Lightbulb" className="w-5 h-5" />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-teal-400"
            aria-label="Toggle mobile menu"
          >
            <Icon name={isOpen ? "ChevronLeft" : "ChevronRight"} className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 text-sm font-medium">
          <Link href="/" className="block text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-teal-400">Home</Link>
          <Link href="/courses" className="block text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-teal-400">Courses</Link>
          <Link href="/about" className="block text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-teal-400">About</Link>
          <Link href="/contact" className="block text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-teal-400">Contact</Link>
          <Link href="/learning-ide" className="block text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-teal-400">IDE</Link>
        </div>
      )}
    </nav>
  );
}
