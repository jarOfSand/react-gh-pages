import Caesar from './Caesar';
import DiceRoller from './DiceRoller';
import RandomNpc from './RandomNpc';
import { observer } from 'mobx-react';

const TOOLS = {
    'caesar': <Caesar/>,
    'npc': <RandomNpc/>,
    'dice': <DiceRoller/>,
}

function Tool({activeTool}) {
    return <div style={{backgroundColor: '#ddd', width: '100%'}}>
        {TOOLS[activeTool]}
    </div>;
}

export default observer(Tool);
