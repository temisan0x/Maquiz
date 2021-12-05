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

    render() {
        console.log(this.props);
        return (
            <Fragment>
                <Helmet>
                    <title>EmojiQuiz summary</title>
                </Helmet>
            </Fragment>
        );
    }
}

export default QuizSummary;