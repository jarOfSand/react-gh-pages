import { observable, action } from 'mobx';
import * as diceHelper from '../helpers/dice-helper';

type handfullObj = {
    name: string,
    value: string
};
type historyObj = {
    rollDesc: string,
    rollResult: string
}

type diceState = {
    customHandfulls: string[],
    deletionMode: boolean,
    handfull: string,
    latestRollDesc: string,
    rollResult: string,
    handfullName: string,
    customHandfulls_v2: handfullObj[],
    history: historyObj[]
};

export const diceStore: diceState = observable({
    customHandfulls: ['d6', 'd20'],
    deletionMode: false,
    handfull: '',
    handfullName: '',
    latestRollDesc: '',
    rollResult: '',
    history: [],
    customHandfulls_v2: [
        { name: 'lvl3 fireball', value: '8d6' },
        { name: '', value: 'd20' }
    ]
});

export const rollHandfull = action(() => {
    const { handfull, handfullName } = diceStore;
    if (handfull) {
        handleRoll({ name: handfullName, value: handfull })
    }
});

function handleRoll(handfullObj: handfullObj) {
    const { name, value } = handfullObj;
    const { history } = diceStore;

    const result = diceHelper.rollHandfull(value);
    const rollDesc = name ? `${name}, ${value}` : value;

    diceStore.rollResult = result;
    diceStore.latestRollDesc = rollDesc;

    history.unshift({rollDesc, rollResult: result});
    if(history.length > 10) {
        history.pop();
    }
}

export const handleCustomButtonClick = action((index: number) => {
    const { deletionMode, customHandfulls_v2 } = diceStore;

    if (deletionMode) {
        deleteCustomHandfull(index);
    } else {
        handleRoll(customHandfulls_v2[index]);
    }
})

export const saveCustomHandfull = action(() => {
    const { handfull, handfullName, customHandfulls_v2 } = diceStore;
    if (handfull) {
        diceStore.customHandfulls_v2 = [...customHandfulls_v2, { name: handfullName, value: handfull }]
    }
});

export function deleteCustomHandfull(index: number) {
    const newCustomHandfulls = diceStore.customHandfulls_v2;
    newCustomHandfulls.splice(index, 1);
    diceStore.customHandfulls_v2 = newCustomHandfulls;
}

export const setHandfullName = action((handfullName: string) => {
    diceStore.handfullName = handfullName;
});

export const setCustomHandfulls = action((customHandfulls: string[]) => {
    diceStore.customHandfulls = customHandfulls;
});

export const toggleDeletionMode = action(() => {
    diceStore.deletionMode = !diceStore.deletionMode;
});

export const setHandfull = action((handfull: string) => {
    diceStore.handfull = handfull;
});

export const setRollResult = action((rollResult: string) => {
    diceStore.rollResult = rollResult;
});
