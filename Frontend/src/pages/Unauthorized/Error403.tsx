import React, { useEffect } from 'react';
import { FiX } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import AlertSeguridad from '../../components/Alerts/AlertSeguridad';
import SoportTI from '../../components/Alerts/AlertSoportTI';
import { useAuth } from '../../context/useAuth';

const Error403FORBBIDEN: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    const handlePopState = () => {
      navigate('/unauthorized', { replace: true });
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [navigate]);

  return (
    <div className="w-screen h-screen flex items-center justify-center relative bg-white">
      {/* Contenedor principal */}
      <div className="flex flex-col items-center justify-center px-8 py-6 bg-white rounded-md shadow-[2px_8px_12px_rgba(0,0,0,0.8)] border border-gray-300 max-w-md text-center z-10">
        {/* Icono */}
        <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center mb-4">
          <FiX size={32} className="text-white" />
        </div>

        <h1 className="text-black font-semibold text-base">Acceso Denegado</h1>
        <h2 className="text-red-600 font-bold text-xl my-1">
          HTTP 403 - FORBIDDEN
        </h2>
        <p className="text-gray-700 text-sm mb-4">
          Su usuario/Rol no tiene los permisos necesarios para acceder a este
          recurso del sistema. El acceso ha sido restringido por políticas de
          seguridad.
        </p>

        {/* Alerta */}
        <AlertSeguridad />

        {/* Botones */}
        <div className="flex gap-4 mt-6">
          <button
            onClick={() => {
              logout(); // <-- elimina la cookie o token
              navigate('/', { replace: true }); // <-- redirige y reemplaza el historial
            }}
            className="bg-gray-300 hover:bg-gray-400 text-black font-semibold py-2 px-4 rounded-md shadow-sm border border-transparent hover:border-black focus:outline-none focus:ring-0"
          >
            Iniciar Sesión
          </button>
        </div>

        {/* Instrucciones */}
        <div className="mt-6 text-sm text-left w-full">
          <p className="font-semibold">Para Obtener Acceso</p>
          <ul className="list-disc list-inside mt-1 text-gray-800">
            <li>Contacte al administrador del sistema</li>
            <li>Verifique sus credenciales de acceso</li>
            <li>Solicite los permisos correspondientes</li>
            <li>Revise su nivel de autorización</li>
          </ul>
        </div>
      </div>

      {/* Panel soporte flotante */}
      <div className="absolute right-[100px] top-[100px] bg-[#4669AF] text-white text-sm rounded-xl px-6 py-4 w-80 shadow-[4px_6px_10px_rgba(0,0,0,0.4)]">
        <SoportTI />
      </div>
    </div>
  );
};

export default Error403FORBBIDEN;
