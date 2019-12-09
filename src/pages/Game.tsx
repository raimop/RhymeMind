import React, { ReactElement } from 'react';
import "./Game.css";

interface IProps {}

interface IState {
    showField: boolean,
    sentence: string,
    sentenceArray: Array<String>
    premadeSentences: Array<String>
    sentenceIndex: number,
}

class Game extends React.Component<IProps, IState> {
    constructor(props: IProps){
        super(props);

        this.state = { 
            showField: true,
            sentence: "",
            sentenceArray: [],
            premadeSentences: ["test1"],
            sentenceIndex: 0
        };

        this.toggleShowField = this.toggleShowField.bind(this);
    }

    toggleShowField = (): void => {
        this.state.showField === true ? this.toggleHelper(false) : this.toggleHelper(true);
    }

    toggleHelper = (input: boolean): void => {
        this.setState({
            showField: input,
        });
    }

    handleSubmit = (event: any, defaultButton: boolean = true): void => {
        event.preventDefault();
        if (defaultButton) {
            this.dispenceSenteceIntoArray();
            this.rhymeResponse();
        }
        this.toggleShowField();
    }

    dispenceSenteceIntoArray = (): void=> {
        const array = this.state.sentenceArray || [];
        console.log(array);
        array.push(this.state.sentence);
        
        this.setState({ ...this.state, sentence: "", sentenceArray: array });
    }

    rhymeResponse = async (): Promise<void> => {
        const url = "/api/rhyme/" + this.state.sentence;
        const response = await fetch(url);
        let json = await response.json().catch(err => console.log(err));
        console.log(json);
    }

    handleChange = (event: any): void=> {
        this.setState({[event.target.name]: event.target.value} as Pick<IState, keyof IState>);
    }

    render(): ReactElement {
        return(
            <main>
                { (this.state.showField) ? <InputField sentences={this.state.premadeSentences} props={this.state} handleSubmit={this.handleSubmit} handleChange={this.handleChange} /> : <div onClick={(e) => this.handleSubmit(e, false)}>click miiiiiii</div> }
                <ShowHistory props={this.state}/>
            </main>
        )
    }
}

interface ShowHistoryProps {
    props: IState
}

const ShowHistory: React.FC<ShowHistoryProps> = ({props}) : JSX.Element => {
    return (
        <div>
            <span>{props.premadeSentences[0]}</span>
        {
            props.sentenceArray.map((item, i) => {
                let line;
                if ((i % 2) === 0) line = <div style={{color: "blue", position: "relative", right: "10%"}} key={i}>1 {props.premadeSentences[0]}{item} {i}</div>
                else line = <div style={{color: "red", position: "relative", left: "10%"}} key={i}>2 {item} {i}</div>
                return line
            })
        }
        </div>
    );
}

interface InputFieldProps {
    props: IState,
    handleSubmit: Function,
    handleChange: Function,
    sentences: Array<String>
}

const InputField: React.FC <InputFieldProps> = ({ props, handleSubmit, handleChange, sentences}) : JSX.Element => {
    console.log(props);
    console.log("handlesubmit", handleSubmit);
    return (
        <div>
            <form onSubmit={ e => handleSubmit(e, "h1") }>
                <span>{sentences}</span>
                <input name="sentence" type="text" value={props.sentence} onChange={ e => handleChange(e) }/>
                <button>SEND</button>
            </form>
        </div>
    );
}

export default Game;