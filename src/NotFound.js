import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';

class NotFound extends Component {
    constructor() {
        super();
        this.state = {clicked: false};
    }

    render() {
        return this.state.clicked ? (<Redirect push to="/"/>) :
            (<section className="hero is-danger is-fullheight">
                    <div className="hero-body">
                        <div className="container has-text-centered">
                            <h1 className="title">
                                404
                            </h1>
                            <button className="button is-primary is-outlined is-inverted" onClick={() => this.setState({clicked: true})}>
                                Home
                            </button>
                        </div>
                    </div>
                </section>
            );
    }
}

export default NotFound;