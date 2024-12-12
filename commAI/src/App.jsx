import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './Navbar';
import About from './About';
import ScrollTriggerComponent from './Test';
import Login from './Login';
import Register from './Register';
import Profile from './Profile';
import Evaluation from './Evaluation';
import Reports from './Reports';
import IndividualReport from './IndividualReport';

function App() {
  return (
    <Router>
      <>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <About />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path="/profile">
            <Profile />
          </Route>
          <Route exact path="/test">
            <Evaluation />
          </Route>
          <Route exact path="/reports">
            <Reports />
          </Route>
          <Route exact path="/reports/:id">
            <IndividualReport />
          </Route>
        </Switch>
      </>
    </Router>
  );
}

export default App;
