import React, { ReactElement } from 'react';
import "./Game.css";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import logo from "../images/test.png";

interface IProps {}

interface IState {
    showField: boolean,
    showGameOver: boolean,
    sentence: string,
    sentenceArray: Array<String>
    computer: Array<String>
}

interface rhymeResponseProps {
    sentence: string,
    pronouncation: string
}

class Game extends React.Component<IProps, IState> {
    timer: number;
    constructor(props: IProps){
        super(props);

        this.state = {
            showField: true,
            showGameOver: false,
            sentence: "",
            sentenceArray: [],
            computer: ["word","cord","told","bored", "king", "thing", "cake", "wake", "bake", "placed", "taken", "later", "totally", "vocal", "fuck", "duck", "possibility", "lavender", "damage", "car", "far", "apple", "gap", "trap", "nap", "hat", "cap", "total", "bead", "kid", "tree", "free", "animal", "cannibal", "peace", "bullet", "mullet", "tripping", "pry", "fantastic", "flipping"]
        }

        this.toggleShowField = this.toggleShowField.bind(this);
        this.dialogueAutoScroll = this.dialogueAutoScroll.bind(this);

        this.timer = 1;
    }

    componentDidMount = () => {
        this.computersTurn();
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

        toast.success("what");
        toast.success("Success Notification !");

        toast.error("Error Notification !");

        toast.warn("Warning Notification !");

        toast.info("Info Notification !");

        if (defaultButton) {
            this.rhymeResponse().then(res => {
                if(res.pronouncation === "null"){
                    console.log("do it again");
                    this.shakeToggle();
                } else {
                    this.dispenceSenteceIntoArray();
                    this.dialogueAutoScroll();
                    setTimeout(()=> {
                        this.computersTurn();
                    }, this.timer);
                }})
                .catch(err => console.log(err));
        }
    }

    shakeToggle = () => {
        let e = document.getElementById("input") as HTMLElement;
        e.className = "shake";
        e.setAttribute("placeholder", "Try a new word please");
        setTimeout(() => {
            e.className = "";
        }, 500);
    }

    dialogueAutoScroll = () => {

        let e = document.getElementById("scrollable") as HTMLElement;
        if(e) e.scrollTop = e.scrollHeight;

    }

    computersTurn = () => {
        this.toggleShowField();

        const waitArray = this.state.sentenceArray || [];
        waitArray.push("...");

        this.setState({ sentenceArray: waitArray });

        this.dialogueAutoScroll();

        setTimeout(() => {
            if (this.state.computer.length > 0) {
                waitArray.pop();
                waitArray.push(this.state.computer[0]);
                this.state.computer.shift();
                this.setState({...this.state, sentence: ""});
                this.toggleShowField();
                if (this.timer === 1) this.timer = 1500;
            } else {
                this.gameOver();
            }
        }, this.timer);
    }

    gameOver = () => {

    }

    dispenceSenteceIntoArray = (): void=> {
        const array = this.state.sentenceArray || [];
        array.push(this.state.sentence);
        this.setState({ ...this.state, sentence: "", sentenceArray: array });
    }

    rhymeResponse = async () => {
        const url = "/api/rhyme/" + this.state.sentence;
        const response = await fetch(url);
        let json = await response.json().catch(err => console.log(err));
        return json;
    }

    handleChange = (event: any): void=> {
        this.setState({[event.target.name]: event.target.value} as Pick<IState, keyof IState>);
    }

    render(): ReactElement {
        return(
            <main>
                { (this.state.showField) ? <InputField props={this.state} handleSubmit={this.handleSubmit} handleChange={this.handleChange} /> : null }
                <ShowHistory props={this.state} funny={this.dialogueAutoScroll}/>
                <img className="logo" src={logo} alt="Logo" />
            </main>
        )
    }
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
                if ((i % 2) === 0) line = <div className="computerText box sb4" key={i}>{item}</div>
                else line = <div className="playerText box sb3" key={i}>{item}</div>
                return line
            })
        }
        {funny()}
        </div>
    );
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
                <input id="input" name="sentence" type="text" placeholder="Try to rhyme with the computer" value={props.sentence} onChange={ e => handleChange(e) }/>
                <button>SEND</button>
            </form>
        </div>
    );
}

export default Game;
