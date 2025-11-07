import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Account from './pages/Account';
import Quiz from './pages/Quiz';
import QuizPage from './pages/QuizPage';
import QuizResults from './pages/Results'

export default function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/account" element={<Account />} />
                <Route path="/quiz" element={<Quiz />} />
                <Route path="/quiz-questions" element={<QuizPage />} />
                <Route path="/quiz-results" element={<QuizResults />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}
