"use client"; // 👈 THIS IS THE CRITICAL MISSING PIECE

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  BookOpen, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  Shield
} from "lucide-react";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, href: "/dashboard" }, // or /admin
    { name: "Admin Portal", icon: Shield, href: "/admin" },
    { name: "Course Manager", icon: BookOpen, href: "/admin/courses/new" },
    { name: "Settings", icon: Settings, href: "/settings" },
  ];

  return (
    <div className="min-h-screen bg-gray-950 flex text-white font-sans">
      
      {/* MOBILE OVERLAY */}
      {!isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setIsSidebarOpen(true)}
        />
      )}

      {/* SIDEBAR */}
      <aside 
        className={`fixed md:sticky top-0 h-screen w-64 bg-gray-900 border-r border-gray-800 transition-all duration-300 z-30 flex flex-col
        ${!isSidebarOpen ? '-translate-x-full md:translate-x-0 md:w-20' : 'translate-x-0'}
        `}
      >
        {/* Sidebar Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-800">
           {isSidebarOpen ? (
             <span className="font-bold text-xl tracking-wider text-teal-400">CYBER<span className="text-white">ACAD</span></span>
           ) : (
             <span className="font-bold text-xl text-teal-400 mx-auto">C</span>
           )}
           
           <button 
             onClick={() => setIsSidebarOpen(!isSidebarOpen)}
             className="text-gray-400 hover:text-white md:hidden"
           >
             <X className="w-6 h-6" />
           </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 py-6 px-3 space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.href} 
                href={item.href}
                className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all group
                  ${isActive 
                    ? "bg-teal-500/10 text-teal-400 border border-teal-500/20" 
                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                  }
                `}
              >
                <item.icon className={`w-5 h-5 ${isActive ? "text-teal-400" : "text-gray-500 group-hover:text-white"}`} />
                
                {isSidebarOpen && (
                  <span className="font-medium whitespace-nowrap">{item.name}</span>
                )}
                
                {/* Tooltip for collapsed mode */}
                {!isSidebarOpen && (
                  <div className="hidden md:group-hover:block absolute left-20 bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-lg border border-gray-700 z-50">
                    {item.name}
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Logout Footer */}
        <div className="p-4 border-t border-gray-800">
          <button className="flex items-center gap-3 text-gray-400 hover:text-red-400 transition-colors w-full px-3 py-2">
            <LogOut className="w-5 h-5" />
            {isSidebarOpen && <span>Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-h-screen relative">
        {/* Mobile Header Toggle */}
        <header className="md:hidden h-16 bg-gray-900 border-b border-gray-800 flex items-center px-4">
           <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-white">
             <Menu className="w-6 h-6" />
           </button>
           <span className="ml-4 font-bold text-lg">CybAcad Portal</span>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>

    </div>
  );
}