import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Home from './components/Home.jsx';
import QuizInstruction from './components/quiz/QuizInstructions.jsx'
import "./App.css"
import Play from './components/quiz/Play.jsx';
import Error from './components/Error.jsx';

function App() {  
    return (
    <>
        <Router>    
            <Route path="/" exact component={Home} />
            <Route path="/play/instructions" exact component={QuizInstruction} />
            <Route path="/play/quiz" exact component={Play} />
            {/* <Route path="*" exact component={Error} /> */}
        </Router>  
        
    </>
    )
}

export default App;