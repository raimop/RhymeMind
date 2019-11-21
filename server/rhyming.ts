const rhymingPart = require('rhyming-part');

const hasARhyme = (word: string): string => {
    let pronounce = rhymingPart(word);
    if (!pronounce) return "null";
    return pronounce;
}

export interface returnRhymingProps {
    word: string,
    pronouncation: string,
}

export const returnRhyme = (word: string): returnRhymingProps => {
    return { 
        word: word,
        pronouncation: hasARhyme(word)
    };
}

export interface compareRhymingProps {
    word1: string,
    pronouncation1: string,
    word2: string,
    pronouncation2: string,
}

export const compareRhymes = (word1: string, word2: string): compareRhymingProps => {
    return {
        word1: word1,
        pronouncation1: hasARhyme(word1),
        word2: word2,
        pronouncation2: hasARhyme(word2),
    }
}

//module.exports = { returnRhyming, compareRhyming }