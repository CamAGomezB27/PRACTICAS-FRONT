import React, { useState } from 'react';
import Footer from '../../components/Footer/Footer';
import FiltrosNomResM from '../../components/Form_Filtros/Filtros_Nomina/FiltrosNomResM';
import Navbar from '../../components/Navbar/Navbar';
import VistaArchRespMasiv from '../../components/ResMasiv/VistaArchivoExportNomina';

interface FiltroParaNom {
  tienda: string;
  tipo: string;
  desde: string;
  hasta: string;
  cedula: string;
}

const RespuestaMasiva: React.FC = () => {
  const [filtros, setFiltros] = useState<FiltroParaNom | undefined>(undefined);

  const aplicarFiltros = (filtros: FiltroParaNom) => {
    setFiltros(filtros);
  };

  return (
    <div className="min-h-screen w-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-grow px-8 pt-8 pb-4">
        <div className="flex justify-between mb-6">
          {/* FILTROS */}
          <div className="lg:w-1/4 px-4 lg:pl-10 lg:pr-0">
            <FiltrosNomResM onApply={aplicarFiltros} />
          </div>
          {/* TABLA */}
          <div className="lg:w-3/4 px-4 lg:pl-0 lg:pr-6">
            <VistaArchRespMasiv filtros={filtros} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RespuestaMasiva;
