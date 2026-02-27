import { diceStore, handleCustomButtonClick, saveCustomHandfull, rollHandfull, setHandfull, toggleDeletionMode, setHandfullName } from '../stores/dice-store';
import { observer } from 'mobx-react';

function DiceRoller() {
    const {rollResult, customHandfulls_v2, lastestHandfullRolled, deletionMode, customHandfulls, handfull, handfullName} = diceStore;

    const HandfullButton = (props: { handfullName: string, handfullValue: string, index: number }) => {
        return (<button style={deletionMode ? {color: '#b1000d'} : {}} onClick={() => {
            handleCustomButtonClick(props.index);
        }
        }>{props.handfullName ? `${props.handfullName}: ${props.handfullValue}` : props.handfullValue}</button>);
    }

    const userMadeButtons = customHandfulls_v2.length === 0 ? null : customHandfulls_v2.map((handfullObj, index) => {
        return <HandfullButton handfullName={handfullObj.name} handfullValue={handfullObj.value} index={index} key={index} />;
    })

    return (
        <div style={{
            margin: '5px',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <div style={{ display: 'flex', flexDirection: 'column', marginRight: 'auto' }}>
                <input placeholder={'ex: fire sword'} onChange={(e) => { setHandfullName(e.target.value) }} value={handfullName} />
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

            {lastestHandfullRolled && <>
                <span style={{ color: '#aaa' }}>{`${lastestHandfullRolled} = `}</span>
                <span>{rollResult}</span>
            </>
            }
        </div>
    );
}

export default observer(DiceRoller);
