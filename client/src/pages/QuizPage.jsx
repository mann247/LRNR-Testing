// QuizPage.jsx

import React, { useState, useEffect } from 'react';
import { useQuiz } from '../context/QuizContext.jsx';  
import '../styles/QuizPage.css';
import Button from '../components/Button.jsx'; 


export default function QuizPage() {
    const { quizData, submitAnswer, isLoading } = useQuiz(); 

    // Local state for the user's typed answer
    const [userAnswer, setUserAnswer] = useState('');

    // Sync local state when quizData changes (e.g., a new question loads)
    useEffect(() => {
        if (quizData && quizData.userAnswer !== undefined) {
            setUserAnswer(quizData.userAnswer);
        }
    }, [quizData]);


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!userAnswer.trim()) {
            alert("Please type your answer before submitting.");
            return;
        }

        // Call the context function to send the answer and fetch the next question
        await submitAnswer(userAnswer, quizData.currentQuestion);
    };
    
    // --- Loading State ---
    if (isLoading) {
        return (
            <div className="quiz-page-content loading-screen">
                <p>Generating Question... Please Wait.</p>
                {/*  */}
            </div>
        );
    }
    
    // --- Error/Initial State ---
    if (!quizData) {
        return (
            <div className="quiz-page-content">
                <p>Quiz data not available. Please start a quiz from the options page.</p>
            </div>
        );
    }

    // Destructure data for cleaner rendering
    const { currentQuestion, totalQuestions, questionText } = quizData;
    
    return (
        <div className="quiz-page-content">
            
            {/* Question Counter (e.g., 1 of 5) */}
            <div className="question-counter">
                {currentQuestion} of {totalQuestions}
            </div>

            {/* Question Section */}
            <section className="question-section">
                <h2 className="question-heading">Question</h2>
                <p className="question-text">{questionText}</p>
            </section>

            {/* Answer Form */}
            <form className="answer-form" onSubmit={handleSubmit}>
                <section className="your-answer-section">
                    <h2 className="answer-heading">Your Answer</h2>
                    <label htmlFor="answer-input" className="answer-label">Answer</label>
                    
                    <input 
                        id="answer-input"
                        type="text"
                        className="answer-input-field"
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        placeholder="Type your answer here..."
                        required
                    />
                    
                    <div className="input-icon-placeholder">
                        <span role="img" aria-label="AI Logo">🤖</span>
                    </div>

                </section>
                
                <Button type="submit" className="submit-answer-btn btn" disabled={isLoading}>
                    {isLoading ? "SUBMITTING..." : "SUBMIT ANSWER"}
                </Button>

            </form>
        </div>
    );
}