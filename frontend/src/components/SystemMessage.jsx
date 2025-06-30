import React, { memo } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism'; // <-- light theme

const SystemMessage = ({ content, edit }) => {
  const trimmed = content.trim();

  return (
    <div className="max-w-[75%] space-y-2">
      <div className="flex justify-start">
        <div className="bg-background max-w-[90%] shadow rounded-2xl overflow-hidden">
          <div className="h-8 flex items-center justify-between px-4 bg-primary text-white text-sm font-medium">
            <div>Python - Manim</div>
          </div>
          <SyntaxHighlighter language="python" style={prism} customStyle={{ margin: 0, borderRadius: 0 }}>
            {trimmed}
          </SyntaxHighlighter>
        </div>
      </div>

      <div className="flex gap-4 mt-2">
        <button 
          className="bg-primary text-white px-4 py-2 rounded-xl text-sm font-semibold shadow hover:opacity-90 transition"
          onClick={() => edit(trimmed)}
        >
          View in Code Editor
        </button>
        <button 
          className="bg-primary text-white px-4 py-2 rounded-xl text-sm font-semibold shadow hover:opacity-90 transition"
        >
          View Animation
        </button>
      </div>
    </div>
  );
};

export default memo(SystemMessage);
