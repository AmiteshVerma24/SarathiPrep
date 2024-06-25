import { QuestionList } from "../components";

const HomePage: React.FC= () => {
    return (
        <div className="min-h-screen bg-gray-100">
          <main className="p-4">
            <QuestionList />
          </main>
        </div>
    );
}

export default HomePage;