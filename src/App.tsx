import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Home } from './containers/Home'
import Create from './containers/Create'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <div className="containers pb-5">
            <ul>
              <Link to='/'>Home</Link>
              <Link to='/create'>Create</Link>
              <Link to='/edit/10'>Edit</Link>
            </ul>
            <Route path="/" exact component={Home}></Route>
            <Route path="/create" component={Create}></Route>
            <Route path="/edit/:id" component={Create}></Route>
          </div>
        </div>
      </Router>

    )
  }
}

export default App
