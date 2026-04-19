import { observer } from 'mobx-react';

import Caesar from './Caesar';
import RandomNpc from './RandomNpc';
import DiceRoller from './dice/DiceRoller';
import DiceImporterExporter from './dice/DiceImporterExporter';
import Monster from './monster/Monster';
import Mirror from './Mirror';

import { toolStore } from '../../stores/tool-store';

const TOOLS = {
    'caesar': <Caesar/>,
    'npc': <RandomNpc/>,
    'dice': <DiceRoller/>,
    'dice import': <DiceImporterExporter/>,
    'mirror': <Mirror/>,
    'monster': <Monster/>,
}

function Tool() {
    const {activeTool} = toolStore;

    return <div style={{backgroundColor: '#ddd', width: '100%', height: '100vh', padding: '5px'}}>
        {TOOLS[activeTool]}
    </div>;
}

export default observer(Tool);
