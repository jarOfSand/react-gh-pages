import { observable, action } from 'mobx';
import * as diceHelper from '../helpers/dice-helper';

type handfullObj = {
    name: string,
    value: string
};

type diceState = {
    customHandfulls: string[],
    deletionMode: boolean,
    handfull: string,
    lastestHandfullRolled: string,
    rollResult: string,
    handfullName: string,
    customHandfulls_v2: handfullObj[]
};

export const diceStore: diceState = observable({
    customHandfulls: ['d6', 'd20'],
    deletionMode: false,
    handfull: '',
    handfullName: '',
    lastestHandfullRolled: '',
    rollResult: '',

    customHandfulls_v2: [
        { name: 'lvl3 fireball', value: '8d6' },
        { name: 'magic missile', value: 'd4+1' }
    ]
});

export const rollHandfull = action(() => {
    const { handfull } = diceStore;
    if (handfull) {
        const result = diceHelper.rollHandfull(handfull);

        setRollResult(result);
        setLastestHandfullRolled(handfull);
    }
});

export const handleCustomButtonClick = action((index: number) => {
    const {deletionMode, customHandfulls_v2} = diceStore;

    if (deletionMode) {
        deleteCustomHandfull(index);
    } else {
        const {value} = customHandfulls_v2[index];

        const result = diceHelper.rollHandfull(value);
        setRollResult(result);
        setLastestHandfullRolled(value);
    }
})

export const saveCustomHandfull = action(() => {
    const { handfull, handfullName, customHandfulls_v2 } = diceStore;
    diceStore.customHandfulls_v2 = [...customHandfulls_v2, { name: handfullName, value: handfull }]
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

export const setLastestHandfullRolled = action((lastestHandfullRolled: string) => {
    diceStore.lastestHandfullRolled = lastestHandfullRolled;
});

export const setRollResult = action((rollResult: string) => {
    diceStore.rollResult = rollResult;
});
