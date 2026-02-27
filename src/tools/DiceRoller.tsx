import * as diceHelper from '../helpers/dice-helper';
import { diceStore, setRollResult, setLastestHandfullRolled, setHandfull, setCustomHandfulls, setDeletionMode } from '../stores/dice-store';
import { observer } from 'mobx-react';

function DiceRoller() {
    const {rollResult, lastestHandfullRolled, deletionMode, customHandfulls, handfull} = diceStore;

    function removeCustomHandfull(index: number) {
        const newCustomHandfulls = customHandfulls
        newCustomHandfulls.splice(index, 1);
        setCustomHandfulls(newCustomHandfulls);
    }

    const HandfullButton = (props: { handfull: string, index: number }) => {
        return (<button style={deletionMode ? {color: '#b1000d'} : {}} onClick={() => {
            if (deletionMode) {
                removeCustomHandfull(props.index);
            } else {
                const result = diceHelper.rollHandfull(props.handfull);
                setRollResult(result);
                setLastestHandfullRolled(props.handfull);
            }
        }
        }>{props.handfull}</button>);
    }

    const userMadeButtons = customHandfulls.length === 0 ? null : customHandfulls.map((handfull, index) => {
        return <HandfullButton handfull={handfull} index={index} key={index} />;
    })

    return (
        <div style={{
            margin: '5px',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <div className={'button-row'} style={{ display: 'flex', marginRight: 'auto' }}>
                <input placeholder={'example: d8+2d4+2'} onChange={(e) => { setHandfull(e.target.value) }} value={handfull} />
            </div>
            <div className={'button-row'} style={{ display: 'flex', marginRight: 'auto', marginTop: '5px' }}>
                <button onClick={() => {
                    if (handfull) {
                        const result = diceHelper.rollHandfull(handfull);
                        setRollResult(result);
                        setLastestHandfullRolled(handfull);
                    }
                }}>{'roll handfull: ' + handfull}</button>

                <button onClick={() => {
                    if (handfull) {
                        setCustomHandfulls([...customHandfulls, handfull])
                    }
                }}>{'save handfull'}</button>

                <button onClick={() => {
                    setDeletionMode(!deletionMode);
                }}><i style={{ color: '#aaa' }}>{!deletionMode ? 'deletion mode' : 'roll mode'}</i></button>
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
