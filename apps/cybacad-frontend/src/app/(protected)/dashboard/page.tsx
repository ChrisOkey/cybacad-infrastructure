"use client"; // 👈 CRITICAL: This was likely missing

import React from "react";
import Link from "next/link";
import { Play, Clock, Shield, Award } from "lucide-react";

export default function StudentDashboard() {
  return (
    <div className="max-w-7xl mx-auto text-white pb-20 pt-10 px-6">
      
      {/* Welcome Header */}
      <div className="mb-12">
        <h1 className="text-3xl font-bold mb-2">Welcome back, Recruit.</h1>
        <p className="text-slate-400">Your current rank: <span className="text-teal-400 font-bold">Script Kiddie</span></p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl flex items-center gap-4">
          <div className="p-3 bg-teal-500/10 rounded-lg text-teal-400">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-slate-400 text-sm font-bold">Hours Hacked</p>
            <h3 className="text-2xl font-bold text-white">4.5</h3>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl flex items-center gap-4">
          <div className="p-3 bg-purple-500/10 rounded-lg text-purple-400">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <p className="text-slate-400 text-sm font-bold">Labs Completed</p>
            <h3 className="text-2xl font-bold text-white">2</h3>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl flex items-center gap-4">
          <div className="p-3 bg-yellow-500/10 rounded-lg text-yellow-400">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <p className="text-slate-400 text-sm font-bold">Certificates</p>
            <h3 className="text-2xl font-bold text-white">0</h3>
          </div>
        </div>
      </div>

      {/* Continue Learning Section */}
      <h2 className="text-xl font-bold text-white mb-6">Continue Learning</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Placeholder for an active course */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-teal-500/50 transition-all group">
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">In Progress</span>
              <h3 className="text-lg font-bold text-white mt-1">Python Keyloggers 101</h3>
            </div>
            <div className="h-10 w-10 bg-teal-500 rounded-full flex items-center justify-center text-black group-hover:scale-110 transition-transform">
              <Play className="w-5 h-5 fill-current" />
            </div>
          </div>
          
          <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden mb-2">
            <div className="bg-teal-500 h-full w-[45%]"></div>
          </div>
          <p className="text-xs text-slate-500 text-right">45% Complete</p>
          
          <Link href="/learn/python-keyloggers-101" className="absolute inset-0" />
        </div>

        {/* Empty State / Browse More */}
        <Link href="/" className="bg-slate-900/50 border border-dashed border-slate-800 rounded-xl p-6 flex flex-col items-center justify-center text-slate-500 hover:text-white hover:border-slate-600 transition-all cursor-pointer">
          <div className="h-12 w-12 bg-slate-800 rounded-full flex items-center justify-center mb-3">
            <Play className="w-5 h-5 ml-1" />
          </div>
          <span className="font-bold">Browse Course Catalog</span>
        </Link>
      </div>

    </div>
  );
}