import { observer } from 'mobx-react';
import { monsterStore, setActiveMonster, bookmarkActiveMonster } from '../../../stores/monster-store';

function MonsterSelector() {
    const {monsterList, activeMonster} = monsterStore;

    const options = monsterList.map((monsterListItem) => {
        return <option value={monsterListItem.index}>{monsterListItem.name}</option>
    });

    return <div style={{display: 'flex', flexDirection: 'row'}}>
        <select onChange={(e) => setActiveMonster(e.target.value)}>{options}</select>
        <button onClick={bookmarkActiveMonster}>{'bookmark monster'}</button>
    </div>
}

export default observer(MonsterSelector);
