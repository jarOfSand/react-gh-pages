import { setActiveTool } from '../stores/tool-store';

function SidebarButton(props: {targetTool: string}) {
    return <button onClick={() => setActiveTool(props.targetTool)}>{props.targetTool}</button>
}

function Sidebar() {
    return (
        <div style={{display: 'flex', flexDirection: 'column', backgroundColor: '#ccc', height: '100vh', padding: '5px', minWidth: '100px'}}>
            <SidebarButton targetTool={'dice'}/>
            <SidebarButton targetTool={'dice import'}/>
            <div style={{marginTop: '10px', fontSize: 'smaller'}}>{'dm tools'}</div>
            <SidebarButton targetTool={'npc'}/>
            <SidebarButton targetTool={'caesar'}/>
            <SidebarButton targetTool={'monster'}/>
            {/* <div style={{marginTop: '10px', fontSize: 'smaller'}}>{'pc tools'}</div> */}
        </div>
    );
}

export default Sidebar;
