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
                <div style={{marginTop:"100px"}}>
                    <img src="https://emojipedia.org/static/img/logo/emojipedia-logo-140.0d779a8a903c.png" alt="bg-img" />
                </div>
                <h1>Emoji Quiz App</h1>
                <div className="play-button-container">
                    <div>
                        <lbi>
                            <Link to="/play/instructions" class="cssbuttons-io-button play-button" style={{fontWeight:"800"}}>
                                PLAY
                                <div class="icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                        <path fill="none" d="M0 0h24v24H0z">
                                        </path>
                                        <path fill="currentColor" d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z">
                                        </path>
                                    </svg>
                                </div>
                            </Link>
                        </lbi>
                    </div>
                    <div className="auth-container">
                        <Link className="auth-buttons" id="auth-login" to="/login">                                                 
                            <span><p className="button_padding">Login</p></span>
                            <div class="liquid"></div>
                        </Link>
                        <Link className="auth-buttons" id="auth-register" to="/register">
                            <span><p>Sign Up</p></span>
                            <div class="liquid"></div>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    </Fragment>
    )

export default Home;
