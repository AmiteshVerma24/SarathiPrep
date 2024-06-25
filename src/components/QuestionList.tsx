import React, { useEffect, useState } from 'react';
import QuestionItem from './QuestionItem';

interface Question {
  id: number;
  title: string;
  difficulty: string;
}

const QuestionList: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  

  useEffect(() => {
    fetch('http://localhost:3000/question/getQuestions') 
      .then(response => response.json())
      .then(data => setQuestions(data))
      .catch(error => console.error('Error fetching questions:', error));
    
  }, []);

  useEffect(() => {
    console.log(questions);
  }, [questions]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Questions</h1>
      <div className="divide-y divide-gray-200">
        {questions.map(question => (
          <QuestionItem
            key={question.id}
            id={question.id}
            title={question.title}
            difficulty={question.difficulty}
          />
        ))}
      </div>
    </div>
  );
};

export default QuestionList;
