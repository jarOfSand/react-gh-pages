import { diceStore, exportHandfulls, saveHandfull, rollTempHandfull, setTempDiceString, setHandfullName } from '../../../stores/dice-store';
import { observer } from 'mobx-react';
import '../../../css/DiceRoller.css';
import { handfull } from '../../../classes/handfull-class';
import DiceButton from './DiceButton'
import RollResultsQueue from './RollResultsQueue';
import SharedButtons from './SharedButtons';
import { CSSProperties } from 'react';

function Row(props: { children: React.JSX.Element[], style?: CSSProperties }): React.JSX.Element {
    return <div style={{ display: 'flex', flexDirection: 'row', ...props.style }}>{props.children}</div>
}

function Column(props: { children: React.JSX.Element[], style?: CSSProperties }): React.JSX.Element {
    return <div style={{ display: 'flex', flexDirection: 'column', ...props.style }}>{props.children}</div>
}

function DiceRoller() {
    const { customHandfulls, tempDiceString, tempName } = diceStore;

    const buttons: React.JSX.Element[] = [];
    customHandfulls.forEach((dice: handfull) => {
        buttons.push(<DiceButton dice={dice} key={dice.id} removable={true} />);
    });

    return (
        <Column>
            <Column style={{ marginRight: 'auto' }}>
                <Row>
                    <input placeholder={'ex: fire sword or empty'} onChange={(e) => { setHandfullName(e.target.value) }} value={tempName} />
                    <button onClick={saveHandfull}>{'save'}</button>
                </Row>
                <Row>
                    <input placeholder={'ex: 1d8+2d4+3'} onChange={(e) => { setTempDiceString(e.target.value) }} value={tempDiceString} />
                    <button onClick={rollTempHandfull}>{'roll'}</button>
                </Row>
            </Column>
            <SharedButtons />
            <RollResultsQueue />
            <div className={'dice-button-row'}>
                {buttons}
            </div>
        </Column>
    );
}

export default observer(DiceRoller);
