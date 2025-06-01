import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
 import { FiLogOut } from 'react-icons/fi';
import { useAuth } from '../../context/useAuth'; 

interface NavbarProps {
  panelTitle?: string,
  userRoleTitle?: string,
}

const Navbar: React.FC<NavbarProps> =({
  panelTitle = 'Panel Administrador',
  userRoleTitle = 'Administración',
})=> {
  const { user } = useAuth();

  return (
    <nav className="bg-[#4669AF] text-white px-6 py-3 flex items-center justify-between shadow-md">
      {/* BOTON SALIR*/}
      <button
        type="button"
        aria-label="Cerrar Sesión"
        title="Salir"
        className="text-3xl"
      >
        <FiLogOut />
      </button>

      {/* Título del panel */}
      <h1 className="absolute left-1/2 transform -translate-x-1/2 text-lg font-semibold tracking-wide uppercase">
        {panelTitle}
      </h1>

      {/* Info del usuario */}
      <div className="flex items-center gap-3">
        {/* Texto oculto en móviles */}
        <div className="text-right text-sm hidden sm:block">
          <div className="font-bold uppercase">{userRoleTitle}</div>
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
