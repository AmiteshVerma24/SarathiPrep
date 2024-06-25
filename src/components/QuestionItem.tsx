// src/components/QuestionItem.tsx
import React from 'react';
import { Link } from 'react-router-dom';

interface Question {
  id: number;
  title: string;
  difficulty: string;
}

const QuestionItem: React.FC<Question> = ({ id, title, difficulty }) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-200 text-green-800';
      case 'Medium':
        return 'bg-yellow-200 text-yellow-800';
      case 'Hard':
        return 'bg-red-200 text-red-800';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  return (
    <Link to={`question/${id}`} className="block p-4 border-b last:border-b-0 hover:bg-gray-50">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">{title}</h2>
        <div className={`px-2 py-1 rounded ${getDifficultyColor(difficulty)}`}>
          {difficulty}
        </div>
      </div>
    </Link>
  );
};

export default QuestionItem;
