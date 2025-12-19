import React from "react";
import CourseCatalog from "@/components/CourseCatalog";
import { Lock } from "lucide-react";

export default function ProCoursesPage() {
  return (
    <div className="max-w-6xl mx-auto text-white">
      <div className="mb-8 flex justify-between items-end">
         <div>
            <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
               Pro Certification Paths <span className="text-amber-500 text-sm font-normal bg-amber-500/10 px-2 py-1 rounded border border-amber-500/20">PREMIUM</span>
            </h1>
            <p className="text-slate-400">Career-focused training, advanced labs, and official certifications.</p>
         </div>
         <button className="hidden md:flex bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold px-4 py-2 rounded-lg items-center gap-2 hover:opacity-90 transition-opacity">
            <Lock className="w-4 h-4" /> Unlock All Access
         </button>
      </div>
      <CourseCatalog type="paid" />
    </div>
  );
}