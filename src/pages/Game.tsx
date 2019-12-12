import React, { ReactElement } from 'react';
import "./Game.css";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

interface IProps {}

interface IState {
    showField: boolean,
    sentence: string,
    sentenceArray: Array<String>
    computer: Array<String>
}

interface rhymeResponseProps {
    sentence: string,
    pronouncation: string
}

class Game extends React.Component<IProps, IState> {
constructor(props: IProps){
super(props);

this.state = {
    showField: true,
    sentence: "",
    sentenceArray: [],
    computer: ["funny", "car", "trunk", "fascinating"]
}

this.toggleShowField = this.toggleShowField.bind(this);
this.dialogueAutoScroll = this.dialogueAutoScroll.bind(this);
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

if (defaultButton) {
this.rhymeResponse().then(res => {
if(res.pronouncation === "null"){
    console.log("do it again");
    this.shakeToggle();
    toast.error("Hello");
} else {
      this.dispenceSenteceIntoArray();
      this.dialogueAutoScroll();
  setTimeout(()=> this.computersTurn(), 1500);
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
} else {
      this.gameOver();
  }
}, 2000);
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