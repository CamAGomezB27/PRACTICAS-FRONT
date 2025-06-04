import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
 import { FiLogOut } from 'react-icons/fi';
import { useAuth } from '../../context/useAuth';
import { useNavigate } from 'react-router-dom';

interface NavbarProps {
  panelTitle?: string,
  userRoleTitle?: string,
}

const Navbar: React.FC<NavbarProps> =({
  panelTitle = '',
  userRoleTitle = '',
})=> {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="
      bg-[#4669AF]
      text-white 
      px-6
      flex 
      items-center
      justify-between
      shadow-lg
      drop-shadow-[0_4px_8px_rgba(96,165,250,0.8)] 
      hover:transform hover:translate-y-[-2px]
      hover:drop-shadow-[0_6px_12px_rgba(96,165,250,1)]
      transition-all
      ">
      {/* BOTON SALIR*/}
      <button
        type="button"
        aria-label="Cerrar Sesión"
        title="Salir"
        className="text-3xl cursor-pointer"
        onClick={() => navigate("/")}
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
        <FaUserCircle className="text-4xl sm:text-5xl cursor-pointer" aria-label='Usuario' title='Configuraciones'  />
      </div>
    </nav>
  );
};

export default Navbar;
