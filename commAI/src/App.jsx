import { useEffect, useState } from 'react'
import Navbar from './Navbar'
import About from './About'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import ScrollTriggerComponent from './Test'
import Login from './Login';
import Register from './Register';
import Profile from './Profile';

function App() {

  return (
    <Router>
      <>
        <Navbar/>
        <Switch>
          <Route exact path="/">
            <About/>
          </Route>
          <Route exact path="/login">
            <Login/>
          </Route>
          <Route exact path="/register">
            <Register/>
          </Route>
          <Route exact path="/profile">
            <Profile/>
          </Route>
        </Switch>
      </>
    </Router>
  )
}

export default App
