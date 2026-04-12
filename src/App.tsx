import './App.css';
import Sidebar from './components/sidebar/Sidebar';
import Tool from './components/tools/Tool';

function App() {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <Tool />
    </div>
  );
}

export default App;
