import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { Component } from 'react/cjs/react.production.min';
import SetCenterIcon from 'mdi-react/SetCenterIcon';
import "./play.css";
import questions from "../../questions.json";
import isEmpty from '../../utils/is-empty';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import correctNotifications from '../../assets/audio/Correct-answer.mp3'
import clickNotifications from '../../assets/audio/Clicking-sound-effect.mp3'
import wrongNotifications from '../../assets/audio/Wrong-answer-sound-effect.mp3'
import classNames from 'classnames'


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
            nextButtonDisabled:false,
            previousButtonDisabled:true,
            time: {}
        };
        this.interval = null;
        this.correctSound = React.createRef();
        this.wrongSound = React.createRef();
        this.buttonSound = React.createRef();
    }

    componentDidMount () {
        const {questions, currentQuestion, nextQuestion, previousQuestion}= this.state;
        this.displayQuestion(questions, currentQuestion, nextQuestion, previousQuestion);
        this.startTimer();
    }

    componentWillUnmount () {
        clearInterval(this.interval);
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
                    this.handleDisableButton();
                });
        }
    };

    handleOptionClick =(e) => {
        if (e.target.innerHTML.toLowerCase()=== this.state.answer.toLowerCase()) {
            this.correctAnswers();
            // document.getElementById('correct_sound').play();
            this.correctSound.current.play();
        } else {
            this.wrongAnswers();
            // document.getElementById('wrong_sound').play();
            this.wrongSound.current.play();
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
        window.confirm('Are you sure you want to quit the quiz 😥')
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
        // document.getElementById('button_sound').play();
        this.buttonSound.current.play();
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
            if (this.state.nextQuestion === undefined) {
                this.endGame()
            } else {
                this.displayQuestion(this.state.questions, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion)
            }
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
            if (this.state.nextQuestion === undefined) {
                this.endGame()
            } else {
                this.displayQuestion(this.state.questions, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion)
            }
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
        const countDownTimer = Date.now() + 180000;
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
                    this.endGame();
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

    handleDisableButton =()=> {
        if (this.state.previousQuestion === undefined || this.state.currentQuestionIndex === 0 ) {
            this.setState({
                previousButtonDisabled: true
            });
        } else {
            this.setState({
                previousButtonDisabled: false
            });
        }

        if (this.state.nextQuestion === undefined || this.state.currentQuestionIndex + 1 === this.state.numberOfQuestions) {
            this.setState({
                nextButtonDisabled: true
            });
        } else {
            this.setState({
                nextButtonDisabled: false
            });
        }
        
    }

    endGame =()=> {
        alert(`Emoji Quiz has ended`);
        const {state} = this;
        const playerStats = {
            score: state.score,
            numberOfQuestions: state.numberOfQuestions,
            numberOfAnsweredQuestions:state.numberOfAnsweredQuestions,
            correctAnswers: state.correctAnswers,
            wrongAnswers: state.wrongAnswers,
            fiftyFiftyUsed: 2 - state.fiftyFifty,
            hintsUsed: 5 - state.hints,
        };
        console.log(playerStats);
        setTimeout(() => {
            this.props.history.push('/')
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
                    <audio ref={this.correctSound} type="audio" src={correctNotifications}></audio>
                    <audio ref={this.buttonSound} type="audio" src={clickNotifications}></audio>
                    <audio ref={this.wrongSound} type="audio" src={wrongNotifications}></audio>
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
                                <span className="icon_left" onClick={this.handleFiftyFifty}><SetCenterIcon className="centerIcon" size="25"/>
                                    <span>{fiftyFifty}</span>
                                </span>
                                <span onClick={this.handleHints}className="lifeline_icon">💡{hints}</span> 
                            </div>
                        </div>
                    </div>
                    <div className="quiz_image">
                        {currentQuestion.emoji}
                    </div>


                    <div className="question_section">
                        <div className="numberOfQuestions" style={{float:'left'}}>
                            <span>question     </span>
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
                <div className="btn-group btn-group-sm" role="group">
                    <button 
                        id="previous_button" 
                        onClick={this.handleButtonClick } 
                        type="button" 
                        className={classNames('btn size_right', {'disable': this.state.previousButtonDisabled})}>
                            ⏮️  Previous
                    </button>
                    <button 
                        id="next_button" 
                        onClick={this.handleButtonClick } 
                        type="button" 
                        className={classNames('btn size_left', {'disable': this.state.nextButtonDisabled})}>
                            Next ⏭️
                    </button>
                </div>
            </div>
        </Fragment>
        )
}
}

export default Play;