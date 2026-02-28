import Caesar from './Caesar';
import DiceRoller from './DiceRoller';
import RandomNpc from './RandomNpc';
import Descrambler from './Descrambler';

import { observer } from 'mobx-react';
import { toolStore } from '../stores/tool-store';

const TOOLS = {
    'caesar': <Caesar/>,
    'npc': <RandomNpc/>,
    'dice': <DiceRoller/>,
    'descrambler': <Descrambler/>,
}

function Tool() {
    const {activeTool} = toolStore;

    return <div style={{backgroundColor: '#ddd', width: '100%'}}>
        {TOOLS[activeTool]}
    </div>;
}

export default observer(Tool);
