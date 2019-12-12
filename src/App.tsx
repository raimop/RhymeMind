import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Game from "./pages/Game";
import StartScreen from "./pages/StartScreen";
import About from "./pages/About";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

toast.configure({
  autoClose: 3000,
  draggable: false,
  position: toast.POSITION.BOTTOM_RIGHT,
});

class App extends Component {
render() {
    return (
      <BrowserRouter>
        <Route path={"/"} component = {Header}/>
          <Switch>
              <Route path="/" exact component={StartScreen} />
              <Route path="/game" exact component={Game} />
              <Route path="/about" exact component={About} />
              <Route component={StartScreen} />
          </Switch>
      </BrowserRouter>
    );
  }
}

export default App;