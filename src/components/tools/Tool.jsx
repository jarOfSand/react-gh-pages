import { observer } from 'mobx-react';

import Caesar from './Caesar';
import RandomNpc from './RandomNpc';
import DiceRoller from './dice/DiceRoller';
import DiceImporterExporter from './dice/DiceImporterExporter';
import Monster from './monster/Monster';
import MonsterV2 from './monster/MonsterV2';

import { toolStore } from '../../stores/tool-store';

const TOOLS = {
    'caesar': <Caesar/>,
    'npc': <RandomNpc/>,
    'dice': <DiceRoller/>,
    'dice import': <DiceImporterExporter/>,
    'monster': <MonsterV2/>,
}

function Tool() {
    const {activeTool} = toolStore;

    return <div style={{backgroundColor: '#ddd', width: '100%'}}>
        {TOOLS[activeTool]}
    </div>;
}

export default observer(Tool);
