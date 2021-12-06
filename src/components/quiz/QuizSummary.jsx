import React, {Component, Fragment} from 'react';
import { Helmet } from 'react-helmet';
import "./QuizSummary.css"

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
                numberOfQuestions: state.numberOfQuestions,
                numberOfAnsweredQuestions: state.numberOfAnsweredQuestions,
                correctAnswers: state.correctAnswers,
                wrongAnswers: state.wrongAnswers,
                hintsUsed: state.hintsUsed,
                fiftyFiftyUsed: state.fiftyFiftyUsed
            });
        }
    }

    render() {
        const {state} = this.props.location;
        let stats, remark;
        const userScore = this.state.score

        if(userScore <= 30) {
            remark = 'You need more practice!';
        } else if(userScore > 30 && userScore <= 50) {
            remark = 'Better luck next time!';
        } else if(userScore <= 70 && userScore > 50) {
            remark = 'You can do better!'
        } else if(userScore >= 71 && userScore <= 84) {
            remark = 'You did great!';
        } else {
            remark = 'You are an absolute genius'
        }

        if (state !== undefined) {
            stats = (
            <Fragment>
                <div className="text-center mt-5">
                    <img src="https://emojipedia-us.s3.amazonaws.com/source/skype/289/check-box-with-check_2611-fe0f.png" alt="check" width="150"/>
                </div>
                <h2 className="quiz_summary_header" style={{fontFamily:'JelleeBold'}}>Quiz has ended</h2>
                <div className="quiz_summary text-white" style={{fontFamily:'JelleeBold'}}>
                    <h1>{remark}</h1>
                    <h2 className="quiz_summary_header">Your Score: {this.state.score.toFixed(0)}&#37;</h2>
                    <span className="summary_left">Total number of questions: </span>
                    <span className="summary_right">{this.state.numberOfQuestions}</span>
                    <br /><hr />
                    <span className="summary_left">Total number of Attempted questions: </span>
                    <span className="summary_right">{this.state.numberOfAnsweredQuestions}</span>
                    <br /><hr />
                    <span className="summary_left">Total number of Correct Answer: </span>
                    <span className="summary_right">{this.state.correctAnswers}</span>
                    <br /><hr />
                    <span className="summary_left">Total number of Wrong Answer: </span>
                    <span className="summary_right">{this.state.wrongAnswers}</span>
                    <br /><hr />
                    <span className="summary_left">Total number of Hint Used: </span>
                    <span className="summary_right">{this.state.hintsUsed}</span>
                    <br /><hr />
                    <span className="summary_left">50 - 50 Used: </span>
                    <span className="summary_right">{this.state.fiftyFiftyUsed}</span>
                </div>
                    <div className="btn-group btn-group-sm mb-4" role="group" style={{fontFamily:'JelleeBold'}}>
                        <a className="summary_button" href="/">
                            Back
                        </a>               
                        <a className="summary_button" href="/play/quiz">
                            Play again
                        </a>
                    </div>
            </Fragment>
            ) 
        } else {
            stats = (
                <Fragment>
                    <section>
                        <h1 className="no">No Stats available please take a quiz</h1>
                        <div className="btn-group btn-group-sm" role="group">
                            <a className="summary_button" href="/">
                                Back
                            </a>               
                            <a className="summary_button" href="/play/quiz">
                                Play again
                            </a>
                        </div>
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