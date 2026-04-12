import { observer } from 'mobx-react';
import { monsterStore, setActiveMonster } from '../stores/monster-store';
import RollResultsQueue from './dice/RollResultsQueue';
import { monsterListItem } from '../stores/monster-store';
import MonsterBlock from './monster/MonsterBlock';

function getMonsterSelector(monsterList: monsterListItem[], setActiveMonster: Function) {
    const options = monsterList.map((monsterListItem) => {
        return <option value={monsterListItem.index}>{monsterListItem.name}</option>
    });

    return <select onChange={(e) => setActiveMonster(e.target.value)}>{options}</select>
}

function MonsterV2() {
    const { monsterList } = monsterStore;

    return (
        <div>
            {getMonsterSelector(monsterList, setActiveMonster)}
            <MonsterBlock />
            <RollResultsQueue />
        </div>);
}

export default observer(MonsterV2);
