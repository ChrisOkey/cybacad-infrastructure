import React from "react";
import Link from "next/link";
import { PlayCircle, ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 px-6 bg-gray-950 overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        
        {/* TEXT CONTENT */}
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/30 border border-blue-800 text-blue-300 text-xs font-bold uppercase tracking-wide mb-6">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
            New Cohort Starting Soon
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
            Cyber Security <br />
            {/* ✅ FIXED: Modern Gradient Syntax */}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-teal-400 to-blue-500">
              Simplified.
            </span>
          </h1>
          
          <p className="text-lg text-gray-400 mb-8 leading-relaxed max-w-lg">
            Stop guessing. Start learning with structured, interactive labs designed by industry experts. Join me, and let's break into the industry together.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/learn/CYBER-101" className="px-8 py-4 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded flex items-center justify-center gap-2 transition-transform hover:-translate-y-1">
              Start Learning Free <ArrowRight className="w-4 h-4" />
            </Link>
            <button className="px-8 py-4 bg-gray-800 hover:bg-gray-700 text-white font-bold rounded border border-gray-700 flex items-center justify-center gap-2 transition-colors">
              <PlayCircle className="w-4 h-4 text-teal-400" /> Watch Intro
            </button>
          </div>
        </div>

        {/* VIDEO / FOUNDER CARD */}
        <div className="relative">
          <div className="relative rounded-2xl overflow-hidden border border-gray-800 shadow-2xl shadow-teal-900/20 group">
            
            {/* ✅ FIXED: Used aspect-video for cleaner 16:9 ratio */}
            <div className="aspect-video bg-gray-900 relative">
              
              {/* Optional: Real Image with object-cover
              <img 
                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop" 
                className="w-full h-full object-cover opacity-50" 
                alt="Cyber Security Lab"
              /> 
              */}
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-linear-to-tr from-gray-900 to-teal-900/30" />
              
              <div className="absolute inset-0 flex items-center justify-center">
                 <div className="w-16 h-16 bg-teal-500/90 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform shadow-lg shadow-teal-500/30">
                    <PlayCircle className="w-8 h-8 text-white ml-1" />
                 </div>
              </div>
            </div>
            
            {/* Founder Caption */}
            <div className="bg-gray-900 p-4 border-t border-gray-800">
              <p className="text-sm text-gray-300 italic">"I built CybAcad because I was tired of boring theory. This is the platform I wish I had."</p>
              <div className="flex items-center gap-2 mt-2">
                <div className="w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center text-[10px] text-white font-bold">C</div>
                <span className="text-xs font-bold text-teal-400">Chris • Founder</span>
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-teal-500/5 rounded-full blur-xl"></div>
        </div>

      </div>
    </section>
  );
}