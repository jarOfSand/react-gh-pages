import { diceStore, exportHandfulls, saveHandfull, rollTempHandfull, setTempDiceString, setHandfullName } from '../../../stores/dice-store';
import { observer } from 'mobx-react';
import '../../../css/DiceRoller.css';
import { handfull } from '../../../classes/handfull-class';
import DiceButton from './DiceButton'
import RollResultsQueue from './RollResultsQueue';
import SharedButtons from './SharedButtons';

function DiceRoller() {
    const { customHandfulls, tempDiceString, tempName } = diceStore;

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
                <input placeholder={'ex: fire sword or empty'} onChange={(e) => { setHandfullName(e.target.value) }} value={tempName} />
                <input placeholder={'ex: 1d8+2d4+3'} onChange={(e) => { setTempDiceString(e.target.value) }} value={tempDiceString} />
            </div>
            <div className={'dice-button-row'} style={{marginBottom: '10px'}}>
                <button onClick={rollTempHandfull}>{'roll'}</button>
                <button onClick={saveHandfull}>{'save'}</button>
                <button onClick={exportHandfulls}>{'export to clipboard'}</button>

                <SharedButtons/>
            </div>
            <div className={'dice-button-row'}>
                {buttons}
            </div>
            <RollResultsQueue/>
        </div>
    );
}

export default observer(DiceRoller);
