import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import BarraInformativaTiendas from '../../components/BarInfo/BarraInfoNovTiendas';
import NovedadesNomTiendas from '../../components/Box_Novedades/Novedades_Nomina/NovNomTiendas';
import Footer from '../../components/Footer/Footer';
import FiltrosNomTien from '../../components/Form_Filtros/Filtros_Nomina/FiltrosNominaTien';
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
  const tiendaInicial =
    location.state?.tiendaSeleccionada ||
    sessionStorage.getItem('tiendaSeleccionada') ||
    '';

  const [filtros, setFiltros] = useState<FiltroParaNom>({
    tienda: tiendaInicial,
    tipo: '',
    desde: '',
    hasta: '',
  });

  const aplicarFiltros = async (filtros: FiltroParaNom) => {
    setFiltros(filtros);
  };

  useEffect(() => {
    const tiendaDesdeRuta = location.state?.tiendaSeleccionada;

    if (tiendaDesdeRuta) {
      // Guardar en sessionStorage
      sessionStorage.setItem('tiendaSeleccionada', tiendaDesdeRuta);
      setFiltros((prev) => ({
        ...prev,
        tienda: tiendaDesdeRuta,
      }));
    } else {
      // Si no viene desde el state, intentamos recuperar de sessionStorage
      const tiendaGuardada = sessionStorage.getItem('tiendaSeleccionada');
      if (tiendaGuardada) {
        setFiltros((prev) => ({
          ...prev,
          tienda: tiendaGuardada,
        }));
      }
    }
  }, [location.state]);

  useEffect(() => {
    return () => {
      sessionStorage.removeItem('tiendaSeleccionada');
    };
  }, []);

  const [estadoSeleccionado, setEstadoSeleccionado] = useState('TODAS');

  return (
    <div className="min-h-screen w-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-grow px-8 pt-8 pb-4">
        <div className="flex justify-between mb-6">
          {/* FILTROS */}
          <div className="lg:w-1/4 px-4 lg:pl-10 lg:pr-0 ">
            <FiltrosNomTien
              onApply={aplicarFiltros}
              tiendaInicial={tiendaInicial}
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
