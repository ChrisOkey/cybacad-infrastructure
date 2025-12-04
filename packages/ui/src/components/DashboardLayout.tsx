"use client"; // ✅ Essential for Next.js App Router hooks

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type DashboardLayoutProps = {
  children: ReactNode;
};

// ✅ Named Export (Matches your index.ts barrel file)
export function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();

  const getLinkClass = (path: string) => {
    // Active if exact match OR if it's a sub-path (e.g. /dashboard/settings matches /dashboard)
    const isActive = pathname === path || (path !== "/dashboard" && pathname?.startsWith(path));
    
    return `block px-3 py-2 rounded-md transition-colors ${
      isActive 
        ? "bg-indigo-600 text-white" 
        : "text-gray-300 hover:bg-slate-700 hover:text-white"
    }`;
  };

  return (
    // ✅ LAYOUT FIX: 'flex-row' ensures side-by-side, 'overflow-hidden' prevents double scrolls
    <div className="flex flex-row min-h-screen bg-gray-50 overflow-hidden">
      
      {/* Sidebar */}
      {/* ✅ 'sticky top-0 h-screen' keeps it fixed while scrolling */}
      {/* ✅ 'z-20' ensures it stays above content if screen gets small */}
      {/* ✅ 'shrink-0' ensures it never collapses width */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col shrink-0 h-screen sticky top-0 z-20">
        <div className="p-6">
          <h2 className="text-2xl font-bold tracking-tight">📚 Cybacad</h2>
        </div>
        
        <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
          <Link href="/dashboard" className={getLinkClass("/dashboard")}>
            🏠 Home
          </Link>
          <Link href="/dashboard/courses" className={getLinkClass("/dashboard/courses")}>
            📚 Courses
          </Link>
          <Link href="/dashboard/progress" className={getLinkClass("/dashboard/progress")}>
            📈 Progress
          </Link>
          <Link href="/dashboard/leaderboard" className={getLinkClass("/dashboard/leaderboard")}>
            🏆 Leaderboard
          </Link>
          <Link href="/learning-ide" className={getLinkClass("/learning-ide")}>
            💻 Learning IDE
          </Link>
          <Link href="/dashboard/settings" className={getLinkClass("/dashboard/settings")}>
            ⚙️ Settings
          </Link>
        </nav>

        <div className="p-4 border-t border-slate-700">
           <p className="text-xs text-slate-400">© 2025 Cybacad</p>
        </div>
      </aside>

      {/* Main Content Area */}
      {/* ✅ 'relative z-10' creates a new stacking context so it doesn't get covered */}
      {/* ✅ 'h-screen overflow-auto' makes ONLY this part scrollable */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-auto relative z-10">
        
        {/* Topbar */}
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-8 shadow-sm sticky top-0 z-30">
          <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
              U
            </div>
            <span className="text-sm font-medium text-gray-700">User</span>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 p-8">
          {children}
        </div>
      </main>
    </div>
  );
}