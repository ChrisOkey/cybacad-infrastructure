// src/app/(protected)/dashboard/layout.tsx
"use client";

import Link from "next/link";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <aside
        style={{
          width: "240px",
          background: "#f9f9f9",
          borderRight: "1px solid #ddd",
          padding: "1rem",
        }}
      >
        <h2 style={{ marginBottom: "1rem" }}>My Learning</h2>
        <nav style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <Link href="/dashboard">🏠 Dashboard</Link>
          <Link href="/dashboard/courses">📚 Courses</Link>
          <Link href="/dashboard/progress">📈 Progress</Link>
          <Link href="/dashboard/settings">⚙️ Settings</Link>
        </nav>
      </aside>

      {/* Main content */}
      <main style={{ flex: 1, padding: "2rem" }}>
        {children}
      </main>
    </div>
  );
}
