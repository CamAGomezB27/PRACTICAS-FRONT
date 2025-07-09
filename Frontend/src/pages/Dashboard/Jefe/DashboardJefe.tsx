import React from 'react';
import {
  FaBus,
  FaClock,
  FaFileAlt,
  FaFileSignature,
  FaList,
  FaMoneyBillAlt,
  FaUmbrellaBeach,
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Franco from '../../../assets/images/Franco_Pensando_1-removebg-preview.png';
import AlertDiasNovedades from '../../../components/Alerts/AlertDiasNovedades';
import NovedadesRecientes from '../../../components/Box_Novedades/novedades';
import ExportacionesConsolidadas from '../../../components/Card_Consolidado/AccesoConsExport';
import CardsTitle from '../../../components/Cards/cardsTitle';
import Footer from '../../../components/Footer/Footer';
import Navbar from '../../../components/Navbar/Navbar';
import { useAuth } from '../../../context/useAuth';

const DashboardJefe: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-grow px-8 pt-4 pb-4">
        {/* ENCABEZADO */}
        <div className="flex items-center justify-between mb-6">
          {/* Bienvenida */}
          <div className="flex flex-col justify-center">
            <h2 className="text-xl font-bold text-black">
              ¡Bienvenido, {user?.nombre || 'Nombre No disponible'}!
            </h2>
            <p className="text-md mt-4 text-gray-600">
              Desde aquí puedes cargar y gestionar todas tus solicitudes{' '}
              <span className=" text-gray-800 font-semibold">
                Post - Nómina.
              </span>
            </p>
          </div>

          {/* Alerta */}
          <div className="flex-shrink-0 ">
            <AlertDiasNovedades />
          </div>

          {/* Novedades recientes */}
          <div className="w-1/3 flex justify-center">
            <h2 className="text-xl font-bold text-black">
              Novedades Recientes
            </h2>
          </div>
        </div>

        {/* Contenedor Principal en 3 Columnas */}
        <div className="flex justify-between pl-6 pt-2">
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
                title="Horas Extra/Recargos"
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
          <div className="w-1/3 pl-5s flex flex-col items-center space-y-8">
            {/* Novedades Recientes */}
            <NovedadesRecientes />
            {/* HISTÓRICO DE SOLICITUDES */}
            <ExportacionesConsolidadas />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DashboardJefe;
