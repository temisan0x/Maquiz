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
            //setState to update answer 
            this.setState({
                    currentQuestion,
                    nextQuestion,
                    previousQuestion,
                    numberOfQuestions: questions.length,
                    answer
                });
        }
    };

    handleOptionClick = (e)=> {
        if(e.target.innerHTML.toLowerCase() === this.state.answer.toLowerCase()){
            setTimeout(()=> {
                document.getElementById('correct_sound').play();
                this.correctAnswers();
            }, 500)
            
        } else {
            setTimeout(()=>{
                document.getElementById('wrong_sound').play();
                this.wrongAnswers();
            })        
        }
    }

    handleButtonClick = (e)=> {
        this.playButtonSound();
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
            currentQuestionIndex: prevState.currentQuestionIndex,
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

    render() {
        const { currentQuestion , currentQuestionIndex, numberOfQuestions} = this.state;
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
                            <span><SetCenterIcon style={{color:"green", cursor:"pointer"}}/>  3</span>
                        </p>
                        <p>
                            <span><Lightbulb style={{color:"yellow", cursor:"pointer"}}/></span>
                            <span className="lineline">  5</span> 
                        </p>
                    </div>
                    <div>
                        <p>
                            <span className="right" style={{float:'left'}}>{currentQuestionIndex + 1} of {numberOfQuestions}</span>
                            <span className="left" style={{float:'right'}}>2:15 <span><ClockIcon /></span>
                            </span>
                        </p>
                    </div><br />
                    <h5>{currentQuestion.question}</h5>
                    <hr />
                    <div className="options_container">
                    <p onClick={this.handleOptionClick}  className="option">{currentQuestion.optionA}</p>
                    <p onClick={this.handleOptionClick} className="option">{currentQuestion.optionB}</p>
                    </div>
                    <div className="options_container">
                    <p onClick={this.handleOptionClick} className="option">{currentQuestion.optionC}</p>
                    <p onClick={this.handleOptionClick} className="option">{currentQuestion.optionD}</p>
                    </div>

                    <div className="btn-group mt-5">
                        <button onClick={this.handleButtonClick } type="button" class="btn btn-warning">Previous</button>
                        <button onClick={this.handleButtonClick } type="button" class="btn btn-success">Next</button>
                        <button onClick={this.handleButtonClick } type="button" class="btn btn-danger">Quit</button>
                    </div>
                </div>  
            </div>
        </Fragment>
        )
}
}

export default Play;