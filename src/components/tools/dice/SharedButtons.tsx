import { diceStore, toggleCrit, clearHistory, toggleDeletionMode } from '../../../stores/dice-store';
import { observer } from 'mobx-react';
import '../../../css/DiceRoller.css';

function SharedButtons() {
    const { critMode, deletionMode } = diceStore;

    return <div style={{display: 'flex', flexDirection: 'row', padding: '2px', border: '1px gray solid', borderRadius: '5px', width: 'fit-content'}}>
        <button style={{height: '26px'}} onClick={clearHistory}>{'clear'}</button>
        <button onClick={toggleDeletionMode}><input type={'checkbox'} checked={deletionMode}/><span>{'delete'}</span></button>
        <button onClick={toggleCrit}><input type={'checkbox'} checked={critMode}/><span>{'crit'}</span></button>
    </div>
}

export default observer(SharedButtons);
