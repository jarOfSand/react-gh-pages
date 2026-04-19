import { observer } from 'mobx-react';
import RollResultsQueue from '../dice/RollResultsQueue';
import MonsterBlock from './MonsterBlock';
import MonsterSelector from './MonsterSelector';
import BookmarkedMonsters from './BookmarkedMonsters';
import SharedButtons from '../dice/SharedButtons';

function Monster() {
    return (
        <div style={{display: 'flex', flexDirection: 'column', height: '100vh'}}>
            <MonsterSelector/>
            <SharedButtons/>
            <RollResultsQueue maxLength={4}/>
            <BookmarkedMonsters/>
            <MonsterBlock />
        </div>);
}

export default observer(Monster);
