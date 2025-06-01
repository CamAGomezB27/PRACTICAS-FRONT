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
      <Navbar 
      panelTitle='Administrador'
      userRoleTitle='Admin'
      />

      <main className="flex-grow px-8 py-4">
        {/* Bienvenida */}
        <div className="flex justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-black">
              ¡Bienvenido, {user?.nombre || 'Administrador'}!
            </h2>
            <p className="text-sm text-gray-600">
              Desde aquí puedes gestionar todos los aspectos del sistema y
              monitorear su rendimiento.
            </p>
          </div>

          {/* ACCIONES título centrado sobre las cards */}
          <div className="w-1/3 flex justify-center mt-2">
            <h3 className="text-lg font-bold text-black mb-4">ACCIONES</h3>
          </div>
        </div>

        {/* Contenedor de tarjetas */}
        <div className="flex justify-between">
          {/* Columna izquierda - Cards con tamaño igual y respetando espacios */}
          <div className="flex flex-col w-1/3 mt-8">
            <div className="flex justify-between mb-4">
              {/* Primera fila con dos cards del mismo tamaño que la de abajo */}
              <div className="pr-2">
                <Card
                  title="Usuarios Registrados"
                  icon={<FaUsers />}
                  className="h-[130px] w-[250px] rounded-2xl"
                />
              </div>
              <div className="pl-2">
                <Card
                  title="Usuarios Activos"
                  icon={<FaUserCheck />}
                  className="h-[130px] w-[250px] rounded-2xl"
                />
              </div>
            </div>

            {/* Segunda fila con card central */}
            <div className="flex justify-center mt-8 pl-16">
              <Card
                title="Módulos del Sistema"
                icon={<FaThLarge />}
                className="h-[130px] w-[270px] rounded-2xl"
              />
            </div>
          </div>

          {/* Columna central - imagen */}
          <div className="w-1/3 flex justify-center items-center pl-20">
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
              icon={<FaUserPlus />}
              iconPosition="top"
              className="h-30 w-[200px] rounded-2xl"
            />

            <Card
              title="Gestionar Permisos"
              icon={<FaUserShield />}
              iconPosition="top"
              className="h-30 w-[200px] rounded-2xl"
            />

            <Card
              title="Notificaciones"
              icon={<FaBell />}
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