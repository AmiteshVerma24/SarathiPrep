import React, { useRef, useEffect, useState } from 'react';
import * as monaco from 'monaco-editor';
import axios from 'axios';

const CodeEditor: React.FC = () => {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState('java');
  const [data, setData] = useState('');

  useEffect(() => {
    if (editorRef.current) {
      const editor = monaco.editor.create(editorRef.current, {
        language: selectedLanguage,
        theme: 'vs-dark',
        value: "todos",
        automaticLayout: true,
      });

      return () => {
        editor.dispose();
      };
    }
  }, [selectedLanguage]);

  const getCode = async () => {
    try {
        const response = await axios.get('http://localhost:3000/test');
        console.log(response)
        setData(""); 

    } catch (err) {
        console.error('Error fetching data:', err);
    }
};

useEffect(() => {
    getCode();
}, []);

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLanguage(event.target.value);
  };

  const getDefaultCode = (language: string): string => {
    switch (language) {
      case 'javascript':
        return '// JavaScript code here';
      case 'typescript':
        return '// TypeScript code here';
      case 'python':
        return '# Python code here';
      case 'java':
        return '// Java code here';
      case 'cpp':
        return '// C++ code here';
      default:
        return '// Default code here';
    }
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-md h-screen overflow-auto">
      <div className="flex items-center justify-between mb-4">
        <div className="text-lg font-semibold">Code Editor</div>
        <div>
          <label htmlFor="language" className="mr-2">Select Language:</label>
          <select
            id="language"
            className="px-2 py-1 border rounded-md"
            value={selectedLanguage}
            onChange={handleLanguageChange}
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="cpp">C++</option>
          </select>
        </div>
      </div>
      <div className="h-full" ref={editorRef}></div>
    </div>
  );
};

export default CodeEditor;
