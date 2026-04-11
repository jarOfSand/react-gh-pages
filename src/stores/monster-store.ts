import { observable, action } from 'mobx';
import { getMonsterList, getMonsterData } from '../helpers/data-helper';

export type monsterListItem = {
    index: string,
    name: string,
    url: string,
}

type monsterState = {
    activeMonster: any,
    monsterList: monsterListItem[]
}

export const monsterStore: monsterState = observable({
    activeMonster: undefined,
    monsterList: []
});

export const setActiveMonster = action(async (activeMonsterIndex: string) => {
    monsterStore.activeMonster = await getMonsterData(activeMonsterIndex);
});

export const initializeMonsterList = action(async () => {
    monsterStore.monsterList = await getMonsterList();
});
