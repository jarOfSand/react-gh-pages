import { observer } from 'mobx-react';
import RollResultsQueue from '../dice/RollResultsQueue';
import MonsterBlock from './MonsterBlock';
import MonsterSelector from './MonsterSelector';
import BookmarkedMonsters from './BookmarkedMonsters';
import SharedButtons from '../dice/SharedButtons';

function MonsterV2() {
    return (
        <div style={{display: 'flex', flexDirection: 'column', height: '100vh'}}>
            <MonsterSelector/>
            <SharedButtons/>
            <BookmarkedMonsters/>
            <RollResultsQueue maxLength={4}/>
            <MonsterBlock />
        </div>);
}

export default observer(MonsterV2);
