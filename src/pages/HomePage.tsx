import { QuestionList } from "../components";

const HomePage: React.FC= () => {
    return (
        <div className="min-h-screen bg-gray-100">
          <header className="bg-blue-500 text-white p-4">
            <h1 className="text-center text-3xl">Question Listing App</h1>
          </header>
          <main className="p-4">
            <QuestionList />
          </main>
        </div>
    );
}

export default HomePage;