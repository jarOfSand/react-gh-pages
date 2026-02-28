import { setActiveTool } from '../stores/tool-store';

function SidebarButton(props: {targetTool: string}) {
    return <button onClick={() => setActiveTool(props.targetTool)}>{props.targetTool}</button>
}

function Sidebar() {
    return (
        <div style={{display: 'flex', flexDirection: 'column', backgroundColor: '#ccc', height: '100vh', padding: '5px', width: '100px'}}>
            <SidebarButton targetTool={'caesar'}/>
            <SidebarButton targetTool={'npc'}/>
            <SidebarButton targetTool={'dice'}/>
            <SidebarButton targetTool={'descrambler'}/>
        </div>
    );
}

export default Sidebar;
