import { useEffect, useState } from 'react';
import { Navbar, CodeEditor, QuestionDisplay } from '../components';
import { useParams } from 'react-router-dom';

interface Question {
  id: number;
  title: string;
  description: string;
  difficulty: string;
}

function QuestionPage() {
  const { id } = useParams<{ id: string }>();
  const [question, setQuestion] = useState<Question | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3000/question/getQuestion/${id}`)
      .then(response => response.json())
      .then(data => {
        setQuestion(data[0]);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching question:', error);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    console.log(question)
  }, [question])

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!question) {
    return <div>Error: Question not found.</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="flex justify-evenly">
        <div className="w-1/3">
          <QuestionDisplay
            problemTitle={question.title}
            problemDescription={question.description}
          />
        </div>
        <div className="w-2/3">
          <CodeEditor />
        </div>
      </div>
    </div>
  );
}

export default QuestionPage;
