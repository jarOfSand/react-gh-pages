import Caesar from './Caesar';
import { observer } from 'mobx-react';

function Tool(props: {activeTool: string}) {
    if(props.activeTool === 'caesar') {
        return (<Caesar/>);    
    }
    
    return null;
}

export default observer(Tool);
