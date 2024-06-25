// src/components/QuestionDisplay.tsx
import React, { useEffect } from 'react';

interface QuestionDisplayProps {
  problemTitle: string;
  problemDescription: string;
}


const QuestionDisplay: React.FC<QuestionDisplayProps> = ({ problemTitle, problemDescription }) => {
  const exampleInput: string = "[2, 7, 11, 15], 9"; 

  useEffect(() => {
    console.log(problemTitle);
  }, [problemTitle])
  
  return (
    <div className="bg-white rounded-lg p-4 shadow-md h-screen">
      <h1 className="text-2xl font-bold mb-4">{problemTitle}</h1>
      <div className="mb-4">
        <p>{problemDescription}</p>
      </div>
      <h2 className="text-lg font-semibold mb-2">Example Input:</h2>
      <pre className="bg-gray-100 p-2 rounded-md">{exampleInput}</pre>
    </div>
  );
};

export default QuestionDisplay;
