const rhymingPart = require('rhyming-part');

const compareRhyming = (pronounce1, pronounce2) => {
    const a = pronounce1.split(" ");
    const b = pronounce2.split(" ");

    let fullMatchCounter = 0;

    let subWordCounter = 0;
    let wordPartMatches = 0;
    let counterArray = [];

    let shortestArray = a.length;
    let syllableLength = 0;
    a.length >= b.length ? shortestArray = b.length : shortestArray = a.length; // determine shortest array

    for (let i = 1; i < shortestArray+1; i++){ // go through shortest array and check last pronouncations
        if (a[a.length-i] == b[b.length-i]) {
            fullMatchCounter++;
        } else { // did not fully match, so check one element at a time
            a[a.length-i].length >= b[b.length-i].length ? syllableLength = b[b.length-i].length : syllableLength = a[a.length-i].length; // by shortest syllable
            counterArray[subWordCounter] = [];
            for (let y = 0; y < syllableLength; y++){ // go through syllable and check if elements fully match starting from the end
                if (a[a.length-i].substring(syllableLength-y-1, syllableLength-y) === b[b.length-i].substring(syllableLength-y-1, syllableLength-y)){
                    wordPartMatches = 1;
                }
                counterArray[subWordCounter][y] = wordPartMatches;
                wordPartMatches = 0;
            }
            subWordCounter++;
        }
    }

    console.log(counterArray);

    return `Full matches: ${fullMatchCounter} | Rest matching: ${counterArray}`;
}

const hasARhyme = (sentence) => {
    let pronounce = rhymingPart(sentence);
    if (!pronounce) return "null";
    return pronounce;
}

exports.returnRhyme = (sentence) => {
    return { 
        sentence: sentence,
        pronouncation: hasARhyme(sentence),
    };
}

exports.compareRhymes = (sentence1, sentence2) => {
    return {
        "first": {
            sentence1: sentence1,
            pronouncation1: hasARhyme(sentence1),
        },
        "second": {
            sentence2: sentence2,
            pronouncation2: hasARhyme(sentence2),

        },
        pronouncationsCompared: compareRhyming(hasARhyme(sentence1), hasARhyme(sentence2)),
    }
}