import { useEffect, useState } from 'react';
import { CodeEditor, QuestionDisplay } from '../components';
import { useParams } from 'react-router-dom';

interface Question {
  id: number;
  title: string;
  description: string;
  difficulty: string;
}

interface TestCase {
  id: number;
  question_id: number;
  input: string;
  expected_output: string;
  created_at: string;
  sample: boolean;
}

function QuestionPage() {
  const { id } = useParams<{ id: string }>();
  const [question, setQuestion] = useState<Question | null>(null);
  const [testcases, setTestcases] = useState<TestCase[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await fetch(`http://localhost:3000/question/getQuestion/${id}`);
        const data = await response.json();
        setQuestion(data[0]);
      } catch (error) {
        console.error('Error fetching question:', error);
      }
    };
    const fetchTestcases = async () => {
      try {
        const response = await fetch(`http://localhost:3000/testcase/getExampleTestCases/${id}`);
        const data = await response.json();
        setTestcases(data);
      } catch (error) {
        console.error('Error fetching testcases:', error);
      }
    };
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchQuestion(), fetchTestcases()]);
      setLoading(false);
    };
  
    fetchData();
  }, [id]);

  useEffect(() => {
    if (!loading) {
      console.log("Testcases:- ", testcases);
    }
  }, [loading, testcases]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!question) {
    return <div>Error: Question not found.</div>;
  }

  return (
    <div>
      <div className="flex h-screen">
        <div className="w-1/3 h-full flex flex-col">
          <QuestionDisplay
            problemID={question.id}
            problemTitle={question.title}
            problemDescription={question.description}
            testcases={testcases}
          />
        </div>
        <div className="w-2/3 h-full flex flex-col">
          <CodeEditor 
            problemID={question.id}
            problemTitle={question.title}
            problemDescription={question.description}
            testcases={testcases}
          />
        </div>
      </div>
    </div>
  );
}

export default QuestionPage;
