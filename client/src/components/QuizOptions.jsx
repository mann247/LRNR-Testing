import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/QuizOptions.css';

export default function QuizOptions({ onQuizGenerated }) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        topic: 'golang',
        expertise: 'novice',
        numberOfQuestions: '5',
        style: 'normal',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        // Clear error when user makes changes
        if (error) setError(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/questions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to generate quiz');
            }

            const data = await response.json();

            if (
                data.questions &&
                Array.isArray(data.questions) &&
                data.questions.length > 0
            ) {
                // Pass questions to parent component (Quiz.jsx)
                onQuizGenerated(data.questions);
            } else {
                throw new Error('No questions received from server');
            }
        } catch (err) {
            console.error('Error generating quiz:', err);
            setError(
                err.message ||
                    'Failed to connect to server. Make sure the backend is running on port 5000.'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="main-content">
            {error && <div className="error-message">{error}</div>}

            {/* The Quiz Generation Form */}
            <form className="quiz-form" onSubmit={handleSubmit}>
                {/* Topic Dropdown */}
                <div className="form-field">
                    <label htmlFor="topic">Topic</label>
                    <select
                        id="topic"
                        name="topic"
                        className="dropdown"
                        value={formData.topic}
                        onChange={handleChange}
                        disabled={loading}>
                        <option value="golang">golang</option>
                        <option value="aws">aws</option>
                        <option value="javascript">javascript</option>
                        <option value="CI/CD">CI/CD</option>
                        <option value="home gardens">home gardens</option>
                        <option value="coffee">coffee</option>
                        <option value="finger foods">finger foods</option>
                    </select>
                </div>

                {/* Expertise Dropdown */}
                <div className="form-field">
                    <label htmlFor="expertise">Expertise</label>
                    <select
                        id="expertise"
                        name="expertise"
                        className="dropdown"
                        value={formData.expertise}
                        onChange={handleChange}
                        disabled={loading}>
                        <option value="novice">novice</option>
                        <option value="intermediate">intermediate</option>
                        <option value="expert">expert</option>
                    </select>
                </div>

                {/* Number of Questions Dropdown */}
                <div className="form-field">
                    <label htmlFor="numberOfQuestions">
                        Number of questions
                    </label>
                    <select
                        id="numberOfQuestions"
                        name="numberOfQuestions"
                        className="dropdown"
                        value={formData.numberOfQuestions}
                        onChange={handleChange}
                        disabled={loading}>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                    </select>
                </div>

                {/* Style of Questions Dropdown */}
                <div className="form-field">
                    <label htmlFor="style">Style of questions</label>
                    <select
                        id="style"
                        name="style"
                        className="dropdown"
                        value={formData.style}
                        onChange={handleChange}
                        disabled={loading}>
                        <option value="normal">normal</option>
                        <option value="master oogway">master oogway</option>
                        <option value="1940's gangster">1940's gangster</option>
                        <option value="like I'm an 8 year old">
                            Like I'm an 8 year old
                        </option>
                        <option value="jedi">jedi</option>
                        <option value="captain jack sparrow">
                            captain jack sparrow
                        </option>
                        <option value="ryan coogler">ryan coogler</option>
                    </select>
                </div>

                {/* Submit Button */}
                <button type="submit" className="btn" disabled={loading}>
                    {loading ? 'GENERATING...' : 'SUBMIT'}
                </button>
            </form>
        </div>
    );
}
