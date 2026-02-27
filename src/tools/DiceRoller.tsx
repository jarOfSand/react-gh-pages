import { diceStore, handleCustomButtonClick, saveCustomHandfull, rollHandfull, setHandfull, toggleDeletionMode, setHandfullName } from '../stores/dice-store';
import { observer } from 'mobx-react';

function DiceRoller() {
    const { rollResult, history, latestRollDesc, customHandfulls_v2, deletionMode, handfull, handfullName } = diceStore;

    const HandfullButton = (props: { handfull: { name: string, value: string }, index: number }) => {
        return (<button style={deletionMode ? { color: '#b1000d' } : {}} onClick={() => {
            handleCustomButtonClick(props.index);
        }
        }>{props.handfull.name ? props.handfull.name : props.handfull.value}</button>);
    }

    const userMadeButtons = customHandfulls_v2.length === 0 ? null : customHandfulls_v2.map((handfullObj, index) => {
        return <HandfullButton handfull={handfullObj} index={index} key={index} />;
    });

    const rollResultQueue = history.length === 0 ? null : history.map((historyObj, index) => {
        const {rollDesc, rollResult} = historyObj;

        return (<div style={ index === 0 ? {marginBottom: '15px'} : {} }>
            <span style={{ marginRight: '5px' }}>{rollResult}</span>
            <span style={{ color: '#aaa', marginRight: '5px' }}>{rollDesc}</span>
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
                <input placeholder={'ex: d8+2d4+3'} onChange={(e) => { setHandfull(e.target.value) }} value={handfull} />
            </div>
            <div className={'button-row'} style={{ display: 'flex', marginRight: 'auto', marginTop: '5px' }}>
                <button onClick={rollHandfull}>{'roll handfull'}</button>
                <button onClick={saveCustomHandfull}>{'save handfull'}</button>
                <button onClick={toggleDeletionMode}><i style={{ color: '#aaa' }}>{!deletionMode ? 'deletion mode' : 'roll mode'}</i></button>
            </div>

            <div className={'button-row'} style={{ display: 'flex', marginRight: 'auto' }}>
                {userMadeButtons}
            </div>

            {rollResultQueue}
        </div>
    );
}

export default observer(DiceRoller);
