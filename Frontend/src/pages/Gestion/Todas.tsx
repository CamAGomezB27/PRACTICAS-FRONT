import React, { useState } from 'react';
import BarraInformativaTodas from '../../components/BarInfo/BarraInfoNovTodas';
import NovedadesNomTodas from '../../components/Box_Novedades/Novedades_Nomina/NovNomTodas';
import Footer from '../../components/Footer/Footer';
import FiltrosNomTodas from '../../components/Form_Filtros/Filtros_Nomina/FiltrosNominaTod';
import Navbar from '../../components/Navbar/Navbar';

interface FiltroParaNom {
  tienda: string;
  tipo: string;
  desde: string;
  hasta: string;
}

const TodasSolis: React.FC = () => {
  const [filtros, setFiltros] = useState<FiltroParaNom | undefined>(undefined);
  const [cantidadSolicitudes, setCantidadSolicitudes] = useState(0);

  const aplicarFiltros = async (filtros: FiltroParaNom) => {
    setFiltros(filtros);
  };

  const [estadoSeleccionado, setEstadoSeleccionado] = useState('TODAS');

  return (
    <div className="min-h-screen w-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-grow px-8 pt-8 pb-4">
        <div className="flex justify-between mb-6">
          {/* FILTROS */}
          <div className="lg:w-1/4 px-4 lg:pl-10 lg:pr-0 ">
            <FiltrosNomTodas onApply={aplicarFiltros} />
          </div>

          {/* NOVEDADES */}
          <div className="lg:w-3/4 px-4 lg:pl-0 lg:pr-10">
            <BarraInformativaTodas
              cantidad={cantidadSolicitudes}
              estadoSeleccionado={estadoSeleccionado}
              onEstadoChange={setEstadoSeleccionado}
            />
            <NovedadesNomTodas
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

export default TodasSolis;
