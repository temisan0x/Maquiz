import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { Component } from 'react/cjs/react.production.min';
import SetCenterIcon from 'mdi-react/SetCenterIcon';
import Lightbulb  from 'mdi-react/LightbulbOnIcon';
import ClockIcon from 'mdi-react/ClockIcon';
import "./play.css";
import questions from "../../questions.json";
import isEmpty from '../../utils/is-empty';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import correctNotifications from '../../assets/audio/Correct-answer.mp3'
import clickNotifications from '../../assets/audio/Clicking-sound-effect.mp3'
import wrongNotifications from '../../assets/audio/Wrong-answer-sound-effect.mp3'

toast.configure();
const customId = "custom-id-yes"



class Play extends Component {

    constructor (props) {
        super(props);
        this.state = {
            questions,
            currentQuestion:{},
            nextQuestion:{},
            previousQuestion:{},
            answer: '',
            numberOfQuestions:0,
            numberOfAnsweredQuestions:0,
            currentQuestionIndex:0,
            score: 0,
            correctAnswers:0,
            wrongAnswers:0,
            hints:5,
            fiftyFifty:2,
            usedFiftyFifty:false,
            previousRandomNumbers: [],
            time: {}
        };
    }

    componentDidMount () {
        const {questions, currentQuestion, nextQuestion, previousQuestion}= this.state;
        this.displayQuestion(questions, currentQuestion, nextQuestion, previousQuestion)
    }

    displayQuestion= (questions = this.state.questions, currentQuestion, nextQuestion, previousQuestion) => {
        let {currentQuestionIndex} = this.state;
        if (!isEmpty(questions)) {
            questions= this.state.questions;
            currentQuestion = questions[currentQuestionIndex];
            nextQuestion = questions[currentQuestionIndex + 1];
            previousQuestion = questions[currentQuestionIndex - 1];
            const answer = currentQuestion.answer;
            this.setState({
                    currentQuestion,
                    nextQuestion,
                    previousQuestion,
                    numberOfQuestions: questions.length,
                    answer,
                    previousRandomNumbers: []
                }, () => {
                    this.showOption();
                });
        }
    };

    handleOptionClick =(e) => {
        if (e.target.innerHTML.toLowerCase()=== this.state.answer.toLowerCase()) {
            this.correctAnswers();
            document.getElementById('correct_sound').play();
        } else {
            this.wrongAnswers();
            document.getElementById('wrong_sound').play();
        }
    }



    handleNextButtonClick = () => {
        this.playButtonSound();
        if (this.state.nextQuestion !== undefined) {
            this.setState(prevState => ({
                currentQuestionIndex : prevState.currentQuestionIndex + 1
            }), () => {
                this.displayQuestion(this.state , this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion);
            });
        }
    }


    handlePreviousButtonClick = () => {
        this.playButtonSound();
        if (this.state.previousQuestion !== undefined) {
            this.setState(prevState => ({
                currentQuestionIndex : prevState.currentQuestionIndex - 1
            }), () => {
                this.displayQuestion(this.state , this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion);
            });
        }
    }

    handleQuitButtonClick = () => {
        this.playButtonSound();
        window.confirm('Are you sure you want to quit the quuiz')
    }

    handleButtonClick = (e) => {
        switch (e.target.id) {
            case 'next_button':
                this.handleNextButtonClick();
                    break;
            case 'previous_button':
                this.handlePreviousButtonClick();
                    break;
            case 'quit_button':
                this.handleQuitButtonClick();
                    break;       
                    default:
                        break;
        }
    }


    playButtonSound = () => {
        document.getElementById('button_sound').play();
    }
    
    correctAnswers = () => {
        toast('Correct Answer!', {
            toastId:customId,
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            type:"success",
            progress: undefined,
            theme:"dark",
            });

        this.setState(prevState => ({
            scores:prevState.score + 1,
            correctAnswers: prevState.correctAnswers + 1,
            currentQuestionIndex: prevState.currentQuestionIndex + 1,
            numberOfAnsweredQuestions:prevState.numberOfAnsweredQuestions + 1,
        }), ()=> {
            this.displayQuestion(this.state.questions, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion)
        }
        );
    }
    
    wrongAnswers = () => {

        navigator.vibrate(1000);

        toast('Wrong Answer!', {
            toastId:customId,
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            type:"warning",
            progress: undefined,
            theme:"dark",
            });

        this.setState(prevState => ({
            wrongAnswers: prevState.wrongAnswers + 1,
            currentQuestionIndex: prevState.currentQuestionIndex + 1,
            numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions + 1
        }), ()=> {
            // displays new state
            this.displayQuestion(this.state.questions, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion)
        });
    }

    showOption = () => {
        const options = Array.from(document.querySelectorAll(".option"));
        
        options.forEach(option => {
            option.style.visibility = "visible";
        });
    }

    handleHints = () => {
        if(this.state.hints > 0) {
            const options = Array.from(document.querySelectorAll('.option'));
            let indexOfAnswer;

            options.forEach((option, index) => {
                if(option.innerHTML.toLowerCase() === this.state.answer.toLowerCase()){
                    indexOfAnswer = index;
                }
            });

            while (true) {
                const randomNumber = Math.round(Math.random() * 3);
                if (randomNumber !== indexOfAnswer && !this.state.previousRandomNumbers.includes(randomNumber)) {
                    options.forEach((option, index) => {
                        if (index === randomNumber) {
                            option.style.visibility = 'hidden';
                            this.setState((prevState) => ({
                                hints: prevState.hints - 1,
                                previousRandomNumbers: prevState.previousRandomNumbers.concat(randomNumber)
                            }));
                        }
                    });
                    break;
                }
                if(this.state.previousRandomNumbers.length >=3)break;
            }          
        }
    }

    render() {
        const { currentQuestion , currentQuestionIndex, numberOfQuestions, hints} = this.state;
    return (
        <Fragment>
            <div className="backgroundColor">
                <Helmet><title>Quiz Page</title></Helmet>
                <Fragment>
                    <audio id="correct_sound" type="audio" src={correctNotifications}></audio>
                    <audio id="button_sound" type="audio" src={clickNotifications}></audio>
                    <audio id="wrong_sound" type="audio" src={wrongNotifications}></audio>
                </Fragment>
                <div className="questions">
                    <div className="lifeline_container">
                        <p className="icon">
                            <span onClick={this.handleFiftyFifty}><SetCenterIcon className="centerIcon"/>
                                <span>3</span>
                            </span>
                        </p>
                        <p>
                            <span onClick={this.handleHints}><Lightbulb className="lifeline_icon"/>
                                <span className="lifeline">{hints}</span> 
                            </span>
                        </p>
                    </div>
                    <hr className="hr_tag1"/>
                    <br />
                    <div>
                        <p>
                            <span className="right" style={{float:'left'}}>{currentQuestionIndex + 1} of {numberOfQuestions}</span>
                            <span className="left" style={{float:'right'}}>2:15 <span><ClockIcon /></span>
                            </span>
                        </p>
                    </div><br />
                    <div className="quiz_image">
                        <img src={currentQuestion.url} alt="quiz image" style={{width:'200px'}}/>
                    </div>
                    <h5>{currentQuestion.question}</h5>
                    <hr /><br />
                    <div className="options_container">
                        <p onClick={this.handleOptionClick}  className="option">{currentQuestion.optionA}</p>
                        <p onClick={this.handleOptionClick} className="option">{currentQuestion.optionB}</p>
                    </div>
                    <div className="options_container">
                    <p onClick={this.handleOptionClick} className="option">{currentQuestion.optionC}</p>
                    <p onClick={this.handleOptionClick} className="option">{currentQuestion.optionD}</p>
                    </div>
                    <div className="btn-group mt-5">
                        <button id="previous_button" onClick={this.handleButtonClick } type="button" class="btn btn-warning">Previous</button>
                        <button id="next_button" onClick={this.handleButtonClick } type="button" class="btn btn-success">Next</button>
                        <button id="quit_button" onClick={this.handleButtonClick } type="button" class="btn btn-danger">Quit</button>
                    </div>
                </div>  
            </div>
        </Fragment>
        )
}
}

export default Play;