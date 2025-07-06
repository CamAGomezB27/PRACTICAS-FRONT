import React, { useState } from 'react';
import BarraInformativaNovPendientes from '../../components/BarInfo/BarraInfoNovPendientes';
import NovedadesNomPendientes from '../../components/Box_Novedades/Novedades_Nomina/NovNomPendientes';
import Footer from '../../components/Footer/Footer';
import FiltrosNomPen from '../../components/Form_Filtros/Filtros_Nomina/FiltrosNominaPen';
import Navbar from '../../components/Navbar/Navbar';

interface FiltroParaNom {
  tienda: string;
  tipo: string;
  desde: string;
  hasta: string;
}

const SoliPendientes: React.FC = () => {
  const [filtros, setFiltros] = useState<FiltroParaNom | undefined>(undefined);
  const [cantidadSolicitudes, setCantidadSolicitudes] = useState(0);

  const aplicarFiltros = async (filtros: FiltroParaNom) => {
    setFiltros(filtros);
  };

  return (
    <div className="min-h-screen w-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-grow px-8 pt-8 pb-4">
        <div className="flex justify-between mb-6">
          {/* FILTROS */}
          <div className="lg:w-1/4 px-4 lg:pl-10 lg:pr-0 translate-y-0">
            <FiltrosNomPen onApply={aplicarFiltros} />
          </div>

          {/* NOVEDADES */}
          <div className="lg:w-3/4 px-4 lg:pl-0 lg:pr-10">
            <BarraInformativaNovPendientes cantidad={cantidadSolicitudes} />
            <NovedadesNomPendientes
              filtros={filtros}
              onCantidadChange={setCantidadSolicitudes}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SoliPendientes;
