import { historyObj } from '../stores/dice-store';
import { toast, ToastOptions } from 'react-toastify';

const Chance = require('chance');
const chance = new Chance();

const MOD_REGEX = /([+-]\s?\d+)([^d]|$)/g
const LATTER_DICE_REGEX = /[+-]\s?\d*d\d+/g;
const FIRST_DICE_REGEX = /^\d*d\d+/;

function getDie(dieString: string, operation: 'add' | 'subtract'): die {
    const [diceQuantString, diceSizeString] = dieString.split('d');
    return {
        operation,
        size: parseInt(diceSizeString),
        quantity: diceQuantString ? parseInt(diceQuantString) : 1
    }
}

function getModMatches(text: string): number[] {
    const matches = [...text.matchAll(MOD_REGEX)].map(match => match[0]);
    const matchesWithoutWhitespace = matches.map(match => { return match.replaceAll(' ', '') })
    const numberMods = matchesWithoutWhitespace.map(match => { return parseInt(match) });

    return numberMods;
}

function getDiceMatches(text: string): die[] {
    const firstMatch = text.match(FIRST_DICE_REGEX)?.[0];
    const latterMatches = [...text.matchAll(LATTER_DICE_REGEX)].map(match => match[0].replace(' ', ''));

    const latterDice: die[] = latterMatches.map(match => {
        const operation = match.charAt(0) === '+' ? 'add' : 'subtract';

        return getDie(match.slice(1), operation)
    });

    if (firstMatch) {
        const firstDie: die = getDie(firstMatch, 'add');
        return [firstDie, ...latterDice];
    }
    return latterDice;
}

export type die = {
    size: number;
    quantity: number;
    operation: 'add' | 'subtract';
}

const CRIT_TOAST_PROPS: ToastOptions = {
    autoClose: 1000,
    position: 'bottom-center',
    closeOnClick: true,
    theme: 'colored'
};

function sum(results: number[]): number {
    return results.reduce((sum, result) => {
        return sum + result;
    }, 0)
}

export class handfull {
    name: string;
    diceString: string;
    staticMods: number[];
    dice: die[];
    id: string;

    constructor(diceString: string, name = '') {
        this.staticMods = getModMatches(diceString);
        this.dice = getDiceMatches(diceString);
        this.name = name;
        this.diceString = diceString;
        this.id = chance.guid();
    }
    
    roll(isCrit = false): historyObj {
        const allDiceResults: number[] = [];
        this.dice.forEach(die => {
            const qty = die.quantity * (isCrit ? 2 : 1);
            for (let i = 0; i < qty; i++) {
                const result = chance.natural({ min: 1, max: die.size });
                if(qty === 1 && die.size === 20){
                    if(result === 20){
                        toast.success('Nat 20!', CRIT_TOAST_PROPS);
                    }
                    if(result === 1){
                        toast.error('Nat 1!', CRIT_TOAST_PROPS);
                    }
                }
                allDiceResults.push(result * (die.operation === 'add' ? 1 : -1))
            }
        });

        const result = allDiceResults.concat(this.staticMods);

        return {
            name: this.name,
            diceString: this.diceString,
            total: sum(result),
            result: result
        };
    }
}
