import { Icon } from "./Icon";

export const CourseSidebar = ({
  isOpen,
  toggle,
}: {
  isOpen: boolean;
  toggle: () => void;
}) => (
  <aside className={`transition-all duration-300 overflow-y-auto bg-gray-800 border-r border-gray-700/50 flex-shrink-0 ${isOpen ? "w-64" : "w-12"}`}>
    <div className="p-2 cursor-pointer border-b border-gray-700/50" onClick={toggle}>
      <Icon name={isOpen ? "ChevronLeft" : "ChevronRight"} className="w-6 h-6 text-teal-400 mx-auto" />
    </div>
    {isOpen && (
      <div className="p-4 space-y-4">
        <h3 className="text-base font-semibold text-white flex items-center">
          <Icon name="BookOpen" className="w-4 h-4 mr-2 text-teal-400" />
          Modules
        </h3>
        <ul className="text-sm space-y-2">
          <li className="text-teal-300 font-semibold cursor-pointer">1. Security Fundamentals</li>
          <li className="text-gray-400 hover:text-gray-200 cursor-pointer">2. Advanced Python Exploits</li>
          <li className="text-gray-400 hover:text-gray-200 cursor-pointer">3. ML Model Hardening</li>
        </ul>
        <div className="mt-4 text-xs text-gray-500">Progress: 75% Complete</div>
      </div>
    )}
  </aside>
);
