import { useState } from 'react';
import './App.css';
import Sidebar from './sidebar/Sidebar';
import Tool from './tools/Tool';
function App() {

  return (
    <div style={{ display: 'flex', width: '100vw' }}>
      <Sidebar/>
      <Tool />
    </div>
  );
}

export default App;
