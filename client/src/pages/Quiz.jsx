import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QuizOptions from '../components/QuizOptions';
import Button from '../components/Button';
import '../styles/Quiz.css';

export default function Quiz() {
    const [quizStarted, setQuizStarted] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answer, setAnswer] = useState('');
    const [evaluation, setEvaluation] = useState(null);
    const [isEvaluating, setIsEvaluating] = useState(false);
    const navigate = useNavigate();

    const handleQuizGenerated = (generatedQuestions) => {
        setQuestions(generatedQuestions);
        setQuizStarted(true);
        setCurrentQuestionIndex(0);
        setEvaluation(null);
    };

    const handleAnswerSubmit = async () => {
        if (!answer.trim()) {
            alert('Please enter an answer');
            return;
        }

        setIsEvaluating(true);

        try {
            // Evaluate the current answer
            const response = await fetch('/api/evaluate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    answers: [
                        {
                            question: questions[currentQuestionIndex],
                            answer: answer,
                        },
                    ],
                }),
            });

            const data = await response.json();

            // Show evaluation
            setEvaluation({
                isCorrect:
                    data.evaluations && data.evaluations[0]
                        ? data.evaluations[0].correct
                        : false,
                feedback:
                    data.evaluations && data.evaluations[0]
                        ? data.evaluations[0].feedback
                        : 'Answer evaluated.',
            });
        } catch (error) {
            console.error('Error evaluating answer:', error);
            alert('Failed to evaluate answer. Please try again.');
        } finally {
            setIsEvaluating(false);
        }
    };

    const handleNext = () => {
        setAnswer('');
        setEvaluation(null);

        // Check if this was the last question
        if (currentQuestionIndex < questions.length - 1) {
            // Move to next question
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            // Quiz is complete, navigate to results
            navigate('/results');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !evaluation) {
            handleAnswerSubmit();
        }
    };

    if (!quizStarted) {
        return (
            <div className="quiz-container">
                <div className="title-div">
                    <h1>Quiz Generation Options</h1>
                    <p>
                        Please choose your preferences below to generate your
                        personalized quiz
                    </p>
                </div>
                <QuizOptions onQuizGenerated={handleQuizGenerated} />
            </div>
        );
    }

    return (
        <div className="quiz-question-container">
            <div className="question-counter">
                <h2>
                    {currentQuestionIndex + 1} of {questions.length}
                </h2>
            </div>

            <div className="question-section">
                <h3>Question</h3>
                <p>{questions[currentQuestionIndex]}</p>
            </div>

            <div className="answer-section">
                <h3>Your Answer</h3>
                <div className="answer-input-wrapper">
                    <input
                        type="text"
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Answer"
                        className="answer-input"
                        disabled={evaluation !== null}
                    />
                </div>

                {!evaluation ? (
                    <Button
                        onClick={handleAnswerSubmit}
                        className="submit-btn"
                        disabled={isEvaluating}>
                        {isEvaluating ? 'EVALUATING...' : 'SUBMIT ANSWER'}
                    </Button>
                ) : null}
            </div>

            {evaluation && (
                <div className="evaluation-section">
                    <h3>Verner's Evaluation</h3>
                    <div className="evaluation-content">
                        <p
                            className={`evaluation-result ${
                                evaluation.isCorrect ? 'correct' : 'incorrect'
                            }`}>
                            {evaluation.isCorrect ? 'Correct' : 'Incorrect'}
                        </p>
                        <p className="evaluation-feedback">
                            {evaluation.feedback}
                        </p>
                    </div>
                    <Button onClick={handleNext} className="next-btn">
                        NEXT
                    </Button>
                </div>
            )}
        </div>
    );
}
