import Sidebar from "@/components/layout/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-950 flex">
      {/* Left Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      {/* We add ml-64 to push content to the right of the fixed sidebar */}
      <main className="flex-1 ml-64 p-8">
        {children}
      </main>
    </div>
  );
}