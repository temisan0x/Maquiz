import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { Component } from 'react/cjs/react.production.min';
import SetCenterIcon from 'mdi-react/SetCenterIcon';
import Lightbulb  from 'mdi-react/LightbulbOnIcon';
import ClockIcon from 'mdi-react/ClockIcon';
import "./play.css"


class Play extends Component {
   // constructor (props) {
    //     super(props);
    
    // }

    incrementCount = () => {
        this.setState({ count: ++this.state.count });
    }

    render() {
    return (
        <Fragment>
            <div className="backgroundColor">
                <Helmet><title>Quiz Page</title></Helmet>
                <div className="questions">
                    <div className="lifeline_container">
                        <p className="icon">
                            <span><SetCenterIcon style={{color:"green"}}/>  3</span>
                        </p>
                        <p>
                            <span><Lightbulb style={{color:"yellow"}}/></span>
                            <span className="lineline">  5</span> 
                        </p>
                    </div>
                    <div>
                        <p>
                            <span>1 of 15</span>2.12 
                            <span><ClockIcon /></span>
                        </p>
                    </div><br />
                    <h5>Google was founded in what year</h5>
                    <hr />
                    <div className="options_container">
                        <p className="option">1997</p>
                        <p className="option">1997</p>
                    </div>
                    <div className="options_container">
                        <p className="option">1997</p>
                        <p className="option">1997</p>
                    </div>

                    <div className="btn-group mt-5">
                        <button type="button" class="btn btn-warning">Previous</button>
                        <button type="button" class="btn btn-success">Next</button>
                        <button type="button" class="btn btn-danger">Quit</button>
                    </div>
                </div>  
            </div>
        </Fragment>
        )
}
}

export default Play;