import { Download } from 'lucide-react';
import React from 'react';
import {
  FaChartPie,
  FaClipboardList,
  FaListAlt,
  FaStore,
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Franco from '../../../assets/images/Franco_Pensando_1-removebg-preview.png';
import NovedadesRecientes from '../../../components/Box_Novedades/novedades';
import Card from '../../../components/Cards/card';
import Footer from '../../../components/Footer/Footer';
import Navbar from '../../../components/Navbar/Navbar';
import { useAuth } from '../../../context/useAuth';

const DashboardNomina: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-screen flex flex-col bg-white">
      <Navbar />

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
                onClick={() => navigate('/solicitudes-pendientes')}
              />
              <Card
                title="Todas las Solicitudes"
                icon={<FaListAlt size={50} />}
                className="h-[130px] w-[250px] rounded-2xl"
                onClick={() => navigate('/todas-las-solicitudes')}
              />
              <Card
                title="Solicitudes por Tiendas"
                icon={<FaStore size={50} />}
                className="h-[130px] w-[250px] rounded-2xl"
                onClick={() => navigate('/solicitudes-por-tiendas')}
              />
              <Card
                title="Respuesta Masiva"
                icon={<Download size={50} />}
                className="h-[130px] w-[250px] rounded-2xl"
                onClick={() => navigate('/solicitudes-rechazadas')}
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
            <NovedadesRecientes />

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
