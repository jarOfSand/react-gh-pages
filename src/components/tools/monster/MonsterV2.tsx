import { observer } from 'mobx-react';
import RollResultsQueue from '../dice/RollResultsQueue';
import MonsterBlock from './MonsterBlock';
import MonsterSelector from './MonsterSelector';
import BookmarkedMonsters from './BookmarkedMonsters';
import SharedButtons from '../dice/SharedButtons';

function MonsterV2() {
    return (
        <div>
            <MonsterSelector/>
            <BookmarkedMonsters/>
            <SharedButtons/>
            <RollResultsQueue maxLength={4}/>
            <MonsterBlock />
        </div>);
}

export default observer(MonsterV2);
