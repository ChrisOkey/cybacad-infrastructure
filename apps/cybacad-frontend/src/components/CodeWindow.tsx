import React from 'react';
import Editor from '@monaco-editor/react';

// Define what data this component expects
interface CodeWindowProps {
  code: string;
  isLocked: boolean;
  onUserType: (value: string | undefined) => void;
}

const CodeWindow: React.FC<CodeWindowProps> = ({ code, isLocked, onUserType }) => {
  return (
    <div className="editor-wrapper" style={{ height: '500px', border: '1px solid #333' }}>
      <div style={{ background: '#1e1e1e', color: '#fff', padding: '5px', fontSize: '14px' }}>
        {isLocked ? "🔒 AI Instructor is Typing..." : "🟢 Your Turn"}
      </div>
      <Editor
        height="95%"
        defaultLanguage="python"
        theme="vs-dark"
        value={code}
        options={{
          readOnly: isLocked, // Prevents user from typing when AI is talking
          minimap: { enabled: false },
          fontSize: 14
        }}
        onChange={(value) => onUserType(value)}
      />
    </div>
  );
};

export default CodeWindow;