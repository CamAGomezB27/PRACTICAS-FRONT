import { Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/Login/LoginPage';
import DashAdmin from '../pages/Dashboard/Admin/DashboardAdministrador';
import DashJefe from '../pages/Dashboard/Jefe/DashboardJefe';
import DashNomina from '../pages/Dashboard/Nomina/DashboardNomina';
import ProtectedRoute from './ProtectedRoute';
// import Unauthorized from '../pages/Unauthorized'; // Puedes crear una simple página

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      {/* RUTAS */}
      <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
        <Route path="/dashboard-administrador" element={<DashAdmin />} />
      </Route>
      <Route element={<ProtectedRoute allowedRoles={['nomina']} />}>
        <Route path="/dashboard-nomina" element={<DashNomina />} />
      </Route>
      <Route element={<ProtectedRoute allowedRoles={['jefe']} />}>
        <Route path="/dashboard-jefe" element={<DashJefe />} />
      </Route>
      {/* MÁS RUTAS */}
    </Routes>
  );
};

export default AppRoutes;
