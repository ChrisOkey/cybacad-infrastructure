// ❌ Removed "use client" - This is now a Server Component (Better Performance)

export type CourseCardProps = {
  title: string;
  description: string;
  progress: number;
};

// ✅ CHANGED: "export default function" -> "export function"
export function CourseCard({ title, description, progress }: CourseCardProps) {
  // Ensure progress is between 0 and 100
  const safeProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow duration-200">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full">
          Module
        </span>
      </div>
      
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>

      {/* Progress Bar Container */}
      <div className="w-full bg-gray-100 rounded-full h-2.5 mb-2 overflow-hidden">
        <div
          role="progressbar"
          aria-valuenow={safeProgress}
          aria-valuemin={0}
          aria-valuemax={100}
          className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${safeProgress}%` }}
        />
      </div>
      
      <div className="flex justify-between items-center">
        <small className="text-gray-500 text-xs font-medium">{safeProgress}% Complete</small>
        {safeProgress === 100 && (
          <span className="text-green-600 text-xs font-bold">✓ Done</span>
        )}
      </div>
    </div>
  );
}