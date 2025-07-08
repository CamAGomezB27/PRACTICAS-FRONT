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
import Error403FORBBIDEN from '../pages/Unauthorized/Error403';
import NotificacionesAdmin from '../pages/Users/Notificaciones';
import GestionUser from '../pages/Users/UsersGestion';
import UsuariosRegis from '../pages/Users/UsuserRegis';
import VistPrevNom from '../pages/VistaPrev/Nomina/VistaPrevIndivNom';
import VistaPrevisMasivaNom from '../pages/VistaPrev/Nomina/VistaPrevMasiNom';
import VistPrevTInd from '../pages/VistaPrev/Tienda/VistPrevIndi';
import VistaPrevisMasivaT from '../pages/VistaPrev/Tienda/VistPrevMas';
import ProtectedRoute from './ProtectedRoute';

const AppRoutes = () => {
  return (
    <Routes>
      {/* LOGIN */}
      <Route path="/" element={<LoginPage />} />

      {/* RUTAS PROTEGIDAS */}

      {/* SOLO ADMINISTRADORES */}
      <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
        <Route path="/dashboard-administrador" element={<DashAdmin />} />
        <Route path="/usuarios-registrados" element={<UsuariosRegis />} />
        <Route path="/gestionar-usuarios" element={<GestionUser />} />
        <Route path="/notificaciones" element={<NotificacionesAdmin />} />
      </Route>

      {/* SOLO GESTORES DE NOMINA */}
      <Route element={<ProtectedRoute allowedRoles={['nomina']} />}>
        <Route path="/dashboard-nomina" element={<DashNomina />} />
        <Route
          path="/vista-previa-individual-nomina/:id"
          element={<VistPrevNom />}
        />
        <Route
          path="/vista-previa-masiva-novedad-nomina/:id"
          element={<VistaPrevisMasivaNom />}
        />
        <Route path="/solicitudes-pendientes" element={<SoliPendientes />} />
        <Route path="/todas-las-solicitudes" element={<TodasSolis />} />
        <Route path="/solicitudes-por-tiendas" element={<SoliPorTiendas />} />
        <Route path="/respuesta-masiva" element={<RespuestaMasiva />} />
        <Route
          path="/exportacion-consolidados-nomina"
          element={<ExportConstNom />}
        />
      </Route>

      {/* SOLO JEFES DE TIENDAS */}
      <Route element={<ProtectedRoute allowedRoles={['jefe']} />}>
        <Route path="/dashboard-jefe" element={<DashJefe />} />
        <Route path="/solicitud-AuxTrans" element={<SoliAuxTrans />} />
        <Route path="/solicitud-descuentos" element={<Descuentos />} />
        <Route path="/solicitud-horaExt" element={<HorasExt />} />
        <Route path="/solicitud-OtroSiDef" element={<OtroSiDef />} />
        <Route path="/solicitud-OtroSiTemp" element={<OtroSiTemp />} />
        <Route path="/solicitud-vacaciones" element={<Vacaciones />} />
        <Route path="/solicitud-otros" element={<Otros />} />
        <Route
          path="/vista-previa-individual-tienda/:id"
          element={<VistPrevTInd />}
        />
        <Route
          path="/vista-previa-masiva-tienda/:id"
          element={<VistaPrevisMasivaT />}
        />
        <Route
          path="/exportacion-consolidados-tienda"
          element={<ExportConsTienda />}
        />
      </Route>

      {/* RUTA DE ERROR 403 */}
      <Route path="/unauthorized" element={<Error403FORBBIDEN />} />
    </Routes>
  );
};

export default AppRoutes;
