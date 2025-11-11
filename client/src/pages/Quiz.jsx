import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QuizOptions from '../components/QuizOptions';
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
