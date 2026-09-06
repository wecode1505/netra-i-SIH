import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import MainLayout from './components/layout/MainLayout';
import Dashboard from './pages/Dashboard';
import Cases from './pages/Cases';
import InvestigationGraph from './pages/InvestigationGraph';
import Evidence from './pages/Evidence';
import Network from './pages/Network';
import Messages from './pages/Messages';
import Simulator from './pages/Simulator';
import Settings from './pages/Settings'; // Imported Settings

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/cases" element={<Cases />} />
          <Route path="/graph" element={<InvestigationGraph />} />
          <Route path="/evidence" element={<Evidence />} />
          <Route path="/network" element={<Network />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/simulator" element={<Simulator />} />
          <Route path="/settings" element={<Settings />} /> {/* New Route */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;