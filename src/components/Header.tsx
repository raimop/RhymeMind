import React from 'react';
import { Link } from "react-router-dom";
import "./Header.css";

interface IProps {}

interface IState {}

class Header extends React.Component<IProps, IState> {

    render(){
        return (
            <>
                <div className="header">
                    <div className="buttons">
                        <div><Link to="/">Start screen</Link></div>
                        <div className="header--start"><Link to="/game">Start Game</Link></div>
                        <div><Link to="/about">About</Link></div>
                    </div>
                </div>
                <div className="arrow">^</div>
            </>
        )
    }
}

export default Header;