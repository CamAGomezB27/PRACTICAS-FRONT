import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/Login/LoginPage';
import DashAdmin from './pages/Dashboard/Admin/DashboardAdministrador';
import DashJefe from './pages/Dashboard/Jefe/DashboardJefe'


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard-administrador" element={<DashAdmin />} />
        <Route path='/dashboard-jefe' element={<DashJefe/>} />
      </Routes>
    </Router>
  );
};

export default App;
