import { useState } from 'react';
// import './Sidebar.scss'

function SidebarButton(props: {setActiveTool: Function, targetTool: string}) {
    return <button style={{}} onClick={() => props.setActiveTool(props.targetTool)}>{props.targetTool}</button>
}

function Sidebar(props: {setActiveTool: Function}) {
    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <SidebarButton setActiveTool={props.setActiveTool} targetTool={'caesar'}/>
            <SidebarButton setActiveTool={props.setActiveTool} targetTool={'other'}/>
        </div>
    );
}

export default Sidebar;
