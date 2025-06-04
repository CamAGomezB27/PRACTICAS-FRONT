import React from 'react';
import {
  FaClipboardList,
  FaListAlt,
  FaStore,
  FaTimesCircle,
  FaClock,
  FaCheck,
  FaTimes,
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

          {/* Columna 3 - Novedades + Resumen Día */}
          <div className="w-1/3 pl-5s flex flex-col items-center space-y-3">
            {/* Novedades Recientes */}
            <div className="text-sm font-bold w-[450px] bg-gray-400 rounded-2xl shadow-inner flex flex-col space-y-3 p-3">
              {/* Contenedor Scrollable */}
              <div className="flex flex-col space-y-3 max-h-[200px] overflow-y-auto pr-1">
                {/* Tarjeta de novedad - puede copiarse n veces */}
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
                        {`SOLICITUD #0${i + 1111} ${i % 3 === 0 ? 'GESTIONADA' : i % 3 === 1 ? 'EN PROCESO' : 'RECHAZADA'}`}
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

            {/* Resumen del Día */}
            <div className="w-[270px] bg-white shadow-[2px_8px_12px_rgba(0,0,0,0.8)] rounded-xl p-2 hover:scale-[1.05] cursor-pointer transition-all">
              <h3 className="text-md font-bold text-gray-800 mb-2">
                Resumen del Día
              </h3>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="text-orange-600 rounded-2xl">
                  <FaClock className="mx-auto" />
                  <p className="font-bold">12</p>
                  <p>Pendientes</p>
                </div>
                <div className="text-green-600">
                  <FaCheck className="mx-auto" />
                  <p className="font-bold">8</p>
                  <p>Aprobadas</p>
                </div>
                <div className="text-red-600">
                  <FaTimes className="mx-auto" />
                  <p className="font-bold">2</p>
                  <p>Rechazadas</p>
                </div>
                <div className="text-blue-600">
                  <FaChartPie className="mx-auto" />
                  <p className="font-bold">22</p>
                  <p>Total Hoy</p>
                </div>
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
