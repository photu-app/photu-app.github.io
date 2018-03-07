import React, {Component} from 'react';
import './Home.css';
import {get} from './gist';
import {Redirect} from 'react-router-dom';

class Image extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {imageData: "", notFound: false};
    }

    componentWillMount() {
        get(this.props.match.params.id, (data) => this.setState({imageData: data}),
            (err) => this.setState({notFound: true}));
    }

    render() {
        return this.state.notFound ?
            (<Redirect push to="/notFound"/>) : (<img src={this.state.imageData} alt=""/>);
    }
}

export default Image;
