import { Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/Login/LoginPage';
import DashAdmin from '../pages/Dashboard/Admin/DashboardAdministrador';
import DashJefe from '../pages/Dashboard/Jefe/DashboardJefe';
import SoliAuxTrans from '../pages/Solicitudes/AuxTransport';
import Descuentos from '../pages/Solicitudes/Descuentos';
import HorasExt from '../pages/Solicitudes/HorasExt';
import OtroSiDef from '../pages/Solicitudes/OtroSiDef';
import OtroSiTemp from '../pages/Solicitudes/OtroSiTemp';
import Vacaciones from '../pages/Solicitudes/Vacaciones';
import Otros from '../pages/Solicitudes/Otros';
import DashNomina from '../pages/Dashboard/Nomina/DashboardNomina';
import SoliPendientes from '../pages/Gestion/Pendientes';
import TodasSolis from '../pages/Gestion/Todas';
import SoliPorTiendas from '../pages/Gestion/PorTiendas';
import ProtectedRoute from './ProtectedRoute';
import SoliRechazdas from '../pages/Gestion/Rechazadaas';
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
      <Route element={<ProtectedRoute allowedRoles={['nomina']} />}>
        <Route path="/solicitudes-pendientes" element={<SoliPendientes />} />
      </Route>
      <Route element={<ProtectedRoute allowedRoles={['nomina']} />}>
        <Route path="/todas-las-solicitudes" element={<TodasSolis />} />
      </Route>
      <Route element={<ProtectedRoute allowedRoles={['nomina']} />}>
        <Route path="/solicitudes-por-tiendas" element={<SoliPorTiendas />} />
      </Route>
      <Route element={<ProtectedRoute allowedRoles={['nomina']} />}>
        <Route path="/solicitudes-rechazadas" element={<SoliRechazdas />} />
      </Route>
      <Route element={<ProtectedRoute allowedRoles={['jefe']} />}>
        <Route path="/dashboard-jefe" element={<DashJefe />} />
      </Route>
      <Route element={<ProtectedRoute allowedRoles={['jefe']} />}>
        <Route path="/solicitud-AuxTrans" element={<SoliAuxTrans />} />
      </Route>
      <Route element={<ProtectedRoute allowedRoles={['jefe']} />}>
        <Route path="/solicitud-descuentos" element={<Descuentos />} />
      </Route>
      <Route element={<ProtectedRoute allowedRoles={['jefe']} />}>
        <Route path="/solicitud-horaExt" element={<HorasExt />} />
      </Route>
      <Route element={<ProtectedRoute allowedRoles={['jefe']} />}>
        <Route path="/solicitud-OtroSiDef" element={<OtroSiDef />} />
      </Route>
      <Route element={<ProtectedRoute allowedRoles={['jefe']} />}>
        <Route path="/solicitud-OtroSiTemp" element={<OtroSiTemp />} />
      </Route>
      <Route element={<ProtectedRoute allowedRoles={['jefe']} />}>
        <Route path="/solicitud-vacaciones" element={<Vacaciones />} />
      </Route>
      <Route element={<ProtectedRoute allowedRoles={['jefe']} />}>
        <Route path="/solicitud-otros" element={<Otros />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
