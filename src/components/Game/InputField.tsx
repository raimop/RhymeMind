import React from "react";

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

interface InputFieldProps {
    props: IState,
    handleSubmit: Function,
    handleChange: Function,
}

const InputField: React.FC <InputFieldProps> = ({ props, handleSubmit, handleChange}) : JSX.Element => {
    return (
        <div className="input">
            <form className="form" onSubmit={ e => handleSubmit(e) }>
                <input autoFocus id="input" name="sentence" type="text" placeholder="Type your best rhyme" value={props.sentence} onChange={ e => handleChange(e) }/>
                <button className="game--submit">SEND</button>
            </form>
        </div>
    );
}

export default InputField;