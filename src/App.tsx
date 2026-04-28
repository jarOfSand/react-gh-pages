import './App.css';
import Sidebar from './components/Sidebar';
import Tool from './components/Tool';
import { ToastContainer } from 'react-toastify';
import Row from './components/common/Row';

function App() {
  return (
    <Row style={{ height: '100vh', width: '100vw' }}>
      <Sidebar />
      <Tool />
      <ToastContainer/>
    </Row>
  );
}

export default App;
