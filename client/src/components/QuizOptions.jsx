import React from 'react';
import '../styles/QuizOptions.css';
import '../components/Button.jsx'

export default function QuizOptions() {
    return(
       <div className="main-content">

            {/* The Quiz Generation Form */}
            <form className="quiz-form">
                
                {/* Topic Dropdown */}
                <div className="form-field">
                    <label htmlFor="topic">Topic</label>
                    <select id="topic" name="topic" className="dropdown">
                        <option value="golang"> golang </option>
                        <option value="aws"> aws </option>
                        <option value="javascript"> javascript </option>
                        <option value="CI/CD"> CI/CD </option>
                        <option value="home gardens"> home gardens </option>
                        <option value="coffee"> coffee </option>
                        <option value="finger foods"> finger foods </option>
                    </select>
                </div>

                {/* Expertise Dropdown */}
                <div className="form-field">
                    <label htmlFor="expertise">Expertise</label>
                    <select id="expertise" name="expertise" className="dropdown">
                        <option value="novice"> novice </option>
                        <option value="intermediate"> intermediate</option>
                        <option value="expert"> expert </option>
                    </select>
                </div>

                {/* Number of Questions Dropdown */}
                <div className="form-field">
                    <label htmlFor="num-questions">Number of questions</label>
                    <select id="num-questions" name="num-questions" className="dropdown" defaultValue="5">
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                    </select>
                </div>

                {/* Style of Questions Dropdown */}
                <div className="form-field">
                    <label htmlFor="style-questions">Style of questions</label>
                    <select id="style-questions" name="style-questions" className="dropdown" defaultValue="normal">
                        <option value="normal">normal</option>
                        <option value="master oogway">master oogway</option>
                        <option value="1940's gangster">1940's gangster</option>
                        <option value="like I'm an 8 year old">Like I'm an 8 year old</option>
                        <option value="jedi">jedi</option>
                        <option value="captain jack sparrow">captain jack sparrow</option>
                        <option value="ryan coogler">ryan coogler</option>
                    </select>
                </div>

                {/* Submit Button */}
                <button type="submit" className="btn">SUBMIT</button>
            </form>
        </div>
    );
}
