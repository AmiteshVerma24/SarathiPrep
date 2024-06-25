import React from 'react';

const QuestionDisplay: React.FC = () => {
  const problemTitle: string = "Two Sum";
  const problemDescription: string = "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.";
  const exampleInput: string = "[2, 7, 11, 15], 9";

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
