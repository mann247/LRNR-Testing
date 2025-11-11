import React from 'react';
import '../styles/Account.css';
import fireIcon from '/fire.svg';
import listIcon from '/list.svg';
import accountIcon from '/person.svg';

export default function Account() {
    return (
        <main className="account-page">
            <h1 className="title">Account</h1>

            <div className="account-container">
                <div className="streak">
                    <img src={fireIcon} alt="streak icon" />
                    <h2 className="streak-title">Streak</h2>
                    <p className="streak-description">
                        You have a streak of 5 days!
                    </p>
                </div>

                <div className="quizzes">
                    <img src={listIcon} alt="list icon" />
                    <h2 className="quizzes-title">Platinum Quizzes</h2>
                    <p className="quizzes-description">golang - intermediate</p>
                    <p className="quizzes-description">JavaScript - beginner</p>
                    <p className="quizzes-description">AWS - beginner</p>
                </div>

                <div className="account">
                    <img src={accountIcon} alt="account icon" />
                    <h2 className="account-title">lrnr Level: 2</h2>
                    <p className="account-description">150/200 XP</p>
                </div>
            </div>
        </main>
    );
}
