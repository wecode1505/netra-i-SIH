import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import MainLayout from './components/layout/MainLayout';
import Dashboard from './pages/Dashboard';
import Cases from './pages/Cases';
import InvestigationGraph from './pages/InvestigationGraph';
import Evidence from './pages/Evidence'; // Make sure this is imported!

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        
        {/* All routes inside here have the Sidebar and floating Chat */}
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/cases" element={<Cases />} />
          <Route path="/graph" element={<InvestigationGraph />} />
          
          {/* This is the missing line that caused the blank screen! */}
          <Route path="/evidence" element={<Evidence />} /> 
        </Route>
      </Routes>
    </Router>
  );
}

export default App;