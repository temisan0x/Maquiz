import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

const Home = () => (
    <Fragment>
        <Helmet>
            <title>
                EmojiQuiz App - Home
            </title>
        </Helmet>
        <div className="home d-flex">
            <section class="home_section" style={{textAlign: 'center'}}>
                <div style={{marginTop:"150px"}}>
                    <img src="https://emojipedia.org/static/img/logo/emojipedia-logo-140.0d779a8a903c.png" alt="bg-img" />
                </div>
                <h1>Emoji Quiz App</h1>
                <div className="play-button-container">
                    <div>
                        <Link to="/play/quiz" className="button-53" role="button">Button 53</Link>
                        <Link to="/play/instructions" className="button-54">
                            hello    
                        </Link> 
                    </div>
                    <br />
                </div>
            </section>
        </div>
    </Fragment>
    )

export default Home;
