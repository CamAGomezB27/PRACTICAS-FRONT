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

const DashboardJefe: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-screen flex flex-col bg-white">
      <Navbar panelTitle="Jefe Tienda Calle 80" userRoleTitle="Jefe Tienda" />

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
                onClick={() => navigate('/solicitud-AuxTrans')}
              />
              <CardsTitle
                title="Descuento"
                icon={<FaMoneyBillAlt size={40} />}
                headerLabel="SOLICITUD"
                color="bg-[#2C3333]"
                className="h-[110px] w-[260px] rounded-xl"
                onClick={() => navigate('/solicitud-descuentos')}
              />
              <CardsTitle
                title="Horas Extra"
                icon={<FaClock size={40} />}
                headerLabel="SOLICITUD"
                color="bg-[#2C3333]"
                className="h-[110px] w-[260px] rounded-xl"
                onClick={() => navigate('/solicitud-horaExt')}
              />
              <CardsTitle
                title="Otro si Definitivo"
                icon={<FaFileSignature size={40} />}
                headerLabel="SOLICITUD"
                color="bg-[#2C3333]"
                className="h-[110px] w-[260px] rounded-xl"
                onClick={() => navigate('/solicitud-OtroSiDef')}
              />
              <CardsTitle
                title="Otro Si Temporal"
                icon={<FaFileAlt size={40} />}
                headerLabel="SOLICITUD"
                color="bg-[#2C3333]"
                className="h-[110px] w-[260px] rounded-xl"
                onClick={() => navigate('/solicitud-OtroSiTemp')}
              />
              <CardsTitle
                title="Vacaciones"
                icon={<FaUmbrellaBeach size={40} />}
                headerLabel="SOLICITUD"
                color="bg-[#2C3333]"
                className="h-[110px] w-[260px] rounded-xl"
                onClick={() => navigate('/solicitud-vacaciones')}
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
                  onClick={() => navigate('/solicitud-otros')}
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
            <div className="text-sm font-bold w-[450px] bg-gray-400 rounded-2xl shadow-inner flex flex-col space-y-3 p-3">
              <div className="flex flex-col space-y-3 max-h-[200px] overflow-y-auto pr-1">
                {[...Array(10)].map((_, i) => (
                  <div
                    key={i}
                    className="flex items-start bg-white rounded-xl shadow-sm p-3 relative cursor-pointer"
                  >
                    <div
                      className={`w-1.5 h-full rounded-l-md absolute left-0 top-0 bottom-0 ${
                        i % 3 === 0
                          ? 'bg-green-500'
                          : i % 3 === 1
                            ? 'bg-yellow-500'
                            : 'bg-red-500'
                      }`}
                    />
                    <div className="pl-3 pr-1 flex-1">
                      <p className="text-sm font-semibold text-gray-800">
                        {`SOLICITUD #0${i + 1111} ${
                          i % 3 === 0
                            ? 'GESTIONADA'
                            : i % 3 === 1
                              ? 'EN PROCESO'
                              : 'RECHAZADA'
                        }`}
                      </p>
                      <p className="text-xs text-gray-400">
                        {i % 3 === 0
                          ? 'Solicitud del Empleado en tienda fue gestionada'
                          : i % 3 === 1
                            ? 'Solicitud del Empleado en tienda... En proceso'
                            : 'Tu solicitud del Empleado fue rechazada'}
                      </p>
                    </div>
                    <span className="text-[10px] text-gray-800 absolute top-2 right-3">
                      9:41 AM
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* HISTÓRICO DE SOLICITUDES */}
            <div className="w-[280px] mt-8 bg-[#4669AF] text-white shadow-xl rounded-xl p-5 hover:scale-[1.03] transition-transform duration-300 cursor-pointer group">
              <div className="flex items-center gap-3 mb-3">
                <FaFileAlt className="text-white" size={26} />
                <h3 className="text-lg font-bold">Histórico de Solicitudes</h3>
              </div>

              <p className="text-sm text-white/90 mb-3">
                Consulta novedades anteriores o descarga el consolidado
                completo.
              </p>

              <div className="flex justify-between mt-2">
                <button className="flex items-center gap-1 text-xs bg-white text-[#4669AF] font-semibold px-3 py-1.5 rounded-md hover:bg-gray-100 transition-colors">
                  <FaList size={12} />
                  Consultar
                </button>
                <button className="flex items-center gap-1 text-xs bg-white text-[#4669AF] font-semibold px-3 py-1.5 rounded-md hover:bg-gray-100 transition-colors">
                  <FaFileSignature size={12} />
                  Exportar
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
