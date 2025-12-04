"use client";

import React from "react";

// Export the props type so it can be reused if needed
export type GeminiPanelProps = {
  response: string;
};

// ✅ CHANGED: "export default function" -> "export function"
export function GeminiPanel({ response }: GeminiPanelProps) {
  return (
    <div className="bg-gradient-to-br from-indigo-50 to-white border border-indigo-100 p-4 rounded-lg mt-4 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xl" role="img" aria-label="robot">🤖</span>
        <h2 className="font-semibold text-indigo-900">Gemini Feedback</h2>
      </div>
      
      <div className="bg-white/80 p-3 rounded-md border border-indigo-50 text-sm text-gray-700 whitespace-pre-wrap leading-relaxed font-medium">
        {response || "Run your code to see AI feedback here..."}
      </div>
    </div>
  );
}