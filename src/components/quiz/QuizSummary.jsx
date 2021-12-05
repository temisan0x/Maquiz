import React, {Component, Fragment} from 'react';
import { Helmet } from 'react-helmet';

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
            </Fragment>
            ) 
        } else {
            stats = (
                <h1>No Stats availabe please take a quiz</h1>
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