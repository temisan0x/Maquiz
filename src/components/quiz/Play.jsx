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
import fiftyFift from '../../assets/img/fifty-fifty.png'

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
        this.interval = null;
    }

    componentDidMount () {
        const {questions, currentQuestion, nextQuestion, previousQuestion}= this.state;
        this.displayQuestion(questions, currentQuestion, nextQuestion, previousQuestion);
        this.startTimer();
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
        window.confirm('Are you sure you want to quit the quuiz ')
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
        this.setState({
            usedFiftyFifty:false,
        })
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

    handleFiftyFifty = () => {
        if (this.state.fiftyFifty > 0 && this.state.usedFiftyFifty === false) {
            const options = document.querySelectorAll('.option');
            const randomNumbers = [];
            let indexOfAnswer;

            options.forEach((option, index) => {
                if (option.innerHTML.toLowerCase() === this.state.answer.toLowerCase()) {
                    indexOfAnswer = index;
                }
            });

            let count = 0;
            do {
                const randomNumber = Math.round(Math.random() * 3);
                if (randomNumber !== indexOfAnswer) {
                    if (randomNumber.length < 2 && !randomNumbers.includes(randomNumber) && !randomNumbers.includes(indexOfAnswer)) {
                        //hide options
                        randomNumbers.push(randomNumber);
                        count ++;
                    } else {
                        while (true) {
                            const newRandomNumber = Math.round(Math.random() * 3);
                            if (!randomNumbers.includes(newRandomNumber) && !randomNumbers.includes(indexOfAnswer)) {
                                randomNumbers.push(newRandomNumber);
                                count ++;
                                break;
                            }
                        }             
                    }
                }
            } while (count < 2);
            options.forEach((option, index) => {
                if(randomNumbers.includes(index)){
                    option.style.visibility = 'hidden';
                }
            });
            this.setState(prevState =>({
                fiftyFifty: prevState.fiftyFifty -1,
                usedFiftyFifty:true
            }))
        } 
    }

    startTimer = () => {
        const countDownTimer = Date.now() + 1800000000;
        this.interval = setInterval(() => {
            const now = new Date();
            const distance = countDownTimer - now;
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            if (distance < 0) {
                clearInterval(this.interval);
                this.setState({
                    time: {
                        minutes: 0,
                        seconds: 0
                    }
                }, () => {
                    alert('Quiz has ended');
                    this.props.history.push('/'); 
                });
            } else {
                this.setState({
                    time: {
                        minutes,
                        seconds  
                    }
                })
            }
        }, 1000);
    }

    render() {
        const { currentQuestion,
            currentQuestionIndex, 
            fiftyFifty, 
            numberOfQuestions, 
            hints,
            time}
        = this.state;
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
                    <div className="question_header">
                        <div className="btn quiz_bold" id="quit_button"type="button"  onClick={this.handleButtonClick } >
                            X
                        </div>
                        <div className="quiz_timer">
                            <span>{time.minutes}:{time.seconds} <span>
                            ⏲️ </span>
                            </span>
                        </div>
                        <div className="lifeline_container">
                            <div className="icon">
                                <span className="icon_left" onClick={this.handleFiftyFifty}><SetCenterIcon className="centerIcon" fontSize="large" size="35"/>
                                    <span>{fiftyFifty}</span>
                                </span>
                                <span onClick={this.handleHints}><span className="lifeline_icon">💡</span> 
                                    <span className="lifeline">{hints}</span> 
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="quiz_image">
                        {currentQuestion.emoji}
                    </div>


                    <div className="question_section">
                        <div className="numberOfQuestions" style={{float:'left'}}>
                            <span>question</span>
                            <span>{currentQuestionIndex + 1} of {numberOfQuestions}</span>
                        </div> 
                        <h5 className="question_">{currentQuestion.question}</h5>
                    </div>
                    <hr /><br />
                    <div className="options_container">
                        <p onClick={this.handleOptionClick}  className="option">{currentQuestion.optionA}</p>
                        <p onClick={this.handleOptionClick} className="option">{currentQuestion.optionB}</p>
                    </div>
                    <div className="options_container">
                    <p onClick={this.handleOptionClick} className="option">{currentQuestion.optionC}</p>
                    <p onClick={this.handleOptionClick} className="option">{currentQuestion.optionD}</p>
                    </div>
                </div>
            </div>
        </Fragment>
        )
}
}

export default Play;