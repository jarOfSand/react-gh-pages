import { observer } from 'mobx-react';
import Cipher from './tools/Cipher';
import RandomNpc from './tools/RandomNpc';
import DiceRoller from './tools/dice/DiceRoller';
import DiceImporterExporter from './tools/dice/DiceImporterExporter';
import Monster from './tools/monster/Monster';
import Mirror from './tools/Mirror';
import { toolStore } from '../stores/tool-store';

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

    return <div style={{backgroundColor: '#ddd', width: 'calc(100vw - 70px)',
        // height: 'calc(100vh - 10px)',
        // padding: '5px'
    }}>
        {TOOLS[activeTool]}
    </div>;
}

export default observer(Tool);
