import React, { ReactElement } from 'react';
import "./Game.css";

interface IProps {}

interface IState {
    showField: boolean,
    sentence: string,
    sentenceArray: Array<String>
}

class Game extends React.Component<IProps, IState> {
    constructor(props: IProps){
        super(props);

        this.state = { 
            showField: true,
            sentence: "",
            sentenceArray: []
        }

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
                { (this.state.showField) ? <InputField props={this.state} handleSubmit={this.handleSubmit} handleChange={this.handleChange} /> : <div onClick={(e) => this.handleSubmit(e, false)}>click miiiiiii</div> }
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
        {
            props.sentenceArray.map((item, i) => {
                let line;
                if ((i % 2) === 0) line = <div style={{color: "blue", position: "relative", right: "10%"}} key={i}>1 {item} {i}</div>
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
}

const InputField: React.FC <InputFieldProps> = ({ props, handleSubmit, handleChange}) : JSX.Element => {
    console.log(props);
    console.log("handlesubmit", handleSubmit);
    return (
        <div>
            <form onSubmit={ e => handleSubmit(e) }>
                <input name="sentence" type="text" value={props.sentence} onChange={ e => handleChange(e) }/>
                <button>SEND</button>
            </form>
        </div>
    );
}

export default Game;