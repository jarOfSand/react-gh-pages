import Caesar from './Caesar';
import RandomNpc from './RandomNpc';
import { observer } from 'mobx-react';

function Tool(props: {activeTool: string}) {
    if(props.activeTool === 'caesar') {
        return (<Caesar/>);    
    }

    if(props.activeTool === 'random npc') {
        return (<RandomNpc/>);    
    }
    
    return null;
}

export default observer(Tool);
