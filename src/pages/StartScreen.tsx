import React from 'react';
import { Link } from "react-router-dom";

interface IProps {}

interface IState {
    counter: number
}

class StartScreen extends React.Component<IProps, IState> {
    constructor(props: IProps){
        super(props);

        this.state = { 
            counter: 0
        }

        this.increaseCounter = this.increaseCounter.bind(this);
    }

    increaseCounter = () => {
        this.setState((state) => ({
            counter: state.counter + 1,
        }));
    }

    render(){
        return (
            <>
                <div onClick={this.increaseCounter}>Increase this number: {this.state.counter}</div>
                <Link to="/game">Game</Link>
            </>
        )
    }
}

export default StartScreen;