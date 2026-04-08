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

    constructor(name = '', diceString: string) {
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
    }

    roll(isCrit = false): historyObj {
        const allDiceResults: number[] = [];
        this.dice.forEach(die => {
            const qty = die.quantity * (isCrit ? 2 : 1);
            for(let i = 0; i < qty; i++) {
                allDiceResults.push(chance.natural({ min: 1, max: die.size }))
            }
        });

        console.log(allDiceResults, this.staticMods);
        const result = allDiceResults.concat(this.staticMods);
        console.log(result);
        console.log('');


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
    customHandfulls: handfull[],
    deletionMode: boolean,
    history: historyObj[],
    importExportMode: boolean,
    importString: string,
    latestRollDesc: string,
    rollResult: string,
    tempDiceString: string,
    tempName: string,
};

export const diceStore: diceState = observable({
    critMode: false,
    customHandfulls: [
        new handfull('shortbow(atk)', 'd20+4'),
        new handfull('shortbow(dmg)', 'd6+4'),
    ],
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
    const { tempDiceString, tempName: handfullName } = diceStore;

    if (tempDiceString) {
        const tempHandfull = new handfull(handfullName, tempDiceString);
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

export const handleCustomButtonClick = action((index: number) => {
    const { deletionMode, customHandfulls, critMode } = diceStore;

    if (deletionMode) {
        deleteCustomHandfull(index);
    } else {
        const rollHistory = customHandfulls[index].roll(critMode);
        updateHistory(rollHistory);
    }
})

export const saveHandfull = action(() => {
    const { tempDiceString, tempName: handfullName, customHandfulls } = diceStore;
    if (tempDiceString) {
        diceStore.customHandfulls = [...customHandfulls, new handfull(handfullName, tempDiceString)]
    }
});

export function deleteCustomHandfull(index: number) {
    const newCustomHandfulls = diceStore.customHandfulls;
    newCustomHandfulls.splice(index, 1);
    diceStore.customHandfulls = newCustomHandfulls;
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
    const exportArray: string[] = diceStore.customHandfulls.map(handfull => {
        return `${handfull.name}|${handfull.diceString}`;
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
        const handfulls: handfull[] = importString.split(',').map(diceString => {
            const [name, value] = diceString.split('|');
            return new handfull(name, value);
        });

        diceStore.customHandfulls = handfulls;
    } catch {
        // toast failure
    }

});
