import { Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/Login/LoginPage';
import DashAdmin from '../pages/Dashboard/Admin/DashboardAdministrador';
import DashJefe from '../pages/Dashboard/Jefe/DashboardJefe';
import DashNomina from '../pages/Dashboard/Nomina/DashboardNomina';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/dashboard-administrador" element={<DashAdmin />} />
      <Route path="/dashboard-jefe" element={<DashJefe />} />
      <Route path="/dashboard-nomina" element={<DashNomina />} />
    </Routes>
  );
};

export default AppRoutes;
