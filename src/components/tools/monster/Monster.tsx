import { observer } from 'mobx-react';
import MonsterSelector from './MonsterSelector';
import SharedButtons from '../dice/SharedButtons';
import RollResultsQueue from '../dice/RollResultsQueue';
import BookmarkedMonsters from './BookmarkedMonsters';
import MonsterBlock from './MonsterBlock';

function Monster() {
    return (
        <div style={{display: 'flex', flexDirection: 'column', height: '100vh', paddingLeft: '10px'}}>
            <div style={{height: '20px'}}>{''}</div>
            <MonsterSelector/>
            <SharedButtons/>
            <RollResultsQueue maxLength={4}/>
            <BookmarkedMonsters/>
            <MonsterBlock />
        </div>);
}

export default observer(Monster);
