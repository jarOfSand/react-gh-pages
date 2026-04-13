import { observer } from 'mobx-react';
import { monsterStore, setActiveMonster, bookmarkActiveMonster } from '../../../stores/monster-store';

function MonsterSelector() {
    const {monsterList} = monsterStore;

    const options = monsterList.map((monsterListItem) => {
        return <option value={monsterListItem.index}>{monsterListItem.name}</option>
    });

    return <div>
        <select onChange={(e) => setActiveMonster(e.target.value)}>{options}</select>
        <button onClick={bookmarkActiveMonster}>{'save'}</button>
    </div>
}

export default observer(MonsterSelector);
