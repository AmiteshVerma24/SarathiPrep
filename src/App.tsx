import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { QuestionPage, LoginPage, SignupPage, HomePage, Layout } from './pages';

function App() {
  return (
    <Router>
      <Layout>
      <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/question/:id" element={<QuestionPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
