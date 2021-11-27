import React from 'react';
import {Route, Routes} from "react-router-dom";
import Home from './components/Home.jsx';
import QuizInstruction from './components/quiz/QuizInstructions.jsx'
import "./App.css"
import Play from './components/quiz/Play.jsx';

function App() {  
    return (
    <>
        <Routes>    
            <Route path="/" exact element={<Home/>} />
            <Route path="/play/instructions" exact element={<QuizInstruction/>} />
            <Route path="/play/quiz" exact element={<Play/>} />
        </Routes>  
        
    </>
    )
}

export default App;