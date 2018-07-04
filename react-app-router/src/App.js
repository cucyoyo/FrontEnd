import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Switch, Redirect, NavLink} from "react-router-dom"
import Common from './components/Common'



class App extends Component {
  render() {
    return (
      <Router>
        <div className="app">
          {/*<Common></Common>*/}
          {/*<Switch>*/}
            <Route path="/" component={Common} />

            {/*<Redirect from="/" to="/Common" />*/}
            {/*<Route component={Common} />*/}
          {/*</Switch>*/}
        </div>
      </Router>
    );
  }
}

export default App;
