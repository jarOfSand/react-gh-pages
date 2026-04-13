import './App.css';
import Sidebar from './components/sidebar/Sidebar';
import Tool from './components/tools/Tool';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw' }}>
      <Sidebar />
      <Tool />
      <ToastContainer/>
    </div>
  );
}

export default App;
