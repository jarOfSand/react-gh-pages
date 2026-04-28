import { observable, action } from 'mobx';
import { getMonsterList, getMonsterData } from '../services/monster-service';
import { diceStore } from './dice-store';

export type monsterListItem = {
    index: string,
    name: string,
    url: string,
}

type monsterState = {
    activeMonster: any,
    activeSelectorItem: monsterListItem,
    monsterList: monsterListItem[],
    bookmarks: Map<string, monsterListItem>
}

export const ABOLETH = {
    index: 'aboleth',
    name: 'Aboleth',
    url: '/api/2014/monsters/aboleth'
}

export const monsterStore: monsterState = observable({
    activeMonster: undefined,
    activeSelectorItem: ABOLETH,
    monsterList: [],
    bookmarks: new Map<string, monsterListItem>()
});

export const handleBookmarkClick = action(async (monsterIndex: string) => {
    if(diceStore.deletionMode) {
        monsterStore.bookmarks.delete(monsterIndex);
    } else {
        setActiveMonster(monsterIndex);
    }
});

export const setActiveMonster = action(async (monsterIndex: string) => {
    monsterStore.activeSelectorItem = (monsterStore.monsterList.find(monster => monster.index === monsterIndex) ?? ABOLETH);
    monsterStore.activeMonster = await getMonsterData(monsterIndex);
});

export const initializeMonsterList = action(async () => {
    monsterStore.monsterList = await getMonsterList();
});

export const bookmarkActiveMonster = action(() => {
    monsterStore.bookmarks.set(monsterStore.activeSelectorItem.index, monsterStore.activeSelectorItem);
});
