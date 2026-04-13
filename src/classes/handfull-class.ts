import { historyObj } from '../stores/dice-store';
import { toast } from 'react-toastify';

var _ = require('lodash');
const Chance = require('chance');
const chance = new Chance();

const MOD_REGEX = /([+-]\s?\d+)([^d]|$)/g
const LATTER_DICE_REGEX = /[+-]\s?\d+d\d+/g;
const FIRST_DICE_REGEX = /^\d+d\d+/;

function getDie(dieString: string, operation: 'add' | 'subtract'): die {
    const [diceQuantString, diceSizeString] = dieString.split('d');
    return {
        operation,
        size: parseInt(diceSizeString),
        quantity: parseInt(diceQuantString)
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
                if(die.size === 20){
                    if(result === 20){
                        // crit success
                        toast('Nat 20! crit success!');
                    }
                    if(result === 1){
                        // crit fail
                        toast('Nat 1! crit fail!');
                    }
                }
                allDiceResults.push(result * (die.operation === 'add' ? 1 : -1))
            }
        });

        const result = allDiceResults.concat(this.staticMods);

        return {
            name: this.name,
            diceString: this.diceString,
            total: _.sum(result),
            result: result
        };
    }
}
