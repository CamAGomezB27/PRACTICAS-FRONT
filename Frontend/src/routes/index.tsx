import { Route, Routes } from 'react-router-dom';
import ExportConsTienda from '../pages/Consolidado/Jefe_Tienda/ConsolidadoFinalT';
import ExportConstNom from '../pages/Consolidado/Nomina/ConsolidadoFinalN';
import DashAdmin from '../pages/Dashboard/Admin/DashboardAdministrador';
import DashJefe from '../pages/Dashboard/Jefe/DashboardJefe';
import DashNomina from '../pages/Dashboard/Nomina/DashboardNomina';
import SoliPendientes from '../pages/Gestion/Pendientes';
import SoliPorTiendas from '../pages/Gestion/PorTiendas';
import RespuestaMasiva from '../pages/Gestion/RespMasiva';
import TodasSolis from '../pages/Gestion/Todas';
import LoginPage from '../pages/Login/LoginPage';
import SoliAuxTrans from '../pages/Solicitudes/AuxTransport';
import Descuentos from '../pages/Solicitudes/Descuentos';
import HorasExt from '../pages/Solicitudes/HorasExt';
import Otros from '../pages/Solicitudes/Otros';
import OtroSiDef from '../pages/Solicitudes/OtroSiDef';
import OtroSiTemp from '../pages/Solicitudes/OtroSiTemp';
import Vacaciones from '../pages/Solicitudes/Vacaciones';
import VistaPrevisMasivaT from '../pages/VistaPrev/Tienda/VistPrevMas';
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
        <Route path="/respuesta-masiva" element={<RespuestaMasiva />} />
      </Route>
      <Route element={<ProtectedRoute allowedRoles={['nomina']} />}>
        <Route
          path="/exportacion-consolidados-nomina"
          element={<ExportConstNom />}
        />
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
      <Route element={<ProtectedRoute allowedRoles={['jefe']} />}>
        <Route
          path="/vista-previa-masiva-tienda/:id"
          element={<VistaPrevisMasivaT />}
        />
      </Route>
      <Route element={<ProtectedRoute allowedRoles={['jefe']} />}>
        <Route
          path="/exportacion-consolidados-tienda"
          element={<ExportConsTienda />}
        />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
