"use client";

import React from "react";
import Link from "next/link";
import { Plus, BookOpen, Users, Activity, Terminal } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="max-w-7xl mx-auto text-white pb-20 pt-10 px-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Admin Command Center</h1>
          <p className="text-slate-400">Manage courses, monitor students, and generate AI content.</p>
        </div>
        
        <Link 
          href="/admin/courses/new" 
          className="bg-teal-500 hover:bg-teal-400 text-black font-bold py-3 px-6 rounded-lg flex items-center gap-2 transition-all shadow-lg shadow-teal-900/20"
        >
          <Plus className="w-5 h-5" />
          <span>Create New Course</span>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-blue-500/10 rounded-lg text-blue-400">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <p className="text-slate-400 text-sm font-bold">Total Courses</p>
              <h3 className="text-2xl font-bold text-white">12</h3>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-purple-500/10 rounded-lg text-purple-400">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-slate-400 text-sm font-bold">Active Students</p>
              <h3 className="text-2xl font-bold text-white">1,204</h3>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-green-500/10 rounded-lg text-green-400">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <p className="text-slate-400 text-sm font-bold">System Status</p>
              <h3 className="text-2xl font-bold text-white">Online</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <Terminal className="w-5 h-5 text-teal-500" />
        Quick Actions
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/admin/courses/new" className="group bg-slate-900 border border-slate-800 p-8 rounded-xl hover:border-teal-500/50 transition-all">
          <div className="h-12 w-12 bg-teal-500/10 rounded-full flex items-center justify-center text-teal-400 mb-4 group-hover:scale-110 transition-transform">
            <Plus className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Generate AI Course</h3>
          <p className="text-slate-400 text-sm">Use Gemini AI to instantly create a full curriculum with Python labs.</p>
        </Link>

        <div className="group bg-slate-900 border border-slate-800 p-8 rounded-xl opacity-50 cursor-not-allowed">
          <div className="h-12 w-12 bg-slate-800 rounded-full flex items-center justify-center text-slate-500 mb-4">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-500 mb-2">Manage Users (Coming Soon)</h3>
          <p className="text-slate-600 text-sm">User management features are currently under development.</p>
        </div>
      </div>

    </div>
  );
}