import React, {Component} from 'react'
import {
    HashRouter as Router,
    Route,
    Switch
} from 'react-router-dom';
import Home from './Home';
import Image from './Image';
import NotFound from "./NotFound";

class App extends Component {

    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route exact path="/image/:id" component={Image}/>
                    <Route exact path="/notFound" component={NotFound}/>
                    <Route component={NotFound}/>
                </Switch>
            </Router>
        );
    }
}

export default App;