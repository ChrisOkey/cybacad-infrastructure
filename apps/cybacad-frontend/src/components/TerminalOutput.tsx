import { Icon } from "./Icon";

export const TerminalOutput = () => {
  return (
    <div className="h-32 bg-gray-950 p-3 flex-shrink-0 overflow-y-auto border-t border-teal-600/50">
      <div className="flex justify-between items-center text-sm font-semibold border-b border-gray-700 pb-1 mb-2">
        <span className="text-gray-400 flex items-center">
          <Icon name="Terminal" className="w-4 h-4 mr-2" />
          Lab Output
        </span>
        <span className="text-gray-500 text-xs">Status: FAILURE</span>
      </div>
      <p className="text-sm font-mono text-teal-400">~$ python main_lab.py</p>
      <p className="text-sm font-mono text-red-400">FAILURE: Lab test failed.</p>
      <p className="text-sm font-mono text-gray-500">Reason: Input validation check failed on line 15.</p>
    </div>
  );
};
