import React from 'react';

interface TestCase {
  id: number;
  question_id: number;
  input: string;
  expected_output: string;
  created_at: string;
  sample: boolean;
}

interface TestCaseDisplayProps {
  testCases: TestCase[];
}

const TestCaseDisplay: React.FC<TestCaseDisplayProps> = ({ testCases }) => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-md h-screen">
      <h2 className="text-xl font-bold mb-4">Sample Test Cases</h2>
      {testCases.map(testCase => (
        <div key={testCase.id} className="mb-4 p-4 border rounded-lg">
          <div className="mb-2">
            <strong>Input:</strong> <pre className="bg-gray-100 p-2 rounded-md inline-block">{testCase.input}</pre>
          </div>
          <div className="mb-2">
            <strong>Expected Output:</strong> <pre className="bg-gray-100 p-2 rounded-md inline-block">{testCase.expected_output}</pre>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TestCaseDisplay;
