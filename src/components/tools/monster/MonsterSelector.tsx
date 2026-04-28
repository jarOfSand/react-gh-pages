import { observer } from 'mobx-react';
import { monsterStore, setActiveMonster, bookmarkActiveMonster, ABOLETH } from '../../../stores/monster-store';
import Select from 'react-select';

function MonsterSelector() {
    const {monsterList, activeMonster} = monsterStore;

    const options = monsterList.map((monsterListItem) => {
        return <option value={monsterListItem.index}>{monsterListItem.name}</option>
    });

    return <div>
        <select onChange={(e) => setActiveMonster(e.target.value)}>{options}</select>
        {/* <Select 
            defaultValue={{value: 'aboleth', label: 'Aboleth'}}
            onChange={async (monsterListItem) => {await setActiveMonster(monsterListItem.value)}}
            options={monsterList.map(monsterListItem => {return {value: monsterListItem.index, label: monsterListItem.name }})}
        /> */}
        <button onClick={bookmarkActiveMonster}>{'save'}</button>
    </div>
}

export default observer(MonsterSelector);
