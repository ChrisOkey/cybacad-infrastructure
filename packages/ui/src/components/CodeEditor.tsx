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

// Custom Dark Theme (Slate/Teal) to match your Dashboard
const customTheme: SandpackTheme = {
  colors: {
    surface1: '#0f172a', // Slate-950 (Main Background)
    surface2: '#1e293b', // Slate-800 (Sidebar/Panels)
    surface3: '#020617', // Slate-950 (Terminal Background)
    clickable: '#14b8a6', // Teal-500 (Accents)
    base: '#e2e8f0', // Slate-200 (Text)
    disabled: '#94a3b8',
    hover: '#334155',
    accent: '#14b8a6',
    error: '#ef4444',
    errorSurface: '#450a0a',
  },
  syntax: {
    plain: '#e2e8f0',
    comment: '#64748b',
    keyword: '#34d399',
    tag: '#e879f9',
    punctuation: '#94a3b8',
    definition: '#93c5fd',
    property: '#fcd34d',
    static: '#f97316',
    string: '#22c55e',
  },
  font: {
    body: '-apple-system, system-ui, sans-serif',
    // ✅ REQUIRED: Mono font definition for the editor
    mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
    size: '13px',
    lineHeight: '20px',
  },
};

interface CodeEditorProps {
    files?: Record<string, { code: string; active?: boolean; hidden?: boolean }>;
    mainComponent?: string;
    showExplorer?: boolean;
}

const defaultFiles = {
  "/main.py": {
    code: `print("Hello World")`,
    active: true,
  },
};

// ✅ Named Export (Matches your index.ts)
export function CodeEditor({ 
    files = defaultFiles, 
    mainComponent = '/main.py', 
    showExplorer = true 
}: CodeEditorProps) {
  return (
    <div className="h-full w-full bg-slate-950 border border-slate-800 rounded-lg overflow-hidden">
        <SandpackProvider 
            template="static"
            files={files} 
            theme={customTheme}
            options={{
                activeFile: mainComponent,
                visibleFiles: [mainComponent]
                // ✅ FIXED: Removed invalid 'showNavigator' and 'showLineNumbers' from here
            }}
        >
            {/* ✅ FIXED: Tailwind v4 syntax (exclamation at the end) */}
            <SandpackLayout className="h-full! rounded-none!">
                
                {/* File Explorer (Left Panel) */}
                {showExplorer && (
                    <SandpackFileExplorer style={{ height: '100%' }} />
                )}
                
                <div className="flex-1 flex flex-col h-full min-w-0">
                    {/* Code Editor Area */}
                    <div className="flex-1 overflow-hidden">
                        <SandpackCodeEditor 
                            showTabs 
                            showRunButton={false} 
                            showLineNumbers={true} // ✅ This is where showLineNumbers belongs!
                            style={{ height: '100%' }} 
                        />
                    </div>
                    
                    {/* Terminal/Console Area */}
                    <div className="h-32 border-t border-slate-700 bg-black">
                        <SandpackConsole style={{ height: '100%' }} />
                    </div>
                </div>
            </SandpackLayout>
        </SandpackProvider>
    </div>
  );
}