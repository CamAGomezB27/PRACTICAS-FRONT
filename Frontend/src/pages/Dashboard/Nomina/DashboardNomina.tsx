import { Download } from 'lucide-react';
import React, { useState } from 'react';
import { FaClipboardList, FaListAlt, FaStore } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Franco from '../../../assets/images/Franco_Pensando_1-removebg-preview.png';
import FormAccionMasiva from '../../../components/Alerts/AlertFormElegirRespuesta';
import FormElegirTienda from '../../../components/Alerts/AlertFormTiendas';
import NovedadesRecientes from '../../../components/Box_Novedades/novedades';
import ExportacionesConsolidadas from '../../../components/Card_Consolidado/AccesoConsExport';
import Card from '../../../components/Cards/card';
import Footer from '../../../components/Footer/Footer';
import Navbar from '../../../components/Navbar/Navbar';
import { useAuth } from '../../../context/useAuth';

const DashboardNomina: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [mostrarFormTienda, setMostrarFormTienda] = useState(false);
  const [mostrarAccionMasiva, setMostrarAccionMasiva] = useState(false);

  const handleElegirTienda = (tienda: string) => {
    setMostrarFormTienda(false);
    navigate('/solicitudes-por-tiendas', { state: { tienda } });
  };

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
                onClick={() => setMostrarFormTienda(true)}
              />
              <Card
                title="Respuesta Masiva"
                icon={<Download size={50} />}
                className="h-[130px] w-[250px] rounded-2xl"
                onClick={() => setMostrarAccionMasiva(true)}
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
            {/* Exportaciones Consolidadas*/}
            <ExportacionesConsolidadas />
          </div>
        </div>
      </main>

      <Footer />

      {mostrarFormTienda && (
        <FormElegirTienda
          onClose={() => setMostrarFormTienda(false)}
          onSelect={handleElegirTienda}
        />
      )}

      {mostrarAccionMasiva && (
        <FormAccionMasiva
          onClose={() => setMostrarAccionMasiva(false)}
          onArchivoSeleccionado={(file) => {
            console.log('📁 Archivo cargado:', file);
            // Aquí puedes manejar la lógica de carga, por ahora solo lo mostramos
          }}
          onSeleccionarDescargar={() => {
            navigate('/respuesta-masiva'); // Aquí decides tú a dónde mandar
          }}
        />
      )}
    </div>
  );
};

export default DashboardNomina;
