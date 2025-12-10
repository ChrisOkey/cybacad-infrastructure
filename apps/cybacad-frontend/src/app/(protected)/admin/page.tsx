"use client";

import React, { useEffect } from "react";
import { useAdmin } from "@/hooks/useAdmin";
import Link from "next/link";
import { Users, BookOpen, DollarSign, PlusCircle, Activity } from "lucide-react";

export default function AdminDashboard() {
  const { isAdmin, loading, protectRoute } = useAdmin();

  // Guard the page
  useEffect(() => protectRoute(), [isAdmin, loading]);

  if (loading || !isAdmin) return <div className="p-10 text-white">Verifying Access...</div>;

  return (
    <div className="max-w-6xl mx-auto text-white">
      <header className="mb-10 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold mb-2">Admin Portal</h1>
          <p className="text-slate-400">Manage your content, users, and platform settings.</p>
        </div>
        <Link href="/admin/courses/new" className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition-colors">
          <PlusCircle className="w-5 h-5" /> Create New Course
        </Link>
      </header>

      {/* STATS OVERVIEW */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        {[
          { label: "Total Students", value: "1,240", icon: Users, color: "blue" },
          { label: "Active Courses", value: "8", icon: BookOpen, color: "emerald" },
          { label: "Total Revenue", value: "$12.4k", icon: DollarSign, color: "green" },
          { label: "Server Status", value: "Healthy", icon: Activity, color: "purple" },
        ].map((stat) => (
          <div key={stat.label} className="bg-slate-900 border border-slate-800 p-6 rounded-xl flex items-center gap-4">
            <div className={`p-3 rounded-lg bg-${stat.color}-500/10 text-${stat.color}-500`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-xs font-bold text-slate-500 uppercase">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* QUICK ACTIONS */}
      <h2 className="text-xl font-bold mb-6">Management Modules</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Course Manager */}
        <Link href="/admin/courses" className="bg-slate-900 border border-slate-800 p-6 rounded-xl hover:border-blue-500/50 transition-all group">
          <BookOpen className="w-8 h-8 text-blue-500 mb-4 group-hover:scale-110 transition-transform" />
          <h3 className="text-lg font-bold text-white mb-2">Course Manager</h3>
          <p className="text-sm text-slate-400">Add, edit, or delete courses. Generate outlines with Gemini AI.</p>
        </Link>

        {/* User Manager */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl hover:border-purple-500/50 transition-all group cursor-pointer">
          <Users className="w-8 h-8 text-purple-500 mb-4 group-hover:scale-110 transition-transform" />
          <h3 className="text-lg font-bold text-white mb-2">User Management</h3>
          <p className="text-sm text-slate-400">View student progress, manage roles, and ban users.</p>
        </div>

        {/* Revenue */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl hover:border-green-500/50 transition-all group cursor-pointer">
          <DollarSign className="w-8 h-8 text-green-500 mb-4 group-hover:scale-110 transition-transform" />
          <h3 className="text-lg font-bold text-white mb-2">Financials</h3>
          <p className="text-sm text-slate-400">View subscriptions, download invoices, and manage pricing.</p>
        </div>
      </div>
    </div>
  );
}