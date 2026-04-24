import { observer } from 'mobx-react';
import Cipher from './Cipher';
import RandomNpc from './RandomNpc';
import DiceRoller from './dice/DiceRoller';
import DiceImporterExporter from './dice/DiceImporterExporter';
import Monster from './monster/Monster';
import Mirror from './Mirror';
import { toolStore } from '../../stores/tool-store';

const TOOLS = {
    'cipher': <Cipher/>,
    'npc': <RandomNpc/>,
    'dice': <DiceRoller/>,
    'dice import': <DiceImporterExporter/>,
    'mirror': <Mirror/>,
    'monster': <Monster/>,
}

function Tool() {
    const {activeTool} = toolStore;

    return <div style={{backgroundColor: '#ddd', width: 'calc(100vw - 70px)', height: '100vh'}}>
        <div style={{padding: '5px'}}>
        {TOOLS[activeTool]}
        </div>
    </div>;
}

export default observer(Tool);
