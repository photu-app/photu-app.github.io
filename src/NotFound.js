import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';

class NotFound extends Component {
    constructor() {
        super();
        this.state = {clicked: false};
    }

    render() {
        return this.state.clicked ? (<Redirect push to="/"/>) :
            (<div>
                <h1>
                    IDIOT. THERE AIN'T NO IMAGE ON THIS PATH. FUCKING IMBECILE.
                </h1>
                <button onClick={() => this.setState({clicked: true})}>
                    Click on this button to take your sorry ass back to the homepage.
                    FUCKING BLITHERING IDIOT.
                </button>
            </div>);
    }
}

export default NotFound;