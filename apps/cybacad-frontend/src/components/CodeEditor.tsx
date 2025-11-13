import React from "react";

export const CodeEditor = React.forwardRef<HTMLPreElement>((_, ref) => {
  return (
    <div className="flex-1 overflow-y-auto bg-gray-900 border-b border-gray-700/50">
      <div className="p-4 text-sm font-mono text-gray-200 resize-y">
        <pre ref={ref}>
          <span className="text-gray-500"># Current Lab Code (XSS Prevention)</span>
          {"\n"}
          <span className="text-blue-400">def</span>{" "}
          <span className="text-yellow-400">render_html</span>(user_input):
          {"\n  "}
          <span className="text-gray-500"># TODO: Sanitize the user input here!</span>
          {"\n  "}
          html = `...`
          {"\n  "}
          <span className="text-blue-400">return</span> html
        </pre>
      </div>
    </div>
  );
});

CodeEditor.displayName = "CodeEditor";
