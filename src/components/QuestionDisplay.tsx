import React, { useEffect, useState } from 'react';
import TestCaseDisplay from './TestCaseDisplay';


interface QuestionDisplayProps {
  problemID: number;
  problemTitle: string;
  problemDescription: string;
}

const QuestionDisplay: React.FC<QuestionDisplayProps> = ({ problemID, problemTitle, problemDescription }) => {
  const [testcases, setTestcases] = useState([]);
  const [loading, setLoading] = useState(true);
  // Fetch the examples
  useEffect(() => {
    fetch(`http://localhost:3000/testcase/getExampleTestCases/${problemID}`) 
    .then(response => response.json())
    .then(data => setTestcases(data))
    .catch(error => console.error('Error fetching questions:', error));
    setLoading(false);
  }, []);

  useEffect(() => {
    console.log(testcases);
  }, [testcases])
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="bg-white rounded-lg p-4 shadow-md h-screen">
      <h1 className="text-2xl font-bold mb-4">{problemTitle}</h1>
      <div className="mb-4">
        <p>{problemDescription}</p>
      </div>
      <TestCaseDisplay testCases={testcases} />
    </div>
  );
};

export default QuestionDisplay;
