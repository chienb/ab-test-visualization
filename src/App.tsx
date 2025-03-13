import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages
import Dashboard from './components/dashboard/Dashboard.tsx';
import DesignSimulator from './components/simulator/DesignSimulator.tsx';
import MetricsView from './components/metrics/MetricsView.tsx';
import IntegrationView from './components/integration/IntegrationView.tsx';
import ReportView from './components/report/ReportView.tsx';

// Layout Components
import Header from './components/common/Header.tsx';
import Sidebar from './components/common/Sidebar.tsx';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen grid grid-cols-[250px_1fr] grid-rows-[60px_1fr] bg-gray-50">
        <Header />
        <Sidebar />
        <main className="col-start-2 row-start-2 p-6 overflow-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/simulator" element={<DesignSimulator />} />
            <Route path="/metrics" element={<MetricsView />} />
            <Route path="/integration" element={<IntegrationView />} />
            <Route path="/report" element={<ReportView />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
