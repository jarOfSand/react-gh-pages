import { observable, action } from 'mobx';
import { getCrString } from '../helpers/encounter-helper';

type encounterState = {
    pcCount: number,
    pcLevel: number,
    enemyCount: number,
    currentCrIndex: number,
    roster: number[]
}

export const encounterStore: encounterState = observable({
    pcCount: 3,
    pcLevel: 1,
    enemyCount: 1,
    currentCrIndex: 0,
    roster: []
});

export const setPlayerCount = action((count: string) => {
    encounterStore.pcCount = parseInt(count);
});

export const setPlayerLevel = action((level: string) => {
    encounterStore.pcLevel = parseInt(level);
});

export const setEnemyCount = action((count: string) => {
    encounterStore.enemyCount = parseInt(count);
});

export const setCR = action((crIndex: number) => {
    console.log(crIndex);
    encounterStore.currentCrIndex = crIndex;
});

export const addToRoster = action(() => {
    encounterStore.roster = [
        ...encounterStore.roster,
        encounterStore.currentCrIndex
    ];
});

export const removeFromRoster = action((crIndex: number) => {
    const index = encounterStore.roster.indexOf(crIndex);
    encounterStore.roster.splice(index, 1);
});
