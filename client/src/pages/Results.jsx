import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from './QuizContext'; 
import applogo from '../../public/lrnr-logo.png'
import Button from '../components/Button.jsx'; 
import '../styles/Results.css';

export default function Quiz() {

    const navigate = useNavigate();
    // Assuming the context will eventually hold the score.
    const { setIsQuizActive } = useQuiz();

    // Placeholder for the dynamic score received from the backend/context.
    // This value would be updated when the server sends the final results.
    // const scoreValue = "0111"; 

    // Function to reset the quiz state and navigate back to the options page
    const handleStartNewQuiz = () => {
        // Reset state for a new quiz
        setIsQuizActive(false); 
        navigate('/quiz'); // Navigate back to the options page
    };


   return (
        <div className="quiz-results-content">
            
          <img className='applogo' src={applogo} alt="logo" />
            
            {/* Score Display Area */}
            <div className="score-area">
                <h1 className="main-logo-placeholder">Irnr</h1>
                
                <div className="score-box">
                    {/* The label and the hard-coded score from the screenshot */}
                    <span className="score-label">Questions Right: </span>
                    <span className="score-value-display">{scoreValue}</span>
                </div>
            </div>
            
            {/* Action Button */}
            <div className="action-area">
                <Button className="btn try-another-quiz-btn" onClick={handleStartNewQuiz}>
                    TRY ANOTHER QUIZ
                </Button>
            </div>
            
        </div>
    );

}