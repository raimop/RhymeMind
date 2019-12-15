import React from 'react';
import { Link } from "react-router-dom";
import "./Header.css";

interface IProps {}

interface IState {
    showHeaderArrow: boolean,
}

class Header extends React.Component<IProps, IState> {
    constructor(props: IProps){
        super(props);

        this.state = {
            showHeaderArrow: true
        }
    }

    toggleHeaderArrow = () => {
        this.setState({ showHeaderArrow: !this.state.showHeaderArrow });
    }

    showMaskMan = (foo: any) => {
        console.log(foo);
    }

    render(){
        return (
            <>
                <div className="header" data-foo="sammy" onFocus={ this.toggleHeaderArrow }>

                    <div className="buttons">
                        <div className="header--start"><Link to="/">Start screen</Link></div>
                        <div className="header--game"><Link to="/game">Start Game</Link></div>
                        <div className="header--about"><Link to="/about">About</Link></div>
                    </div>
                </div>
                { (this.state.showHeaderArrow) ? <div className="header--arrow">^ menu</div> : null }
            </>
        )
    }
}

export default Header;