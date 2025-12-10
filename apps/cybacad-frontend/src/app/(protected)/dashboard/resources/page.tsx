"use client";

import React from "react";
import { FileText, Download, Terminal, Shield, FileCode } from "lucide-react";

const resources = [
  {
    category: "Cheatsheets",
    items: [
      { name: "SQL Injection Master Sheet", type: "PDF", size: "1.2 MB", icon: FileText },
      { name: "Linux Privilege Escalation", type: "PDF", size: "850 KB", icon: FileText },
      { name: "Nmap Command Reference", type: "PDF", size: "2.4 MB", icon: FileText },
    ]
  },
  {
    category: "Tools & Scripts",
    items: [
      { name: "Kali Linux Config Pack", type: "ZIP", size: "15 MB", icon: Terminal },
      { name: "Reverse Shell Generator.py", type: "PY", size: "12 KB", icon: FileCode },
    ]
  },
  {
    category: "Lab Manuals",
    items: [
      { name: "CYBER-101 Workbook", type: "PDF", size: "5.5 MB", icon: Shield },
      { name: "CYBER-102 Workbook", type: "PDF", size: "6.1 MB", icon: Shield },
    ]
  }
];

export default function ResourcesPage() {
  return (
    <div className="max-w-5xl mx-auto text-white">
      <header className="mb-10">
        <h1 className="text-3xl font-bold mb-2">Learning Resources</h1>
        <p className="text-slate-400">Download supplementary materials, tools, and manuals.</p>
      </header>

      <div className="space-y-10">
        {resources.map((section) => (
          <div key={section.category}>
            <h2 className="text-xl font-bold text-slate-200 mb-4 border-b border-slate-800 pb-2">
              {section.category}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {section.items.map((item) => (
                <div key={item.name} className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-center justify-between group hover:border-blue-500/50 transition-all hover:shadow-lg hover:shadow-blue-900/10">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-slate-800 rounded-lg text-slate-400 group-hover:text-blue-400 group-hover:bg-blue-500/10 transition-colors">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-slate-200">{item.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] font-bold bg-slate-800 px-1.5 py-0.5 rounded text-slate-400 border border-slate-700">
                          {item.type}
                        </span>
                        <span className="text-xs text-slate-500">{item.size}</span>
                      </div>
                    </div>
                  </div>
                  
                  <button className="h-8 w-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}