import { diceStore, exportHandfulls, toggleCrit, clearHistory, saveHandfull, rollTempHandfull, setTempDiceString, toggleDeletionMode, setHandfullName } from '../../../stores/dice-store';
import { observer } from 'mobx-react';
import '../../../css/DiceRoller.css';

function SharedButtons() {
    const { critMode, deletionMode } = diceStore;

    return <>
        <button onClick={clearHistory}>{'clear'}</button>
        <button onClick={toggleDeletionMode}>{!deletionMode ? '❌' : '✅'}</button>
        <button onClick={toggleCrit}>{!critMode ? 'crit' : 'not crit'}</button>
    </>
}

export default observer(SharedButtons);
