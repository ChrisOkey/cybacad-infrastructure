// GeminiPanel.tsx
import React from 'react';

export function GeminiPanel({ response }: { response: string }) {
  return React.createElement(
    'div',
    { className: 'bg-gray-100 p-4 rounded-md mt-4' },
    React.createElement('h2', { className: 'font-semibold mb-2' }, 'Gemini Feedback'),
    React.createElement('p', { className: 'text-sm whitespace-pre-wrap' }, response)
  );
}
