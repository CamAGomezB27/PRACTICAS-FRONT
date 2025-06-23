import React from 'react';
import {
  FaBus,
  FaMoneyBillAlt,
  FaClock,
  FaFileSignature,
  FaFileAlt,
  FaUmbrellaBeach,
  FaList,
} from 'react-icons/fa';
import Navbar from '../../../components/Navbar/Navbar';
import Footer from '../../../components/Footer/Footer';
import CardsTitle from '../../../components/Cards/cardsTitle';
import Franco from '../../../assets/images/Franco_Pensando_1-removebg-preview.png';
import { useAuth } from '../../../context/useAuth';
import { useNavigate } from 'react-router-dom';
import NovedadesRecientes from '../../../components/Box_Novedades/novedades';

const DashboardJefe: React.FC = () => {
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
          {/* Contenedor de Cards + Franco + Novedades */}
          <div className="flex">
            {/* Contenedor de Cards (3x2) */}
            <div className="flex flex-wrap gap-x-10 gap-y-6 max-w-[580px]">
              <CardsTitle
                title="Auxilio de transporte"
                icon={<FaBus size={40} />}
                headerLabel="SOLICITUD"
                color="bg-[#2C3333]"
                className="h-[110px] w-[260px] rounded-xl"
                onClick={() =>
                  navigate('/solicitud-AuxTrans', {
                    state: {
                      titulo: 'Auxilio de transporte',
                      iconName: 'FaBus',
                    },
                  })
                }
              />
              <CardsTitle
                title="Descuento"
                icon={<FaMoneyBillAlt size={40} />}
                headerLabel="SOLICITUD"
                color="bg-[#2C3333]"
                className="h-[110px] w-[260px] rounded-xl"
                onClick={() =>
                  navigate('/solicitud-descuentos', {
                    state: {
                      titulo: 'Descuento',
                      iconName: 'FaMoneyBillAlt',
                    },
                  })
                }
              />
              <CardsTitle
                title="Horas Extra"
                icon={<FaClock size={40} />}
                headerLabel="SOLICITUD"
                color="bg-[#2C3333]"
                className="h-[110px] w-[260px] rounded-xl"
                onClick={() =>
                  navigate('/solicitud-horaExt', {
                    state: {
                      titulo: 'Horas Extra',
                      iconName: 'FaClock',
                    },
                  })
                }
              />
              <CardsTitle
                title="Otro Si Definitivo"
                icon={<FaFileSignature size={40} />}
                headerLabel="SOLICITUD"
                color="bg-[#2C3333]"
                className="h-[110px] w-[260px] rounded-xl"
                onClick={() =>
                  navigate('/solicitud-OtroSiDef', {
                    state: {
                      titulo: 'Otro Si Definitivo',
                      iconName: 'FaFileSignature',
                    },
                  })
                }
              />
              <CardsTitle
                title="Otro Si Temporal"
                icon={<FaFileAlt size={40} />}
                headerLabel="SOLICITUD"
                color="bg-[#2C3333]"
                className="h-[110px] w-[260px] rounded-xl"
                onClick={() =>
                  navigate('/solicitud-OtroSiTemp', {
                    state: {
                      titulo: 'Otro Si Temporal',
                      iconName: 'FaFileAlt',
                    },
                  })
                }
              />
              <CardsTitle
                title="Vacaciones"
                icon={<FaUmbrellaBeach size={40} />}
                headerLabel="SOLICITUD"
                color="bg-[#2C3333]"
                className="h-[110px] w-[260px] rounded-xl"
                onClick={() =>
                  navigate('/solicitud-vacaciones', {
                    state: {
                      titulo: 'Vacaciones',
                      iconName: 'FaUmbrellaBeach',
                    },
                  })
                }
              />
            </div>

            {/* Columna con Card "Otros" arriba y Franco abajo */}
            <div className="flex flex-col justify-between pl-6">
              {/* Card "Otros" */}
              <div className="mb-4">
                <CardsTitle
                  title="Otros"
                  icon={<FaList size={40} />}
                  headerLabel="SOLICITUD"
                  color="bg-[#2C3333]"
                  className="h-[110px] w-[260px] rounded-xl"
                  onClick={() =>
                    navigate('/solicitud-otros', {
                      state: {
                        titulo: 'Otros',
                        iconName: 'FaList',
                      },
                    })
                  }
                />
              </div>

              {/* Franco */}
              <div className="flex items-end">
                <img
                  src={Franco}
                  alt="Franco"
                  className="object-contain max-w-[300px]"
                />
              </div>
            </div>
          </div>

          {/* Columna 3 - Novedades */}
          <div className="w-1/3 pl-5s flex flex-col items-center space-y-3">
            {/* Novedades Recientes */}
            <NovedadesRecientes />

            {/* HISTÓRICO DE SOLICITUDES */}
            <div className="w-[400px] mt-8 bg-[#4669AF] text-white shadow-xl rounded-xl p-5 hover:scale-[1.03] transition-transform duration-300 cursor-pointer group">
              <div className="flex items-center gap-3 mb-3">
                <FaFileAlt className="text-white" size={26} />
                <h3 className="text-lg font-bold">Histórico de Solicitudes</h3>
              </div>

              <p className="text-sm text-white/90 mb-3">
                Consulta novedades anteriores o descarga el consolidado
                completo.
              </p>

              <div className="flex justify-center mt-2">
                <button
                  className="flex items-center gap-1 bg-white text-[#4669AF] text-xs font-semibold px-3 py-1.5 rounded-md hover:bg-gray-200 transition-colors"
                  onClick={() => navigate('/exportacion-consolidados-tienda')}
                >
                  <FaList size={12} />
                  Consultar
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

export default DashboardJefe;
