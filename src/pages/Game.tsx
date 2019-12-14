import React, { ReactElement } from 'react';
import backgroundImage from "../images/bg.png";
import { Link } from 'react-router-dom';
// @ts-ignore
import ShowHistory from "../components/Game/ShowHistory";
import InputField from "../components/Game/InputField";
import TimerComponent from "../components/Game/TimerComponent";
import ArrowComponent from "../components/Game/ArrowComponent";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./Game.css";

interface IProps {}

interface IState {
    showField: boolean
    showGameOver: boolean
    sentence: string
    sentenceArray: Array<String>
    computer: Array<String>
    level: number
    score: number
    timerRunning: boolean
    time: number
}

interface rhymeResponseProps {
    sentence: string,
    pronouncation: string
}

class Game extends React.Component<IProps, IState> {
    timer: number;
    previousState: Readonly<IState>;
    sentence: string | number | string[] | undefined;
    constructor(props: IProps){
        super(props);

        this.state = { 
            showField: false,
            showGameOver: false,
            sentence: "",
            sentenceArray: [],
            computer: ["we", "me", "be"],
            level: 0,
            score: 0,
            timerRunning: false,
            time: 25,
        }

        this.previousState = this.state;

        this.toggleShowField = this.toggleShowField.bind(this);
        this.dialogueAutoScroll = this.dialogueAutoScroll.bind(this);

        this.timer = 1;
    }

    levels = (level: number) => {
        //const level0 = ["we", "me", "as", "be", "he"];
        if (level === 1) return ["cap", "kid", "pry", "mad", "lab", "man", "fan", "red", "que", "zoo"];
        if (level === 2) return ["look", "said", "sand", "fast", "mice", "cast", "king", "hand", "book", "true"];
        if (level === 3) return ["bored", "thing", "taken", "later", "vocal", "total", "peace", "chase", "taste", "toast"];

        //const level3 = [];
        //const level4 = [];

        //const originalArray = ["word","cord","told","bored", "king", "thing", "cake", "wake", "bake", "placed", "taken", "later", "totally", "vocal", "fascinating", "duck", "possibility", "lavender", "damage", "generating", "liberating", "accommodating", "accelerating", "subordinating", "exasperating", "coordinating", "cap", "total", "bead", "kid", "tree", "free", "animal", "cannibal", "peace", "bullet", "mullet", "tripping", "pry", "fantastic", "flipping"];
    }

    //shuffles an array randomly
    shuffle = (a: Array<any>) =>{
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        this.setState({
            computer: a
        })
    }

    componentDidMount = () => {
        this.computersTurn();
            
    }

    handleSuccess = () =>{
        this.handleTimer();
        this.toggleShowField();
        this.dispenceSenteceIntoArray();
        this.dialogueAutoScroll();
        setTimeout(()=> {
            this.computersTurn();
        }, this.timer);
    }

    toggleShowField = (): void => {
        this.setState({ showField: !this.state.showField});
    }

    handleSubmit = (event: any, defaultButton: boolean = true): void => {
        event.preventDefault();

        if (this.state.sentenceArray[this.state.sentenceArray.length-1] === this.state.sentence) {
            toast.info("You can't rhyme with the same word, I mean, you can, but don't");
            this.shakeToggle();
        }

        if (defaultButton && !(this.state.sentenceArray[this.state.sentenceArray.length-1] === this.state.sentence)) {
            this.rhymeResponse().then(res => {
                if(res.pronouncation === "null"){
                    toast.error("We don't have a pronouncation for this word, please try another one");
                    this.shakeToggle();
                } else {

                    // point calculation
                    this.compareRhymes()
                        .then(res => {
                        let prevPoints = this.state.score;
                        let currentSentence = this.state.sentenceArray[this.state.sentenceArray.length -1];
                        let currentScore =  res.pronouncationsCompared * (currentSentence.length + this.state.time);
                        this.setState({ score:this.state.score + currentScore});

                        if (prevPoints === this.state.score){
                            toast.info(`You've gained no new points for that rhyme`);
                        } else {
                            toast.success(`got ${currentScore} points`);
                        }
                    });
                    this.handleSuccess();

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
        const array = this.state.sentenceArray || [];
        array.push("...");

        this.setState({ sentenceArray: array });

        this.dialogueAutoScroll();

        setTimeout(() => {
            if (this.state.computer.length > 0) {
                array.pop();
                array.push(this.state.computer[0]);
                this.state.computer.shift();
                this.setState({...this.state, sentence: ""});
                this.toggleShowField();
                // stops and resets the time
                this.handleTimer();
                if (this.timer === 1) this.timer = 1500;
            } else {
                array.pop();
                let computerArray = this.levels(this.state.level+1);
                if (computerArray === undefined) {
                    computerArray = [];
                    this.gameOver();
                }
                
                this.setState({ 
                    sentenceArray: array, 
                    level: this.state.level+1,
                    computer: computerArray });
                this.levels(this.state.level);
                this.computersTurn();
            }
        }, this.timer);
    }

    gameOver = () => {
        this.setState({ showGameOver: !this.state.showGameOver });
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

    compareRhymes = async () => {
        const url = "/api/rhymes/" + this.state.sentence + "&" + this.state.sentenceArray[this.state.sentenceArray.length-1];
        const response = await fetch(url);
        let json = await response.json().catch(err => console.log(err));
        return json;
    }

    handleChange = (event: any): void=> {
        this.setState({[event.target.name]: event.target.value} as Pick<IState, keyof IState>);
    }

    handleTimer = () =>{
        this.setState({
            timerRunning: !this.state.timerRunning
        })
    }


    TimeCheckpoint = (value: number) =>{
        this.setState({
           time: value
        });
        if(this.state.time === 0){
            this.setState({
                sentence: "..."
            });
        this.handleSuccess();
        toast.warn(`You ran out of time`);
        }
    }

    render(): ReactElement {
        return(
            <main>
                {(this.state.showField) ? <ArrowComponent></ArrowComponent> : null}
                <div className={"level"}>Level: {this.state.level}</div>
                <div className={"score"}>Score: {this.state.score}</div>
                { (this.state.showField) ? <InputField props={this.state} handleSubmit={this.handleSubmit} handleChange={this.handleChange} /> : null }
                {(this.state.showField) ? <TimerComponent TimeCheckpoint={this.TimeCheckpoint} timerRunning={this.state.timerRunning}>Time: </TimerComponent> : null}
                <ShowHistory props={this.state} funny={this.dialogueAutoScroll}/>
                <img className="backgroundImage" src={backgroundImage} alt="backgroundImage" />
                { (this.state.showGameOver) ? <Link to="/"><div className="gameover"><div>Game over, click me</div></div></Link> : null }
            </main>
        )
    }
}

export default Game;
