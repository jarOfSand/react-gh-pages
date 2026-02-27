import {observable, action} from 'mobx';

type diceState = {
    customHandfulls: string[],
    deletionMode: boolean,
    handfull: string,
    lastestHandfullRolled: string,
    rollResult: string,
}

export const diceStore: diceState = observable({
    customHandfulls: ['d6', 'd20'],
    deletionMode: false,
    handfull: '',
    lastestHandfullRolled: '',
    rollResult: '',
});

export const setCustomHandfulls = action((customHandfulls: string[]) => {
    diceStore.customHandfulls = customHandfulls;
});

export const setDeletionMode = action((deletionMode: boolean) => {
    diceStore.deletionMode = deletionMode;
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
