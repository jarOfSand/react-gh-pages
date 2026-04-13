import { observable, action } from 'mobx';
import { toast } from 'react-toastify';
import { handfull } from '../classes/handfull-class';

var _ = require('lodash');

export type historyObj = {
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

const initialDice1 = new handfull('1d20+4', 'dagger(atk)');
const initialDice2 = new handfull('1d4+2', 'dagger(dmg)')
const initialDice3 = new handfull('1d20-1d4', 'd20 with bane')

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

function updateHistory(result: historyObj) {
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
