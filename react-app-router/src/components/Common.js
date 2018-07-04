import React from "react"
// import "./search.styl"
import {BrowserRouter as Router, Route, Switch, Redirect, NavLink} from "react-router-dom"
import Home from './Home'
import Df from './Df'
import Lsy from './Lsy'

class Common extends React.Component {
  render() {
    return (
      <div>
        <h1>标题</h1>
        <ul  className="header">
          <li><NavLink to="/" className="nav-link">李白</NavLink></li>
          <li><NavLink to="/df" className="nav-link">杜甫</NavLink></li>
          <li><NavLink to="/lsy" className="nav-link">李商隐</NavLink></li>

          {/*<li>杜甫</li>*/}
          {/*<li>李商隐</li>*/}
        </ul>
        <div className='content'>
          {/*<Home/>*/}
          <switch>
            <Route exact  path='/' component={Home}></Route>
            <Route path='/df' component={Df}></Route>
            <Route path='/lsy' component={Lsy}></Route>
          </switch>
        </div>
      </div>
    );
  }
}

export default Common