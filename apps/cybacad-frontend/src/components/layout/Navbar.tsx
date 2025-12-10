"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
// ✅ Import Hook and Icons
import { useAuth } from "@/context/AuthContext";
import { Terminal, Menu, X, LogOut, UserCircle } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  
  // ✅ Get User State
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? "bg-gray-950/90 backdrop-blur-md border-b border-gray-800" : "bg-transparent"
    }`}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-teal-500/20 rounded flex items-center justify-center border border-teal-500/50 group-hover:bg-teal-500/30 transition-colors">
            <Terminal className="w-5 h-5 text-teal-400" />
          </div>
          <span className="font-bold text-lg text-white tracking-tight">
            CYB<span className="text-teal-400">ACAD</span>
          </span>
        </Link>

        {/* DESKTOP LINKS */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Home</Link>
          <Link href="/learn/CYBER-101" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Courses</Link>
          <Link href="#" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Blog</Link>
        </div>

        {/* ✅ AUTH BUTTONS */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4 pl-6 border-l border-gray-800">
               {/* User Avatar */}
               {user.photoURL ? (
                 <img src={user.photoURL} alt="User" className="w-8 h-8 rounded-full border border-gray-700" />
               ) : (
                 <UserCircle className="w-8 h-8 text-gray-400" />
               )}
               
               <div className="flex flex-col">
                 <span className="text-xs font-bold text-white leading-none">{user.displayName?.split(" ")[0]}</span>
                 <span className="text-[10px] text-teal-500 uppercase font-bold tracking-wider">Learner</span>
               </div>

               <button 
                 onClick={() => logout()} 
                 className="p-2 hover:bg-red-500/10 rounded-full text-gray-400 hover:text-red-400 transition-colors ml-2"
                 title="Log Out"
               >
                 <LogOut className="w-4 h-4" />
               </button>
            </div>
          ) : (
            <>
              <Link href="/login" className="text-gray-300 hover:text-white text-sm font-medium">Log In</Link>
              <Link href="/learn/CYBER-101" className="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white text-sm font-bold rounded transition-all shadow-lg shadow-teal-900/20">
                Start Hacking
              </Link>
            </>
          )}
        </div>

        {/* MOBILE TOGGLE */}
        <button className="md:hidden text-gray-300" onClick={() => setIsMobileOpen(!isMobileOpen)}>
          {isMobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {isMobileOpen && (
        <div className="md:hidden bg-gray-900 border-b border-gray-800 p-4 space-y-4">
          <Link href="/" className="block text-gray-300 hover:text-white">Home</Link>
          <Link href="/learn/CYBER-101" className="block text-gray-300 hover:text-white">Courses</Link>
          {user ? (
             <button onClick={() => logout()} className="block text-red-400 hover:text-red-300">Log Out</button>
          ) : (
             <Link href="/login" className="block text-teal-400 hover:text-teal-300 font-bold">Log In</Link>
          )}
        </div>
      )}
    </nav>
  );
}