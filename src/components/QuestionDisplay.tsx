import React from 'react';
import TestCaseDisplay from './TestCaseDisplay';

interface TestCase {
  id: number;
  question_id: number;
  input: string;
  expected_output: string;
  created_at: string;
  sample: boolean;
}

interface QuestionDisplayProps {
  problemID: number;
  problemTitle: string;
  problemDescription: string;
  testcases: TestCase[];
}

const QuestionDisplay: React.FC<QuestionDisplayProps> = ({ problemTitle, problemDescription, testcases }) => {
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
