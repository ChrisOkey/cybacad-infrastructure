// @ts-nocheck
"use client";

import React from 'react';
import { 
    SandpackProvider, 
    SandpackLayout, 
    SandpackCodeEditor, 
    SandpackConsole, 
    SandpackTheme, 
    SandpackFileExplorer 
} from '@codesandbox/sandpack-react';

// Define the custom dark theme for a professional IDE look (similar to VS Code Dark)
const customTheme: SandpackTheme = {
  // CRITICAL: The color scheme must align with the rest of your dashboard's dark theme
  colors: {
    surface1: 'var(--background)', // Use the application background color
    surface2: '#1e293b', // Slate-800 for side panels
    surface3: '#0f172a', // Slate-900 for terminal/editor background
    clickable: '#14b8a6', // Accent Teal
    base: '#e2e8f0', // Text color (slate-200)
    disabled: '#94a3b8',
    hover: '#334155', // Slate-700
    accent: '#14b8a6', // Accent Teal
    error: '#ef4444', // Red-500
    errorSurface: '#450a0a', // Red-950
  },
  syntax: {
    plain: '#e2e8f0',
    comment: '#64748b', // Slate-500
    keyword: '#34d399', // Green-400 (for def, import)
    tag: '#e879f9', // Magenta-400 (for functions, components)
    punctuation: '#94a3b8',
    definition: '#93c5fd', // Blue-300
    property: '#fcd34d', // Amber-300
    static: '#f97316', // Orange-500
    string: '#22c55e', // Green-500
  },
  font: {
    body: '-apple-system, system-ui, sans-serif',
    size: '13px',
    lineHeight: '20px',
  },
};

interface CodeEditorProps {
    // This defines the core files needed for the specific lab
    files: Record<string, { code: string; active?: boolean }>;
    mainComponent: string;
    showExplorer?: boolean;
}

// Default Python lab setup, matching the scenario we debugged
const defaultFiles = {
  "/main.py": {
    code: `# This is your lab environment.
# Your goal is to secure the application against XSS.

import os
from flask import Flask, request, render_template

app = Flask(__name__)

@app.route("/")
def index():
    # User input is passed unsanitized!
    user_input = request.args.get('name', 'World') 
    
    # VULNERABLE LINE - Fix me!
    return f"<h1>Hello, {user_input}</h1>" 

if __name__ == "__main__":
    app.run(debug=True)
`,
    active: true,
  },
  "/requirements.txt": {
    code: "flask",
    hidden: true
  }
};

export default function CodeEditor({ 
    files = defaultFiles, 
    mainComponent = '/main.py', 
    showExplorer = true 
}: CodeEditorProps) {
  return (
    <div className="h-full w-full">
        <SandpackProvider 
            template="python" // Template set to Python for security/cybersec labs
            files={files} 
            theme={customTheme}
            options={{
                activeFile: mainComponent,
                showTabs: true,
                showLineNumbers: true,
            }}
        >
            <SandpackLayout>
                {/* 1. File Explorer (Can be hidden for single-file labs) */}
                {showExplorer && <SandpackFileExplorer className="min-w-[150px] border-r border-gray-700" />}
                
                {/* 2. Code Editor */}
                <div className="flex-1 min-w-0">
                    <SandpackCodeEditor className="h-2/3" showTabs />
                    
                    {/* 3. Console/Terminal Output (Takes up the bottom 1/3 of the space) */}
                    <div className="h-1/3 border-t border-teal-600/50">
                        <SandpackConsole />
                    </div>
                </div>
            </SandpackLayout>
        </SandpackProvider>
    </div>
  );
}

`LearningIDE.tsx`
`LearningIDE.tsx`

`apps/frontend-react/src/LearningIDE.tsx` 


    typescript
    import CodeEditor from './CodeEditor'; 
    {/* B. Code Editor and Terminal Panel (Bottom) */}
    <div style={{ height: labContentHeight }} className="flex flex-col overflow-hidden bg-gray-900">
        {/* Code Editor Area */}
        <div className="flex-1 overflow-y-auto bg-gray-900 border-b border-gray-700/50">
            <div className="p-4 text-sm font-mono text-gray-200 resize-y">
                {/* Mock Code Editor Area */}
                <pre ref={codeEditorRef}>
                    {/* ... (old mock code) ... */}
                </pre>
            </div>
        </div>
        {/* Terminal/Output Area */}
        <div className="h-32 bg-gray-950 p-3 flex-shrink-0 overflow-y-auto border-t border-teal-600/50">
            {/* ... (old mock terminal output) ... */}
        </div>
    </div>
    
    {/* B. Code Editor and Terminal Panel (Bottom) */}
    <div style={{ height: labContentHeight }} className="flex flex-col overflow-hidden bg-gray-900">
        <CodeEditor />
    </div>
    
