import React, { useRef, useEffect, useState } from 'react';
import * as monaco from 'monaco-editor';
import axios, { AxiosResponse } from 'axios';
import { Button } from "@/components/ui/button"

import { client } from '../lib/appwrite';

import { Functions } from 'appwrite';

interface TestCase {
  id: number;
  question_id: number;
  input: string;
  expected_output: string;
  created_at: string;
  sample: boolean;
}
interface CodeEditorProps {
  problemID: number;
  problemTitle: string;
  problemDescription: string;
  testcases: TestCase[];
}

interface FunctionNameResponse {
  function_name: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ problemID, testcases }) => {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState('java');
  const [functionName, setFunctionName] = useState('func');
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
        const response = await axios.post(`http://localhost:3000/driverCode/getDriverCode/${problemID}`, {language: language});
        const boilerPlateCode = "\n" + response.data.code.trim();
        setData(boilerPlateCode); 
    } catch (err) {
        console.error('Error fetching data:', err);
    }
  };

  const getFunctionName = async() => {
    try {
      const response: AxiosResponse<FunctionNameResponse> = await axios.get(`http://localhost:3000/driverCode/getFunctionName/${problemID}`);
      setFunctionName(response.data.function_name);
    } catch (err) {
      console.log('Error fetching function name: ', err);
    }
  }

  useEffect(() => {
    console.log(selectedLanguage);
    getCode(selectedLanguage);
    getFunctionName();
  }, [selectedLanguage]);

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLanguage(event.target.value);
  };

  const handleSubmit = async () => {
    if (editorRef.current) {
      const editor = monaco.editor.getModels()[0]; 
      const currentCode = editor.getValue();
      const codePayload = {
        "userFunctionCode": currentCode,
        "functionName": functionName,
        "testCases": testcases
      }
      console.log('Submitting code:', codePayload);
      console.log(import.meta.env.VITE_APPWRITE_PROJECT_ID)
      const functions = new Functions(client);
      const response = await functions.createExecution(
        '66952d6c003033cbcb44',
        String(codePayload)
      )
      console.log(response)
    }
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
          <Button 
            variant="secondary" 
            className="bg-slate-700 p-4 rounded-lg text-white"
            onClick={handleSubmit}
            >Test Code</Button>
          <Button variant="outline" className="bg-slate-400 p-4 rounded-lg text-white">Submit</Button>
        </div>
      </div>
      <div className="flex-grow p-2 mb-4" ref={editorRef}></div>
    </div>
  );
};

export default CodeEditor;
