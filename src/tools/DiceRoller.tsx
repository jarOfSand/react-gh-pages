import { diceStore, handleCustomButtonClick, saveCustomHandfull, rollHandfull, setHandfullValue, toggleDeletionMode, setHandfullName } from '../stores/dice-store';
import { observer } from 'mobx-react';
import '../css/DiceRoller.css';

function DiceRoller() {
    const { history, customHandfulls, deletionMode, handfullValue, handfullName } = diceStore;

    const HandfullButton = (props: { handfull: { name: string, value: string }, index: number }) => {
        const buttonText = props.handfull.name ? props.handfull.name : props.handfull.value;
        const style = deletionMode ? { color: '#b1000d' } : {};

        return (<button style={{...style, marginRight: '3px'}} onClick={() => { handleCustomButtonClick(props.index) }}>{buttonText}</button>);
    }

    const buttons = customHandfulls.map((handfullObj, index) => {
        return <HandfullButton handfull={handfullObj} index={index} key={index} />;
    });

    const rollResultQueue = history.map(({ value, total, result }, index) => {
        const resultString = result.length > 1 ? `[${result}]` : '';
        const subtext = [
            value,
            resultString,
        ].join(' ');

        return (<div style={index === 0 ? { marginBottom: '15px' } : {}}>
            <span style={{ marginLeft: 'auto', width: '40px', marginRight: '5px' }}>{total}</span>
            <span style={{ color: '#aaa', marginRight: '5px', fontSize: 'smaller' }}>{subtext}</span>
        </div>)
    });

    return (
        <div style={{
            margin: '5px',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <div style={{ display: 'flex', flexDirection: 'column', marginRight: 'auto' }}>
                <input placeholder={'ex: fire sword or empty'} onChange={(e) => { setHandfullName(e.target.value) }} value={handfullName} />
                <input placeholder={'ex: d8+2d4+3'} onChange={(e) => { setHandfullValue(e.target.value) }} value={handfullValue} />
            </div>
            <div className={'dice-button-row'}>
                <button onClick={rollHandfull}>{'roll handfull'}</button>
                <button onClick={saveCustomHandfull}>{'save handfull'}</button>
                <button onClick={toggleDeletionMode}>{!deletionMode ? '❌' : '✅'}</button>
            </div>

            <div className={'dice-button-row'}>
                {buttons}
            </div>

            {rollResultQueue}
        </div>
    );
}

export default observer(DiceRoller);
