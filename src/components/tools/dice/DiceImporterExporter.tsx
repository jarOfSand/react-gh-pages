import { diceStore, clearImportString, importHandfulls, setImportString } from '../../../stores/dice-store';
import { observer } from 'mobx-react';

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
            <div style={{display: 'flex', marginRight: 'auto'}}>
                <div className={'dice-button-row'} style={{marginBottom: '10px'}}>
                    <button onClick={importHandfulls}>{'import'}</button>
                </div>
                <div className={'dice-button-row'} style={{ marginBottom: '10px' }}>
                    <button onClick={clearImportString}>{'clear'}</button>
                </div>
            </div>

        </div>
    );
}

export default observer(DiceImporterExporter);
