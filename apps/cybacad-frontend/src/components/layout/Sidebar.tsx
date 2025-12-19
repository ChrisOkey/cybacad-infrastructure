"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  BookOpen, 
  Settings, 
  User, 
  ShieldCheck, 
  LogOut, 
  Terminal,
  FolderDown, 
  CreditCard,
  Lock,
  Gift,     // ✅ NEW: For Free Courses
  Diamond   // ✅ NEW: For Pro Courses
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useAdmin } from "@/hooks/useAdmin";

export default function Sidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();
  const { isAdmin } = useAdmin();

  const menuItems = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "My Learning", href: "/dashboard/progress", icon: ShieldCheck },
    
    // ✅ NEW SECTIONS
    { name: "Free Courses", href: "/dashboard/catalog/free", icon: Gift },
    { name: "Pro Certification", href: "/dashboard/catalog/pro", icon: Diamond },
    
    { name: "Resources", href: "/dashboard/resources", icon: FolderDown },
    { name: "Billing & Plans", href: "/dashboard/billing", icon: CreditCard },
    { name: "My Profile", href: "/dashboard/profile", icon: User },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  return (
    <aside className="fixed top-0 left-0 h-screen w-64 bg-slate-900 border-r border-slate-800 flex flex-col z-40">
      
      {/* 1. BRAND HEADER */}
      <div className="h-16 flex items-center px-6 border-b border-slate-800">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center text-white shadow-lg shadow-blue-900/20">
            <Terminal className="w-5 h-5" />
          </div>
          <span className="font-semibold text-lg text-slate-100 tracking-tight">
            Cyb<span className="text-blue-500">Acad</span>
          </span>
        </Link>
      </div>

      {/* 2. MENU ITEMS */}
      <div className="flex-1 py-6 px-3 space-y-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-800">
        <div className="text-[11px] font-bold text-slate-500 uppercase tracking-widest px-3 mb-2">
          Platform
        </div>
        
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.name} 
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all ${
                isActive 
                  ? "bg-blue-600 text-white shadow-md shadow-blue-900/20" 
                  : "text-slate-400 hover:bg-slate-800 hover:text-slate-100"
              }`}
            >
              <item.icon className={`w-5 h-5 ${isActive ? "text-white" : "text-slate-500"}`} />
              {item.name}
            </Link>
          );
        })}

        {/* ADMIN SECTION */}
        {isAdmin && (
           <>
             <div className="text-[11px] font-bold text-red-400 uppercase tracking-widest px-3 mt-6 mb-2">
               Administration
             </div>
             <Link 
               href="/admin"
               className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all ${
                 pathname.startsWith("/admin")
                   ? "bg-red-500/10 text-red-400 border border-red-500/20" 
                   : "text-slate-400 hover:bg-slate-800 hover:text-red-400"
               }`}
             >
               <Lock className="w-5 h-5" />
               Admin Portal
             </Link>
           </>
         )}
      </div>

      {/* 3. USER FOOTER */}
      <div className="p-4 border-t border-slate-800">
        <button 
          onClick={logout}
          className="flex items-center gap-3 w-full px-3 py-2 text-sm font-medium text-slate-400 hover:bg-red-500/10 hover:text-red-400 rounded-md transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}