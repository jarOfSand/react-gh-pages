import { rollSummary } from '../stores/dice-store';
import { toast, ToastOptions } from 'react-toastify';

const Chance = require('chance');
const chance = new Chance();

type operation = 'add' | 'subtract';
type mathStep = {
    operation: operation,
    value: string
}
export type die = {
    size: number;
    quantity: number;
    operation: operation;
}

function removeAllSubstrings(text: string, matches: RegExpExecArray[]): string {
    return matches.reduce((result: string, match: RegExpExecArray) => {
        return result.replace(match[0], '');
    }, text);
}

function parseMathStep(matchString: string): mathStep {
    const operation = matchString.includes('-') ? 'subtract' : 'add';
    const trimmedString = matchString.replace('-', '').replace('+', '').trim();

    return {operation, value: trimmedString};
}

function getMathSteps(diceString: string) {
    const DICE_REGEX = /[+-]?\s?[0-9]?d[0-9]+/g;
    const diceMatches = [...diceString.matchAll(DICE_REGEX)];

    const sansDice = removeAllSubstrings(diceString, diceMatches);

    const MOD_REGEX = /[+-]?\s?[0-9]+/g;
    const modMatches = [...sansDice.matchAll(MOD_REGEX)];

    const diceSteps = diceMatches.map(diceMatch => parseMathStep(diceMatch[0]));
    const modSteps = modMatches.map(modMatch => parseMathStep(modMatch[0]));

    return {diceSteps, modSteps};
}

function getDie(diceStep: mathStep): die {
    const {value, operation} = diceStep;
    const [diceQuantString, diceSizeString] = value.split('d');

    return {
        operation,
        size: parseInt(diceSizeString),
        quantity: diceQuantString ? parseInt(diceQuantString) : 1
    }
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

function getModifiers(modSteps: mathStep[]): number[] {
    return modSteps.map(step => parseInt(step.value) * (step.operation === 'add' ? 1 : -1));
}

export class handfull {
    name: string;
    diceString: string;
    staticMods: number[];
    dice: die[];
    id: string;

    constructor(diceString: string, name = '') {
        const {diceSteps, modSteps} = getMathSteps(diceString);
        const modifiers = getModifiers(modSteps);
        const dice = diceSteps.map(getDie);

        this.staticMods = modifiers;
        this.dice = dice;
        this.name = name;
        this.diceString = diceString;
        this.id = chance.guid();
    }
    
    roll(isCrit = false): rollSummary {
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
