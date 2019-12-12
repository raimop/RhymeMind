import React from 'react';
import "./About.css";

interface IProps {}

interface IState {}

class About extends React.Component<IProps, IState> {
    render(){
        return (
            <>
                <div className="center--about about--title">RhymeMind - a game (prototype) designed developed as a project during Computer Games course in Tallinn University (autumn 2019)</div>
                <div className="center--about about--link"><a className="author--a" href="https://github.com/raimop/RhymeMind">GitHub: raimop/RhymeMind</a></div>
                <div className="center--about about--authors">Raimo Pregel, Sander Hanni, Steven Saluri</div>
            </>
        )
    }
}

export default About;