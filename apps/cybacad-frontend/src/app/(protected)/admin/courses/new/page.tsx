"use client";

import React, { useState } from "react";
import { Sparkles, Save, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CreateCoursePage() {
  const [topic, setTopic] = useState("");
  const [outline, setOutline] = useState("");
  const [loading, setLoading] = useState(false);

  // --- GEMINI INTEGRATION (Via Backend) ---
  const generateWithGemini = async () => {
    if (!topic) return alert("Please enter a topic first!");
    setLoading(true);

    try {
      // Call YOUR Backend (which holds the API Key)
      const res = await fetch('http://localhost:5000/api/ai/generate-course', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic })
      });

      const data = await res.json();

      if (res.ok) {
        setOutline(data.outline);
      } else {
        alert("Server Error: " + (data.error || "Unknown error"));
      }
      
    } catch (error) {
      console.error("Connection Error:", error);
      alert("Failed to connect to backend. Is the server running on port 8080?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto text-white pb-20">
      
      {/* Back Link */}
      <Link href="/admin" className="flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
      </Link>

      <h1 className="text-3xl font-bold mb-8">Create New Course</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* LEFT COLUMN: Input & Settings */}
        <div className="space-y-6">
          
          {/* AI Generator Card */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
            <label className="block text-sm font-bold text-slate-400 mb-2">Course Topic</label>
            <input 
              type="text" 
              placeholder="e.g. Advanced Python for Pentesters"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:border-blue-500 outline-none transition-colors"
            />
            
            <button 
              onClick={generateWithGemini}
              disabled={loading}
              // ✅ FIXED: Updated for Tailwind v4 syntax
              className="mt-4 w-full bg-linear-to-r from-blue-600 to-purple-600 hover:opacity-90 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? <Loader2 className="animate-spin w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
              Generate with Gemini AI
            </button>
            <p className="text-xs text-slate-500 mt-2 text-center">Securely Powered by Backend API</p>
          </div>

          {/* Manual Settings Card */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
             <h3 className="font-bold text-white mb-4">Course Details</h3>
             <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Difficulty</label>
                  <select className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-slate-300">
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                  </select>
                </div>
                
                <div className="h-32 bg-slate-950/50 rounded border border-dashed border-slate-800 flex items-center justify-center text-slate-500 text-sm hover:border-blue-500/50 hover:text-blue-400 transition-colors cursor-pointer">
                   Upload Thumbnail Image
                </div>
             </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Output Editor */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl h-full flex flex-col">
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-bold text-slate-400">AI Generated Outline</label>
            <span className="text-xs text-slate-500 font-mono">Markdown Format</span>
          </div>
          
          <textarea 
            value={outline}
            onChange={(e) => setOutline(e.target.value)}
            placeholder="AI content will appear here..."
            className="flex-1 w-full bg-slate-950 border border-slate-800 rounded-lg p-4 text-slate-300 font-mono text-sm leading-relaxed outline-none focus:border-blue-500 min-h-[400px] resize-none"
          />
          
          <button className="mt-4 w-full bg-green-600 hover:bg-green-500 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors">
            <Save className="w-5 h-5" /> Save Course to Database
          </button>
        </div>

      </div>
    </div>
  );
}