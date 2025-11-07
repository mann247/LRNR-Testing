import React from 'react';
import '../components/QuizOptions.jsx';
import '../styles/Quiz.css';

export default function Quiz() {
    return (
        <div className="quiz-container">
            <div className="title-div">
                <h1>Quiz Generation Options</h1>
                <p>
                    Please choose your preferences below to generate your
                    personalized quiz
                </p>
            </div>
            <QuizOptions />
        </div>
    );
}
