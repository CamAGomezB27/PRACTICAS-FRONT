import React, { useState } from 'react';
import Footer from '../../../components/Footer/Footer';
import FiltroExportConsTienda from '../../../components/Form_Filtros/Filtro_Tiendas/FiltrosExportConsTienda';
import Navbar from '../../../components/Navbar/Navbar';
import VistaArchConsTienda from '../../../components/Vista_ArchivosExport/VistaArchivoExportTienda';

interface FiltroExportacion {
  tipo: string;
  desde: string;
  hasta: string;
  cedula: string;
}

const ExportConsTienda: React.FC = () => {
  const [filtros, setFiltros] = useState<FiltroExportacion | undefined>(
    undefined,
  );

  const aplicarFiltros = async (filtros: FiltroExportacion) => {
    setFiltros(filtros);
  };

  return (
    <div className="min-h-screen w-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-grow py-6">
        <div className="flex flex-col lg:flex-row h-full">
          {/* FILTROS */}
          <div className="lg:w-1/4 px-4 lg:pl-10 lg:pr-0 translate-y-7">
            <FiltroExportConsTienda onApply={aplicarFiltros} />
          </div>
          {/* TABLA */}
          <div className="lg:w-3/4 px-4 lg:pl-0 lg:pr-6">
            <VistaArchConsTienda filtros={filtros} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ExportConsTienda;
