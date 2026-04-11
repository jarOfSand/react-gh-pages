import { diceStore, exportHandfulls, toggleCrit, clearHistory, saveHandfull, rollTempHandfull, setTempDiceString, toggleDeletionMode, setHandfullName } from '../../stores/dice-store';
import { observer } from 'mobx-react';
import '../../css/DiceRoller.css';
import { handfull } from '../../stores/dice-store';
import DiceButton from './DiceButton'
import RollResultsQueue from './RollResultsQueue';

function DiceRoller() {
    const { customHandfulls, critMode, deletionMode, tempDiceString, tempName: handfullName } = diceStore;

    const buttons: React.JSX.Element[] = [];
    customHandfulls.forEach((dice: handfull) => {
        buttons.push(<DiceButton dice={dice} key={dice.id} removable={true} />);
    });

    return (
        <div style={{
            margin: '5px',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <div style={{ display: 'flex', flexDirection: 'column', marginRight: 'auto' }}>
                <input placeholder={'ex: fire sword or empty'} onChange={(e) => { setHandfullName(e.target.value) }} value={handfullName} />
                <input placeholder={'ex: d8+2d4+3'} onChange={(e) => { setTempDiceString(e.target.value) }} value={tempDiceString} />
            </div>
            <div className={'dice-button-row'} style={{marginBottom: '10px'}}>
                <button onClick={rollTempHandfull}>{'roll'}</button>
                <button onClick={saveHandfull}>{'save'}</button>
                <button onClick={clearHistory}>{'clear'}</button>
                <button onClick={toggleDeletionMode}>{!deletionMode ? '❌' : '✅'}</button>
                <button onClick={toggleCrit}>{!critMode ? 'crit' : 'not crit'}</button>
                <button onClick={exportHandfulls}>{'export to clipboard'}</button>
            </div>
            <div className={'dice-button-row'}>
                {buttons}
            </div>
            <RollResultsQueue/>
        </div>
    );
}

export default observer(DiceRoller);
