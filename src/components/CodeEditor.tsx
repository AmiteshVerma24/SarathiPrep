import React, { useRef, useEffect, useState } from 'react';
import * as monaco from 'monaco-editor';
import axios from 'axios';
import { Button } from "@/components/ui/button"


const CodeEditor: React.FC = () => {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState('java');
  const [data, setData] = useState('');

  useEffect(() => {
    if (editorRef.current) {
      const editor = monaco.editor.create(editorRef.current, {
        language: selectedLanguage,
        theme: 'vs-dark',
        value: data,
        automaticLayout: true,
      });

      return () => {
        editor.dispose();
      };
    }
  }, [selectedLanguage, data]);

  const getCode = async (language: string) => {
    try {
        const response = await axios.post('http://localhost:3000/driverCode/getDriverCode/2', {language: language});
        const boilerPlateCode = "\n" + response.data.code.trim();
        setData(boilerPlateCode); 
    } catch (err) {
        console.error('Error fetching data:', err);
    }
};

useEffect(() => {
  console.log(selectedLanguage);
  getCode(selectedLanguage);
}, [selectedLanguage]);

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLanguage(event.target.value);
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-md h-screen flex flex-col">
      <div className="flex items-center justify-between mb-4">
      <div>
            <label htmlFor="language" className="mr-2">Select Language:</label>
            <select
              id="language"
              className="px-2 py-1 border rounded-md"
              value={selectedLanguage}
              onChange={handleLanguageChange}
            >
              <option value="javascript">JavaScript</option>
              <option value="java">Java</option>
              <option value="cpp">C++</option>
            </select>
        </div>
        <div className="flex gap-4">
          <Button variant="secondary" className="bg-slate-700 p-4 rounded-lg text-white">Test Code</Button>
          <Button variant="outline" className="bg-slate-400 p-4 rounded-lg text-white">Submit</Button>
        </div>
      </div>
      <div className="flex-grow p-2 mb-4" ref={editorRef}></div>
    </div>
  );
};

export default CodeEditor;
