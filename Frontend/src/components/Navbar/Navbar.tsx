import React from 'react';
import { FaBars, FaUserCircle } from 'react-icons/fa';
import { useAuth } from '../../context/useAuth'; 

const Navbar: React.FC = () => {
  const { user } = useAuth();

  return (
    <nav className="bg-[#4669AF] text-white px-6 py-3 flex items-center justify-between shadow-md">
      {/* Menú desplegable */}
      <button
        type="button"
        aria-label="Abrir menú"
        title="Abrir menú"
        className="text-2xl"
      >
        <FaBars />
      </button>

      {/* Título del panel */}
      <h1 className="absolute left-1/2 transform -translate-x-1/2 text-lg font-semibold tracking-wide uppercase">
        Panel Administrador
      </h1>

      {/* Info del usuario */}
      <div className="flex items-center gap-3">
        {/* Texto oculto en móviles */}
        <div className="text-right text-sm hidden sm:block">
          <div className="font-bold uppercase">Administración</div>
          <div className="text-gray-200 text-xs">
            {user?.correo || 'Correo no disponible'}
          </div>
        </div>

        {/* Icono del usuario */}
        <FaUserCircle className="text-4xl sm:text-5xl" />
      </div>
    </nav>
  );
};

export default Navbar;
