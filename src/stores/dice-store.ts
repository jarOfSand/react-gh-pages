import { observable, action } from 'mobx';
import * as diceHelper from '../helpers/dice-helper';

var _ = require('lodash');

type handfullObj = {
    name: string,
    value: string
};

type historyObj = {
    name: string,
    value: string,
    result: number[],
    total: number
}

type diceState = {
    deletionMode: boolean,
    handfullValue: string,
    latestRollDesc: string,
    rollResult: string,
    handfullName: string,
    customHandfulls: handfullObj[],
    history: historyObj[]
};

export const diceStore: diceState = observable({
    deletionMode: false,
    handfullValue: '',
    handfullName: '',
    latestRollDesc: '',
    rollResult: '',
    history: [],
    customHandfulls: [
        { name: 'fireball(level 3)', value: '8d6' },
        { name: '', value: 'd20' }
    ]
});

export const rollHandfull = action(() => {
    const { handfullValue, handfullName } = diceStore;
    if (handfullValue) {
        handleRoll({ name: handfullName, value: handfullValue })
    }
});

function handleRoll(handfullObj: handfullObj) {
    const { name, value } = handfullObj;
    const { history } = diceStore;

    const result = diceHelper.rollHandfull(value);
    const total: number = _.sum(result);

    history.unshift({name, result, total, value});
    if(history.length > 10) {
        history.pop();
    }
}

export const handleCustomButtonClick = action((index: number) => {
    const { deletionMode, customHandfulls } = diceStore;

    if (deletionMode) {
        deleteCustomHandfull(index);
    } else {
        handleRoll(customHandfulls[index]);
    }
})

export const saveCustomHandfull = action(() => {
    const { handfullValue, handfullName, customHandfulls } = diceStore;
    if (handfullValue) {
        diceStore.customHandfulls = [...customHandfulls, { name: handfullName, value: handfullValue }]
    }
});

export function deleteCustomHandfull(index: number) {
    const newCustomHandfulls = diceStore.customHandfulls;
    newCustomHandfulls.splice(index, 1);
    diceStore.customHandfulls = newCustomHandfulls;
}

export const setHandfullName = action((handfullName: string) => {
    diceStore.handfullName = handfullName;
});

export const toggleDeletionMode = action(() => {
    diceStore.deletionMode = !diceStore.deletionMode;
});

export const setHandfullValue = action((handfullValue: string) => {
    diceStore.handfullValue = handfullValue;
});

export const setRollResult = action((rollResult: string) => {
    diceStore.rollResult = rollResult;
});
