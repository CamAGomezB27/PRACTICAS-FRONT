import axios from 'axios';
import React, { useState } from 'react';
import {
  FaBell,
  FaUserCheck,
  FaUserPlus,
  FaUsers,
  FaUserShield,
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Franco from '../../../assets/images/Franco_Pensando_1-removebg-preview.png';
import FormCrearUsuario from '../../../components/Alerts/AlerFormCrearUser';
import Card from '../../../components/Cards/card';
import Footer from '../../../components/Footer/Footer';
import Navbar from '../../../components/Navbar/Navbar';
import { useAuth } from '../../../context/useAuth';

const DashboardAdministrador: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const handleCrearUsuario = async (formData: {
    nombre: string;
    correo: string;
    rol: string;
    esJefe: boolean;
    tienda?: number;
  }) => {
    try {
      const payload = {
        nombre: formData.nombre,
        correo: formData.correo,
        rol: formData.rol,
        tienda: formData.esJefe ? formData.tienda : undefined,
      };

      await axios.post('/usuario', payload);
      alert('✅ Usuario creado correctamente');
      setMostrarFormulario(false);
    } catch (err) {
      console.error('❌ Error al crear usuario:', err);
      alert('Error al crear usuario');
    }
  };

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
              Acciones que puedes realizar
            </h2>
          </div>
        </div>

        <div className="flex justify-between pl-6">
          <div className="flex flex-col w-1/3 mt-28 pt-4">
            <div className="flex justify-between mb-4 gap-8">
              <Card
                title="Usuarios Registrados"
                icon={<FaUsers size={80} />}
                iconPosition="top"
                className="h-[150px] w-[250px] rounded-2xl"
                onClick={() => navigate('/usuarios-registrados')}
              />
              <Card
                title="Usuarios Activos"
                icon={<FaUserCheck size={80} />}
                iconPosition="top"
                className="h-[150px] w-[250px] rounded-2xl"
                onClick={() => navigate('/gestionar-usuarios')}
              />
            </div>
          </div>

          <div className="w-1/3 flex justify-center items-center pl-32">
            <img
              src={Franco}
              alt="Franco"
              className="object-contain max-w-[400px]"
            />
          </div>

          <div className="w-1/3 pl-5 flex flex-col space-y-8 items-center">
            <Card
              title="Registrar Usuario"
              icon={<FaUserPlus size={50} />}
              iconPosition="top"
              className="h-30 w-[200px] rounded-2xl"
              onClick={() => setMostrarFormulario(true)}
            />
            <Card
              title="Gestionar Permisos"
              icon={<FaUserShield size={50} />}
              iconPosition="top"
              className="h-30 w-[200px] rounded-2xl"
              onClick={() => navigate('/gestionar-usuarios')}
            />
            <Card
              title="Notificaciones"
              icon={<FaBell size={50} />}
              iconPosition="top"
              className="h-30 w-[200px] rounded-2xl"
              onClick={() => navigate('/notificaciones')}
            />
          </div>
        </div>
      </main>

      <Footer />

      {mostrarFormulario && (
        <FormCrearUsuario
          onClose={() => setMostrarFormulario(false)}
          onCrear={handleCrearUsuario}
        />
      )}
    </div>
  );
};

export default DashboardAdministrador;
