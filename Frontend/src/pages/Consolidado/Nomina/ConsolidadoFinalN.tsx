import React, { useState } from 'react';
import Footer from '../../../components/Footer/Footer';
import FiltrosNomCons from '../../../components/Form_Filtros/Filtros_Nomina/FiltrosNominaCons';
import Navbar from '../../../components/Navbar/Navbar';
import VistaArchConsNom from '../../../components/Vista_ArchivosExport/VistaArchivoExportNomina';
interface FiltroParaNom {
  tienda: string;
  tipo: string;
  desde: string;
  hasta: string;
  cedula: string;
}

const ExportConstNom: React.FC = () => {
  const [filtros, setFiltros] = useState<FiltroParaNom | undefined>(undefined);

  const aplicarFiltros = async (filtros: FiltroParaNom) => {
    setFiltros(filtros);
  };

  return (
    <div className="min-h-screen w-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-grow px-8 pt-8 pb-4">
        <div className="flex justify-between mb-6">
          {/* FILTROS */}
          <div className="lg:w-1/4 px-4 lg:pl-10 lg:pr-0">
            <FiltrosNomCons onApply={aplicarFiltros} />
          </div>
          {/* TABLA */}
          <div className="lg:w-3/4 px-4 lg:pl-0 lg:pr-6">
            <VistaArchConsNom filtros={filtros} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ExportConstNom;
