import {setTemplates, sentence, setNouns, setAdjectives} from "txtgen";
import {adjectives, nouns, verbs} from "./words";

var randomVerb = verbs[Math.floor(Math.random()*verbs.length)];

const templates = [
    'Your {{noun}} is a {{noun}}',
    'Dont run your {{noun}}, instead listen {{noun}}',
    'Now escape while you can, you {{adjective}} {{noun}}',
    `try to ${randomVerb} me you {{noun}}, ill ${randomVerb} you {{noun}}`
];

setTemplates(templates);
setNouns(nouns);
setAdjectives(adjectives);

export const generateSentence = () =>{
    let genSentence = sentence();
    //because fuck regex
    //but seriously, replace with regex, someone smarter than me
    let cleanedSentence = genSentence
        .replace(".", "")
        .replace("?", "")
        .replace("!", "")
        .replace(";", "");
    return cleanedSentence;
};

