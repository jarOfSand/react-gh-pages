import { observable, action } from 'mobx';
import { toast } from 'react-toastify';

var _ = require('lodash');
const Chance = require('chance');
const chance = new Chance();

type die = {
    size: number;
    quantity: number;
    operation: 'add' | 'subtract';
}

const MOD_REGEX = /([+-]\s?\d+)([^d]|$)/g
const LATTER_DICE_REGEX = /[+-]\s?\d+d\d+/g;

const FIRST_DICE_REGEX = /^\d+d\d+/;

function getModMatches(text: string): number[] {
    const matches = [...text.matchAll(MOD_REGEX)].map(match => match[0]);
    const matchesWithoutWhitespace = matches.map(match => { return match.replaceAll(' ', '') })
    const numberMods = matchesWithoutWhitespace.map(match => { return parseInt(match) });

    return numberMods;
}

function getDie(dieString: string, operation: 'add' | 'subtract'): die {
    const [diceQuantString, diceSizeString] = dieString.split('d');
    return {
        operation,
        size: parseInt(diceSizeString),
        quantity: parseInt(diceQuantString)
    }
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
                const result = chance.natural({ min: 1, max: die.size }) * (die.operation === 'add' ? 1 : -1);
                allDiceResults.push(result)
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

type historyObj = {
    name: string,
    result: number[],
    total: number,
    diceString: string,
}

type diceState = {
    critMode: boolean,
    customHandfulls: Map<string, handfull>,
    deletionMode: boolean,
    history: historyObj[],
    importExportMode: boolean,
    importString: string,
    latestRollDesc: string,
    rollResult: string,
    tempDiceString: string,
    tempName: string,
};

const initialDice1 = new handfull('1d20+4');
const initialDice2 = new handfull('2d6-1d8')
const initialDice3 = new handfull('2d6-4')

export const diceStore: diceState = observable({
    critMode: false,
    customHandfulls: new Map<string, handfull>([
        [initialDice1.id, initialDice1],
        [initialDice2.id, initialDice2],
        [initialDice3.id, initialDice3]
    ]),
    deletionMode: false,
    history: [],
    importExportMode: false,
    importString: '',
    latestRollDesc: '',
    rollResult: '',
    tempDiceString: '',
    tempName: '',
});

export const clearHistory = action(() => {
    diceStore.history = [];
    diceStore.tempDiceString = '';
    diceStore.tempName = '';
});


export const rollTempHandfull = action(() => {
    const { tempDiceString, tempName } = diceStore;

    if (tempDiceString) {
        const tempHandfull = new handfull(tempDiceString, tempName);
        const rollHistory = tempHandfull.roll();
        updateHistory(rollHistory);
    }
});

export function updateHistory(result: historyObj) {
    const { history } = diceStore;

    history.unshift(result);
    if (history.length > 10) {
        history.pop();
    }
}

export const handleCustomButtonClick = action((dice: handfull, removable: boolean) => {
    const { deletionMode, critMode } = diceStore;

    if (deletionMode && removable) {
        diceStore.customHandfulls.delete(dice.id);
    } else {
        const rollHistory = dice.roll(critMode);
        updateHistory(rollHistory);
    }
})

export const saveHandfull = action(() => {
    const { tempDiceString, tempName, customHandfulls } = diceStore;

    if (tempDiceString) {
        const newHandfull = new handfull(tempDiceString, tempName);
        customHandfulls.set(newHandfull.id, newHandfull);
    }
});


export const setHandfullName = action((handfullName: string) => {
    diceStore.tempName = handfullName;
});

export const toggleDeletionMode = action(() => {
    diceStore.deletionMode = !diceStore.deletionMode;
});

export const toggleCrit = action(() => {
    diceStore.critMode = !diceStore.critMode;
});

export const toggleImportExportMode = action(() => {
    diceStore.importExportMode = !diceStore.importExportMode;
});

export const setTempDiceString = action((tempDiceString: string) => {
    diceStore.tempDiceString = tempDiceString;
});

export const exportHandfulls = action(() => {
    const exportArray: string[] = [];

    diceStore.customHandfulls.forEach(handfull => {
        exportArray.push(`${handfull.name}|${handfull.diceString}`);
    });
    const exportString = exportArray.join(',');

    navigator.clipboard.writeText(exportString);
    toast("copied to clipboard. import to restore your dice.");
});

export const setImportString = action((importString: string) => {
    diceStore.importString = importString;
});

export const clearImportString = action(() => {
    diceStore.importString = '';
});

export const importHandfulls = action(() => {
    const { importString } = diceStore;

    try {
        const newCustomHandfulls = new Map<string, handfull>();

        importString.split(',').forEach(diceString => {
            const [name, value] = diceString.split('|');
            const newHandfull = new handfull(value, name);
            newCustomHandfulls.set(newHandfull.id, newHandfull);
        });

        diceStore.customHandfulls = newCustomHandfulls;
    } catch {
        // toast failure
    }

});
