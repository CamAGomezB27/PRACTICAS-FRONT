import React from 'react';
import {
  FaClipboardList,
  FaListAlt,
  FaStore,
  FaTimesCircle,
  FaChartPie,
} from 'react-icons/fa';
import Navbar from '../../../components/Navbar/Navbar';
import Footer from '../../../components/Footer/Footer';
import Card from '../../../components/Cards/card';
import Franco from '../../../assets/images/Franco_Pensando_1-removebg-preview.png';
import { useAuth } from '../../../context/useAuth';

const DashboardNomina: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen w-screen flex flex-col bg-white">
      <Navbar panelTitle="NÓMINA" userRoleTitle="Nómina" />

      <main className="flex-grow px-8 pt-8 pb-4">
        {/* Bienvenida */}
        <div className="flex justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-black">
              ¡Bienvenido, {user?.nombre || 'Nombre No disponible'}!
            </h2>
            <p className="text-sm text-gray-600">
              Desde aquí puedes revisar y gestionar todas las novedades enviadas
              por las tiendas.
            </p>
          </div>

          <div className="w-1/3 flex justify-center mt-2">
            <h2 className="text-xl font-bold text-black">
              Novedades Recientes
            </h2>
          </div>
        </div>

        {/* Contenedor Principal en 3 Columnas */}
        <div className="flex justify-between pl-6">
          {/* Columna 1 - Cards principales */}
          <div className="flex flex-col w-1/3 mt-6 pt-4">
            <div className="grid grid-cols-2 gap-x-24 gap-y-8">
              <Card
                title="Solicitudes Pendientes"
                icon={<FaClipboardList size={50} />}
                className="h-[130px] w-[250px] rounded-2xl"
              />
              <Card
                title="Todas las Solicitudes"
                icon={<FaListAlt size={50} />}
                className="h-[130px] w-[250px] rounded-2xl"
              />
              <Card
                title="Solicitudes por Tiendas"
                icon={<FaStore size={50} />}
                className="h-[130px] w-[250px] rounded-2xl"
              />
              <Card
                title="Solicitudes Rechazadas"
                icon={<FaTimesCircle size={50} />}
                className="h-[130px] w-[250px] rounded-2xl"
              />
            </div>
          </div>

          {/* Columna 2 - Imagen de Franco */}
          <div className="w-1/3 flex justify-center items-center pl-32">
            <img
              src={Franco}
              alt="Franco"
              className="object-contain max-w-[400px]"
            />
          </div>

          {/* Columna 3 - Novedades + Exportaciones */}
          <div className="w-1/3 pl-5 flex flex-col items-center space-y-3">
            {/* Novedades Recientes */}
            <div className="text-sm font-bold w-[450px] bg-gray-400 rounded-2xl shadow-inner flex flex-col space-y-1 p-3 -mt-6">
              <div className="flex flex-col space-y-3 max-h-[200px] overflow-y-auto pr-1">
                {[...Array(10)].map((_, i) => (
                  <div
                    key={i}
                    className="flex items-start bg-white rounded-xl shadow-sm p-3 relative cursor-pointer"
                  >
                    <div
                      className={`w-1.5 h-full rounded-l-md absolute left-0 top-0 bottom-0 ${
                        i % 3 === 0
                          ? 'bg-green-500'
                          : i % 3 === 1
                            ? 'bg-yellow-500'
                            : 'bg-red-500'
                      }`}
                    />
                    <div className="pl-3 pr-1 flex-1">
                      <p className="text-sm font-semibold text-gray-800">
                        {`SOLICITUD #0${i + 1111} ${
                          i % 3 === 0
                            ? 'GESTIONADA'
                            : i % 3 === 1
                              ? 'EN PROCESO'
                              : 'RECHAZADA'
                        }`}
                      </p>
                      <p className="text-xs text-gray-400">
                        {i % 3 === 0
                          ? 'Solicitud del Empleado en tienda fue gestionada'
                          : i % 3 === 1
                            ? 'Solicitud del Empleado en tienda... En proceso'
                            : 'Tu solicitud del Empleado fue rechazada'}
                      </p>
                    </div>
                    <span className="text-[10px] text-gray-800 absolute top-2 right-3">
                      9:41 AM
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Exportaciones Consolidadas */}
            <div className="w-[400px] mt-8 bg-[#4669AF] text-white shadow-xl rounded-xl p-5 hover:scale-[1.03] transition-transform duration-300 cursor-pointer group">
              <h3 className="text-lg font-extrabold mb-1 flex items-center gap-2">
                <FaChartPie size={18} />
                Exportaciones Consolidadas
              </h3>
              <p className="text-sm text-white/90 mb-4">
                Exporta todos los reportes consolidados de las novedades
                pendientes desde un solo lugar.
              </p>
              <div className="flex justify-center">
                <button className="flex items-center gap-1 bg-white text-[#4669AF] text-xs font-semibold px-3 py-1.5 rounded-md hover:bg-gray-200 transition-colors">
                  <FaListAlt size={12} />
                  Ver Detalle
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DashboardNomina;
