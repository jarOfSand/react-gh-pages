import { useState } from 'react';
import './App.css';
import Sidebar from './sidebar/Sidebar';
import Tool from './tools/Tool';

function App() {
  const [activeTool, setActiveTool] = useState('');

  return (
    <div style={{ display: 'flex', width: '100vw' }}>
      <Sidebar setActiveTool={setActiveTool} />
      <Tool activeTool={activeTool} />
    </div>
  );
}

export default App;
