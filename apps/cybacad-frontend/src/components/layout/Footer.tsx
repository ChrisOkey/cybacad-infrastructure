import React from "react";
import Link from "next/link";
import { Terminal, Github, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-950 border-t border-gray-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        
        {/* BRAND COLUMN */}
        <div className="space-y-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-teal-500/20 rounded flex items-center justify-center border border-teal-500/50">
              <Terminal className="w-5 h-5 text-teal-400" />
            </div>
            <span className="font-bold text-lg text-white">CYBACAD</span>
          </Link>
          <p className="text-gray-400 text-sm leading-relaxed">
            The interactive learning platform designed to turn beginners into cybersecurity professionals.
          </p>
          <div className="flex gap-4 pt-2">
            <a href="#" className="text-gray-400 hover:text-white"><Twitter className="w-5 h-5" /></a>
            <a href="#" className="text-gray-400 hover:text-white"><Github className="w-5 h-5" /></a>
            <a href="#" className="text-gray-400 hover:text-white"><Linkedin className="w-5 h-5" /></a>
          </div>
        </div>

        {/* LINKS 1 - LEARN */}
        <div>
          <h4 className="font-bold text-white mb-4">Learn</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            {/* ✅ FIXED: Point to the Catalog instead of a broken ID */}
            <li><Link href="/" className="hover:text-teal-400">Web Security</Link></li>
            <li><Link href="/" className="hover:text-teal-400">Network Defense</Link></li>
            <li><Link href="/" className="hover:text-teal-400">Python for Hackers</Link></li>
          </ul>
        </div>

        {/* LINKS 2 - COMMUNITY */}
        <div>
          <h4 className="font-bold text-white mb-4">Community</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link href="#" className="hover:text-teal-400">Blog</Link></li>
            <li><Link href="#" className="hover:text-teal-400">Discord Server</Link></li>
            <li><Link href="#" className="hover:text-teal-400">Collaborators</Link></li>
          </ul>
        </div>

        {/* LINKS 3 - COMPANY */}
        <div>
          <h4 className="font-bold text-white mb-4">Company</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link href="#" className="hover:text-teal-400">About Us</Link></li>
            <li><Link href="#" className="hover:text-teal-400">Privacy Policy</Link></li>
            <li><Link href="#" className="hover:text-teal-400">Terms of Service</Link></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} CybAcad. All rights reserved.
      </div>
    </footer>
  );
}