import { rollSummary } from '../stores/dice-store';
import { toast, ToastOptions } from 'react-toastify';
import {sum} from '../helpers/dice-helper';

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

function removeAllSubstrings(text: string, substrings: string[]): string {
    return substrings.reduce((result: string, substring: string) => {
        return result.replace(substring, '');
    }, text);
}

function parseMathStep(matchString: string): mathStep {
    const operation = matchString.includes('-') ? 'subtract' : 'add';
    const trimmedString = matchString.replace('-', '').replace('+', '').trim();

    return {operation, value: trimmedString};
}

function getMatches(input: string, regex: RegExp) {
    return [...input.matchAll(regex)].map(match => match[0]);
}

function getMathSteps(diceString: string): {diceSteps: mathStep[], modSteps: mathStep[]} {
    const diceMatches = getMatches(diceString, /[+-]?\s?[0-9]?d[0-9]+/g);
    const sansDice = removeAllSubstrings(diceString, diceMatches);
    const modMatches = getMatches(sansDice, /[+-]?\s?[0-9]+/g);

    return {
        diceSteps: diceMatches.map(parseMathStep),
        modSteps: modMatches.map(parseMathStep)
    }
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

function getModifiers(modSteps: mathStep[]): number[] {
    return modSteps.map(step => parseInt(step.value) * (step.operation === 'add' ? 1 : -1));
}

const CRIT_TOAST_PROPS: ToastOptions = {
    autoClose: 1000,
    position: 'bottom-center',
    closeOnClick: true,
    theme: 'colored'
};

export class handfull {
    name: string;
    diceString: string;
    staticMods: number[];
    dice: die[];
    id: string;

    constructor(diceString: string, name = '') {
        const {diceSteps, modSteps} = getMathSteps(diceString);

        this.staticMods = getModifiers(modSteps);
        this.dice = diceSteps.map(getDie);
        this.name = name;
        this.diceString = diceString;
        this.id = chance.guid();
    }
    
    roll(isCrit = false): rollSummary {
        const addends: number[] = [];
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
                addends.push(result * (die.operation === 'add' ? 1 : -1))
            }
        });

        const result = addends.concat(this.staticMods);

        return {
            name: this.name,
            diceString: this.diceString,
            total: sum(result),
            result: result
        };
    }
}
