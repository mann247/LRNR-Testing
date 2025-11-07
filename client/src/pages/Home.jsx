import React from 'react';
import '../styles/Home.css';
import applogo from '../../public/lrnr-logo.png'
import person from '../../public/user.png'
import lightning from '../../public/lightning.png'
import reward from '../../public/trophy.png'
import { Link } from 'react-router-dom'


export default function Home() {
    return (
        <div className='homepg'>
          <img className='applogo' src={applogo} alt="logo" />
          <h3>Your guided path to programming enlightenment</h3>
          <Link to='/quiz'>
          <button className='btn'>Begin Journey</button>
          </Link>
          <div className='info-section'>
            <div className='quiz'>
              <img className='social' src={lightning} alt="logo" />
              <h4>Personalized Quizzess</h4>
              <div className='txt'>
                <p> Greetings, young padawan. Are you ready to embark on a journey of
                  personalized enlightenment through the art of coding? Our app, can
                  create custom quizzes that align with your coding skills and interests.
                  Whether you are a novice or a master, our system can generate questions
                  that will test your proficiency in programming languages, tools, and concepts
                </p>
              </div>
            </div>

            <div className='reward'>
              <img className='social' src={reward} alt="logo" />
              <h4>Rewarding</h4>
              <div className='txt'>
              <p>Our app is designed to be both challenging and rewarding, so you can learn
                new concepts while enjoying the process. With our personalized quiz app, you can
                track your progress, compete with your peers, and discover new areas of expertise.
                The journey of a thousand lines of code begins with a single keystroke
              </p>
              </div>
            </div>

            <div className='sme'>
              <img className='social'src={person} alt="logo" />
              <h4>Personal SME</h4>
              <div className='txt'>
              <p>Welcome to the path of knowledge. Our app is like having a personal subjecgt matter
                expert at your side, guiding you on your journey toward wisdom </p>
              </div>
            </div>
          </div>
        </div>
    );
}
