"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useUserProgress } from "@/hooks/useUserProgress";
import { Shield, Clock, Award, ArrowRight, PlayCircle } from "lucide-react";

// --- HELPER COMPONENT: Google Style Circular Progress ---
const CircularProgress = ({ percentage }: { percentage: number }) => {
  const radius = 24;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative w-16 h-16 flex items-center justify-center">
      {/* Background Circle */}
      <svg className="transform -rotate-90 w-full h-full">
        <circle
          cx="32"
          cy="32"
          r={radius}
          stroke="currentColor"
          strokeWidth="6"
          fill="transparent"
          className="text-slate-800"
        />
        {/* Progress Ring (Blue) */}
        <circle
          cx="32"
          cy="32"
          r={radius}
          stroke="currentColor"
          strokeWidth="6"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="text-blue-500 transition-all duration-1000 ease-out"
        />
      </svg>
      {/* Percentage Text */}
      <span className="absolute text-xs font-bold text-slate-300">{percentage}%</span>
    </div>
  );
};

export default function DashboardHome() {
  const { user } = useAuth();
  const { completedLessons } = useUserProgress();

  // Simple logic: If user has completed at least 1 lesson, show 25% progress for demo
  const progressPercent = completedLessons.length > 0 ? 25 : 0;

  return (
    <div className="max-w-6xl mx-auto text-white">
      
      {/* 1. WELCOME HEADER */}
      <header className="mb-10 flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">
            Dashboard
          </h1>
          <p className="text-slate-400">
            Welcome back, <span className="text-white font-semibold">{user?.displayName || "Analyst"}</span>. Track your certification progress.
          </p>
        </div>
        
        {/* Rank Badge */}
        <div className="hidden md:block text-right">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Current Rank</p>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm font-bold border border-blue-500/20">
            <Shield className="w-4 h-4" /> Novice Analyst
          </span>
        </div>
      </header>

      {/* 2. STATS ROW */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {[
          { label: "Lessons Completed", value: completedLessons.length, icon: Shield, color: "blue" },
          { label: "Learning Hours", value: "1.5", icon: Clock, color: "emerald" },
          { label: "Skill Badges", value: "0", icon: Award, color: "purple" },
        ].map((stat) => (
          <div key={stat.label} className="bg-slate-900 border border-slate-800 p-6 rounded-xl flex items-center gap-5 hover:border-slate-700 transition-colors">
            <div className={`p-3 rounded-lg bg-${stat.color}-500/10 text-${stat.color}-500`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <div className="text-3xl font-bold text-white leading-none mb-1">{stat.value}</div>
              <div className="text-sm font-medium text-slate-500">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* 3. ACTIVE LEARNING PATHS */}
      <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <PlayCircle className="w-5 h-5 text-blue-500" /> In Progress
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* CARD 1: Web Security (Active) */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex items-center justify-between group hover:border-blue-500/50 transition-all hover:shadow-lg hover:shadow-blue-900/10">
          <div className="flex items-center gap-6">
            <CircularProgress percentage={progressPercent} />
            <div>
              <div className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-1">CYBER-101</div>
              <h3 className="text-lg font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">Web Security Fundamentals</h3>
              <p className="text-sm text-slate-400">Module 1: Injection Attacks</p>
            </div>
          </div>
          <Link href="/learn/CYBER-101" className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* CARD 2: Network Defense (Not Started) */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex items-center justify-between group hover:border-slate-700 transition-all opacity-75 hover:opacity-100">
          <div className="flex items-center gap-6">
            <CircularProgress percentage={0} />
            <div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">CYBER-102</div>
              <h3 className="text-lg font-bold text-white mb-1">Network Defense Essentials</h3>
              <p className="text-sm text-slate-400">Not Started</p>
            </div>
          </div>
          <Link href="/learn/CYBER-102" className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-white transition-all">
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

      </div>
    </div>
  );
}