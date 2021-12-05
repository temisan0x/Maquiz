import React, {Component, Fragment} from 'react';
import { Helmet } from 'react-helmet';
import {Link} from 'react-router-dom';

class QuizSummary extends Component {

    constructor (props) {
        super(props);
        this.state = {
            score: 0,
            numberOfQuestions: 0,
            numberOfAnsweredQuestions: 0,
            correctAnswers:0,
            wrongAnswers:0,
            fiftyFiftyUsed: 0,
            hintsUsed: 0,
        }
    }

    componentDidMount () {
        const {state} = this.props.location;
        if (state) {
            this.setState({
                score: (state.score / state.numberOfQuestions) * 100,
                numberOfQuestions: state.numberOfQuestions - (state.correctAnswers + state.wrongAnswers),
                numberOfAnsweredQuestions: state.numberOfAnsweredQuestions,
                correctAnswers: state.correctAnswers,
                wrongAnswers: state.wrongAnswers,
                hintsUsed: state.hintsUsed,
                fiftyFiftyUsed: state.fiftyFiftyUsed
            });
        }
    }

    render() {
        const {state, score} = this.props.location;
        let stats, remark;

        if(score <= 30) {
            remark = 'You need more practice!';
        } else if(score > 30 && score <= 50) {
            remark = 'Better luck next time!';
        } else if(score <= 70 && score > 50) {
            remark = 'You can do better!'
        } else if(score >= 71 && score <= 84) {
            remark = 'You did great!';
        } else {
            remark = 'You are an absolute genius'
        }

        if (state !== undefined) {
            stats = (
            <Fragment>
                <div>
                    <img src="https://emojipedia-us.s3.amazonaws.com/source/skype/289/check-box-with-check_2611-fe0f.png" alt="check" />
                </div>
                <h1>Quiz has ended</h1>
                <div className="container">
                    <h4>{remark}</h4>
                    <h2>Your Score: {this.state.score.toFixed(0)}&#37;</h2>
                    <span className="stats left">Total number of questions: </span>
                    <span className="right">{this.state.numberOfQuestions}</span>
                    <br />
                    <span className="stats left">Total number of Attempted questions: </span>
                    <span className="right">{this.state.numberOfAnsweredQuestions}</span>
                    <br />
                    <span className="stats left">Total number of Correct Answer: </span>
                    <span className="right">{this.state.correctAnswers}</span>
                    <br />
                    <span className="stats left">Total number of Wrong Answer: </span>
                    <span className="right">{this.state.wrongAnswers}</span>
                    <br />
                    <span className="stats left">Total number of Hint Used: </span>
                    <span className="right">{this.state.hintsUsed}</span>
                    <br />
                    <span className="stats left">50 - 50 Used: </span>
                    <span className="right">{this.state.fiftyFiftyUsed}</span>
                </div>
                <section>
                    <ul>
                        <li>
                            <Link to="/">Back to home</Link>
                        </li>
                        <li>
                            <Link to="/play/quiz">Play Again</Link>
                        </li>
                    </ul>
                </section>
            </Fragment>
            ) 
        } else {
            stats = (
                <Fragment>
                    <section>
                        <h1 className="no">No Stats available please take a quiz</h1>
                        <ul>
                        <li>
                            <Link to="/">Back to home</Link>
                        </li>
                        <li>
                            <Link to="/play/quiz">Play Again</Link>
                        </li>
                    </ul>
                    </section>
                </Fragment>
            )
        }
        return (
            <Fragment>
                <Helmet>
                    <title>EmojiQuiz summary</title>
                </Helmet>
                {stats}
            </Fragment>
        );
    }
}

export default QuizSummary;