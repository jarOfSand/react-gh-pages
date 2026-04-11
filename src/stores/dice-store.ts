import { observable, action } from 'mobx';
var _ = require('lodash');
const Chance = require('chance');
const chance = new Chance();

type die = {
    size: number;
    quantity: number;
}
export class handfull {
    name: string;
    diceString: string;
    staticMods: number[];
    dice: die[];
    id: string;

    constructor(diceString: string, name = '') {
        const diceArray = diceString.trim().split('+');
        const dice: die[] = [];
        const staticMods: number[] = [];

        diceArray.forEach((substring) => {
            if (substring.includes('d')) {
                const [diceQuantString, diceSizeString] = substring.split('d').map(str => str.trim());

                const quantity = (diceQuantString === '' ? 1 : parseInt(diceQuantString));
                const size = parseInt(diceSizeString);

                dice.push({size, quantity});
            } else {
                staticMods.push(parseInt(substring.trim()));
            }
        });

        this.staticMods = staticMods;
        this.dice = dice;
        this.name = name;
        this.diceString = diceString;
        this.id = chance.guid();
    }

    roll(isCrit = false): historyObj {
        const allDiceResults: number[] = [];
        this.dice.forEach(die => {
            const qty = die.quantity * (isCrit ? 2 : 1);
            for(let i = 0; i < qty; i++) {
                allDiceResults.push(chance.natural({ min: 1, max: die.size }))
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

const initialDice1 = new handfull('d20+4', 'shortbow(atk)');
const initialDice2 = new handfull('d6+4', 'shortbow(dmg)')

export const diceStore: diceState = observable({
    critMode: false,
    customHandfulls: new Map<string, handfull>([
        [initialDice1.id, initialDice1],
        [initialDice2.id, initialDice2]
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
        deleteCustomHandfull(dice);
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

export function deleteCustomHandfull(handfull: handfull) {
    diceStore.customHandfulls.delete(handfull.id)
}

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
