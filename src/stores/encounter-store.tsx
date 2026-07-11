import {observable, action} from 'mobx';

type encounterState = {
    pcCount: number,
    pcLevel: number,
    enemyCount: number
}

export const encounterStore: encounterState = observable({
    pcCount: 3,
    pcLevel: 1,
    enemyCount: 1
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

