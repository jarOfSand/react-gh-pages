import { observer } from 'mobx-react';
import Cipher from './tools/cipher/Cipher';
import RandomNpc from './tools/RandomNpc';
import DiceRoller from './tools/dice/DiceRoller';
import DiceImporterExporter from './tools/dice/DiceImporterExporter';
import Monster from './tools/monster/Monster';
import Mirror from './tools/Mirror';
import Encounter from './tools/Encounter';
import { toolStore } from '../stores/tool-store';

const TOOLS = {
    'cipher': <Cipher/>,
    'npc': <RandomNpc/>,
    'dice': <DiceRoller/>,
    'dice import': <DiceImporterExporter/>,
    'mirror': <Mirror/>,
    // 'monster': <Monster/>,
    'encounter': <Encounter/>,
}

function getTool(activeTool) {
    if(activeTool === 'monster') {
        return <Monster/>;
    }
    return <div style={{padding: '20px 10px 10px'}}>
        {TOOLS[activeTool]}
    </div>
}

function Tool() {
    const {activeTool} = toolStore;

    return <div style={{backgroundColor: '#ddd', width: 'calc(100vw - 70px)'}}>
        {getTool(activeTool)}
    </div>;
}

export default observer(Tool);
