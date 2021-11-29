import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';
import Sample from '../../assets/img/sample.png';
import Answer from '../../assets/img/answer.png';
import FiftyFifty from '../../assets/img/fifty-fifty.png';
import Hints from '../../assets/img/hints.png';
import SetCenterIcon from 'mdi-react/SetCenterIcon';
import Lightbulb  from 'mdi-react/LightbulbOnIcon';
import './quizInstructions.css'

const QuizInstructions = () => {
    return (
        <Fragment>
            <Helmet>
                <title>
                    Quiz Instructions - Quiz App
                </title>
            </Helmet>
        <div className="overflow-container">
            <div className="instructions container">
                <h1 className="mt-0 quiz_header">How to play the Game</h1>
                <p className="text-center">Insure you read this guide from start to finish</p>
            </div>
            <div className="list text-white text-center">
                <ul className="Browser-default" id="main-list">
                    <li>The game has a duration of 15 minutes and ends as soon as your time elapses</li>
                    <li>Each game consists of 15 questions.</li><br />            
                    <div>
                        <div className="d-flex">
                            <li>Every question contains 4 options.</li>
                            <img className="img-center" src={Sample} alt="Quiz App options example"/>
                        </div>
                    </div>  
                    <li style={{listStyle: 'none'}}><br/>
                        <div className="d-flex">
                            <li>Select the option which best answers the question by clicking (or selecting) it.</li>
                            <img className="img-center" src={Answer} alt="Quiz App answer example" style={{marginTop:"20px"}}/>
                        </div>                     
                    </li>
                    <li style={{listStyle: 'none'}}><br/>
                        <div>Each game has 2 lifelines namely:</div>
                        <ul id="sublist" style={{marginTop:"10px"}}>
                            <li>Two 50-50 chances</li>
                            <li>5 Hints</li>
                        </ul>
                    </li>
                    <li style={{listStyle: 'none'}}><br/>
                        <div className="d-flex">
                            <div>Selecting a 50-50 lifelines by clicking the icon
                            <span><SetCenterIcon className="life-line" style={{color: 'green'}}/></span>
                            will remove 2 wrong answers, leaving the correct answer and one wrong answer.</div>
                            <img className="img-center" src={FiftyFifty} alt="Quiz APP Fifty-Fifty example" style={{marginTop:"20px"}}/>
                        </div>
                    </li>
                    <li style={{listStyle: 'none'}}><br/>
                        <div>Using a hint by clicking on the icon</div>
                        <span><Lightbulb style={{color:"yellow"}}/></span>
                        <div style={{marginTop:"20px"}}>will remove one wrong answer leaving two wrong answers and a correct answer. You can use as many hints as possible on a single question</div><br />
                        <img className="img-center" src={Hints} alt="Quiz APP hints example" />
                    </li>
                    <li style={{listStyle: 'none'}}><br/>
                        Feel free to quit (or retire from the game) at any time. In that case your score will be revealed to you afterward.
                    </li><br />
                    <li>
                        The timer starts as soon as the game loads
                    </li>
                    <li>
                        Let's do this if you think you've what it takes?
                    </li>
                </ul> 
            </div>
                <div className="action d-flex">
                    <div className="right">
                        <Link to="/">
                        <div className="back_button">                      
                            <svg height="16" width="16" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1024"><path d="M874.690416 495.52477c0 11.2973-9.168824 20.466124-20.466124 20.466124l-604.773963 0 188.083679 188.083679c7.992021 7.992021 7.992021 20.947078 0 28.939099-4.001127 3.990894-9.240455 5.996574-14.46955 5.996574-5.239328 0-10.478655-1.995447-14.479783-5.996574l-223.00912-223.00912c-3.837398-3.837398-5.996574-9.046027-5.996574-14.46955 0-5.433756 2.159176-10.632151 5.996574-14.46955l223.019353-223.029586c7.992021-7.992021 20.957311-7.992021 28.949332 0 7.992021 8.002254 7.992021 20.957311 0 28.949332l-188.073446 188.073446 604.753497 0C865.521592 475.058646 874.690416 484.217237 874.690416 495.52477z"></path></svg>
                            <span>No please take me back</span>
                        </div>

                        </Link>
                    </div>
                    <div className="left">
                        <Link to="/play/quiz" className="left">
                            <div className="game_button">
                                <span> Game On!</span>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default QuizInstructions;