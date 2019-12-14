import React from 'react';
import "./ShowHistory.css";

interface IState {
    showField: boolean,
    showGameOver: boolean,
    sentence: string,
    sentenceArray: Array<String>
    computer: Array<String>
    score: number,
    timerRunning: boolean,
    time: number
}

interface ShowHistoryProps {
    props: IState,
    funny: Function
}

const ShowHistory: React.FC<ShowHistoryProps> = ({props, funny}) : JSX.Element => {
    return (
        <div id="scrollable">
        {
            props.sentenceArray.map((item, i) => {
                let line;
                if ((i % 2) === 0) line = <div className="computerText box box--corner--computer" key={i}><div className="box--text">{item}</div></div>
                else line = <div className="playerText box box--corner--player" key={i}><div className="box--text">{item}</div></div>
                return line
            })
        }
        {funny()}
        </div>
    );
}

export default ShowHistory;