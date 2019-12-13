import React from 'react';
import { Link } from "react-router-dom";
import "./StartScreen.css";

interface IProps {}

interface IState {}

class StartScreen extends React.Component<IProps, IState> {
    render(){
        return (
            <>
                <div className="start">
                    <div className="startscreen--title">RhymeMind</div>
                    <div className="buttons--front">
                        <Link to="/game"><div className="btn purple buttons--front--start">Start</div></Link>
                        <Link to="/about"><div className="btn buttons--front--about">About</div></Link>
                    </div>
                </div>
            </>
        )
    }
}

export default StartScreen;