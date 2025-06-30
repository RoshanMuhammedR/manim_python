import React from 'react';
import { useCodeStore } from '../store/useCodeStore';
import Editor from '@monaco-editor/react';

const CodeEditor = () => {
  const { code, setCode } = useCodeStore();

  return (
    <div className="w-full h-97 rounded-2xl">
      <Editor
        height="100%"
        defaultLanguage="python"
        value={code}
        onChange={(value) => setCode(value)}
        theme="light" // ✅ use built-in light theme
        options={{
          fontSize: 14,
          minimap: { enabled: false },
          fontFamily: 'monospace',
          automaticLayout: true,
          wordWrap: 'on',
        }}
      />
    </div>
  );
};

export default CodeEditor;
