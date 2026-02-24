import { useState } from 'react';
// import './Sidebar.scss'

function SidebarButton(props: {setActiveTool: Function, targetTool: string}) {
    return <button style={{}} onClick={() => props.setActiveTool(props.targetTool)}>{props.targetTool}</button>
}

function Sidebar(props: {setActiveTool: Function}) {
    return (
        <div style={{display: 'flex', flexDirection: 'column', backgroundColor: '#ccc', height: '100vh', padding: '5px', width: '100px'}}>
            <SidebarButton setActiveTool={props.setActiveTool} targetTool={'caesar'}/>
            <SidebarButton setActiveTool={props.setActiveTool} targetTool={'random npc'}/>
        </div>
    );
}

export default Sidebar;
