import {observable, action} from 'mobx';
import {anagrams} from '../constants/anagramMap';

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

    const key = scrambledText.split('').sort().join(''); // sorted letters

    const anagramMap: {[key: string]: string[]} = anagrams;
    const matches: string[] = anagramMap[key];

    descramblerStore.possibleMatches = matches ? matches : ['no matches found'];
});
