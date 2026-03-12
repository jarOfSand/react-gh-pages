import { diceStore, importHandfulls, setImportString } from '../../stores/dice-store';
import { observer } from 'mobx-react';
import HandfullButton from './HandfullButton';

function DiceImporterExporter() {
    const { importString } = diceStore;

    return (
        <div style={{
            margin: '5px',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <div style={{ display: 'flex', flexDirection: 'column', marginRight: 'auto' }}>
                <input placeholder={'paste import here'} onChange={(e) => { setImportString(e.target.value) }} value={importString} />
            </div>
            <div className={'dice-button-row'} style={{marginBottom: '10px'}}>
                <button onClick={importHandfulls}>{'import'}</button>
            </div>
        </div>
    );
}

export default observer(DiceImporterExporter);
