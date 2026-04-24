import { setActiveTool } from '../../stores/tool-store';

function SidebarButton(props: { targetTool: string }) {
    return <button onClick={() => setActiveTool(props.targetTool)}>{props.targetTool}</button>
}

function Sidebar() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#ccc', height: '100vh', width: '70px'}}>
            <div style={{marginTop: '10px', fontSize: 'smaller'}}>{'tools'}</div>
            <SidebarButton targetTool={'dice'} />
            <div style={{ marginTop: '10px', fontSize: 'smaller' }}>{'dm tools'}</div>
            <SidebarButton targetTool={'cipher'} />
            <SidebarButton targetTool={'mirror'} />
            <SidebarButton targetTool={'monster'} />
            <SidebarButton targetTool={'npc'} />
            {/* <SidebarButton targetTool={'dice import'} /> */}
        </div>
    );
}

export default Sidebar;
