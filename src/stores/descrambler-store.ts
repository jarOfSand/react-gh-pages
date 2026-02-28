import {observable, action} from 'mobx';
import { commonwords } from '../constants/10k_english';

type descramblerState = {
    scrambledText: string
    possibleMatches: string[]
}

export const descramblerStore: descramblerState = observable({
    scrambledText: '',
    possibleMatches: []
});

export const setScrambledText = action((scrambledText: string) => {
    descramblerStore.scrambledText = scrambledText;
});

export const descramble = action(() => {
    const {scrambledText} = descramblerStore;
    const anagrams: string[] = [];

    commonwords.forEach((word) => {
        const scrambledArray = scrambledText.split('');

        if(scrambledText.length > 0 && word.length === scrambledText.length){
            const possibleMatch = word.split('').every((letter) => {
                const letterIndex = scrambledArray.indexOf(letter);
                if(letterIndex !== -1){
                    scrambledArray.splice(letterIndex, 1);
                    return true;
                }
                return false;
            })
            if(possibleMatch){
                anagrams.push(word);
            }
        }
    });

    descramblerStore.possibleMatches = anagrams.length > 0 ? anagrams : ['no match found'];
});
