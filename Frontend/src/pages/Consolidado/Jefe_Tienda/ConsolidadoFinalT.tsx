import React from 'react';
import { useState } from 'react';
import Navbar from '../../../components/Navbar/Navbar';
import Footer from '../../../components/Footer/Footer';
import FiltroExportConsTienda from '../../../components/Form_Filtros/FiltrosExportConsTienda';
import VistaArchConsTienda from '../../../components/Viata_ArchivosExport/ViataArchivoExportTienda';

interface FiltroExportacion {
  tipo: string;
  desde: string;
  hasta: string;
}

const ExportConsTienda: React.FC = () => {
  const [datos, setDatos] = useState([]);

  const aplicarFiltros = async (filtros: FiltroExportacion) => {
    //
    //
  };

  return (
    <div className="min-h-screen w-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-grow py-6">
        <div className="flex flex-col lg:flex-row  h-full">
          {/* Panel de Filtros - Izquierda (pegado al borde) */}
          <div className="lg:w-1/4 flex-shrink-0 px-4 lg:pl-10 lg:pr-0 translate-y-7">
            <FiltroExportConsTienda onApply={aplicarFiltros} />
          </div>

          {/* Vista de Archivo - Derecha (con margen derecho) */}
          <div className="lg:w-3/4 flex-grow px-4 lg:pl-0 lg:pr-10">
            <VistaArchConsTienda />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ExportConsTienda;
