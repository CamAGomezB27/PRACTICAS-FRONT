import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import BarraInformativaTiendas from '../../components/BarInfo/BarraInfoNovTiendas';
import NovedadesNomTiendas from '../../components/Box_Novedades/Novedades_Nomina/NovNomTiendas';
import Footer from '../../components/Footer/Footer';
import FiltrosNom from '../../components/Form_Filtros/Filtros_Nomina/FiltrosNomina';
import Navbar from '../../components/Navbar/Navbar';

interface FiltroParaNom {
  tienda: string;
  tipo: string;
  desde: string;
  hasta: string;
}

const SoliPorTiendas: React.FC = () => {
  const [cantidadSolicitudes, setCantidadSolicitudes] = useState(0);
  const location = useLocation();
  const tiendaDesdeModal = location.state?.tiendaSeleccionada || '';

  const [filtros, setFiltros] = useState<FiltroParaNom>({
    tienda: tiendaDesdeModal,
    tipo: '',
    desde: '',
    hasta: '',
  });

  const aplicarFiltros = async (filtros: FiltroParaNom) => {
    setFiltros(filtros);
  };

  useEffect(() => {
    if (tiendaDesdeModal) {
      setFiltros((prev) => ({
        ...prev,
        tienda: tiendaDesdeModal,
      }));
    }
  }, [tiendaDesdeModal]);

  const [estadoSeleccionado, setEstadoSeleccionado] = useState('TODAS');

  return (
    <div className="min-h-screen w-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-grow px-8 pt-8 pb-4">
        <div className="flex justify-between mb-6">
          {/* FILTROS */}
          <div className="lg:w-1/4 px-4 lg:pl-10 lg:pr-0 translate-y-7">
            <FiltrosNom
              onApply={aplicarFiltros}
              tiendaInicial={tiendaDesdeModal}
            />
          </div>

          {/* NOVEDADES */}
          <div className="lg:w-3/4 px-4 lg:pl-0 lg:pr-10">
            <BarraInformativaTiendas
              cantidad={cantidadSolicitudes}
              estadoSeleccionado={estadoSeleccionado}
              onEstadoChange={setEstadoSeleccionado}
            />
            <NovedadesNomTiendas
              filtros={filtros}
              estado={estadoSeleccionado}
              onCantidadChange={setCantidadSolicitudes}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SoliPorTiendas;
