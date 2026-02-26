import {observable, action} from 'mobx';

export const diceStore = observable({
    customHandfulls: ['d6', 'd20'],
    deletionMode: false,
    handfull: '',
    lastestHandfullRolled: '',
    rollResult: '',
});

export const setCustomHandfulls = action((customHandfulls) => {
    diceStore.customHandfulls = customHandfulls;
});

export const setDeletionMode = action((deletionMode) => {
    diceStore.deletionMode = deletionMode;
});

export const setHandfull = action((handfull) => {
    diceStore.handfull = handfull;
});

export const setLastestHandfullRolled = action((lastestHandfullRolled) => {
    diceStore.lastestHandfullRolled = lastestHandfullRolled;
});

export const setRollResult = action((rollResult) => {
    diceStore.rollResult = rollResult;
});
