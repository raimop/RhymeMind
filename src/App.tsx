import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import './App.css';
import Game from './Game';
import StartScreen from './StartScreen';

interface IProps {}

interface IState {
    counter: number
}

//const App: React.FC = () => {
class App extends React.Component<IProps, IState> {
  render() {
    return (
    <Router>
      <div>
        <Link to="/">StartScreen</Link> 
        <Link to="/game">Game</Link>

        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <Switch>
          <Route exact path="/">
            <StartScreen/>
          </Route>
          <Route path="/game">
            <Game/>
          </Route>
        </Switch>
      </div>
    </Router>
    )
  };
}

export default App;