import React from 'react';
import { Link } from 'react-router-dom'
import '../styles/Results.css';

export default function Results() {
    return (
        <div className='results'>
            <h1 className='rtitle'>lrnr</h1>
            <h2 className='rresults'>Questions Right: 0111</h2>
            <Link to='/quiz'>
             <button className='tbtn'>Try Another Quiz</button>
            </Link>
        </div>
    );
}
