import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Home from './components/Home.jsx';
import QuizInstruction from './components/quiz/QuizInstructions.jsx'
import "./App.css"
import Play from './components/quiz/Play.jsx';

function App() {  
    return (
    <div className="container">
        <Router>    
            <Route path="/" exact component={Home} />
            <Route path="/play/instructions" exact component={QuizInstruction} />
            <Route path="/play/quiz" exact component={Play} />
        </Router>  
        
    </div>
    )
}

export default App;