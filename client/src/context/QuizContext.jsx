import React, {createContext, useState, useContext } from 'react';

const QuizContext = createContext();

// Function to simulate the server response structure.
const fetchQuestionFromServer = async (options) => {
    // ----------------------------------------------------------------------
    // Replace this entire block with our API call. Needed placeholder.
    // ----------------------------------------------------------------------
    
    console.log("Simulating API call to generate question with options:", options);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800)); 

    // Mock Response Structure
    const question = {
        // This is the dynamic content the AI/Server should generate
        questionText: `As a **${options.style}** expert, focusing on **${options.topic}**, can you explain the core concepts of this subject to a **${options.expertise}** level user?`,
        
        // Static quiz management data
        currentQuestion: 1,
        totalQuestions: parseInt(options.numQuestions, 10),
        userAnswer: '', // Blank slate for the user's input
    };

    return question;

    // ----------------------------------------------------------------------
};


// Function to simulate sending an answer and getting the next question
const submitAnswerToServer = async (currentAnswer, options, currentQuestionNumber) => {
    // ----------------------------------------------------------------------
    // Replace this entire block with your answer submission API call
    // ----------------------------------------------------------------------

    console.log(`Submitting Answer for Question ${currentQuestionNumber}: ${currentAnswer}`);
    await new Promise(resolve => setTimeout(resolve, 800)); 

    if (currentQuestionNumber < options.totalQuestions) {
        // Mock successful response for the next question
        return {
            status: 'success',
            // Generate a slightly different mock question text for variety
            questionText: `Next Question (Q${currentQuestionNumber + 1}): Given your previous answer, what is one major limitation of **${options.topic}** at an **${options.expertise}** level?`,
            currentQuestion: currentQuestionNumber + 1,
            userAnswer: '',
        };
    } else {
        return {
            status: 'finished',
            message: 'Quiz finished! Results processing...',
        };
    }
}


// 2. Create the Provider component
export const QuizProvider = ({ children }) => {
    const [quizOptions, setQuizOptions] = useState(null); 
    const [quizData, setQuizData] = useState(null); 
    const [isLoading, setIsLoading] = useState(false); // New loading state for UX


    // Function called by QuizOptions.jsx to start the quiz
    const startQuiz = async (options) => {
        setIsLoading(true);
        setQuizOptions(options);

        // Fetch the first question from the mock server
        const initialQuizData = await fetchQuestionFromServer(options);
        
        setQuizData(initialQuizData);
        setIsLoading(false);
    };

    // Function called by QuizPage.jsx to submit an answer and fetch the next question
    const submitAnswer = async (userAnswer, currentQuestionNumber) => {
        setIsLoading(true);

        const serverResponse = await submitAnswerToServer(userAnswer, quizOptions, currentQuestionNumber);
        
        setIsLoading(false);

        if (serverResponse.status === 'success') {
            setQuizData(prevData => ({
                ...prevData,
                ...serverResponse // Update questionText, currentQuestion, userAnswer (reset)
            }));
            return true;
        } else if (serverResponse.status === 'finished') {
            alert(serverResponse.message);
            // Logic to navigate to results page or reset the quiz
            return false;
        }
    };


    return (
        <QuizContext.Provider value={{ quizOptions, quizData, startQuiz, submitAnswer, isLoading }}>
            {children}
        </QuizContext.Provider>
    );
};

// 3. Custom hook for easy access
export const useQuiz = () => useContext(QuizContext);
