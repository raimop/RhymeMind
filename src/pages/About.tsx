import React from 'react';
import "./About.css";

interface IProps {}

interface IState {}

class About extends React.Component<IProps, IState> {
    render(){
        return (
            <>
                <div className="center">Raimo Pregel, Sander Hanni, Steven Saluri</div>
            </>
        )
    }
}

export default About;