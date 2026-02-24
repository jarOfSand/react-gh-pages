import Caesar from './Caesar';
import RandomNpc from './RandomNpc';
import { observer } from 'mobx-react';

function Tool(props: {activeTool: string}) {
    let component;
    if(props.activeTool === 'caesar') {
        component = <Caesar/>;
    }
    if(props.activeTool === 'npc') {
        component = <RandomNpc/>;    
    }
    
    return <div style={{backgroundColor: '#ddd', width: '100%'}}>
        {component}
    </div>;
}

export default observer(Tool);
