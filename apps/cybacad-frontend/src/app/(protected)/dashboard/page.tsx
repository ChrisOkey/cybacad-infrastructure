import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Cybacad",
  description: "Overview of your learning progress",
};

export default function DashboardPage() {
  // Mock data - In a real app, you would fetch this from your backend
  const stats = [
    { label: "Courses in Progress", value: "3" },
    { label: "Completed Modules", value: "12" },
    { label: "Total XP", value: "1,250" },
  ];

  const recentCourses = [
    { id: 1, title: "Intro to Cybersecurity", progress: 75, lastAccessed: "2 hours ago" },
    { id: 2, title: "Network Defense", progress: 30, lastAccessed: "1 day ago" },
    { id: 3, title: "Ethical Hacking 101", progress: 10, lastAccessed: "3 days ago" },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Welcome back, User! 👋</h1>
        <p className="text-gray-600 mt-1">Here is what is happening with your learning journey.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <p className="text-sm font-medium text-gray-500">{stat.label}</p>
            <p className="text-3xl font-bold text-indigo-600 mt-2">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Recent Activity Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-800">Recent Courses</h2>
        </div>
        <div className="divide-y divide-gray-100">
          {recentCourses.map((course) => (
            <div key={course.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-gray-900">{course.title}</h3>
                <span className="text-xs text-gray-500">{course.lastAccessed}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-indigo-600 h-2 rounded-full" 
                  style={{ width: `${course.progress}%` }}
                ></div>
              </div>
              <p className="text-xs text-right text-gray-500 mt-1">{course.progress}% Complete</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}