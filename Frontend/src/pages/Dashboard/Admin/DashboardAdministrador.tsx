import React from 'react';
import {
  FaUsers,
  FaUserCheck,
  FaThLarge,
  FaUserPlus,
  FaBell,
  FaUserShield,
} from 'react-icons/fa';
import Navbar from '../../../components/Navbar/Navbar';
import Footer from '../../../components/Footer/Footer';
import Card from '../../../components/Cards/card';
import Franco from '../../../assets/images/Franco_Pensando_1-removebg-preview.png';
import { useAuth } from '../../../context/useAuth';

const DashboardAdministrador: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen w-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-grow px-8 pt-8 pb-4">
        <div className="flex justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-black">
              ¡Bienvenido, {user?.nombre || 'Nombre No disponible'}!
            </h2>
            <p className="text-sm text-gray-600">
              Desde aquí puedes gestionar todos los aspectos del sistema y
              monitorear su rendimiento.
            </p>
          </div>

          <div className="w-1/3 flex justify-center mt-2">
            <h2 className="text-xl font-bold text-black">
              Acciones que puedes realziar
            </h2>
          </div>
        </div>

        <div className="flex justify-between pl-6">
          {/* Columna izquierda*/}
          <div className="flex flex-col w-1/3 mt-6 pt-4">
            <div className="flex justify-between mb-4">
              <div className="pr-2 mr-4">
                <Card
                  title="Usuarios Registrados"
                  icon={<FaUsers size={50} />}
                  className="h-[130px] w-[250px] rounded-2xl"
                />
              </div>
              <div className="pl-2">
                <Card
                  title="Usuarios Activos"
                  icon={<FaUserCheck size={50} />}
                  className="h-[130px] w-[250px] rounded-2xl"
                />
              </div>
            </div>

            <div className="flex justify-center mt-6 pl-12">
              <Card
                title="Módulos del Sistema"
                icon={<FaThLarge size={50} />}
                className="h-[130px] w-[270px] rounded-2xl"
              />
            </div>
          </div>

          {/* Columna central*/}
          <div className="w-1/3 flex justify-center items-center pl-32">
            <img
              src={Franco}
              alt="Franco"
              className="object-contain max-w-[400px]"
            />
          </div>

          {/* Columna derecha - Cards con ancho más reducido */}
          <div className="w-1/3 pl-5 flex flex-col space-y-8 items-center">
            <Card
              title="Registrar Usuario"
              icon={<FaUserPlus size={50} />}
              iconPosition="top"
              className="h-30 w-[200px] rounded-2xl"
            />

            <Card
              title="Gestionar Permisos"
              icon={<FaUserShield size={50} />}
              iconPosition="top"
              className="h-30 w-[200px] rounded-2xl"
            />

            <Card
              title="Notificaciones"
              icon={<FaBell size={50} />}
              iconPosition="top"
              className="h-30 w-[200px] rounded-2xl"
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DashboardAdministrador;
